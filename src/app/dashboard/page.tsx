'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { Calendar, Users, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    staffCount: 0,
    shiftCount: 0,
    orgName: ''
  })
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function loadStats() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('org_id, organizations(name)')
        .eq('id', user.id)
        .single()

      if (profile) {
        const orgId = profile.org_id
        const orgName = (profile.organizations as any)?.name || 'Din bedrift'

        const { count: staffCount } = await supabase
          .from('staff')
          .select('*', { count: 'exact', head: true })
          .eq('org_id', orgId)

        const { count: shiftCount } = await supabase
          .from('shifts')
          .select('*', { count: 'exact', head: true })
          .eq('org_id', orgId)

        setStats({
          staffCount: staffCount || 0,
          shiftCount: shiftCount || 0,
          orgName
        })
      }
      setLoading(false)
    }

    loadStats()
  }, [])

  if (loading) {
    return <div className="animate-pulse space-y-4">
      <div className="h-8 bg-slate-200 w-1/4 rounded"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-32 bg-slate-200 rounded-lg"></div>
        <div className="h-32 bg-slate-200 rounded-lg"></div>
        <div className="h-32 bg-slate-200 rounded-lg"></div>
      </div>
    </div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Velkommen tilbake, {stats.orgName}</h1>
        <p className="text-slate-500">Her er en oversikt over din vaktplanlegging.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <Users className="h-6 w-6" />
            </div>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Ansatte</h3>
          <p className="text-2xl font-bold text-slate-900">{stats.staffCount}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-50 rounded-lg text-green-600">
              <Calendar className="h-6 w-6" />
            </div>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Planlagte vakter</h3>
          <p className="text-2xl font-bold text-slate-900">{stats.shiftCount}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
              <Clock className="h-6 w-6" />
            </div>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Neste uke</h3>
          <p className="text-2xl font-bold text-slate-900 font-sans">Klar for planlegging</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Kom i gang</h2>
          <div className="space-y-4">
            <Link href="/dashboard/staff" className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors group">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-3 text-blue-600" />
                <span>Legg til dine ansatte</span>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/dashboard/schedule" className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors group">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-3 text-blue-600" />
                <span>Lag din første vaktliste</span>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="bg-blue-600 p-8 rounded-xl shadow-sm text-white space-y-4 flex flex-col justify-center">
          <h2 className="text-xl font-bold">Trenger du hjelp?</h2>
          <p className="text-blue-100">
            Vi er her for å hjelpe deg med å komme i gang. Sjekk ut våre guider eller send oss en melding.
          </p>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors w-fit">
            Kontakt support
          </button>
        </div>
      </div>
    </div>
  )
}
