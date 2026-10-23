export interface CityReview {
  author: string;
  role: string;
  comment: string;
  stars: number;
}

export interface CityFaq {
  q: string;
  a: string;
}

export interface CityHubItem {
  id: string;
  name: string;
  province: string;
  postcodeRange: string;
  lat: number;
  lng: number;
  nicheFocus: string;
  caseStudy: string;
  popularSearch: string;
  districts: string[];
  review: CityReview;
  localFaqs: CityFaq[];
}

export const CITIES_DATA: CityHubItem[] = [
  {
    id: 'amsterdam',
    name: 'Amsterdam',
    province: 'Noord-Holland',
    postcodeRange: '1011 - 1109',
    lat: 52.3676,
    lng: 4.9041,
    nicheFocus: 'Boutiques, Creatieve Bureaus & Horeca',
    caseStudy: 'E-commerce fashion store & grachtenpand advocatenkantoor',
    popularSearch: 'Website laten maken Amsterdam',
    districts: ['Centrum', 'De Pijp', 'Zuid', 'Noord', 'West', 'Oost'],
    review: {
      author: 'Sophie van Dijk',
      role: 'Eigenares Boutique & Café Amsterdam',
      comment: 'Binnen 4 dagen stond ons digitale menu met tafelreserveringen live. Onze laadtijd ging van 4,2 seconden naar 0,3s!',
      stars: 5,
    },
    localFaqs: [
      {
        q: 'Hoe zit het met vindbaarheid in specifieke Amsterdamse wijken?',
        a: 'We configureren je Google Bedrijfsprofiel en JSON-LD gestructureerde data zodat je direct vindbaar bent in zowel Amsterdam Centrum, Zuid, West als De Pijp.',
      },
      {
        q: 'Kunnen we snel schakelen voor een horeca- of retailzaak?',
        a: 'Jazeker. Veel Amsterdamse ondernemers hebben spoed; binnen 48 uur leveren we al een werkende live demo op een testdomein.',
      },
    ],
  },
  {
    id: 'rotterdam',
    name: 'Rotterdam',
    province: 'Zuid-Holland',
    postcodeRange: '3011 - 3089',
    lat: 51.9244,
    lng: 4.4777,
    nicheFocus: 'Logistiek, Haven MKB & Moderne Retail',
    caseStudy: 'Haven logistiek platform & modern eetcafé Kop van Zuid',
    popularSearch: 'Webdesigner Rotterdam',
    districts: ['Kop van Zuid', 'Kralingen', 'Delfshaven', 'Centrum', 'Noord'],
    review: {
      author: 'Dennis de Jong',
      role: 'Directeur Logistiek & Transport Rotterdam',
      comment: 'Geen vage praatjes maar gewoon binnen 5 werkdagen een strakke site. Klanten vragen nu direct online offertes aan.',
      stars: 5,
    },
    localFaqs: [
      {
        q: 'Waarom kiezen Rotterdamse bedrijven voor Next.js i.p.v. WordPress?',
        a: 'Rotterdamse ondernemers houden van aanpakken en snelheid. Next.js laadt 10x sneller en heeft geen doorlopende update-problemen.',
      },
      {
        q: 'Is een iDEAL betaalkoppeling inbegrepen?',
        a: 'Ja! Voor webshops en dienstverleners integreren we directe iDEAL en creditcard betalingen via Mollie of Stripe.',
      },
    ],
  },
  {
    id: 'den-haag',
    name: 'Den Haag',
    province: 'Zuid-Holland',
    postcodeRange: '2511 - 2597',
    lat: 52.0705,
    lng: 4.3007,
    nicheFocus: 'Juridisch, Consultancy & Zorgpraktijken',
    caseStudy: 'Medische fysiopraktijk & internationaal advieskantoor',
    popularSearch: 'Website laten maken Den Haag',
    districts: ['Centrum', 'Scheveningen', 'Benoordenhout', 'Statenkwartier', 'Loosduinen'],
    review: {
      author: 'Mr. Willem de Bruin',
      role: 'Advocaat & Partner Den Haag',
      comment: 'Uitstekende professionele uitstraling. Klanten prijzen de heldere formulieren en de snelle respons op mobiel.',
      stars: 5,
    },
    localFaqs: [
      {
        q: 'Voldoet de website aan de strenge AVG/privacywetgeving?',
        a: 'Absoluut. We implementeren cookieloze analytische oplossingen en veilige formulieren zonder tracking-scripts van derden.',
      },
      {
        q: 'Kunnen cliënten direct online afspraken inplannen?',
        a: 'Ja, we bouwen een naadloze 3-staps afsprakenplanner zodat cliënten direct in jouw agenda een tijdslot kiezen.',
      },
    ],
  },
  {
    id: 'utrecht',
    name: 'Utrecht',
    province: 'Utrecht',
    postcodeRange: '3511 - 3585',
    lat: 52.0907,
    lng: 5.1214,
    nicheFocus: 'Bouw, Duurzaamheid & Lokale Ambacht',
    caseStudy: 'Duurzaam zonnepanelen installateur & ambachtelijke bakkerij',
    popularSearch: 'Webdesign Utrecht',
    districts: ['Centrum', 'Leidsche Rijn', 'Oost', 'Lombok', 'Wittevrouwen'],
    review: {
      author: 'Lars van Leeuwen',
      role: 'Installateur Duurzame Energie Utrecht',
      comment: 'Onze offertecalculator levert wekelijks 15+ gekwalificeerde leads op uit de provincie Utrecht. Beste investering van het jaar.',
      stars: 5,
    },
    localFaqs: [
      {
        q: 'Kunnen we persoonlijk afspreken in Utrecht?',
        a: 'Samen Online heeft haar roots in Utrecht! We kunnen videobellen of op locatie in de regio Utrecht een intake doen.',
      },
      {
        q: 'Hoe helpt de interactieve calculator met leads?',
        a: 'Bezoekers berekenen zelf direct een richtprijs en laten daarna direct hun e-mailadres achter voor de definitieve offerte.',
      },
    ],
  },
  {
    id: 'eindhoven',
    name: 'Eindhoven',
    province: 'Noord-Brabant',
    postcodeRange: '5611 - 5658',
    lat: 51.4416,
    lng: 5.4697,
    nicheFocus: 'High-Tech, SaaS & Innovatieve Startups',
    caseStudy: 'B2B software landingspagina & hardware prototyper',
    popularSearch: 'Website laten maken Eindhoven',
    districts: ['Strijp-S', 'Centrum', 'Woensel', 'Tongelre', 'Gestel'],
    review: {
      author: 'Bram Visser',
      role: 'Co-founder Brainport Tech Startup',
      comment: 'Clean code, modern design en 100% Core Web Vitals score. Precies de technologische standaard die Brainport vereist.',
      stars: 5,
    },
    localFaqs: [
      {
        q: 'Is de code geschikt voor latere software-uitbreidingen?',
        a: 'Jazeker. Omdat we met Next.js en TypeScript werken, kan jouw eigen ontwikkelteam de code direct doortrekken naar SaaS of een app.',
      },
      {
        q: 'Bieden jullie ook meertalige websites (NL/EN)?',
        a: 'Ja! Voor internationale tech-bedrijven in Eindhoven leveren we kant-en-klare tweetalige structuren.',
      },
    ],
  },
  {
    id: 'tilburg',
    name: 'Tilburg',
    province: 'Noord-Brabant',
    postcodeRange: '5011 - 5049',
    lat: 51.5719,
    lng: 5.0672,
    nicheFocus: 'Dienstverlening, Schoonmaak & Zorg',
    caseStudy: 'Regionaal schoonmaakbedrijf & tandartsenpraktijk',
    popularSearch: 'Webdesigner Tilburg',
    districts: ['Spoorzone', 'Centrum', 'Reeshof', 'Oud-Noord', 'Zuid'],
    review: {
      author: 'Monique Hermans',
      role: 'Praktijkhouder Zorgpraktijk Tilburg',
      comment: 'Patiënten vinden het geweldig dat ze nu vanaf hun smartphone binnen 1 minuut een afspraak kunnen inplannen.',
      stars: 5,
    },
    localFaqs: [
      {
        q: 'Wat zijn de kosten voor een zorg- of praktijkwebsite in Tilburg?',
        a: 'Ons Samen Start pakket (€195) of Samen Groei pakket (€295) dekt het complete traject inclusief afsprakenplanner en AVG-formulieren.',
      },
      {
        q: 'Zijn er verborgen maandelijkse kosten?',
        a: 'Nee, nooit. Je betaalt eenmalig voor de bouw en bent daarna 100% eigenaar.',
      },
    ],
  },
  {
    id: 'groningen',
    name: 'Groningen',
    province: 'Groningen',
    postcodeRange: '9711 - 9747',
    lat: 53.2194,
    lng: 6.5665,
    nicheFocus: 'Onderwijs, Studenten & Lokale Handel',
    caseStudy: 'Rijschool met online lesplanner & fietsenmaker',
    popularSearch: 'Website laten maken Groningen',
    districts: ['Binnenstad', 'Paddepoel', 'Helpman', 'Oosterpark', 'Vinkhuizen'],
    review: {
      author: 'Arjan Kuipers',
      role: 'Rijschoolhouder Groningen',
      comment: 'Binnen een week had ik 12 nieuwe leerlingen die zich online hadden aangemeld via de mobiele lesplanner.',
      stars: 5,
    },
    localFaqs: [
      {
        q: 'Hoe zit het met zichtbaarheid voor jonge doelgroepen op mobiel?',
        a: 'Groningen heeft een jonge bevolking. Onze sites zijn 100% mobile-first ontworpen met duimvriendelijke knoppen en 0.3s laadtijd.',
      },
      {
        q: 'Kan ik zelf makkelijk foto\'s en tarieven aanpassen?',
        a: 'Zeker. We leveren een overzichtelijke instructie mee en voeren voor All-in Hosting klanten kleine wijzigingen kosteloos uit.',
      },
    ],
  },
  {
    id: 'breda',
    name: 'Breda',
    province: 'Noord-Brabant',
    postcodeRange: '4811 - 4839',
    lat: 51.5719,
    lng: 4.7683,
    nicheFocus: 'Lifestyle, Horeca & Wellness',
    caseStudy: 'Luxe kapsalon & boetiek hotel Grote Markt',
    popularSearch: 'Webdesign Breda',
    districts: ['Centrum', 'Ginneken', 'Haagse Beemden', 'Princenhage', 'Breda-Oost'],
    review: {
      author: 'Kelly Peeters',
      role: 'Salon & Spa Eigenares Breda',
      comment: 'De site ademt pure luxe uit. De styling sluit perfect aan bij ons salonconcept in het Ginneken.',
      stars: 5,
    },
    localFaqs: [
      {
        q: 'Hoe snel kunnen we live in Breda?',
        a: 'Standaard leveren we binnen 5 werkdagen op. Bij spoed leveren we binnen 48 uur een werkende live versie.',
      },
      {
        q: 'Ondersteunt de website online aanbetalingen?',
        a: 'Ja, we kunnen koppelen met iDEAL zodat klanten bij het boeken direct een aanbetaling voldoen.',
      },
    ],
  },
  {
    id: 'nijmegen',
    name: 'Nijmegen',
    province: 'Gelderland',
    postcodeRange: '6511 - 6546',
    lat: 51.8126,
    lng: 5.8372,
    nicheFocus: 'Gezondheidszorg, Sport & Coaching',
    caseStudy: 'Personal training studio & psychologiepraktijk',
    popularSearch: 'Website laten maken Nijmegen',
    districts: ['Centrum', 'Bottendaal', 'Dukenburg', 'Lindenholt', 'Nijmegen-Noord'],
    review: {
      author: 'Jeroen Martens',
      role: 'Personal Coach & Fysiotherapeut Nijmegen',
      comment: 'Eindelijk een website die niet aanvoelt als een standaard sjabloon. Klanten bellen direct of vullen de intake in.',
      stars: 5,
    },
    localFaqs: [
      {
        q: 'Hoe zit het met Google Maps ranking in Nijmegen en omgeving?',
        a: 'We stemmen de LocalBusiness metadata exact af op Nijmegen en omliggende plaatsen zoals Wijchen, Beuningen en Lent.',
      },
      {
        q: 'Kan ik reviews van bestaande klanten tonen?',
        a: 'Ja, we integreren een automatische Google Reviews widget met 5 sterren.',
      },
    ],
  },
  {
    id: 'amersfoort',
    name: 'Amersfoort',
    province: 'Utrecht',
    postcodeRange: '3811 - 3829',
    lat: 52.1561,
    lng: 5.3878,
    nicheFocus: 'Aannemers, Bouw & Renovatie',
    caseStudy: 'Bouwbedrijf Vathorst met m² offerte calculator',
    popularSearch: 'Webdesigner Amersfoort',
    districts: ['Vathorst', 'Centrum', 'Nieuwland', 'Schothorst', 'Kattenbroek'],
    review: {
      author: 'Klaas van der Meer',
      role: 'Aannemer & Verbouwspecialist Amersfoort',
      comment: 'Dankzij de dakkapel- en uitbouwcalculator weten klanten vooraf waar ze aan toe zijn. Dat scheelt mij uren telefoontjes per week.',
      stars: 5,
    },
    localFaqs: [
      {
        q: 'Is een interactieve bouwcalculator geschikt voor mijn diensten?',
        a: 'Zeker. We kunnen berekeningen maken voor m² stucwerk, schilderwerk, dakkapellen of complete renovaties.',
      },
      {
        q: 'Hoe ontvang ik de aanvragen?',
        a: 'Direct in jouw eigen mailbox met een overzichtelijke PDF- of tekst-specificatie.',
      },
    ],
  },
  {
    id: 'almere',
    name: 'Almere',
    province: 'Flevoland',
    postcodeRange: '1311 - 1363',
    lat: 52.3508,
    lng: 5.2647,
    nicheFocus: 'Zakelijke Dienstverlening & E-Commerce',
    caseStudy: 'Webwinkel woonaccessoires & administratiekantoor',
    popularSearch: 'Website laten maken Almere',
    districts: ['Almere Stad', 'Almere Buiten', 'Almere Poort', 'Almere Haven'],
    review: {
      author: 'Fatima El Amrani',
      role: 'Oprichtster Webshop Woondecoratie Almere',
      comment: 'Super tevreden met de snelle iDEAL checkout. Bestellingen lopen soepel binnen zonder maandelijkse platformkosten.',
      stars: 5,
    },
    localFaqs: [
      {
        q: 'Waarom is Almere een ideale stad voor lokale SEO?',
        a: 'Almere is een snelgroeiende stad met veel jonge gezinnen en nieuwe bedrijven. Lokale vindbaarheid levert direct veel leads op.',
      },
      {
        q: 'Kan ik doorgroeien naar meer producten?',
        a: 'Ja, de code is schaalbaar gebouwd met Next.js, zodat je catalogus onbeperkt kan groeien.',
      },
    ],
  },
  {
    id: 'arnhem',
    name: 'Arnhem',
    province: 'Gelderland',
    postcodeRange: '6811 - 6846',
    lat: 51.9851,
    lng: 5.8987,
    nicheFocus: 'Mode, Kunst & Groene Technologie',
    caseStudy: 'Modestudio Modekwartier & energiecoöperatie',
    popularSearch: 'Webdesign Arnhem',
    districts: ['Modekwartier', 'Centrum', 'Spijkerkwartier', 'Presikhaaf', 'Schuytgraaf'],
    review: {
      author: 'Marlies van Dongen',
      role: 'Ontwerpster Modekwartier Arnhem',
      comment: 'Het visuele portfolio laadt razendsnel op hoge resolutie. Klanten boeken direct studio-afspraken in.',
      stars: 5,
    },
    localFaqs: [
      {
        q: 'Ondersteunt de website hoge kwaliteit foto\'s zonder vertraging?',
        a: 'Ja, we gebruiken moderne beeldcompressie (WebP/AVIF) zodat foto\'s vlijmscherp tonen zonder de laadtijd aan te tasten.',
      },
      {
        q: 'Hoe zit het met ondersteuning na livegang?',
        a: 'We laten je niet los na oplevering. Je krijgt volledige uitleg en toegang tot snelle ondersteuning.',
      },
    ],
  },
];
