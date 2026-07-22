import type { Metadata } from "next";
import localFont from "next/font/local";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://shiftsimple.no'),
  title: "ShiftSimple - Enkel vaktplanlegging for restauranter",
  description: "Slutt å rote med vaktlister i WhatsApp. ShiftSimple er den enkleste måten å planlegge vakter på. Dra-og-slipp, PDF-eksport og automatiske varsler.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "ShiftSimple",
    statusBarStyle: "default",
  },
  verification: {
    google: "C5fzSJbIdPjsHUE01nFo_tdF7IdTT-JLyRLi7z01LZA",
  },
  icons: {
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "ShiftSimple — vaktplanlegging for norske restauranter",
    description: "Planlegg uken på 5 minutter med dra-og-slipp. Automatiske varsler og PDF-eksport. Prøv gratis i 14 dager.",
    type: "website",
    locale: "nb_NO",
    siteName: "ShiftSimple",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShiftSimple — vaktplanlegging for norske restauranter",
    description: "Planlegg uken på 5 minutter med dra-og-slipp. Automatiske varsler og PDF-eksport. Prøv gratis i 14 dager.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  );
}
