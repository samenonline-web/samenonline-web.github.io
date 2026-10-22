import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://samenonline-web.github.io'),
  title: 'Samen Online 🇳🇱 • Professionele Websites & Webshops voor MKB en ZZP',
  description:
    "Ontdek 12 kant-en-klare, interactieve branche-concepten voor aannemers, boekhouders, salons, restaurants en webshops. Bereken direct je investering en test live met iDEAL.",
  keywords: [
    'Samen Online',
    'Website laten maken MKB',
    'ZZP website Nederland',
    'Aannemer website',
    'Boekhouder website',
    'Kapsalon website afspraak',
    'Restaurant website menu iDEAL',
    'Webshop laten maken',
    'Betaalbare website Nederland',
  ],
  authors: [{ name: 'Samen Online Team' }],
  creator: 'Samen Online',
  publisher: 'Samen Online',
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://samenonline-web.github.io',
    title: 'Samen Online 🇳🇱 • Websites die Klanten Opleveren voor MKB & ZZP',
    description:
      'Kies uit 12 interactieve templates, bereken direct je investering binnen 60 seconden en personaliseer live met jouw eigen bedrijfsnaam en kleuren.',
    siteName: 'Samen Online',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Samen Online 🇳🇱 • Websites voor Nederlandse Ondernemers',
    description:
      'Kies uit 12 interactieve branche-templates. Live demonstraties van aannemer calculators tot iDEAL checkout.',
  },
  alternates: {
    canonical: 'https://samenonline-web.github.io',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': 'https://samenonline-web.github.io/#business',
      name: 'Samen Online',
      url: 'https://samenonline-web.github.io',
      description:
        "Dé partner voor professionele websites, webshops en online vindbaarheid voor Nederlandse MKB'ers en zzp'ers.",
      telephone: '+31612345678',
      priceRange: '€€',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'NL',
        addressRegion: 'Nederland',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 52.3676,
        longitude: 4.9041,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      sameAs: ['https://wa.me/31612345678'],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://samenonline-web.github.io/#website',
      url: 'https://samenonline-web.github.io',
      name: 'Samen Online',
      publisher: {
        '@id': 'https://samenonline-web.github.io/#business',
      },
      inLanguage: 'nl-NL',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="h-full antialiased scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-stone-900 font-sans">
        {children}
      </body>
    </html>
  );
}
