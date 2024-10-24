import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { Readable } from 'stream';
import { createClient } from '@supabase/supabase-js';

// Initialize Stripe with your secret key and specify the API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-09-30.acacia',
});

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL as string,
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

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      default:
        console.warn(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error: any) {
    console.error('Error processing webhook event:', error);
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  // Retrieve the full session to get metadata
  let fullSession: Stripe.Checkout.Session;
  try {
    fullSession = await stripe.checkout.sessions.retrieve(session.id);
  } catch (err: any) {
    console.error('Error retrieving Checkout Session:', err.message);
    throw new Error(`Error retrieving Checkout Session: ${err.message}`);
  }

  const discordId = fullSession.metadata?.discord_id;
  const plan = fullSession.metadata?.plan;

  if (!discordId || !plan) {
    console.error('Missing discord_id or plan in session metadata:', fullSession.metadata);
    throw new Error('Missing discord_id or plan in session metadata');
  }

  // Update Supabase
  const { error } = await supabase
    .from('users')
    .update({ subscription_plan: plan, subscription_status: 'active' })
    .eq('discord_id', discordId);

  if (error) {
    console.error('Supabase update failed:', error.message);
    throw new Error(`Supabase update failed: ${error.message}`);
  }

  console.log(`Successfully updated subscription for Discord ID: ${discordId}`);
}
