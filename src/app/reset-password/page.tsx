'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { Calendar, ArrowLeft } from 'lucide-react'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Check if we have the reset token in the URL hash
    const hash = window.location.hash
    if (!hash || !hash.includes('type=recovery')) {
      setError('Ugyldig eller utløpt tilbakestillingslenke. Prøv på nytt.')
    }
  }, [])

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (password.length < 6) {
      setError('Passordet må være minst 6 tegn.')
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError('Passordene er ikke like.')
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setTimeout(() => router.push('/login'), 2000)
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
            Tilbakestill passord
          </h2>
        </div>

        {success ? (
          <div className="text-center space-y-4">
            <div className="rounded-md bg-green-50 p-4 text-sm text-green-700">
              Passordet ditt er oppdatert! Du blir omdirigert til innlogging...
            </div>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleReset}>
            {error && (
              <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  Nytt passord
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-700">
                  Bekreft nytt passord
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  required
                  className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
            >
              {loading ? 'Lagrer...' : 'Oppdater passord'}
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