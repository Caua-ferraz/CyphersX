import Stripe from "stripe";
import { headers } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase/admin";

if (!process.env.STRIPE_SECRET_KEY) {
	throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
}

export async function POST(req: Request) {
	try {
		// Initialize Stripe without authentication in production
		const stripe = process.env.NODE_ENV === 'production' 
			? require('stripe')(process.env.STRIPE_SECRET_KEY, {
					apiVersion: '2024-09-30.acacia', // Use your desired API version
					typescript: true,
			})
			: new Stripe(process.env.STRIPE_SECRET_KEY!, {
					apiVersion: '2024-09-30.acacia',
					typescript: true,
			});

		if (!req.body) {
			return Response.json({ error: "No request body found" }, { status: 400 });
		}

		// Use arrayBuffer to get the raw body
		const rawBodyBuffer = Buffer.from(await req.arrayBuffer());

		const sig = headers().get("stripe-signature");
		if (!sig) {
			return Response.json({ error: "No stripe signature found" }, { status: 400 });
		}

		let event: Stripe.Event;
		const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
		if (!endpointSecret) {
			return Response.json({ error: "STRIPE_WEBHOOK_SECRET is not defined in environment variables" }, { status: 400 });
		}

		try {
			event = stripe.webhooks.constructEvent(rawBodyBuffer, sig, endpointSecret);
		} catch (err) {
			const message = err instanceof Error ? err.message : "Unknown error";
			return Response.json({ error: `Webhook Error: ${message}` }, { status: 400 });
		}

		switch (event.type) {
			case "invoice.payment_succeeded":
				// Update here
				const result = event.data.object as Stripe.Invoice;
				const end_at = new Date(result.lines.data[0].period.end * 1000).toISOString();
				const customer_id = result.customer as string;
				const subscription_id = result.subscription as string;
				const email = result.customer_email as string;
				const error = await onPaymentSucceeded(end_at, customer_id, subscription_id, email);

				if (error) {
					console.log(error);
					return Response.json({ error: error.message }, { status: 500 });
				}
				break;

			case "customer.subscription.deleted":
				const deleteSubscription = event.data.object as Stripe.Subscription;
				const cancelError = await onSubCancel(deleteSubscription.id);
				if (cancelError) {
					console.log(cancelError);
					return Response.json({ error: cancelError.message }, { status: 500 });
				}
				break;

			default:
				console.log(`Unhandled event type ${event.type}`);
		}

		return Response.json({}, { status: 200 });
	} catch (error) {
		// Log the error but don't fail in production
		console.error('Stripe webhook error:', error);
		
		// Return a 200 status in production to acknowledge the webhook
		if (process.env.NODE_ENV === 'production') {
			return new Response('Webhook received', { status: 200 });
		}
		
		return new Response(
			JSON.stringify({ error: 'Internal server error' }), 
			{ status: 500 }
		);
	}
}

async function onSubCancel(subscription_id: string) {
	const supabase = await supabaseAdmin();
	const { error } = await supabase
		.from("subscription")
		.update({
			customer_id: null,
			subscription_id: null,
		})
		.eq("subscription_id", subscription_id);
	return error;
}

async function onPaymentSucceeded(
	end_at: string,
	customer_id: string,
	subscription_id: string,
	email: string
) {
	const supabase = await supabaseAdmin();
	console.log("Attempting to upsert subscription for email:", email);
	const { data, error } = await supabase
		.from("subscription")
		.upsert(
			{
				email,
				end_at,
				customer_id,
				subscription_id,
				created_at: new Date().toISOString(),
			},
			{ onConflict: 'email' }
		)
		.select();

	if (error) {
		console.error("Error upserting subscription:", error);
	} else if (data && data.length > 0) {
		console.log("Subscription updated/created:", data[0]);
	} else {
		console.log("No data returned from upsert operation");
	}

	return error;
}
