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
  {
    slug: 'google-bedrijfsprofiel-en-maps-optimalisatie',
    title: 'Google Bedrijfsprofiel & Google Maps 2026: Lokale Vindbaarheid voor Vakmensen',
    excerpt: 'Hoe zorg je dat potentiële klanten in jouw stad direct jouw bedrijf in de Google Maps top-3 zien? Een beproefde gids voor lokale vindbaarheid en NAP-consistentie.',
    category: 'SEO',
    readTime: '5 min leestijd',
    publishedAt: '2026-03-20',
    author: 'Kenan van Samen Online',
    keyTakeaways: [
      'De Google Local 3-Pack trekt meer dan 60% van alle lokale mobiele kliks naar zich toe.',
      'NAP-consistentie (Naam, Adres, Telefoonnummer) tussen je website en Google Bedrijfsprofiel is cruciaal.',
      'Gestructureerde Schema.org LocalBusiness data helpt Google je werkgebied en coördinaten direct te verifiëren.',
    ],
    content: [
      'Wanneer een inwoner van jouw stad zoekt op "loodgieter spoed" of "kapper in de buurt", toont Google vrijwel altijd als eerste het Google Maps blok met drie geselecteerde bedrijven.',
      'Om hierin te verschijnen moet je Google Bedrijfsprofiel naadloos aansluiten op jouw website. Dit betekent identieke schrijfwijze van bedrijfsnaam, adres en telefoonnummer (NAP).',
      'Op jouw website voegen we JSON-LD gestructureerde data toe met jouw exacte lengte- en breedtegraad, postcodebereik en openingstijden, waardoor Google jouw bedrijf als officiële lokale autoriteit herkent.',
    ],
  },
  {
    slug: 'tco-vergelijking-wordpress-wix-vs-nextjs',
    title: 'TCO Vergelijking: Wat Kost WordPress of Wix Écht na 3 Jaar vs. Next.js?',
    excerpt: 'Wat lijkt op een goedkoop maandabonnement bij Wix of een WordPress template, kost ondernemers na 3 jaar vaak duizenden euro’s extra. Bekijk de harde cijfers.',
    category: 'Tarieven',
    readTime: '6 min leestijd',
    publishedAt: '2026-03-10',
    author: 'Kenan van Samen Online',
    keyTakeaways: [
      'Wix en Squarespace worden met webshop- en formulierenplugins al snel €35 tot €55 per maand (€1.800+ over 3 jaar) zonder dat je de broncode bezit.',
      'WordPress bureaus rekenen gemiddeld €1.500 setup + €65/mnd onderhoudscontract = €3.840 over 3 jaar.',
      'Next.js bij Samen Online is eenmalig €195 tot €495 met gratis hosting op wereldwijde CDN’s (Vercel/GitHub) = meer dan €3.200 besparing.',
    ],
    content: [
      'Veel ondernemers staren zich blind op de initiële instapkosten van een websitebouwer. "Gratis starten" of "slechts €15 per maand" klinkt aantrekkelijk, totdat je na een jaar de balans opmaakt.',
      'Zodra je bij platformen zoals Wix je eigen domeinnaam, zakelijke mailbox en online betalingen koppelt, schieten de maandbedragen omhoog. Stop je met betalen? Dan is je website direct weg en ben je al je Google rankings kwijt.',
      'Met een statische Next.js website bezit je 100% van jouw broncode. Je betaalt eenmalig voor het ontwerp en kunt de site kosteloos hosten op moderne, razendsnelle cloudplatformen.',
    ],
  },
  {
    slug: 'conversie-optimalisatie-voor-dienstverleners',
    title: 'Conversie Optimalisatie voor ZZP: Van Bezoeker naar Betalende Klant',
    excerpt: 'Veel bezoekers op je site maar weinig telefoontjes of aanvragen? Ontdek de 4 psychologische conversie-elementen die twijfel wegnemen.',
    category: 'Zakelijk',
    readTime: '4 min leestijd',
    publishedAt: '2026-03-01',
    author: 'Kenan van Samen Online',
    keyTakeaways: [
      'Bezoekers beslissen binnen 3 seconden of een website betrouwbaar en professioneel overkomt.',
      'Heldere all-in richtprijzen nemen de grootste drempel voor contact direct weg.',
      'Een directe mobiele actiebalk verhoogt offerte-aanvragen met gemiddeld 38%.',
    ],
    content: [
      'De grootste fout die veel ondernemers maken is hun website zien als een digitaal visitekaartje in plaats van een actieve klantengenerator.',
      'Wanneer een bezoeker geen prijzen kan vinden, moet wachten op trage pagina\'s of verstrikt raakt in een formulier van 12 velden, klikt men weg naar de concurrent.',
      'Door heldere all-in pakkettarieven te tonen, geverifieerde klantervaringen te delen en een eenvoudige 1-klik aanvraagknop te bieden, stijgt het percentage converterende bezoekers aanzienlijk.',
    ],
  },
  {
    slug: 'website-beveiliging-avg-gdpr-voor-ondernemers',
    title: 'Website Beveiliging & AVG/GDPR in 2026: Zonder Lekken of Boetes',
    excerpt: 'Wat moet er wettelijk geregeld zijn op jouw bedrijfswebsite? Over SSL-certificaten, privacyvriendelijke formulieren en het vermijden van privacyschendingen.',
    category: 'Techniek',
    readTime: '4 min leestijd',
    publishedAt: '2026-02-18',
    author: 'Kenan van Samen Online',
    keyTakeaways: [
      'Statische Next.js websites hebben geen SQL-database of PHP backend die gehackt kan worden.',
      'AVG/GDPR eist dat contactformulieren versleuteld worden verzonden via een beveiligde HTTPS/SSL verbinding.',
      'Geen onnodige trackingcookies van derden betekent geen irritante, conversie-dodende cookiebanners.',
    ],
    content: [
      'Privacy en beveiliging zijn tegenwoordig geen optionele extra\'s meer. Consumenten zijn waakzaam en de Autoriteit Persoonsgegevens handhaaft streng op de AVG.',
      'Traditionele CMS-systemen zoals WordPress zijn verantwoordelijk voor meer dan 90% van alle gehackte websites wereldwijd, voornamelijk door verouderde plugins.',
      'Een statische Next.js website heeft dit probleem fundamenteel opgelost: er is geen actieve server of kwetsbare database waar hackers malware in kunnen injecteren.',
    ],
  },
  {
    slug: 'kleurpsychologie-en-typografie-voor-websites',
    title: 'Kleurpsychologie & Typografie: Welke Stijl Verhoogt Jouw Offerte-Aanvragen?',
    excerpt: 'Waarom oranje vertrouwen wekt in Nederland, blauw autoriteit uitstraalt en strakke typografie jouw uurtarief rechtvaardigt.',
    category: 'Zakelijk',
    readTime: '5 min leestijd',
    publishedAt: '2026-01-25',
    author: 'Kenan van Samen Online',
    keyTakeaways: [
      'Kleurkeuze beïnvloedt tot 85% van de eerste aankoop- en vertrouwensbeslissingen van een bezoeker.',
      'Grote, goed leesbare typografie met voldoende regelafstand verlaagt het bouncepercentage op smartphones.',
      'Consistent kleurgebruik tussen call-to-action knoppen en huisstijl verhoogt de herkenbaarheid.',
    ],
    content: [
      'Het menselijk brein verwerkt beelden en kleuren 60.000 keer sneller dan tekst. De visuele uitstraling van jouw website communiceert direct jouw kwaliteitsniveau voordat iemand een woord heeft gelezen.',
      'In de zakelijke dienstverlening wekt diep koninklijk blauw stabiliteit en betrouwbaarheid op. In de ambachtelijke sector, bouw en horeca zorgt energiek oranje voor actie en toegankelijkheid.',
      'Bij Samen Online testen we ontwerpen op contrastratio’s conform de officiële WCAG 2.1 richtlijnen, zodat jouw website niet alleen mooi is, maar ook optimaal converteert.',
    ],
  },
];
