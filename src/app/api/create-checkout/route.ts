import { NextResponse } from 'next/server'
import { getServerProfile } from '@/lib/server-utils'
import { stripe } from '@/lib/stripe'
import { siteUrl } from '@/lib/config'

export async function POST(req: Request) {
  try {
    const profile = await getServerProfile()
    if (!profile) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { email, orgId } = await req.json()

    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      subscription_data: {
        trial_period_days: 14,
        metadata: {
          orgId: orgId,
        },
      },
      success_url: `${siteUrl}/dashboard/settings?success=true`,
      cancel_url: `${siteUrl}/dashboard/settings?canceled=true`,
      metadata: {
        orgId: orgId,
      },
    })

    if (!session.url) {
      return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
    }

    return NextResponse.json({ url: session.url })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Stripe Error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
