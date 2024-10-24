import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { Readable } from 'stream';
import { createClient } from '@supabase/supabase-js';

// Initialize Stripe with your secret key and specify the API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-09-30.acacia',
});

// Initialize Supabase client for production
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

// Disable the default body parser to handle raw body
export const config = {
  api: {
    bodyParser: false,
  },
};

// Function to buffer the readable stream
async function buffer(readable: Readable) {
  const chunks: Uint8Array[] = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

// Webhook handler function
export default async function webhookHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).send('Method Not Allowed');
  }

  let event: Stripe.Event;

  try {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'] as string;
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Process the checkout session completed event
  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutSessionCompleted(session);
    } else {
      console.warn(`Ignoring unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error: any) {
    console.error('Error processing webhook event:', error.message);
    res.status(500).send('Internal Server Error');
  }
}

// Function to handle the 'checkout.session.completed' event
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const discordId = session.metadata?.discord_id;
  const plan = session.metadata?.plan;

  // Log the event to verify metadata
  console.log('Processing checkout.session.completed event:', { discordId, plan });

  if (!discordId || !plan) {
    throw new Error('Missing discord_id or plan in session metadata');
  }

  // Get the current date and calculate the end date (assuming 100 years for a long-term plan)
  const startDate = new Date().toISOString(); // Current date
  const endDate = new Date();
  endDate.setFullYear(endDate.getFullYear() + 100); // Set end date to 100 years later

  try {
    const { data, error } = await supabase
      .from('premium_subscriptions')
      .insert({
        unique_user: discordId,
        plan: plan,
        start_date: startDate,
        end_date: endDate.toISOString(),
        is_active: true,
        created_at: startDate,
      })
      .select();

    if (error) {
      console.error(`Supabase insert failed: ${error.message}`);
      throw new Error(`Supabase insert failed: ${error.message}`);
    }

    if (data.length === 0) {
      throw new Error(`No user inserted with Discord ID: ${discordId}`);
    }

    console.log(`Successfully updated subscription for Discord ID: ${discordId}`);
  } catch (err: any) {
    console.error('Error interacting with Supabase:', err);
    throw new Error(`Error interacting with Supabase: ${err.message}`);
  }
}
