export interface ArticleItem {
  slug: string;
  title: string;
  excerpt: string;
  category: 'Techniek' | 'Tarieven' | 'SEO' | 'E-Commerce' | 'Zakelijk';
  readTime: string;
  publishedAt: string;
  author: string;
  content: string[];
  keyTakeaways: string[];
}

export const ARTICLES_DATA: ArticleItem[] = [
  {
    slug: 'waarom-nextjs-sneller-is-dan-wordpress',
    title: 'Waarom Next.js 10x Sneller is dan WordPress voor het MKB',
    excerpt: 'Meer dan 40% van de mobiele bezoekers haakt af als een website langer dan 2,5 seconde laadt. Ontdek waarom moderne static generation met Next.js WordPress en Wix verslaat op Google rankings.',
    category: 'Techniek',
    readTime: '4 min leestijd',
    publishedAt: '2026-03-15',
    author: 'Kenan van Samen Online',
    keyTakeaways: [
      'WordPress laadt per bezoeker PHP-scripts en trage SQL-databases in; Next.js levert kant-en-klare HTML vanaf een wereldwijd CDN.',
      'Google beloont websites met Core Web Vitals scores van 95-100 met hogere posities in de zoekresultaten.',
      'Geen kwetsbare plugins die gehackt kunnen worden of doorlopende beveiligingsupdates vereisen.',
    ],
    content: [
      'Wie in 2026 nog een standaard WordPress-website laat bouwen met 25 verschillende plugins voor een contactformulier, SEO en sliders, loopt het risico honderden potentiële klanten per maand te verliezen door trage laadtijden.',
      'Next.js (een modern React framework) werkt fundamenteel anders: de pagina\'s worden vooraf gegenereerd (Static Site Generation). Wanneer een bezoeker op jouw website klikt, hoeft er geen server na te denken of een database te raadplegen; de pagina staat binnen 0,2 tot 0,3 seconden op het scherm van de bezoeker.',
      'Voor Google is snelheid een directe rankingfactor. Een website met een 100/100 Lighthouse score converteert gemiddeld 2,5 keer meer bezoekers naar een offerte-aanvraag dan een traditionele trage site.',
    ],
  },
  {
    slug: 'wat-kost-een-website-laten-maken-in-2026',
    title: 'Wat Kost een Website Laten Maken in 2026? Eerlijke Tarieven Zonder Abonnement',
    excerpt: 'Wat betaal je tegenwoordig voor een professionele website in Nederland? Van dure webbureaus (€2.500+) tot Samen Online (€195 all-in): een overzichtelijk kostenoverzicht.',
    category: 'Tarieven',
    readTime: '5 min leestijd',
    publishedAt: '2026-02-28',
    author: 'Kenan van Samen Online',
    keyTakeaways: [
      'Traditionele bureaus rekenen vaak tussen de €2.500 en €7.500 plus maandelijks €50-€150 voor onderhoud.',
      'Samen Online hanteert vaste all-in prijzen vanaf €195 voor complete MKB websites zonder verplicht onderhoudscontract.',
      '100% eigendomsoverdracht: jij bent de eigenaar van de code en domeinnaam, zonder vendor lock-in.',
    ],
    content: [
      'Veel ondernemers schrikken van de offertes van traditionele webbureaus: bedragen van €3.500 tot €5.000 voor een standaard 5-pagina website zijn geen uitzondering.',
      'Daarnaast zit er vaak een verplicht onderhoudsabonnement aan vast van €60 per maand om WordPress veilig te houden.',
      'Bij Samen Online kiezen we voor een transparante aanpak: vaste pakketten (€195 voor Samen Start, €295 voor Samen Groei en €495 voor een complete Webshop met iDEAL). Geen verborgen kosten, geen nacalculatie en geen maandelijkse bureau-abonnementen.',
    ],
  },
  {
    slug: 'lokale-seo-checklist-voor-aannemers-en-vakmensen',
    title: 'Lokale SEO Checklist: Bovenaan in Google Maps voor Schilders & Aannemers',
    excerpt: 'Hoe zorg je dat potentiële klanten in jouw stad of regio direct jouw klusbedrijf vinden wanneer ze zoeken op Google? Een praktische 6-stappen checklist.',
    category: 'SEO',
    readTime: '6 min leestijd',
    publishedAt: '2026-01-20',
    author: 'Kenan van Samen Online',
    keyTakeaways: [
      'Optimaliseer je Google Bedrijfsprofiel met wekelijkse foto\'s van afgeronde projecten.',
      'Gebruik LocalBusiness Schema.org data in je websitecode met exacte GPS-coördinaten en postcodebereik.',
      'Zorg dat je mobiele website binnen 1 seconde laadt en een duidelijke WhatsApp/belknop heeft.',
    ],
    content: [
      'Meer dan 78% van de consumenten die een schilder, aannemer of loodgieter nodig hebben, zoekt lokaal op Google via hun smartphone ("loodgieter in de buurt" of "aannemer Utrecht").',
      'Door gebruik te maken van gestructureerde Schema.org gegevens begrijpt het Google-algoritme exact in welke regio jouw werkgebied ligt.',
      'Combineer dit met echte klantervaringen en duidelijke projectfoto\'s, en je trekt doorlopend nieuwe aanvragen aan zonder dure advertentiekosten op Google Ads.',
    ],
  },
  {
    slug: 'ideal-webshop-zonder-maandelijkse-kosten',
    title: 'Een Webshop Starten met iDEAL Zonder Hoge Maandelijkse Platformkosten',
    excerpt: 'Waarom platforms zoals Shopify of zware WooCommerce installaties vaak onnodig duur zijn voor kleine collecties, en hoe je direct kunt afrekenen via Mollie of Stripe.',
    category: 'E-Commerce',
    readTime: '4 min leestijd',
    publishedAt: '2026-03-01',
    author: 'Kenan van Samen Online',
    keyTakeaways: [
      'Shopify kost al snel €36 per maand plus transactiekosten, zelfs als je die maand weinig verkoopt.',
      'Een Next.js mini-webshop rekent af via directe iDEAL/Mollie koppelingen zonder platformfees.',
      'Klanten rekenen af binnen 3 seconden via een geïntegreerde slide-over winkelmand.',
    ],
    content: [
      'Voor ondernemers die een selectie van 5 tot 50 topproducten verkopen (zoals lokale boerderijwinkels, boetieks of merchandise), is een complex webshopsysteem vaak overkill.',
      'Je betaalt tientallen euro\'s per maand aan platformabonnementen, terwijl de functionaliteit ook direct in een razendsnelle Next.js website gebouwd kan worden.',
      'Met een eenmalige investering (€495) koppel je jouw zakelijke bankrekening aan Mollie of Stripe en ontvang je betalingen direct op je rekening tegen slechts de standaard iDEAL transactiekosten (~€0,29).',
    ],
  },
  {
    slug: 'website-laten-maken-onder-de-row-regeling',
    title: 'Website Laten Maken als Starter: De Fiscale Voordelen van de ROW-Regeling',
    excerpt: 'Wat betekent het wanneer een webdesigner opereert onder de Resultaat uit Overige Werkzaamheden (ROW) regeling? Duidelijkheid over facturen, aftrekbaarheid en scherpe all-in tarieven.',
    category: 'Zakelijk',
    readTime: '3 min leestijd',
    publishedAt: '2026-02-10',
    author: 'Kenan van Samen Online',
    keyTakeaways: [
      'Een factuur onder ROW is 100% rechtsgeldig als zakelijke kostenpost voor jouw winst- en verliesrekening.',
      'Geen 21% btw-opslag betekent dat starters en vrijgestelde ondernemers (zoals zorg of onderwijs) niet onnodig btw hoeven voor te schieten.',
      'Volledige specificatie met projectomschrijving en opleveringsbewijs inbegrepen.',
    ],
    content: [
      'In Nederland biedt de Belastingdienst starters en freelancers de mogelijkheid om werkzaamheden te verrichten onder de regeling "Resultaat uit Overige Werkzaamheden" (ROW).',
      'Voor opdrachtgevers is dit bijzonder gunstig: doordat er geen 21% btw over de werkzaamheden in rekening wordt gebracht, zijn de tarieven merkbaar lager.',
      'Als ondernemer kun je het factuurbedrag gewoon volledig opvoeren als zakelijke bedrijfskosten in jouw jaarrekening om je belastbare winst te verlagen.',
    ],
  },
];
