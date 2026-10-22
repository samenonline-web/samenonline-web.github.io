'use client';

import React, { useState } from 'react';
import { Check, X, ShieldCheck, Zap, Sparkles, AlertTriangle, ArrowRight } from 'lucide-react';
import { Language } from '../types/company';

interface CmsComparisonSectionProps {
  lang: Language;
  onOpenRequestModal?: () => void;
  onOpenCalculator?: () => void;
  onOpenRedesignRequest?: () => void;
}

interface ComparisonRow {
  category: string;
  nextjs: { title: string; desc: string; winner?: boolean };
  wordpress: { title: string; desc: string };
  wix: { title: string; desc: string };
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    category: 'Laadsnelheid (PageSpeed)',
    nextjs: {
      title: '0.3 sec (Score 99/100)',
      desc: 'Statische pre-rendering via NVMe edge netwerk; bezoekers wachten nooit.',
      winner: true,
    },
    wordpress: {
      title: '3.5 - 5.0 sec (Score 35/100)',
      desc: 'Trage PHP- en SQL-database queries bij elk paginabezoek.',
    },
    wix: {
      title: '2.5 - 4.0 sec (Score 50/100)',
      desc: 'Zware JavaScript-overhead van de visuele pagebuilder.',
    },
  },
  {
    category: 'Beveiliging & Lekken',
    nextjs: {
      title: '100% Veilig & Geen Database Lekken',
      desc: 'Geen kwetsbare loginpagina’s of verouderde plugins die gehackt kunnen worden.',
      winner: true,
    },
    wordpress: {
      title: 'Kwetsbaar voor Bot-aanvallen',
      desc: 'Continue beveiligingsupdates nodig voor tientallen plugins.',
    },
    wix: {
      title: 'Gesloten Cloud Systeem',
      desc: 'Veilig beheerd door Wix, maar geen controle over dataopslag.',
    },
  },
  {
    category: 'Eigendom van Jouw Site',
    nextjs: {
      title: '100% Jouw Eigendom',
      desc: 'Je ontvangt de volledige broncode. Geen vendor lock-in; vrij om te verhuizen.',
      winner: true,
    },
    wordpress: {
      title: 'Jouw Eigendom, maar Afhankelijk',
      desc: 'Eigendom van database, maar complexe migraties vereist.',
    },
    wix: {
      title: 'Geen Eigendom (Huurmodel)',
      desc: 'Je huurt het platform. Als je stopt met betalen, is je website direct weg.',
    },
  },
  {
    category: 'Maandelijkse Vaste Kosten',
    nextjs: {
      title: '€0 of €9,50 /mnd (All-in)',
      desc: 'Alleen optionele snelle hosting en domeinnaam. Geen verborgen abonnementskosten.',
      winner: true,
    },
    wordpress: {
      title: '€25 - €60 /mnd',
      desc: 'Hosting + betaalde plugins (Elementor Pro, WP Rocket, Formulier-licenties).',
    },
    wix: {
      title: '€22 - €45 /mnd (Verplicht)',
      desc: 'Steile prijsstijgingen per jaar om advertenties van derden te verbergen.',
    },
  },
  {
    category: 'Google SEO & Posities',
    nextjs: {
      title: 'Maximale Core Web Vitals',
      desc: 'Ingebouwde Schema.org LocalBusiness mark-up en perfecte mobiele score.',
      winner: true,
    },
    wordpress: {
      title: 'Vereist Zware SEO Plugins',
      desc: 'Vaak trage mobiele scores die Google rankingpunten kosten.',
    },
    wix: {
      title: 'Beperkte Technische SEO',
      desc: 'Geen directe controle over server headers, sitemaps of geavanceerde structured data.',
    },
  },
];

