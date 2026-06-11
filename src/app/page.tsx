import Link from 'next/link'
import { Calendar, CheckCircle, Mail, Printer, ArrowRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#FAFDF9', color: '#1C2B20' }}>
      <header className="px-4 lg:px-6 h-14 flex items-center border-b" style={{ backgroundColor: '#FAFDF9', borderColor: '#F0F7F4' }}>
        <Link className="flex items-center justify-center" href="/">
          <Calendar className="h-6 w-6" style={{ color: '#4A7C59' }} />
          <span className="ml-2 text-xl font-bold" style={{ color: '#1C2B20' }}>ShiftSimple</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#funksjoner" style={{ color: '#4A7C59' }}>
            Funksjoner
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#priser" style={{ color: '#4A7C59' }}>
            Priser
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login" style={{ color: '#4A7C59' }}>
            Logg inn
          </Link>
          <Link
            className="text-sm font-medium text-white px-4 py-2 rounded-xl shadow-sm transition-all duration-200 hover:scale-105"
            style={{ backgroundColor: '#4A7C59' }}
            href="/signup"
          >
            Start gratis prøveperiode
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48" style={{ backgroundColor: '#F0F7F4' }}>
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none" style={{ color: '#1C2B20' }}>
                  Din vaktplan er klar på 5 minutter — ikke 5 timer
                </h1>
                <p className="mx-auto max-w-[700px] md:text-xl" style={{ color: '#4A7C59' }}>
                  Slipp Excel-kaos og WhatsApp-forvirring. ShiftSimple gir deg full oversikt over hele uken — og sender vaktene automatisk til de ansatte.
                </p>
              </div>
              <div className="space-x-4 pt-4">
                <Link
                  href="/signup"
                  className="inline-flex items-center h-14 px-8 py-4 text-base font-medium text-white shadow-md rounded-xl transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: '#4A7C59' }}
                >
                  Start gratis i 14 dager
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
              <p className="text-sm" style={{ color: '#4A7C59', opacity: 0.7 }}>Ikke kredittkort nødvendig. Avbryt når som helst.</p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="funksjoner" className="w-full py-12 md:py-24 lg:py-32" style={{ backgroundColor: '#FAFDF9', scrollMarginTop: '80px' }}>
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl" style={{ color: '#1C2B20' }}>
                  Laget for travle eiere
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed" style={{ color: '#4A7C59' }}>
                  Alt du trenger for å planlegge vaktene — ingenting annet.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center border p-6 rounded-xl shadow-sm transition-all duration-200 hover:scale-105" style={{ borderColor: '#F0F7F4', backgroundColor: '#FAFDF9' }}>
                <div className="p-3 rounded-full" style={{ backgroundColor: '#F0F7F4' }}>
                  <Calendar className="h-8 w-8" style={{ color: '#4A7C59' }} />
                </div>
                <h3 className="text-xl font-bold" style={{ color: '#1C2B20' }}>🗓️ Drag-and-drop vaktplan</h3>
                <p style={{ color: '#4A7C59' }}>
                  Bygg ukens vaktliste på minutter. Flytt vakter med ett klikk. Ingen opplæring nødvendig.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center border p-6 rounded-xl shadow-sm transition-all duration-200 hover:scale-105" style={{ borderColor: '#F0F7F4', backgroundColor: '#FAFDF9' }}>
                <div className="p-3 rounded-full" style={{ backgroundColor: '#F0F7F4' }}>
                  <Mail className="h-8 w-8" style={{ color: '#4A7C59' }} />
                </div>
                <h3 className="text-xl font-bold" style={{ color: '#1C2B20' }}>📧 Automatiske varsler</h3>
                <p style={{ color: '#4A7C59' }}>
                  Publiser vaktene og alle ansatte får sin plan rett i innboksen. Ingen WhatsApp-runder mer.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center border p-6 rounded-xl shadow-sm transition-all duration-200 hover:scale-105" style={{ borderColor: '#F0F7F4', backgroundColor: '#FAFDF9' }}>
                <div className="p-3 rounded-full" style={{ backgroundColor: '#F0F7F4' }}>
                  <Printer className="h-8 w-8" style={{ color: '#4A7C59' }} />
                </div>
                <h3 className="text-xl font-bold" style={{ color: '#1C2B20' }}>📄 PDF-eksport med ett klikk</h3>
                <p style={{ color: '#4A7C59' }}>
                  Skriv ut eller del ukeplanen som en pen PDF. Alltid klar på sekunder.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="priser" className="w-full py-12 md:py-24 lg:py-32" style={{ backgroundColor: '#F0F7F4', scrollMarginTop: '80px' }}>
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl" style={{ color: '#1C2B20' }}>
                  Enkel pris. Ingen overraskelser.
                </h2>
                <p className="max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed" style={{ color: '#4A7C59' }}>
                  Alt inkludert. Ingen bindingstid.
                </p>
              </div>
              <div className="mx-auto flex flex-col p-8 rounded-xl shadow-lg max-w-sm w-full" style={{ backgroundColor: '#FAFDF9', border: '2px solid #4A7C59' }}>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold" style={{ color: '#1C2B20' }}>Standard</h3>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-5xl font-bold" style={{ color: '#4A7C59' }}>149 kr</span>
                    <span style={{ color: '#4A7C59' }}>/mnd</span>
                  </div>
                  <p style={{ color: '#4A7C59', opacity: 0.7 }}>Start med en 14-dagers gratis prøveperiode</p>
                </div>
                <ul className="grid gap-3 py-8">
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-5 w-5" style={{ color: '#4A7C59' }} /> <span style={{ color: '#1C2B20' }}>Ubegrenset ansatte</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-5 w-5" style={{ color: '#4A7C59' }} /> <span style={{ color: '#1C2B20' }}>Automatiske e-postvarsler</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-5 w-5" style={{ color: '#4A7C59' }} /> <span style={{ color: '#1C2B20' }}>PDF-eksport</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-5 w-5" style={{ color: '#4A7C59' }} /> <span style={{ color: '#1C2B20' }}>Dra-og-slipp planlegger</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-5 w-5" style={{ color: '#4A7C59' }} /> <span style={{ color: '#1C2B20' }}>14 dagers gratis prøveperiode</span>
                  </li>
                </ul>
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center h-14 px-8 py-4 text-base font-medium text-white shadow-md rounded-xl transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: '#4A7C59' }}
                >
                  Prøv gratis i 14 dager
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t" style={{ borderColor: '#F0F7F4', backgroundColor: '#FAFDF9' }}>
        <p className="text-xs" style={{ color: '#4A7C59', opacity: 0.6 }}>© 2026 ShiftSimple AS. Alle rettigheter reservert.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="/beste-vaktplanleggingsapp" style={{ color: '#4A7C59' }}>
            Blogg
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#" style={{ color: '#4A7C59' }}>
            Vilkår
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#" style={{ color: '#4A7C59' }}>
            Personvern
          </Link>
        </nav>
      </footer>
    </div>
  )
}