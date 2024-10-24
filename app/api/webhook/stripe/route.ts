
import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

// Initialize Supabase client
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

// Webhook handler function
export default async function webhookHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'] as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        process.env.STRIPE_WEBHOOK_SECRET as string
      );
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      // Retrieve the Discord ID and plan from the session metadata
      const discordId = session.metadata?.discord_id;
      const plan = session.metadata?.plan;

      if (!discordId || !plan) {
        console.error('Missing discord_id or plan in session metadata');
        return res.status(400).send('Bad Request: Missing metadata');
      }

      try {
        // Update the user's subscription in Supabase
        const { data, error } = await supabase
          .from('users')
          .update({ subscription_plan: plan, subscription_status: 'active' })
          .eq('discord_id', discordId);

        if (error) {
          console.error('Error updating subscription in Supabase:', error.message);
          return res.status(500).send('Internal Server Error');
        }

        console.log(`Successfully updated subscription for Discord ID: ${discordId}`);
      } catch (error: any) {
        console.error('Unexpected error:', error.message);
        return res.status(500).send('Internal Server Error');
      }
    } else {
      console.warn(`Unhandled event type: ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).send('Method Not Allowed');
  }
}