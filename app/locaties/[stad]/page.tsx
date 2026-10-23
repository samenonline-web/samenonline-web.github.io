import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CITIES_DATA } from '../../../src/data/cities';
import { INITIAL_TEMPLATES } from '../../../src/data/templates';
import InteractiveDemoPlayground, { DemoTabKey } from '../../../src/components/InteractiveDemoPlayground';
import GoogleSnippetPreviewer from '../../../src/components/GoogleSnippetPreviewer';
import { 
  MapPin, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Search, 
  Clock, 
  Building2, 
  ArrowRight,
  TrendingUp,
  FileCheck,
  ChevronRight,
  Star
} from 'lucide-react';

export function generateStaticParams() {
  return CITIES_DATA.map((city) => ({
    stad: city.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ stad: string }>;
}): Promise<Metadata> {
  const { stad } = await params;
  const city = CITIES_DATA.find((c) => c.id === stad);

  if (!city) {
    return { title: 'Locatie | Samen Online' };
  }

  const title = `Website Laten Maken in ${city.name} | Binnen 5 Dagen Live | Samen Online`;
  const description = `Professionele website laten maken in ${city.name} (${city.province})? Geen WordPress vertraging maar razendsnelle Next.js technologie. Vanaf €195 all-in zonder abonnement.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://samenonline-web.github.io/locaties/${city.id}`,
    },
    openGraph: {
      title,
      description,
      url: `https://samenonline-web.github.io/locaties/${city.id}`,
      siteName: 'Samen Online Webdesign',
      locale: 'nl_NL',
      type: 'website',
    },
  };
}

