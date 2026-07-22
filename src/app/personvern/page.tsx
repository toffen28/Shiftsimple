import Link from 'next/link'
import { Calendar } from 'lucide-react'

export const metadata = {
  title: 'Personvernerklæring | ShiftSimple',
  description: 'ShiftSimple sin personvernerklæring (GDPR) — hvordan vi behandler dine data.',
}

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#FAFDF9', color: '#1C2B20' }}>
      <header className="px-4 lg:px-6 h-14 flex items-center border-b" style={{ backgroundColor: '#FAFDF9', borderColor: '#F0F7F4' }}>
        <Link className="flex items-center justify-center" href="/">
          <Calendar className="h-6 w-6" style={{ color: '#4A7C59' }} />
          <span className="ml-2 text-xl font-bold" style={{ color: '#1C2B20' }}>ShiftSimple</span>
        </Link>
      </header>
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Personvernerklæring</h1>
        <div className="prose max-w-none space-y-6 text-base leading-relaxed">

          <p><strong>Sist oppdatert:</strong> Juni 2026</p>

          <h2 className="text-xl font-bold mt-8">1. Behandlingsansvarlig</h2>
          <p>Fjeldstad Software (org.nr. 938 059 748), post@shiftsimple.no, er behandlingsansvarlig for personopplysningene som samles inn via tjenesten.</p>

          <h2 className="text-xl font-bold mt-8">2. Hvilke opplysninger samler vi inn?</h2>
          <p>Vi samler kun inn opplysninger som er nødvendige for å levere tjenesten:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Kontoinformasjon:</strong> E-postadresse og navn på kontoeier.</li>
            <li><strong>Ansattinformasjon:</strong> Navn, e-postadresse og telefonnummer på ansatte som legges inn i vaktplanen.</li>
            <li><strong>Vaktplan-data:</strong> Vakter, dager, tidspunkter og kommentarer knyttet til planleggingen.</li>
            <li><strong>Betalingsinformasjon:</strong> Behandles av Stripe — ShiftSimple lagrer aldri kredittkortnumre.</li>
          </ul>

          <h2 className="text-xl font-bold mt-8">3. Formål med behandlingen</h2>
          <p>Opplysningene brukes utelukkende til å levere og forbedre vaktplanleggingstjenesten, herunder:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Opprette og administrere brukerkontoer</li>
            <li>Vise og administrere vaktplaner</li>
            <li>Sende varsler om vaktendringer til ansatte</li>
            <li>Håndtere abonnement og fakturering via Stripe</li>
            <li>Yte kundeservice og support</li>
          </ul>

          <h2 className="text-xl font-bold mt-8">4. Behandlingsgrunnlag</h2>
          <p>Behandlingen er nødvendig for å oppfylle avtalen (brukervilkårene) med deg (GDPR art. 6(1)(b)).</p>

          <h2 className="text-xl font-bold mt-8">5. Lagring og sikkerhet</h2>
          <p>Data lagres i Supabase, en skybasert database med kryptering og strenge sikkerhetstiltak. Vi lagrer data så lenge kontoen er aktiv. Ved sletting av konto fjernes alle data innen 30 dager.</p>

          <h2 className="text-xl font-bold mt-8">6. Tredjeparter</h2>
          <p>Vi benytter følgende tredjeparter:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Supabase</strong> — database og autentisering (USA/EU)</li>
            <li><strong>Stripe</strong> — betalingsbehandling (USA)</li>
            <li><strong>Vercel</strong> — hosting av nettsiden (USA)</li>
          </ul>
          <p>Overføring til USA skjer i henhold til godkjente overføringsgrunnlag (SCC).</p>

          <h2 className="text-xl font-bold mt-8">7. Dine rettigheter</h2>
          <p>I henhold til GDPR har du rett til:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Innsyn i hvilke opplysninger vi har lagret om deg</li>
            <li>Be om retting av feilaktige opplysninger</li>
            <li>Be om sletting av opplysninger</li>
            <li>Dataportabilitet</li>
            <li>Trekk tilbake samtykke</li>
          </ul>
          <p>Kontakt oss på <a href="mailto:post@shiftsimple.no" className="text-blue-600 underline">post@shiftsimple.no</a> for å utøve dine rettigheter.</p>

          <h2 className="text-xl font-bold mt-8">8. Kontakt</h2>
          <p>Ved spørsmål om denne personvernerklæringen, ta kontakt på <a href="mailto:post@shiftsimple.no" className="text-blue-600 underline">post@shiftsimple.no</a>.</p>
        </div>
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