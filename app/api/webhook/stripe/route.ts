// pages/api/webhook.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { Client, Intents } from 'discord.js';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15', // Use the latest API version
});

// Initialize Supabase
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

// Initialize Discord Client
const discordClient = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });

// Login to Discord
discordClient.login(process.env.DISCORD_TOKEN);

export const config = {
  api: {
    bodyParser: false, // Disable body parsing for raw body access
  },
};

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

      // Fulfill the purchase
      const discordId = session.metadata?.discord_id;
      const plan = session.metadata?.plan;

      if (!discordId || !plan) {
        console.error('Missing discord_id or plan in session metadata');
        return res.status(400).send('Bad Request: Missing metadata');
      }

      // Update user's subscription in Supabase and assign role in Discord
      try {
        // Get the user's unique_user from profiles
        const { data: userData, error: userError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', discordId)
          .single();

        if (userError || !userData) {
          console.error('User not found in profiles:', userError);
          return res.status(200).json({ received: true }); // Acknowledge receipt to prevent retries
        }

        // Calculate end date based on plan
        const endDate = calculateEndDate(plan);

        // Create or update the subscription
        const { data: existingSub } = await supabase
          .from('premium_subscriptions')
          .select('*')
          .eq('unique_user', userData.unique_user)
          .single();

        let subError;
        if (existingSub) {
          // Update existing subscription
          const { error } = await supabase
            .from('premium_subscriptions')
            .update({
              plan: plan,
              end_date: endDate.toISOString(),
              is_active: true,
            })
            .eq('unique_user', userData.unique_user);
          subError = error;
        } else {
          // Create new subscription
          const { error } = await supabase
            .from('premium_subscriptions')
            .insert({
              unique_user: userData.unique_user,
              plan: plan,
              end_date: endDate.toISOString(),
              is_active: true,
            });
          subError = error;
        }

        if (subError) throw subError;

        // Add the premium role to the user
        try {
          const guild = await discordClient.guilds.fetch(process.env.GUILD_ID!);
          const member = await guild.members.fetch(discordId);
          await manageUserRole(member, true);
          console.log(`Premium role assigned to ${member.user.tag}`);

          // Send a DM to the user
          await member.send(`✅ Your purchase was successful! You have been granted the premium role.`);
        } catch (roleError) {
          console.error('Could not assign premium role:', roleError);
        }
      } catch (error) {
        console.error('Error handling subscription after payment:', error);
      }
    }

    // Return a response to acknowledge receipt of the event
    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).send('Method Not Allowed');
  }
}

// Helper function to calculate end date
function calculateEndDate(duration: string): Date {
  const now = new Date();

  switch (duration) {
    case 'monthly':
      return new Date(now.setMonth(now.getMonth() + 1));
    case 'permanent':
      return new Date(now.setFullYear(now.getFullYear() + 100)); // Set to far future
    default:
      return new Date(now.setMonth(now.getMonth() + 1)); // Default to 1 month
  }
}

// Function to manage user roles
async function manageUserRole(member: any, shouldHaveRole: boolean) {
  const premiumRoleId = process.env.PREMIUM_ROLE_ID!;

  try {
    if (shouldHaveRole) {
      if (!member.roles.cache.has(premiumRoleId)) {
        await member.roles.add(premiumRoleId);
        console.log(`Added premium role to ${member.user.tag}`);
      }
    } else {
      if (member.roles.cache.has(premiumRoleId)) {
        await member.roles.remove(premiumRoleId);
        console.log(`Removed premium role from ${member.user.tag}`);
      }
    }
  } catch (error) {
    console.error('Role management error:', error);
    throw error;
  }
}
