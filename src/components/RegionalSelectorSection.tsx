'use client';

import React, { useState } from 'react';
import { MapPin, CheckCircle2, Globe, Sparkles, ArrowRight, ShieldCheck, PhoneCall, Zap } from 'lucide-react';
import { Language } from '../types/company';

interface RegionalSelectorSectionProps {
  lang: Language;
  onSelectRegion?: (regionName: string) => void;
  onOpenRequestModal?: (notes: string) => void;
}

interface RegionInfo {
  id: string;
  name: string;
  province: string;
  postalCodeArea: string;
  focusIndustries: string;
  popularSearch: string;
  localBenefit: string;
}

const REGIONS: RegionInfo[] = [
  {
    id: 'rotterdam',
    name: 'Rotterdam & Rijnmond',
    province: 'Zuid-Holland',
    postalCodeArea: '3000 - 3089',
    focusIndustries: 'Bouw, Havengerelateerd, Horeca, Schoonmaak & ZZP',
    popularSearch: 'Webdesign Rotterdam & Zoekmachine Optimalisatie',
    localBenefit: 'Lokale Google Maps koppeling voor ondernemers in Rotterdam en de havenregio.',
  },
  {
    id: 'amsterdam',
    name: 'Amsterdam & Randstad',
    province: 'Noord-Holland',
    postalCodeArea: '1000 - 1098',
    focusIndustries: 'Creatieve bureaus, Boetieks, Zakelijke Dienstverlening & Advocaten',
    popularSearch: 'Website laten maken Amsterdam',
    localBenefit: 'Flitsende Next.js laadtijden die concurreren in de meest competitieve markt van Nederland.',
  },
  {
    id: 'utrecht',
    name: 'Utrecht & Midden-Nederland',
    province: 'Utrecht',
    postalCodeArea: '3500 - 3585',
    focusIndustries: 'Coaches, Zorgpraktijken, Fysiotherapie & Consultants',
    popularSearch: 'Betaalbaar Webdesign Utrecht',
    localBenefit: 'Centraal vindbaar in Google met geoptimaliseerde contact- en afspraakformulieren.',
  },
  {
    id: 'eindhoven',
    name: 'Eindhoven & Brainport',
    province: 'Noord-Brabant',
    postalCodeArea: '5600 - 5658',
    focusIndustries: 'Techbedrijven, Webshops, Installatietechniek & ZZP',
    popularSearch: 'Moderne Bedrijfswebsite Eindhoven',
    localBenefit: 'State-of-the-art Next.js technologie die past bij het innovatieve hart van Brabant.',
  },
  {
    id: 'denhaag',
    name: 'Den Haag & Scheveningen',
    province: 'Zuid-Holland',
    postalCodeArea: '2500 - 2597',
    focusIndustries: 'Juridisch advies, Vastgoed, Kusthoreca & Ambassadediensten',
    popularSearch: 'Website Specialist Den Haag',
    localBenefit: 'Professionele, meertalige uitstraling met betrouwbare beveiliging en snelle oplevering.',
  },
  {
    id: 'breda',
    name: 'Breda & West-Brabant',
    province: 'Noord-Brabant',
    postalCodeArea: '4800 - 4839',
    focusIndustries: 'Aannemers, Fitness & Yoga, Schoonheidsspecialisten, Transport',
    popularSearch: 'Webdesign Breda MKB',
    localBenefit: 'Laagdrempelig en persoonlijk contact, binnen 5 dagen online in West-Brabant.',
  },
  {
    id: 'arnhem-nijmegen',
    name: 'Arnhem & Nijmegen',
    province: 'Gelderland',
    postalCodeArea: '6500 - 6846',
    focusIndustries: 'Duurzame ondernemingen, Dierenklinieken, Hoveniers & Dienstverleners',
    popularSearch: 'Website Laten Maken Arnhem Nijmegen',
    localBenefit: 'Lokale SEO-instellingen gericht op potentiële klanten in de stadsregio.',
  },
  {
    id: 'groningen',
    name: 'Groningen & Friesland',
    province: 'Groningen / Friesland',
    postalCodeArea: '9700 - 9747',
    focusIndustries: 'Lokale retail, ZZP, Rijscholen & Ambachtslieden',
    popularSearch: 'Webdesigner Groningen',
    localBenefit: 'Transparante vaste tarieven zonder abonnementswurgcontract voor het noorden.',
  },
];

