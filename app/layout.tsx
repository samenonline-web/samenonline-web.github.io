import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://samenonline-web.github.io'),
  title: 'Samen Online • Professionele Websites & Webshops voor MKB en ZZP',
  description:
    "Ontdek 20 kant-en-klare, interactieve branche-concepten voor aannemers, boekhouders, advocaten, makelaars, zorg, salons en webshops. Bereken direct je investering en test live met iDEAL.",
  keywords: [
    'Samen Online',
    'Samen Online website',
    'Website laten maken MKB',
    'ZZP website Nederland',
    'Aannemer website',
    'Advocatenkantoor website',
    'Makelaardij website',
    'Dierenkliniek website',
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
    title: 'Samen Online • Websites die Klanten Opleveren voor MKB & ZZP',
    description:
      'Kies uit 20 interactieve templates, bereken direct je investering binnen 60 seconden en personaliseer live met jouw eigen bedrijfsnaam en kleuren.',
    siteName: 'Samen Online',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Samen Online • Websites voor Nederlandse Ondernemers',
    description:
      'Kies uit 20 interactieve branche-templates. Live demonstraties van tariefcalculators tot iDEAL checkout.',
  },
  alternates: {
    canonical: 'https://samenonline-web.github.io',
  },
  verification: {
    google: 'google049744f3c8e1307b',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': 'https://samenonline-web.github.io/#localbusiness',
      name: 'Samen Online',
      url: 'https://samenonline-web.github.io',
      description:
        "Gevestigd in Utrecht, actief in heel Nederland. Dé partner voor professionele Next.js websites, webshops en online vindbaarheid voor MKB'ers en zzp'ers.",
      priceRange: '€€',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'NL',
        addressRegion: 'Utrecht',
        addressLocality: 'Utrecht',
      },
      areaServed: [
        {
          '@type': 'AdministrativeArea',
          name: 'Nederland',
        },
        {
          '@type': 'AdministrativeArea',
          name: 'Noord-Holland',
        },
        {
          '@type': 'AdministrativeArea',
          name: 'Zuid-Holland',
        },
        {
          '@type': 'AdministrativeArea',
          name: 'Utrecht',
        },
        {
          '@type': 'AdministrativeArea',
          name: 'Noord-Brabant',
        },
        {
          '@type': 'AdministrativeArea',
          name: 'Gelderland',
        },
      ],
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 52.0907,
        longitude: 5.1214,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: ['Dutch', 'English'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://samenonline-web.github.io/#website',
      url: 'https://samenonline-web.github.io',
      name: 'Samen Online',
      publisher: {
        '@id': 'https://samenonline-web.github.io/#localbusiness',
      },
      inLanguage: 'nl-NL',
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://samenonline-web.github.io/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Wat kost het laten maken van een professionele website bij Samen Online?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Onze startersetups beginnen al vanaf €50 voor een snelle oplevering van een werkend concept. Voor een compleet gepersonaliseerde bedrijfswebsite hanteren we vaste, transparante all-in tarieven tussen €350 en €1.250 afhankelijk van modules zoals iDEAL, offertetools of reserveringssystemen. Nooit verborgen kosten of wurgcontracten.',
          },
        },
        {
          '@type': 'Question',
          name: 'Hoe snel staat mijn nieuwe website live op internet?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Dankzij onze geteste Nederlandse branche-templates kunnen we razendsnel schakelen. Een standaard oplevering duurt doorgaans slechts 2 tot 5 werkdagen nadat je jouw teksten, voorkeuren of eventuele eigen foto’s hebt doorgegeven. Spoedopleveringen zijn mogelijk binnen 48 uur.',
          },
        },
        {
          '@type': 'Question',
          name: 'Wordt mijn website optimaal vindbaar in Google (SEO)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ja! Elk template is vanaf de grond opgebouwd volgens de strengste Google Core Web Vitals standaarden met semantische HTML5, snelle laadtijden (<0.8 sec), OpenGraph share cards en Schema.org structured data.',
          },
        },
        {
          '@type': 'Question',
          name: 'Kan ik later functies toevoegen, zoals iDEAL-betalingen of een afspraakplanner?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Absoluut. Al onze websites zijn 100% modulair ontworpen. Je kunt eenvoudig starten met een strakke landingspagina en later op elk moment een iDEAL-webshop, allergenenfilter, online offertecalculator of afspraakplanner toevoegen.',
          },
        },
        {
          '@type': 'Question',
          name: 'Zit een domeinnaam, webhosting en zakelijke e-mail hierbij inbegrepen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ja! Met ons All-in Webhostingpakket voor €9,50 per maand ontzorgen wij alles: jouw eigen .nl domeinnaam, razendsnelle Nederlandse NVMe SSD webhosting, gratis SSL-certificaat én een zakelijk e-mailadres (zoals info@jouwbedrijf.nl). Zelf hosting beheren bij een eigen provider kan uiteraard ook.',
          },
        },
        {
          '@type': 'Question',
          name: 'Kan ik als bedrijf een factuur ontvangen en hoe zit het met KvK en btw?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Jazeker! Je ontvangt voor elk project een keurige specificatie/factuur voor je eigen boekhouding. Doordat wij momenteel als freelance initiatief opereren onder de ROW-regeling zonder 21% btw-plicht, profiteer je als ondernemer van extra scherpe all-in tarieven zonder btw-opslag.',
          },
        },
      ],
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
