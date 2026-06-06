'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Calendar } from 'lucide-react'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [orgName, setOrgName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // 1. Sign up user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: '', // Optional: collect this later
        },
      },
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    if (authData.user) {
      // 2. Create organization
      const { data: orgData, error: orgError } = await supabase
        .from('organizations')
        .insert({ name: orgName })
        .select()
        .single()

      if (orgError) {
        setError(orgError.message)
        setLoading(false)
        return
      }

      // 3. Update profile with org_id
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          org_id: orgData.id,
        })

      if (profileError) {
        setError(profileError.message)
        setLoading(false)
        return
      }

      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center justify-center">
            <Calendar className="h-10 w-10 text-blue-600" />
            <span className="ml-2 text-2xl font-bold">ShiftSimple</span>
          </Link>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
            Start din gratis prøveperiode
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            14 dager gratis, deretter 149 NOK/måned.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          {error && (
            <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="org-name" className="block text-sm font-medium text-slate-700">
                Restaurant/Café navn
              </label>
              <input
                id="org-name"
                name="org-name"
                type="text"
                required
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="Lunas Café"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-slate-700">
                E-post
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="deg@eksempel.no"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" name="password" className="block text-sm font-medium text-slate-700">
                Passord
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
            >
              {loading ? 'Oppretter konto...' : 'Opprett konto'}
            </button>
          </div>
        </form>
        <div className="text-center text-sm">
          <span className="text-slate-500">Har du allerede en konto? </span>
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Logg inn
          </Link>
        </div>
      </div>
    </div>
  )
}
