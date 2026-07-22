'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, Send, Mail } from 'lucide-react'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In production: send to post@shiftsimple.no via API
    console.log('Contact form:', { name, email, message })
    setSent(true)
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#FAFDF9', color: '#1C2B20' }}>
      <header className="px-4 lg:px-6 h-14 flex items-center border-b" style={{ backgroundColor: '#FAFDF9', borderColor: '#F0F7F4' }}>
        <Link className="flex items-center justify-center" href="/">
          <Calendar className="h-6 w-6" style={{ color: '#4A7C59' }} />
          <span className="ml-2 text-xl font-bold" style={{ color: '#1C2B20' }}>ShiftSimple</span>
        </Link>
      </header>
      <main className="flex-1 max-w-2xl mx-auto px-4 py-12 md:py-16 w-full">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Kontakt oss</h1>
        <p className="text-lg mb-8" style={{ color: '#4A7C59' }}>Har du spørsmål? Vi svarer raskt.</p>

        <div className="flex items-center gap-3 mb-10 p-4 rounded-xl" style={{ backgroundColor: '#F0F7F4' }}>
          <Mail className="h-5 w-5" style={{ color: '#4A7C59' }} />
          <span style={{ color: '#1C2B20' }}>post@shiftsimple.no</span>
        </div>

        {sent ? (
          <div className="rounded-xl p-8 text-center" style={{ backgroundColor: '#F0F7F4' }}>
            <h2 className="text-xl font-bold mb-2">Takk for din henvendelse!</h2>
            <p style={{ color: '#4A7C59' }}>Vi svarer deg så snart som mulig.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#1C2B20' }}>Navn</label>
              <input required value={name} onChange={e => setName(e.target.value)}
                className="w-full rounded-xl border px-4 py-3 focus:outline-none"
                style={{ borderColor: '#F0F7F4', backgroundColor: '#FAFDF9' }} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#1C2B20' }}>E-post</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                className="w-full rounded-xl border px-4 py-3 focus:outline-none"
                style={{ borderColor: '#F0F7F4', backgroundColor: '#FAFDF9' }} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#1C2B20' }}>Melding</label>
              <textarea required rows={5} value={message} onChange={e => setMessage(e.target.value)}
                className="w-full rounded-xl border px-4 py-3 focus:outline-none resize-none"
                style={{ borderColor: '#F0F7F4', backgroundColor: '#FAFDF9' }} />
            </div>
            <button type="submit"
              className="inline-flex items-center h-12 px-6 py-3 text-base font-medium text-white shadow-md rounded-xl transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: '#4A7C59' }}>
              <Send className="h-4 w-4 mr-2" /> Send melding
            </button>
          </form>
        )}
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t" style={{ borderColor: '#F0F7F4', backgroundColor: '#FAFDF9' }}>
        <p className="text-xs" style={{ color: '#4A7C59', opacity: 0.6 }}>© 2026 ShiftSimple · Fjeldstad Software · Org.nr. 938 059 748</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="/vilkar" style={{ color: '#4A7C59' }}>Vilkår</Link>
          <Link className="text-xs hover:underline underline-offset-4" href="/personvern" style={{ color: '#4A7C59' }}>Personvern</Link>
          <Link className="text-xs hover:underline underline-offset-4" href="/kontakt" style={{ color: '#4A7C59' }}>Kontakt</Link>
        </nav>
      </footer>
    </div>
  )
}