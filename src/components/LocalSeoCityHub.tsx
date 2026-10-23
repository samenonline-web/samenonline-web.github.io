'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Building, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Globe, 
  Code2, 
  Copy, 
  Check, 
  ExternalLink 
} from 'lucide-react';

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
  },
];

interface LocalSeoCityHubProps {
  onOpenCityRequest?: (city: CityHubItem) => void;
}

export default function LocalSeoCityHub({ onOpenCityRequest }: LocalSeoCityHubProps) {
  const [selectedCityId, setSelectedCityId] = useState<string>('utrecht');
  const [copiedSchema, setCopiedSchema] = useState(false);

  const activeCity = CITIES_DATA.find((c) => c.id === selectedCityId) || CITIES_DATA[3];

  // Generate valid Schema.org LocalBusiness JSON-LD for the selected city
  const schemaJson = JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: `Samen Online Webdesign ${activeCity.name}`,
      description: `Professionele, razendsnelle Next.js websites voor ondernemers in ${activeCity.name} (${activeCity.province}). Binnen 5 werkdagen online met 100% eigendom.`,
      url: `https://samenonline-web.github.io/?stad=${activeCity.id}`,
      telephone: '+31636481054',
      areaServed: {
        '@type': 'City',
        name: activeCity.name,
        containedInPlace: {
          '@type': 'AdministrativeArea',
          name: activeCity.province,
        },
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: activeCity.lat,
        longitude: activeCity.lng,
      },
      postalCode: activeCity.postcodeRange,
      priceRange: '€75 - €385',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '21:00',
        },
      ],
    },
    null,
    2
  );

  const handleCopySchema = () => {
    navigator.clipboard.writeText(schemaJson).then(() => {
      setCopiedSchema(true);
      setTimeout(() => setCopiedSchema(false), 2500);
    });
  };

  return (
    <section id="lokale-seo-hub" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 dark:bg-orange-950/70 border border-orange-200 dark:border-orange-800/70 text-orange-700 dark:text-orange-400 text-xs font-bold uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5" />
          <span>Lokale Vindbaarheid in Heel Nederland</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Website Laten Maken in Jouw{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
            Regio of Stad
          </span>
        </h2>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Google beloont lokale relevantie. Onze websites worden technisch uitgerust met LocalBusiness 
          gestructureerde data en geo-coördinaten, zodat potentiële klanten uit jouw gemeente jou als eerste vinden.
        </p>
      </div>

      {/* 12-City Pills Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-5xl mx-auto mb-10">
        {CITIES_DATA.map((city) => {
          const isSelected = city.id === selectedCityId;
          return (
            <button
              key={city.id}
              onClick={() => setSelectedCityId(city.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20 scale-105'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-orange-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <MapPin className={`w-3 h-3 ${isSelected ? 'text-white' : 'text-orange-500'}`} />
              <span>{city.name}</span>
            </button>
          );
        })}
      </div>

      {/* Selected City Detail Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: City Focus, Case Study & Direct Request (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                {activeCity.province} • Postcodes {activeCity.postcodeRange}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Website Laten Maken in {activeCity.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium mt-1">
              Zoekterm in Google: <strong className="text-orange-600 dark:text-orange-400">“{activeCity.popularSearch}”</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 block">Branchefocus in {activeCity.name}:</span>
              <span className="text-xs font-black text-slate-900 dark:text-white block">
                {activeCity.nicheFocus}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 block">Recent projectvoorbeeld:</span>
              <span className="text-xs font-black text-slate-900 dark:text-white block">
                {activeCity.caseStudy}
              </span>
            </div>
          </div>

          <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span><strong>Google Bedrijfsprofiel & Maps</strong> koppeling met coördinaten ({activeCity.lat}, {activeCity.lng})</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Binnen 5 werkdagen operationeel voor ondernemers in {activeCity.name} en omstreken</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>100% eigendomsoverdracht en geen doorlopend verplicht bureau-onderhoudscontract</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                if (onOpenCityRequest) onOpenCityRequest(activeCity);
              }}
              className="flex-1 py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-orange-600/30 transition-all active:scale-95 cursor-pointer"
            >
              <span>Vraag Website Aan in {activeCity.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Side: Schema.org LocalBusiness Code Inspector (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-blue-500" />
              <span>Schema.org JSON-LD ({activeCity.name})</span>
            </span>

            <button
              onClick={handleCopySchema}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
            >
              {copiedSchema ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500">Gekopieerd</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Kopieer</span>
                </>
              )}
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 text-slate-300 font-mono text-[11px] leading-relaxed overflow-x-auto max-h-72 border border-slate-800 shadow-inner">
            <pre className="whitespace-pre">{schemaJson}</pre>
          </div>

          <p className="text-[10px] text-slate-500 dark:text-slate-400">
            Dit gestructureerde data-bestand wordt automatisch gegenereerd voor jouw vestigingsstad en in de HTML head geplaatst.
          </p>
        </div>
      </div>
    </section>
  );
}
