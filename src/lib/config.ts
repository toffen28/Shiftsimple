/**
 * Centralized app configuration.
 * All environment-driven URLs and settings live here.
 * Change NEXT_PUBLIC_SITE_URL in your env to swap the domain everywhere.
 */

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const config = {
  siteUrl,
  appName: 'ShiftSimple',
  supportEmail: 'post@shiftsimple.no',
  orgName: 'Fjeldstad Software',
  orgNr: '938 059 748',
} as const