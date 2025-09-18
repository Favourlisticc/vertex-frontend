import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import Header from "./components/Header";

const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata: Metadata = {
  title: {
    default: 'Vertex Diagnostic Center | Medical Screenings in Lekki',
    template: '%s | Vertex Diagnostic Center'
  },
  description: 'Professional medical screening services in Lekki Phase 1, Lagos. Pre-employment checks, comprehensive health audits, and diagnostic staff screening.',
  metadataBase: new URL('https://lekkilab.com'),
  alternates: {
    canonical: 'https://lekkilab.com'
  },
  keywords: ['medical screening', 'diagnostic center', 'health check', 'pre-employment screening', 'Lekki', 'Lagos'],
  openGraph: {
    title: 'Vertex Diagnostic Center | Medical Screenings in Lekki',
    description: 'Professional medical screening services in Lekki Phase 1, Lagos. Pre-employment checks, comprehensive health audits, and diagnostic staff screening.',
    url: 'https://lekkilab.com',
    siteName: 'Vertex Diagnostic Center',
    locale: 'en_NG',
    type: 'website',
    images: [
      {
        url: '/images/logo.png', // Updated path
        width: 800,
        height: 600,
        alt: 'Vertex Diagnostic Center Logo',
      }
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  authors: [{ name: 'Vertex Diagnostic Center' }],
  generator: 'Next.js',
  applicationName: 'Vertex Diagnostic Center',
  referrer: 'origin-when-cross-origin',
  creator: 'Vertex Diagnostic Center',
  publisher: 'Vertex Diagnostic Center',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0d9488" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Vertex Diagnostic" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />

        <meta property="og:image" content="/images/logo.png" /> {/* Updated path */}

        <meta name="twitter:image" content="/images/logo.png" /> {/* Updated path */}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}