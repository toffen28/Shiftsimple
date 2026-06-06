'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { CreditCard, Building, Trash2, CheckCircle } from 'lucide-react'

export default function SettingsPage() {
  const [orgName, setOrgName] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [orgId, setOrgId] = useState<string | null>(null)
  const [subscription, setSubscription] = useState({
    status: 'trialing',
    trial_end: '2026-06-20'
  })

  const supabase = createClient()
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null

  useEffect(() => {
    if (searchParams?.get('success') === 'true') {
      alert('Betaling vellykket! Ditt abonnement er nå aktivt.')
    }

    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('org_id, organizations(name, subscription_status, trial_end)')
        .eq('id', user.id)
        .single()

      if (profile) {
        setOrgId(profile.org_id)
        setOrgName((profile.organizations as any).name)
        setSubscription({
          status: (profile.organizations as any).subscription_status || 'trialing',
          trial_end: (profile.organizations as any).trial_end || '2026-06-20'
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

  if (loading) return <div>Laster...</div>

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Innstillinger</h1>
        <p className="text-slate-500">Administrer din konto og abonnement.</p>
      </div>

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

      <div className="bg-white shadow-sm border border-slate-100 rounded-xl overflow-hidden">
        <div className="p-6 border-b bg-slate-50">
          <div className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2 text-slate-500" />
            <h2 className="font-bold text-slate-900">Abonnement</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center">
                <span className="text-sm font-medium text-slate-700 mr-2">Status:</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {subscription.status === 'trialing' ? 'Gratis prøveperiode' : 'Aktiv'}
                </span>
              </div>
              <p className="text-sm text-slate-500">
                {subscription.status === 'trialing' 
                  ? `Din prøveperiode avsluttes ${subscription.trial_end}.`
                  : 'Du har et aktivt abonnement.'}
              </p>
            </div>
            <button className="px-4 py-2 border border-slate-300 rounded-md text-sm font-medium hover:bg-slate-50 transition-colors">
              Administrer fakturering
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 bg-blue-50 border-blue-100">
              <div className="flex items-center mb-2">
                <CheckCircle className="h-5 w-5 mr-2 text-blue-600" />
                <h3 className="font-bold text-blue-900">Standard Plan</h3>
              </div>
              <p className="text-sm text-blue-800">149 NOK / måned</p>
              <p className="text-xs text-blue-600 mt-1">Ubegrenset ansatte og vakter.</p>
            </div>
          </div>
        </div>
      </div>

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
