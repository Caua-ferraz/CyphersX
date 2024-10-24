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

// Main webhook handler function
export default async function webhookHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).send('Method Not Allowed');
  }

  let event: Stripe.Event;
  const sig = req.headers['stripe-signature'] as string;

  try {
    // Ensure the signature exists
    if (!sig) {
      console.error('Missing stripe-signature header');
      return res.status(400).send('Webhook Error: Missing stripe-signature header');
    }

    // Read the raw body
    const buf = await buffer(req);

    try {
      // Verify the event by constructing it from the raw body and signature
      event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET as string);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Process the event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutSessionCompleted(session);
    } else {
      console.warn(`Ignoring unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error: any) {
    // Log the error
    console.error('Error processing webhook event:', error.message);
    res.status(500).send('Internal Server Error');
  }
}

// Function to handle the 'checkout.session.completed' event
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const uniqueUser = session.metadata?.unique_user;
  const plan = 'Pro'; // Since only 'Pro' is buyable

  // Log for debugging
  console.log('Processing checkout.session.completed event:', { uniqueUser, plan });

  if (!uniqueUser) {
    console.error('Missing unique_user in session metadata');
    throw new Error('Missing unique_user in session metadata');
  }

  const startDate = new Date().toISOString();
  const endDate = new Date();
  endDate.setFullYear(endDate.getFullYear() + 100); // 'Pro' plan is forever (100 years)

  try {
    // Insert into premium_subscriptions table
    const { data: subscriptionData, error: subscriptionError } = await supabase
      .from('premium_subscriptions')
      .insert({
        id: session.id, // Use Stripe session ID as the 'id' field
        unique_user: uniqueUser,
        plan: plan, // Set plan as 'Pro'
        start_date: startDate,
        end_date: endDate.toISOString(),
        is_active: true,
        created_at: startDate,
      })
      .select();

    if (subscriptionError) {
      console.error(`Supabase insert failed: ${subscriptionError.message}`);
      throw new Error(`Supabase insert failed: ${subscriptionError.message}`);
    }

    if (subscriptionData.length === 0) {
      throw new Error(`No subscription inserted for unique_user: ${uniqueUser}`);
    }

    console.log(`Successfully created subscription for unique_user: ${uniqueUser}`);

    // Update the profile in the 'profiles' table with active subscription
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')  // Use the correct 'profiles' table
      .update({ subscription_status: 'active' })  // Update with the appropriate status or field
      .eq('unique_user', uniqueUser);  // Filter by 'unique_user'

    if (profileError) {
      console.error(`Supabase update failed for profiles: ${profileError.message}`);
      throw new Error(`Supabase update failed for profiles: ${profileError.message}`);
    }

    console.log(`Successfully updated profile for unique_user: ${uniqueUser}`);
  } catch (err: any) {
    console.error('Error interacting with Supabase:', err.message);
    throw new Error(`Error interacting with Supabase: ${err.message}`);
  }
}