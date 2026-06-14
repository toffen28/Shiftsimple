import Image from 'next/image'
import Link from 'next/link'
import { Calendar, CheckCircle, Mail, Printer, ArrowRight, Star, Shield, Smartphone, Clock, LogOut, HelpCircle } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#FAFDF9', color: '#1C2B20' }}>
      <header className="px-4 lg:px-6 h-14 flex items-center border-b" style={{ backgroundColor: '#FAFDF9', borderColor: '#F0F7F4' }}>
        <Link className="flex items-center justify-center" href="/">
          <Calendar className="h-6 w-6" style={{ color: '#4A7C59' }} />
          <span className="ml-2 text-xl font-bold" style={{ color: '#1C2B20' }}>ShiftSimple</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#funksjoner" style={{ color: '#4A7C59' }}>Funksjoner</Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#priser" style={{ color: '#4A7C59' }}>Priser</Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#faq" style={{ color: '#4A7C59' }}>Ofte stilte spørsmål</Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login" style={{ color: '#4A7C59' }}>Logg inn</Link>
          <Link
            className="text-sm font-medium text-white px-4 py-2 rounded-xl shadow-sm transition-all duration-200 hover:scale-105"
            style={{ backgroundColor: '#4A7C59' }}
            href="/signup"
          >
            Start gratis i 14 dager
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48" style={{ backgroundColor: '#F0F7F4' }}>
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <p className="text-sm font-medium" style={{ color: '#4A7C59' }}>Laget i Norge for norske restauranter.</p>
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

        {/* Product Visual */}
        <section className="w-full py-12 md:py-16" style={{ backgroundColor: '#FAFDF9' }}>
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-5xl mx-auto">
              <Image
                src="/vaktplanlegger.png"
                alt="Skjermbilde av ShiftSimple vaktplanlegger"
                width={1200}
                height={675}
                className="w-full h-auto rounded-2xl shadow-lg"
                priority
              />
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

        {/* Testimonials Placeholder */}
        <section className="w-full py-12 md:py-20" style={{ backgroundColor: '#F0F7F4' }}>
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12" style={{ color: '#1C2B20' }}>
              Hva våre brukere sier
            </h2>
            <div className="grid max-w-4xl mx-auto gap-8 md:grid-cols-2">
              {/* Placeholder testimonial 1 */}
              <div className="p-6 rounded-xl border shadow-sm" style={{ backgroundColor: '#FAFDF9', borderColor: '#F0F7F4' }}>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" style={{ color: '#4A7C59' }} />)}
                </div>
                <p className="italic mb-4" style={{ color: '#4A7C59' }}>«[NAVN PÅ KUNDE] — Sett inn sitat om ShiftSimple her.»</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: '#4A7C59' }}>[?]</div>
                  <div>
                    <p className="font-medium text-sm" style={{ color: '#1C2B20' }}>[NAVN PÅ KUNDE]</p>
                    <p className="text-xs" style={{ color: '#4A7C59' }}>[STILLING / STED]</p>
                  </div>
                </div>
              </div>
              {/* Placeholder testimonial 2 */}
              <div className="p-6 rounded-xl border shadow-sm" style={{ backgroundColor: '#FAFDF9', borderColor: '#F0F7F4' }}>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" style={{ color: '#4A7C59' }} />)}
                </div>
                <p className="italic mb-4" style={{ color: '#4A7C59' }}>«[NAVN PÅ KUNDE] — Sett inn sitat om ShiftSimple her.»</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: '#4A7C59' }}>[?]</div>
                  <div>
                    <p className="font-medium text-sm" style={{ color: '#1C2B20' }}>[NAVN PÅ KUNDE]</p>
                    <p className="text-xs" style={{ color: '#4A7C59' }}>[STILLING / STED]</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="priser" className="w-full py-12 md:py-24 lg:py-32" style={{ backgroundColor: '#FAFDF9', scrollMarginTop: '80px' }}>
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
                    <span style={{ color: '#4A7C59' }}>/mnd eks. mva</span>
                  </div>
                  <p style={{ color: '#4A7C59', opacity: 0.7 }}>Start med en 14-dagers gratis prøveperiode</p>
                </div>
                <ul className="grid gap-3 py-8">
                  <li className="flex items-center"><CheckCircle className="mr-3 h-5 w-5 flex-shrink-0" style={{ color: '#4A7C59' }} /> <span style={{ color: '#1C2B20' }}>Ubegrenset ansatte</span></li>
                  <li className="flex items-center"><CheckCircle className="mr-3 h-5 w-5 flex-shrink-0" style={{ color: '#4A7C59' }} /> <span style={{ color: '#1C2B20' }}>Automatiske e-postvarsler</span></li>
                  <li className="flex items-center"><CheckCircle className="mr-3 h-5 w-5 flex-shrink-0" style={{ color: '#4A7C59' }} /> <span style={{ color: '#1C2B20' }}>PDF-eksport</span></li>
                  <li className="flex items-center"><CheckCircle className="mr-3 h-5 w-5 flex-shrink-0" style={{ color: '#4A7C59' }} /> <span style={{ color: '#1C2B20' }}>Dra-og-slipp planlegger</span></li>
                  <li className="flex items-center"><CheckCircle className="mr-3 h-5 w-5 flex-shrink-0" style={{ color: '#4A7C59' }} /> <span style={{ color: '#1C2B20' }}>14 dagers gratis prøveperiode</span></li>
                </ul>
                <Link href="/signup"
                  className="inline-flex items-center justify-center h-14 px-8 py-4 text-base font-medium text-white shadow-md rounded-xl transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: '#4A7C59' }}>
                  Start gratis i 14 dager
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-12 md:py-20" style={{ backgroundColor: '#F0F7F4', scrollMarginTop: '80px' }}>
          <div className="container px-4 md:px-6 mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12" style={{ color: '#1C2B20' }}>
              Ofte stilte spørsmål
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: 'Er dataene mine trygge? (GDPR)',
                  a: 'Ja. ShiftSimple følger GDPR. Data lagres kryptert i Supabase, og betalinger håndteres av Stripe. Du kan når som helst be om innsyn i eller sletting av dine data. Se vår <a href="/personvern" style="color:#4A7C59;text-decoration:underline">personvernerklæring</a>.'
                },
                {
                  q: 'Kan de ansatte se planen på mobil?',
                  a: 'Ja. Vaktplanen er mobilvennlig og tilgjengelig for alle ansatte via nettleseren. Ingen app å installere.'
                },
                {
                  q: 'Hva skjer etter prøveperioden?',
                  a: 'Etter 14 dager blir du automatisk overført til vår standardplan til 149 kr/mnd eks. mva. Du kan når som helst kansellere. Hvis du ikke vil fortsette, gjør du ingenting — dataene dine lagres i 30 dager før sletting.'
                },
                {
                  q: 'Er det bindingstid?',
                  a: 'Nei. Ingen bindingstid. Du kan si opp abonnementet når som helst fra innstillingssiden.'
                },
                {
                  q: 'Hvor lang tid tar oppsettet?',
                  a: 'De fleste er i gang på under 10 minutter. Legg inn ansatte, opprett din første uke, og publiser.'
                },
                {
                  q: 'Trenger jeg å installere noe?',
                  a: 'Nei. ShiftSimple er en netttjeneste. Alt du trenger er en nettleser. Ingen nedlastning, ingen installasjon.'
                },
              ].map((item, i) => (
                <details key={i} className="group rounded-xl overflow-hidden border" style={{ backgroundColor: '#FAFDF9', borderColor: '#F0F7F4' }}>
                  <summary className="flex items-center justify-between p-5 cursor-pointer font-medium" style={{ color: '#1C2B20' }}>
                    {item.q}
                    <HelpCircle className="h-5 w-5 flex-shrink-0 ml-2 transition-transform group-open:rotate-180" style={{ color: '#4A7C59' }} />
                  </summary>
                  <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: '#4A7C59' }} dangerouslySetInnerHTML={{ __html: item.a }} />
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col sm:flex-row py-8 w-full shrink-0 items-center px-4 md:px-6 border-t gap-2" style={{ borderColor: '#F0F7F4', backgroundColor: '#FAFDF9' }}>
        <div className="flex flex-col items-center sm:items-start gap-1">
          <p className="text-xs" style={{ color: '#4A7C59', opacity: 0.6 }}>© 2026 ShiftSimple AS. Org.nr. under stiftelse.</p>
          <p className="text-xs" style={{ color: '#4A7C59', opacity: 0.5 }}>post@shiftsimple.no</p>
        </div>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="/beste-vaktplanleggingsapp" style={{ color: '#4A7C59' }}>Blogg</Link>
          <Link className="text-xs hover:underline underline-offset-4" href="/vilkar" style={{ color: '#4A7C59' }}>Vilkår</Link>
          <Link className="text-xs hover:underline underline-offset-4" href="/personvern" style={{ color: '#4A7C59' }}>Personvern</Link>
          <Link className="text-xs hover:underline underline-offset-4" href="/kontakt" style={{ color: '#4A7C59' }}>Kontakt</Link>
        </nav>
      </footer>
    </div>
  )
}