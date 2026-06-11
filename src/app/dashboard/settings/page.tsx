'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { CreditCard, Building, Trash2, CheckCircle, ExternalLink, Loader2, ArrowRight } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { nb } from 'date-fns/locale'

export default function SettingsPage() {
  const [orgName, setOrgName] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [portalLoading, setPortalLoading] = useState(false)
  const [orgId, setOrgId] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState('')
  const [subscription, setSubscription] = useState<{
    status: string
    trial_end: string | null
    stripe_customer_id: string | null
  }>({
    status: 'trialing',
    trial_end: null,
    stripe_customer_id: null,
  })

  const supabase = createClient()

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      setUserEmail(user.email || '')

      const { data: profile } = await supabase
        .from('profiles')
        .select('org_id, organizations(name, subscription_status, trial_end, stripe_customer_id)')
        .eq('id', user.id)
        .single()

      if (profile) {
        const org = profile.organizations as any
        setOrgId(profile.org_id)
        setOrgName(org?.name || '')
        setSubscription({
          status: org?.subscription_status || 'trialing',
          trial_end: org?.trial_end || null,
          stripe_customer_id: org?.stripe_customer_id || null,
        })
      }
      setLoading(false)
    }

    loadData()
  }, [])

  const handleUpdateOrg = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orgId) return
    setSaving(true)

    const { error } = await supabase
      .from('organizations')
      .update({ name: orgName })
      .eq('id', orgId)

    if (!error) {
      alert('Innstillinger lagret!')
    }
    setSaving(false)
  }

  const handleBillingPortal = async () => {
    if (!orgId) return
    setPortalLoading(true)

    const res = await fetch('/api/stripe/portal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orgId }),
    })

    const data = await res.json()
    setPortalLoading(false)

    if (data.url) {
      window.location.href = data.url
    } else {
      alert(data.error || 'Kunne ikke åpne faktureringsportalen.')
    }
  }

  const handleUpgrade = async () => {
    if (!orgId || !userEmail) return
    setPortalLoading(true)

    const res = await fetch('/api/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userEmail, orgId }),
    })

    const data = await res.json()
    setPortalLoading(false)

    if (data.url) {
      window.location.href = data.url
    } else {
      alert(data.error || 'Kunne ikke opprette betalingsside.')
    }
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return null
    try {
      return format(parseISO(dateStr), 'd. MMMM yyyy', { locale: nb })
    } catch {
      return dateStr
    }
  }

  const statusLabel = () => {
    switch (subscription.status) {
      case 'trialing':
        return { label: 'Gratis prøveperiode', color: 'bg-green-100 text-green-800' }
      case 'active':
        return { label: 'Aktiv', color: 'bg-blue-100 text-blue-800' }
      case 'past_due':
        return { label: 'Betaling mangler', color: 'bg-yellow-100 text-yellow-800' }
      case 'canceled':
        return { label: 'Kansellert', color: 'bg-red-100 text-red-800' }
      default:
        return { label: subscription.status, color: 'bg-slate-100 text-slate-800' }
    }
  }

  if (loading) return <div>Laster...</div>

  const status = statusLabel()
  const formattedEnd = formatDate(subscription.trial_end)

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Innstillinger</h1>
        <p className="text-slate-500">Administrer din konto og abonnement.</p>
      </div>

      {/* Organization Info */}
      <div className="bg-white shadow-sm border border-slate-100 rounded-xl overflow-hidden">
        <div className="p-6 border-b bg-slate-50">
          <div className="flex items-center">
            <Building className="h-5 w-5 mr-2 text-slate-500" />
            <h2 className="font-bold text-slate-900">Bedriftsinformasjon</h2>
          </div>
        </div>
        <form onSubmit={handleUpdateOrg} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Navn på restaurant/café</label>
            <input
              type="text"
              className="w-full max-w-md rounded-md border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {saving ? 'Lagrer...' : 'Lagre endringer'}
          </button>
        </form>
      </div>

      {/* Subscription */}
      <div className="bg-white shadow-sm border border-slate-100 rounded-xl overflow-hidden">
        <div className="p-6 border-b bg-slate-50">
          <div className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2 text-slate-500" />
            <h2 className="font-bold text-slate-900">Abonnement</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-700">Status:</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                  {status.label}
                </span>
              </div>
              <p className="text-sm text-slate-500">
                {subscription.status === 'trialing' && formattedEnd
                  ? `Prøveperioden varer til ${formattedEnd}.`
                  : subscription.status === 'active'
                    ? 'Du har et aktivt abonnement.'
                    : subscription.status === 'canceled'
                      ? 'Ditt abonnement er kansellert.'
                      : `Status: ${subscription.status}`}
              </p>
            </div>
            {subscription.status === 'active' || subscription.stripe_customer_id ? (
              <button
                onClick={handleBillingPortal}
                disabled={portalLoading}
                className="inline-flex items-center px-4 py-2 border border-slate-300 rounded-md text-sm font-medium hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                {portalLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <ExternalLink className="h-4 w-4 mr-2" />
                )}
                Administrer fakturering
              </button>
            ) : (
              <button
                onClick={handleUpgrade}
                disabled={portalLoading}
                className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-md text-sm font-medium shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {portalLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <ArrowRight className="h-4 w-4 mr-2" />
                )}
                Oppgrader til Standard Plan
              </button>
            )}
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 bg-blue-50 border-blue-100">
              <div className="flex items-center mb-2">
                <CheckCircle className="h-5 w-5 mr-2 text-blue-600" />
                <h3 className="font-bold text-blue-900">Standard Plan</h3>
              </div>
              <p className="text-sm text-blue-800">149 NOK / måned</p>
              <p className="text-xs text-blue-600 mt-1">Ubegrenset ansatte og vakter. Avbryt når som helst.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-100 rounded-xl overflow-hidden">
        <div className="p-6 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-red-900 flex items-center">
              <Trash2 className="h-5 w-5 mr-2" />
              Slett konto
            </h2>
            <p className="text-sm text-red-700 mt-1">
              Dette vil slette alle dine data permanent. Dette kan ikke angres.
            </p>
          </div>
          <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
            Slett alt
          </button>
        </div>
      </div>
    </div>
  )
}