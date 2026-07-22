import Link from 'next/link'
import { Calendar } from 'lucide-react'

export const metadata = {
  title: 'Vilkår for bruk | ShiftSimple',
  description: 'Vilkår for bruk av ShiftSimple — vaktplanlegging for restauranter og caféer i Norge.',
}

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#FAFDF9', color: '#1C2B20' }}>
      <header className="px-4 lg:px-6 h-14 flex items-center border-b" style={{ backgroundColor: '#FAFDF9', borderColor: '#F0F7F4' }}>
        <Link className="flex items-center justify-center" href="/">
          <Calendar className="h-6 w-6" style={{ color: '#4A7C59' }} />
          <span className="ml-2 text-xl font-bold" style={{ color: '#1C2B20' }}>ShiftSimple</span>
        </Link>
      </header>
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Vilkår for bruk</h1>
        <div className="prose max-w-none space-y-6 text-base leading-relaxed">
          <p><strong>Sist oppdatert:</strong> Juni 2026</p>

          <h2 className="text-xl font-bold mt-8">1. Generelt</h2>
          <p>Fjeldstad Software (org.nr. 938 059 748) driver tjenesten ShiftSimple («Tjenesten»). Ved å opprette en konto aksepterer du disse vilkårene.</p>

          <h2 className="text-xl font-bold mt-8">2. Abonnement og betaling</h2>
          <p>Tjenesten tilbys som et SaaS-abonnement (programvare som tjeneste). Du får en 14-dagers gratis prøveperiode ved registrering. Etter prøveperioden koster Tjenesten 149 NOK per måned (eks. mva). Betaling skjer via Stripe, og abonnementet fornyes automatisk hver måned med mindre det sies opp.</p>
          <p>Du kan når som helst si opp abonnementet ditt fra innstillingssiden. Oppsigelse trer i kraft ved slutten av den betalte perioden.</p>

          <h2 className="text-xl font-bold mt-8">3. Brukerkonto</h2>
          <p>Du er ansvarlig for å holde innloggingsdetaljene dine konfidensielle. Du er ansvarlig for all aktivitet som skjer under din konto.</p>

          <h2 className="text-xl font-bold mt-8">4. Databehandling</h2>
          <p>ShiftSimple lagrer data i Supabase, som er en skybasert database med sertifiseringer innen sikkerhet og personvern. Stripe håndterer all betalingsinformasjon — vi lagrer aldri kredittkortnumre. Se vår <Link href="/personvern" className="text-blue-600 underline">personvernerklæring</Link> for fullstendig informasjon.</p>

          <h2 className="text-xl font-bold mt-8">5. Personopplysninger</h2>
          <p>ShiftSimple behandler personopplysninger i henhold til GDPR. Som behandlingsansvarlig samler vi inn kun nødvendige data for å levere tjenesten: navn, e-postadresse, telefonnummer og vaktplaninformasjon.</p>

          <h2 className="text-xl font-bold mt-8">6. Ansvarsbegrensning</h2>
          <p>Tjenesten leveres «som den er». Fjeldstad Software er ikke ansvarlig for tap som følge av bruk eller manglende tilgang til Tjenesten, så langt norsk lov tillater.</p>

          <h2 className="text-xl font-bold mt-8">7. Oppsigelse og sletting</h2>
          <p>Når abonnementet avsluttes, kan du be om sletting av alle data knyttet til kontoen din. Data slettes innen 30 dager fra forespørsel.</p>

          <h2 className="text-xl font-bold mt-8">8. Kontakt</h2>
          <p>Spørsmål om disse vilkårene kan rettes til <a href="mailto:post@shiftsimple.no" className="text-blue-600 underline">post@shiftsimple.no</a>.</p>
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