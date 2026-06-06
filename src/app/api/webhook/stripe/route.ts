import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase'
import Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature') as string
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  let event: Stripe.Event

  try {
    if (!sig || !webhookSecret) {
      return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 })
    }
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : 'Webhook Error'
    console.error(`Webhook Error: ${errMsg}`)
    return NextResponse.json({ error: `Webhook Error: ${errMsg}` }, { status: 400 })
  }

  const supabase = createAdminClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const orgId = session.metadata?.orgId
        const customerId = session.customer as string
        const subscriptionId = session.subscription as string

        if (orgId) {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId)
          
          await supabase
            .from('organizations')
            .update({
              stripe_customer_id: customerId,
              subscription_status: subscription.status,
              trial_end: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null,
            })
            .eq('id', orgId)
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        
        await supabase
          .from('organizations')
          .update({
            subscription_status: subscription.status,
            trial_end: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null,
          })
          .eq('stripe_customer_id', subscription.customer as string)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        
        await supabase
          .from('organizations')
          .update({
            subscription_status: 'canceled',
          })
          .eq('stripe_customer_id', subscription.customer as string)
        break
      }

      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (err: unknown) {
    console.error('Database Update Error:', err)
    return NextResponse.json({ error: 'Database update failed' }, { status: 500 })
  }
}