export default async function LocationCityPage({
  params,
}: {
  params: Promise<{ stad: string }>;
}) {
  const { stad } = await params;
  const city = CITIES_DATA.find((c) => c.id === stad);

  if (!city) {
    notFound();
  }

  // Schema.org LocalBusiness with exact coordinates and city serving
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `Samen Online Webdesign ${city.name}`,
    description: `Professioneel webdesign en Next.js website ontwikkeling voor MKB en zzp in ${city.name} (${city.province}).`,
    url: `https://samenonline-web.github.io/locaties/${city.id}`,
    areaServed: {
      '@type': 'City',
      name: city.name,
      addressRegion: city.province,
      postalCode: city.postcodeRange,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: city.lat,
      longitude: city.lng,
    },
    priceRange: '€195 - €495',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (city.localFaqs || []).map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://samenonline-web.github.io',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Locaties',
        item: 'https://samenonline-web.github.io/#locaties',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Webdesign ${city.name}`,
        item: `https://samenonline-web.github.io/locaties/${city.id}`,
      },
    ],
  };

  const combinedJsonLd = [jsonLd, faqJsonLd, breadcrumbJsonLd];

  const otherCities = CITIES_DATA.filter((c) => c.id !== city.id);

  const preferredTemplateId =
    city.id === 'amsterdam' ? 'grachten-web-agency'
    : city.id === 'rotterdam' ? 'duurzaam-kleding-webshop'
    : city.id === 'amersfoort' ? 'bouwmeester-aannemer'
    : city.id === 'den-haag' ? 'studiopuur-salon'
    : 'bistro-degracht';

  const candidateTemplates = [
    INITIAL_TEMPLATES.find((t) => t.id === preferredTemplateId),
    INITIAL_TEMPLATES.find((t) => t.id === 'bouwmeester-aannemer'),
    INITIAL_TEMPLATES.find((t) => t.id === 'duurzaam-kleding-webshop'),
    INITIAL_TEMPLATES.find((t) => t.id === 'bistro-degracht'),
  ];
  // Deduplicate and pick top 3
  const featuredTemplates = candidateTemplates
    .filter((t, idx, arr): t is (typeof INITIAL_TEMPLATES)[number] => Boolean(t) && arr.findIndex((x) => x?.id === t?.id) === idx)
    .slice(0, 3);

  const getCityInitialTab = (cityId: string): DemoTabKey => {
    switch (cityId) {
      case 'amsterdam':
      case 'breda':
      case 'arnhem':
        return 'horeca';
      case 'rotterdam':
      case 'eindhoven':
      case 'groningen':
      case 'almere':
        return 'webshop';
      case 'den-haag':
      case 'tilburg':
      case 'nijmegen':
        return 'kapper';
      default:
        return 'bouw';
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-slate-950 text-stone-900 dark:text-stone-100 selection:bg-orange-500 selection:text-white">
      {/* Schema.org Script (LocalBusiness + FAQPage + BreadcrumbList) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedJsonLd) }}
      />

      {/* Header / Breadcrumb Bar */}
      <header className="border-b border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <nav className="flex items-center gap-2 text-xs font-semibold text-stone-600 dark:text-slate-400">
            <Link
              href="/"
              className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Samen Online</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <Link href="/#lokale-vindbaarheid" className="hover:text-stone-900 dark:hover:text-white transition-colors">
              Regio&apos;s
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-orange-600 dark:text-orange-400 font-black">{city.name}</span>
          </nav>

          <Link
            href="/vragenlijst"
            className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-black transition-all shadow-xs"
          >
            Start Keuzehulp
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16">
        {/* HERO SECTION */}
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/70 text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-orange-800/60 text-xs font-black uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span>Actief in {city.name} · Postcodes {city.postcodeRange}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 dark:text-white tracking-tight leading-tight">
            Professionele Website Laten Maken in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
              {city.name}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-stone-600 dark:text-slate-300 leading-relaxed font-medium">
            Ben je ondernemer of zzp&apos;er in {city.name} of omgeving {city.province}? Laat een moderne, razendsnelle Next.js website bouwen die binnen 5 dagen live staat en direct leads oplevert via Google.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-bold text-stone-700 dark:text-slate-300">
            <span className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              0.3s Laadtijd (Geen trage plugins)
            </span>
            <span className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              100% Google SEO in {city.name}
            </span>
            <span className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Vanaf €195 All-in
            </span>
          </div>

          {/* District & Neighborhood Badges */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2 text-[11px] text-stone-500 dark:text-slate-400">
            <span className="font-bold text-stone-700 dark:text-slate-300">Actief in alle wijken van {city.name}:</span>
            {city.districts.map((d) => (
              <span key={d} className="px-2 py-0.5 rounded-md bg-stone-200/70 dark:bg-slate-800 text-stone-700 dark:text-slate-300 font-semibold">
                {d}
              </span>
            ))}
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/vragenlijst"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-black text-sm transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Vragenlijst voor {city.name}</span>
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-stone-800 dark:text-white font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all flex items-center justify-center gap-2"
            >
              <span>Bekijk 40+ Concepten</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* LOCAL HIGHLIGHT CARD */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/90 dark:border-slate-800 shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-orange-600 dark:text-orange-400">
              <Building2 className="w-4 h-4" />
              <span>Lokale Focus in {city.name}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white">
              Gespecialiseerd in {city.nicheFocus}
            </h2>
            <p className="text-sm text-stone-600 dark:text-slate-300 leading-relaxed font-medium">
              Consumenten in {city.name} zoeken dagelijks op termen zoals{' '}
              <strong className="text-stone-900 dark:text-white">&ldquo;{city.popularSearch}&rdquo;</strong>. 
              Met een schone Next.js codebasis en gestructureerde JSON-LD data zorgen we dat jouw bedrijf direct bovenaan verschijnt in Google Zoeken en Google Maps.
            </p>

            <div className="p-4 rounded-2xl bg-orange-50/60 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800/50 space-y-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-orange-800 dark:text-orange-300 block">
                Voorbeeldproject in {city.name}:
              </span>
              <p className="text-xs font-semibold text-stone-800 dark:text-slate-200">
                {city.caseStudy}
              </p>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-4">
            <h3 className="font-black text-base text-stone-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              Waarom Ondernemers in {city.name} Kiezen voor Samen Online
            </h3>
            <ul className="space-y-3 text-xs text-stone-700 dark:text-slate-300 font-medium">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>5 Werkdagen Oplevering:</strong> Binnen 48 uur een werkende live testlink op een tijdelijk domein.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Vaste Prijs (€195):</strong> Geen verborgen kosten, geen onverwachte urenfacturen.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>100% Jouw Eigendom:</strong> Volledige broncode en hostingvrijheid zonder vendor lock-in.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Lokale SEO & Schema.org:</strong> Inclusief coördinaten ({city.lat}, {city.lng}) en postcodebereik {city.postcodeRange}.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* INTERACTIVE DEMO ENGINE PREVIEW */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/90 dark:border-slate-800 shadow-lg space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950/80 px-3 py-1 rounded-full">
              Interactieve Demo Voorbeeld voor {city.name}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white">
              Test Hoe Jouw Website Werkt Voor Bezoekers
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300">
              Klanten in {city.name} willen direct online een offerte berekenen, een tafel reserveren of een afspraak plannen. Test hieronder direct de werkende applicatie.
            </p>
          </div>

          <InteractiveDemoPlayground initialTab={getCityInitialTab(city.id)} />
        </section>

        {/* GOOGLE SNIPPET PREVIEWER TOOL */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/90 dark:border-slate-800 shadow-lg">
          <GoogleSnippetPreviewer
            initialCity={city.name}
            initialService={city.nicheFocus.split(',')[0]}
            initialBusinessName={`${city.nicheFocus.split(',')[0]} ${city.name}`}
          />
        </section>

        {/* 3 POPULAR PACKAGES */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white">
              Vaste Pakkettarieven voor Ondernemers in {city.name}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-400">
              Eerlijke all-in prijzen zonder maandelijks verplicht onderhoudscontract.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-stone-500 block">Starter</span>
                <h3 className="font-black text-lg text-stone-900 dark:text-white">Samen Start</h3>
                <div className="text-3xl font-black font-mono text-stone-900 dark:text-white mt-2">€195,-</div>
                <p className="text-xs text-stone-500 mt-2">Perfect voor zzp&apos;ers en lokale vakmensen in {city.name}.</p>
                <ul className="mt-4 space-y-2 text-xs text-stone-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">✓ Tot 5 secties / 1 pagina</li>
                  <li className="flex items-center gap-2">✓ Mobielvriendelijk & 0.3s laadtijd</li>
                  <li className="flex items-center gap-2">✓ Contactformulier & Google Maps</li>
                </ul>
              </div>
              <Link
                href="/#website-vragenlijst"
                className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-stone-900 dark:text-white font-bold text-xs text-center transition-colors"
              >
                Vraag Aan
              </Link>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-orange-500 shadow-xl flex flex-col justify-between space-y-4 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                Meest Gekozen in {city.name}
              </span>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 block">Maatwerk MKB</span>
                <h3 className="font-black text-lg text-stone-900 dark:text-white">Samen Groei</h3>
                <div className="text-3xl font-black font-mono text-orange-600 dark:text-orange-400 mt-2">€295,-</div>
                <p className="text-xs text-stone-500 mt-2">Ideaal voor bedrijven met meerdere diensten of portfolio.</p>
                <ul className="mt-4 space-y-2 text-xs text-stone-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">✓ Meerdere pagina&apos;s & portfolio</li>
                  <li className="flex items-center gap-2">✓ Interactieve offerte- of prijskiezer</li>
                  <li className="flex items-center gap-2">✓ 100% Lokale SEO optimalisatie</li>
                </ul>
              </div>
              <Link
                href="/#website-vragenlijst"
                className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs text-center transition-colors shadow-md"
              >
                Vraag Aan
              </Link>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-stone-500 block">E-Commerce</span>
                <h3 className="font-black text-lg text-stone-900 dark:text-white">Samen Webshop</h3>
                <div className="text-3xl font-black font-mono text-stone-900 dark:text-white mt-2">€495,-</div>
                <p className="text-xs text-stone-500 mt-2">Online verkoop met iDEAL en winkelmandje.</p>
                <ul className="mt-4 space-y-2 text-xs text-stone-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">✓ Productcatalogus & filter</li>
                  <li className="flex items-center gap-2">✓ Directe iDEAL koppeling</li>
                  <li className="flex items-center gap-2">✓ Geen maandelijkse webshop fees</li>
                </ul>
              </div>
              <Link
                href="/#website-vragenlijst"
                className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-stone-900 dark:text-white font-bold text-xs text-center transition-colors"
              >
                Vraag Aan
              </Link>
            </div>
          </div>
        </section>

        {/* LOCAL VERIFIED TESTIMONIAL */}
        <section className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-orange-950/30 rounded-3xl p-6 sm:p-10 border border-orange-200/80 dark:border-orange-900/50 space-y-4 shadow-sm">
          <div className="flex items-center gap-1 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-xs font-black text-stone-900 dark:text-white ml-2">
              5.0 / 5.0 · Lokale Ervaring in {city.name}
            </span>
          </div>

          <blockquote className="text-base sm:text-lg font-bold text-stone-900 dark:text-white italic leading-relaxed">
            &ldquo;{city.review.comment}&rdquo;
          </blockquote>

          <div className="flex items-center justify-between pt-3 border-t border-orange-200/60 dark:border-slate-800 text-xs">
            <div>
              <strong className="text-stone-900 dark:text-white block font-black">{city.review.author}</strong>
              <span className="text-stone-500 dark:text-slate-400">{city.review.role}</span>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/70 px-2.5 py-1 rounded-full">
              ✓ Geverifieerde Klant in {city.name}
            </span>
          </div>
        </section>

        {/* LOCAL FAQ */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 dark:text-orange-400 block">
              Veelgestelde Vragen
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white">
              Vragen van Ondernemers in {city.name}
            </h2>
          </div>

          <div className="space-y-4">
            {city.localFaqs.map((faq, idx) => (
              <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-stone-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
                <h3 className="font-bold text-sm text-stone-900 dark:text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-orange-600 text-white text-[11px] flex items-center justify-center shrink-0 font-black">?</span>
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 leading-relaxed pl-7">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED LIVE DEMOS FOR CITY */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/90 dark:border-slate-800 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 dark:text-orange-400 block">
                Interactieve Concepten
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white">
                Populaire Live Website Demo&apos;s voor {city.name}
              </h2>
            </div>
            <Link
              href="/"
              className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
            >
              <span>Alle 40+ concepten bekijken</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredTemplates.map((tmpl) => (
              <div
                key={tmpl.id}
                className="group p-5 rounded-2xl bg-stone-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 hover:border-orange-500/80 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300">
                      {tmpl.category}
                    </span>
                    <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                      ★ {tmpl.rating}
                    </span>
                  </div>
                  <h3 className="font-black text-sm text-stone-900 dark:text-white group-hover:text-orange-600 transition-colors">
                    {tmpl.name}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-slate-300 line-clamp-2">
                    {tmpl.subtitleNl}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-stone-900 dark:text-white">
                    {tmpl.estimatedBuildDays} dgn oplevering
                  </span>
                  <Link
                    href={`/demo/${tmpl.id}?city=${encodeURIComponent(city.name)}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-all shadow-xs"
                  >
                    <span>Live Testen</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* INTERNAL LINKS: OTHER 11 CITIES */}
        <section className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-stone-500">
            <MapPin className="w-4 h-4 text-orange-600" />
            <span>Bekijk Ook Andere Regio&apos;s in Nederland</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
            {otherCities.map((other) => (
              <Link
                key={other.id}
                href={`/locaties/${other.id}`}
                className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 text-xs font-bold transition-all flex items-center justify-between group"
              >
                <span>{other.name}</span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800 py-8 bg-white dark:bg-slate-900 text-center text-xs text-stone-500">
        <p>© 2026 Samen Online · Specialist in Moderne Next.js Websites voor MKB in {city.name} en heel Nederland.</p>
      </footer>
    </div>
  );
}
