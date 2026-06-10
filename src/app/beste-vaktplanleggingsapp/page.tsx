import Link from 'next/link'
import { Calendar, ArrowRight, CheckCircle } from 'lucide-react'

export const metadata = {
  title: 'Beste vaktplanleggingsapp for restauranter i Norge 2026 | ShiftSimple',
  description: 'Lei av Excel-ark og WhatsApp-kaos for vaktplanlegging? Se hvorfor norske restauranter bytter til ShiftSimple — enkelt, raskt og designet for serveringsbransjen.',
}

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#FAFDF9', color: '#1C2B20' }}>
      <header className="px-4 lg:px-6 h-14 flex items-center border-b" style={{ backgroundColor: '#FAFDF9', borderColor: '#F0F7F4' }}>
        <Link className="flex items-center justify-center" href="/">
          <Calendar className="h-6 w-6" style={{ color: '#4A7C59' }} />
          <span className="ml-2 text-xl font-bold" style={{ color: '#1C2B20' }}>ShiftSimple</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/#features" style={{ color: '#4A7C59' }}>
            Funksjoner
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/#pricing" style={{ color: '#4A7C59' }}>
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
        <article className="max-w-3xl mx-auto px-4 py-12 md:py-16 lg:py-20">
          {/* Breadcrumb */}
          <div className="mb-8 text-sm" style={{ color: '#4A7C59' }}>
            <Link href="/" className="hover:underline">ShiftSimple</Link>
            <span className="mx-2">/</span>
            <span>Blogg</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6" style={{ color: '#1C2B20' }}>
            Beste vaktplanleggingsapp for restauranter i Norge 2026
          </h1>
          
          <div className="flex items-center gap-3 mb-12 pb-8 border-b" style={{ borderColor: '#F0F7F4' }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: '#4A7C59' }}>
              SS
            </div>
            <div>
              <p className="font-medium text-sm" style={{ color: '#1C2B20' }}>ShiftSimple</p>
              <p className="text-xs" style={{ color: '#4A7C59' }}>Publisert 2026</p>
            </div>
          </div>

          {/* Intro */}
          <div className="prose max-w-none space-y-6 text-base md:text-lg leading-relaxed" style={{ color: '#1C2B20' }}>
            <p>
              Vaktplanlegging i restaurant er en av de mest tidkrevende oppgavene en daglig leder har. 
              Ikke fordi det er komplisert i seg selv — men fordi det skjer på feil sted. I Excel-ark 
              som ikke er oppdatert. I WhatsApp-tråder ingen har oversikt over. På papir som forsvinner.
            </p>
            <p>
              Resultatet er det samme hver uke: endringer som ikke når frem, ansatte som møter opp på 
              feil dag, og en leder som bruker timer på å rydde opp i noe som burde tatt minutter.
            </p>
          </div>

          {/* Section 1 */}
          <section className="mt-14">
            <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: '#1C2B20' }}>
              Hva norske restauranter trenger
            </h2>
            <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: '#1C2B20' }}>
              En god vaktplanleggingsapp for restaurant trenger ikke å gjøre alt. Den trenger å gjøre 
              én ting bra: gi lederen full oversikt over hvem som jobber når, og la ansatte se vakten 
              sin uten å måtte spørre.
            </p>
            <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: '#1C2B20' }}>
              Det betyr:
            </p>
            <div className="space-y-4">
              {[
                {
                  title: 'Enkel oppretting av vakter',
                  desc: 'Dra og slipp. Ingen opplæring nødvendig. En ny ansatt skal kunne forstå planen på 30 sekunder.',
                },
                {
                  title: 'Mobilvennlig for ansatte',
                  desc: 'De fleste ansatte i restaurant sjekker ikke e-post. De sjekker telefonen. Appen må fungere perfekt på mobil.',
                },
                {
                  title: 'Varsler som faktisk når frem',
                  desc: 'Når en vakt endres, skal den berørte ansatte vite det med en gang. Ikke neste gang de tilfeldigvis logger inn.',
                },
                {
                  title: 'Oversikt per uke',
                  desc: 'Daglig leder trenger å se hele uken på én gang. Hvem jobber mandag kveld? Har vi nok folk til fredagens rush? Det skal være synlig med ett blikk.',
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl" style={{ backgroundColor: '#F0F7F4' }}>
                  <CheckCircle className="h-6 w-6 mt-0.5 flex-shrink-0" style={{ color: '#4A7C59' }} />
                  <div>
                    <strong style={{ color: '#1C2B20' }}>{item.title}</strong>
                    <span style={{ color: '#4A7C59' }}> — {item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2 */}
          <section className="mt-14">
            <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: '#1C2B20' }}>
              Hvorfor Excel og WhatsApp ikke fungerer
            </h2>
            <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: '#1C2B20' }}>
              Excel er laget for regneark, ikke for mennesker. Det finnes ingen varsler, ingen mobilapp, 
              og ingen måte å se hvem som har bekreftet vakten sin. Hver endring må kommuniseres manuelt.
            </p>
            <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: '#1C2B20' }}>
              WhatsApp løser kommunikasjonen, men skaper kaos i oversikten. Meldinger drukner. Folk 
              bekrefter i feil tråd. Ingen har den faktiske planen — de har bare en samtale om planen.
            </p>
            <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: '#1C2B20' }}>
              Kombinasjonen av de to er det de fleste norske restauranter bruker i dag. Det fungerer, 
              men det koster tid. Tid lederen ikke har.
            </p>
          </section>

          {/* Section 3 */}
          <section className="mt-14">
            <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: '#1C2B20' }}>
              ShiftSimple — bygget for norske restauranter
            </h2>
            <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: '#1C2B20' }}>
              ShiftSimple er en enkel vaktplanleggingsapp laget spesifikt for serveringsbransjen. 
              Ingen unødvendige funksjoner. Ingen lang opplæring. Bare det du trenger for å planlegge 
              uken og sørge for at alle vet når de jobber.
            </p>

            <div className="grid gap-4 md:grid-cols-2 mb-8">
              <div className="p-6 rounded-xl shadow-sm border" style={{ backgroundColor: '#FAFDF9', borderColor: '#F0F7F4' }}>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#1C2B20' }}>Dra-og-slipp planlegging</h3>
                <p style={{ color: '#4A7C59' }}>Bygg ukesplanen på minutter, ikke timer.</p>
              </div>
              <div className="p-6 rounded-xl shadow-sm border" style={{ backgroundColor: '#FAFDF9', borderColor: '#F0F7F4' }}>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#1C2B20' }}>Ansattoversikt</h3>
                <p style={{ color: '#4A7C59' }}>Se hvem som er tilgjengelig, hvem som har fri, og hvem som jobber dobbelt.</p>
              </div>
              <div className="p-6 rounded-xl shadow-sm border" style={{ backgroundColor: '#FAFDF9', borderColor: '#F0F7F4' }}>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#1C2B20' }}>Automatiske varsler</h3>
                <p style={{ color: '#4A7C59' }}>Ansatte får beskjed når planen er klar eller endret. Ingen grunn til å spørre.</p>
              </div>
              <div className="p-6 rounded-xl shadow-sm border" style={{ backgroundColor: '#FAFDF9', borderColor: '#F0F7F4' }}>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#1C2B20' }}>Fast lav pris</h3>
                <p style={{ color: '#4A7C59' }}>149 kr per måned. Ingen bindingstid. Ingen oppsettskostnad.</p>
              </div>
            </div>

            <p className="text-base md:text-lg leading-relaxed mb-4" style={{ color: '#1C2B20' }}>
              For en restaurant med 10–20 ansatte tilsvarer det prisen på to kaffekopper i måneden. 
              Hvis det sparer lederen for to timer vaktplanlegging per uke, er det den beste 
              investeringen du gjør i år.
            </p>
          </section>

          {/* CTA Section */}
          <section className="mt-16 p-8 md:p-12 rounded-2xl text-center" style={{ backgroundColor: '#F0F7F4' }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#1C2B20' }}>
              Klar for en enklere hverdag?
            </h2>
            <p className="text-lg mb-8 max-w-lg mx-auto" style={{ color: '#4A7C59' }}>
              Prøv ShiftSimple gratis i 14 dager. Ingen kredittkort. Ingen bindingstid.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center h-14 px-8 py-4 text-base font-medium text-white shadow-md rounded-xl transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: '#4A7C59' }}
            >
              Start gratis i 14 dager
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </section>
        </article>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t" style={{ borderColor: '#F0F7F4', backgroundColor: '#FAFDF9' }}>
        <p className="text-xs" style={{ color: '#4A7C59', opacity: 0.6 }}>© 2026 ShiftSimple AS. Alle rettigheter reservert.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="/" style={{ color: '#4A7C59' }}>
            Hjem
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="/#pricing" style={{ color: '#4A7C59' }}>
            Priser
          </Link>
        </nav>
      </footer>
    </div>
  )
}