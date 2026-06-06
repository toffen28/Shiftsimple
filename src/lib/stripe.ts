import { loadStripe } from '@stripe/stripe-js'
import Stripe from 'stripe'

export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20', // Use the latest stable version
  typescript: true,
})

export async function createCheckoutSession(orgId: string, email: string) {
  const response = await fetch('/api/create-checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ orgId, email }),
  })
  
  const session = await response.json()
  return session
}