export const CmsComparisonSection: React.FC<CmsComparisonSectionProps> = ({
  lang,
  onOpenRequestModal,
  onOpenCalculator,
  onOpenRedesignRequest,
}) => {
  return (
    <section id="waarom-nextjs" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-black uppercase tracking-wider">
          <Zap className="w-4 h-4 text-orange-600" />
          <span>{lang === 'nl' ? 'Technologische Voorsprong' : 'Modern Tech Stack'}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
          {lang === 'nl' ? 'Waarom Next.js i.p.v. WordPress of Wix?' : 'Why Next.js Beats WordPress and Wix'}
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed max-w-xl mx-auto">
          {lang === 'nl'
            ? 'Ontdek waarom moderne Nederlandse bedrijven afstappen van trage, kwetsbare CMS-systemen en kiezen voor de bliksemsnelle Next.js technologie van Samen Online.'
            : 'Discover why modern businesses leave slow, vulnerable CMS tools behind for lightning-fast Next.js.'}
        </p>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-3xl border-2 border-stone-200 shadow-xl bg-white">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-stone-200">
              <th className="p-4 sm:p-5 font-black text-stone-500 uppercase tracking-wider w-1/4 text-[11px] bg-stone-50">
                Eigenschap
              </th>
              <th className="p-4 sm:p-5 font-black text-stone-900 w-2/5 border-l-2 border-r-2 border-orange-500 bg-orange-50/60 relative">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-orange-950 flex items-center gap-1.5">
                    <span>🚀 Samen Online (Next.js)</span>
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-600 text-white">
                    Aanbevolen
                  </span>
                </div>
              </th>
              <th className="p-4 sm:p-5 font-black text-stone-700 w-1/5 bg-stone-50/80">
                <span>Traditioneel WordPress</span>
              </th>
              <th className="p-4 sm:p-5 font-black text-stone-700 w-1/5 bg-stone-50/80">
                <span>Wix / Squarespace</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 text-stone-700">
            {COMPARISON_DATA.map((row, idx) => (
              <tr key={idx} className="hover:bg-stone-50/50 transition-colors">
                {/* Category Name */}
                <td className="p-4 sm:p-5 font-bold text-stone-900 bg-stone-50/30 align-top">
                  {row.category}
                </td>

                {/* Next.js Column */}
                <td className="p-4 sm:p-5 border-l-2 border-r-2 border-orange-500 bg-orange-50/20 align-top">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-stone-950 text-xs font-black">
                        {row.nextjs.title}
                      </strong>
                      <span className="text-stone-600 text-[11px] font-medium leading-relaxed mt-0.5 block">
                        {row.nextjs.desc}
                      </span>
                    </div>
                  </div>
                </td>

                {/* WordPress Column */}
                <td className="p-4 sm:p-5 align-top bg-stone-50/20">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-stone-800 text-xs font-bold">
                        {row.wordpress.title}
                      </strong>
                      <span className="text-stone-500 text-[11px] leading-relaxed mt-0.5 block">
                        {row.wordpress.desc}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Wix Column */}
                <td className="p-4 sm:p-5 align-top bg-stone-50/20">
                  <div className="flex items-start gap-2">
                    <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-stone-800 text-xs font-bold">
                        {row.wix.title}
                      </strong>
                      <span className="text-stone-500 text-[11px] leading-relaxed mt-0.5 block">
                        {row.wix.desc}
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom CTA Banner */}
      <div className="mt-8 p-6 rounded-3xl bg-stone-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-black text-sm sm:text-base">
            Klaar om jouw trage WordPress website in te ruilen voor razendsnelle Next.js technologie?
          </h3>
          <p className="text-xs text-stone-300 font-medium">
            Wij migreren al jouw bestaande teksten en afbeeldingen zonder verlies van Google posities.
          </p>
        </div>

        <button
          onClick={onOpenRedesignRequest || onOpenRequestModal}
          className="px-6 py-3 rounded-xl bg-orange-700 hover:bg-orange-800 text-white font-extrabold text-xs transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-md shadow-orange-700/30 shrink-0"
        >
          <span>Vraag Next.js Website Aan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