export const RegionalSelectorSection: React.FC<RegionalSelectorSectionProps> = ({
  lang,
  onSelectRegion,
  onOpenRequestModal,
}) => {
  const [selectedRegionId, setSelectedRegionId] = useState<string>('rotterdam');

  const currentRegion = REGIONS.find((r) => r.id === selectedRegionId) || REGIONS[0];

  // Dynamic Schema.org JSON-LD LocalBusiness object for SEO
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `Samen Online Webdesign - Regio ${currentRegion.name}`,
    image: 'https://samenonline.org/icon.png',
    url: 'https://samenonline.org',
    telephone: '+31612345678',
    priceRange: '€75 - €385',
    address: {
      '@type': 'PostalAddress',
      addressLocality: currentRegion.name.split('&')[0].trim(),
      addressRegion: currentRegion.province,
      addressCountry: 'NL',
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: currentRegion.name,
    },
    description: `Professioneel, betaalbaar Next.js webdesign voor ondernemers in ${currentRegion.name}. Binnen 2 tot 5 werkdagen live zonder wurgcontracten.`,
  };

  const handleCta = () => {
    if (onSelectRegion) {
      onSelectRegion(currentRegion.name);
    }
    if (onOpenRequestModal) {
      onOpenRequestModal(
        `Regio-aanvraag: Ik zoek een professionele website voor mijn bedrijf in ${currentRegion.name} (${currentRegion.province}).`
      );
    }
  };

  return (
    <section id="regio-webdesign" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Dynamic SEO JSON-LD injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 text-orange-800 border border-orange-200 text-xs font-black uppercase tracking-wider mb-4 shadow-xs">
          <MapPin className="w-4 h-4 text-orange-600" />
          <span>{lang === 'nl' ? 'Lokale SEO & Regiokiezer' : 'Local SEO in Your Region'}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight">
          {lang === 'nl' ? (
            <>
              Webdesign in <span className="text-orange-600 underline decoration-orange-300 decoration-wavy">Jouw Regio</span>
            </>
          ) : (
            'High-Speed Websites for Dutch Businesses'
          )}
        </h2>
        <p className="mt-3 text-stone-600 text-sm sm:text-base font-medium max-w-xl mx-auto">
          {lang === 'nl'
            ? 'Kies jouw regio en ontdek hoe we jouw bedrijf bovenaan krijgen in de lokale zoekresultaten van Google.'
            : 'Select your region to see customized local SEO advantages for your market.'}
        </p>
      </div>

      {/* Region Buttons Carousel / Grid */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 pt-1 px-1 no-scrollbar">
        {REGIONS.map((region) => {
          const isSelected = region.id === currentRegion.id;
          return (
            <button
              key={region.id}
              onClick={() => setSelectedRegionId(region.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                isSelected
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30 scale-102'
                  : 'bg-white text-stone-700 hover:bg-orange-50 border border-stone-200'
              }`}
            >
              <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-orange-600'}`} />
              <span>{region.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active Region Showcase Card */}
      <div className="mt-6 bg-gradient-to-br from-stone-900 via-stone-800 to-orange-950 rounded-3xl p-6 sm:p-10 text-white border-2 border-orange-500/30 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Info Column */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-orange-300 text-xs font-black uppercase tracking-wider border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>Actieve Regio: {currentRegion.name} ({currentRegion.province})</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              {lang === 'nl'
                ? `De Slimste Website-Keuze voor Ondernemers in ${currentRegion.name}`
                : `Tailored Web Solutions for ${currentRegion.name}`}
            </h3>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-medium">
              {currentRegion.localBenefit} Wij zorgen ervoor dat jouw nieuwe website direct geoptimaliseerd is met gestructureerde gegevens (Schema.org) en lokale Google Maps tags.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-xs text-white block">Google Maps & Lokale Zoekwoorden</span>
                  <span className="text-[11px] text-stone-300">Geïndexeerd voor zoektermen zoals &ldquo;{currentRegion.popularSearch}&rdquo;</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-xs text-white block">0.3s Laadtijd via NL Edge</span>
                  <span className="text-[11px] text-stone-300">Gehost op snelle Nederlandse servers voor maximale mobiele conversie</span>
                </div>
              </div>
            </div>

            {/* Industry tags */}
            <div className="pt-2">
              <span className="text-[11px] font-black uppercase text-orange-400 block mb-2">
                Veelgebouwde branches in {currentRegion.name}:
              </span>
              <div className="flex flex-wrap gap-2">
                {currentRegion.focusIndustries.split(',').map((ind, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-xl bg-white/10 text-white text-xs font-semibold border border-white/15"
                  >
                    {ind.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Action Box */}
          <div className="lg:col-span-5 bg-white text-stone-900 p-6 sm:p-8 rounded-3xl shadow-xl space-y-5 border border-stone-200">
            <div className="space-y-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200 inline-block mb-1">
                Lokale Oplevergarantie
              </span>
              <h4 className="text-xl font-black text-stone-900">
                Start Jouw Project in {currentRegion.name.split('&')[0].trim()}
              </h4>
              <p className="text-xs text-stone-600">
                Binnen 2 tot 5 werkdagen staat jouw website professioneel live. 100% eigendom zonder abonnementsverplichting.
              </p>
            </div>

            <div className="space-y-2 text-xs font-medium text-stone-700 bg-stone-50 p-4 rounded-2xl border border-stone-200/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Geen reiskosten of verborgen kosten</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Direct contact via WhatsApp of videocall</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Vaste prijzen vanaf €75 eenmalig</span>
              </div>
            </div>

            <button
              onClick={handleCta}
              className="w-full py-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-600/30 transition-all cursor-pointer"
            >
              <span>Vrijblijvend Contact voor {currentRegion.name.split('&')[0].trim()}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
