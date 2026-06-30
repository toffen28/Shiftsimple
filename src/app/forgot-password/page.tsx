'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { siteUrl } from '@/lib/config'
import { Calendar, ArrowLeft } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${siteUrl}/reset-password`,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSent(true)
      setLoading(false)
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
            Glemt passord?
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Skriv inn e-postadressen din, så sender vi deg instruksjoner.
          </p>
        </div>

        {sent ? (
          <div className="text-center space-y-4">
            <div className="rounded-md bg-green-50 p-4 text-sm text-green-700">
              Vi har sendt deg en e-post med instruksjoner for å tilbakestille passordet.
            </div>
            <Link
              href="/login"
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Tilbake til innlogging
            </Link>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                E-post
              </label>
              <input
                id="email"
                type="email"
                required
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="deg@eksempel.no"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
            >
              {loading ? 'Sender...' : 'Send instruksjoner'}
            </button>
          </form>
        )}

        <div className="text-center text-sm">
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            <ArrowLeft className="h-4 w-4 inline mr-1" />
            Tilbake til innlogging
          </Link>
        </div>
      </div>
    </div>
  )
}