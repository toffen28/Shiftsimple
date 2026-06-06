import Link from 'next/link'
import { Calendar, CheckCircle, Layout, Mail, Printer } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <Calendar className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-xl font-bold">ShiftSimple</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Funksjoner
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#pricing">
            Priser
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login">
            Logg inn
          </Link>
          <Link
            className="text-sm font-medium bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
            href="/signup"
          >
            Start gratis prøveperiode
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-blue-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-slate-900">
                  Din vaktplan er klar på 5 minutter — ikke 5 timer
                </h1>
                <p className="mx-auto max-w-[700px] text-slate-600 md:text-xl">
                  Slipp Excel-kaos og WhatsApp-forvirring. ShiftSimple gir deg oversikt over hele uken med ett blikk — og sender vaktene automatisk til de ansatte.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  href="/signup"
                  className="inline-flex h-11 items-center justify-center rounded-md bg-blue-600 px-8 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700 disabled:pointer-events-none disabled:opacity-50"
                >
                  Start din 14-dagers gratis prøveperiode
                </Link>
              </div>
              <p className="text-xs text-slate-500">Ingen kredittkort kreves for å starte.</p>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900">
                  Designet for enkelhet
                </h2>
                <p className="max-w-[900px] text-slate-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Vi har fjernet alt det kompliserte slik at du kan bruke mer tid på gjestene dine og mindre tid på Excel.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center border p-6 rounded-lg shadow-sm">
                <Layout className="h-12 w-12 text-blue-600" />
                <h3 className="text-xl font-bold">Dra-og-slipp planner</h3>
                <p className="text-slate-600">
                  Planlegg uken på sekunder med vårt intuitive dra-og-slipp grensesnitt.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center border p-6 rounded-lg shadow-sm">
                <Printer className="h-12 w-12 text-blue-600" />
                <h3 className="text-xl font-bold">Ett-klikk PDF</h3>
                <p className="text-slate-600">
                  Eksporter vaktlisten til en profesjonell PDF klar for printing eller deling.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center border p-6 rounded-lg shadow-sm">
                <Mail className="h-12 w-12 text-blue-600" />
                <h3 className="text-xl font-bold">Automatiske varsler</h3>
                <p className="text-slate-600">
                  Ansatte får automatisk e-post når vaktlisten er publisert.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900">
                  Én plan, én pris
                </h2>
                <p className="max-w-[600px] text-slate-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Vi holder det enkelt. Alt inkludert for alle.
                </p>
              </div>
              <div className="mx-auto flex flex-col p-6 bg-white rounded-xl shadow-lg border-2 border-blue-600 max-w-sm w-full">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Standard</h3>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-bold">149 NOK</span>
                    <span className="text-slate-500">/måned</span>
                  </div>
                  <p className="text-slate-500">Start med en 14-dagers gratis prøveperiode</p>
                </div>
                <ul className="grid gap-2 py-6">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Ubegrenset antall ansatte
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Dra-og-slipp planner
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> PDF Eksport
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> E-post varslinger
                  </li>
                </ul>
                <Link
                  href="/signup"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-8 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700"
                >
                  Start nå
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-slate-500">© 2026 ShiftSimple AS. Alle rettigheter reservert.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Vilkår
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Personvern
          </Link>
        </nav>
      </footer>
    </div>
  )
}
