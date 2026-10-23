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
    <div id="cms-vergelijking" className="my-6 scroll-mt-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 dark:bg-blue-950/60 text-orange-800 dark:text-blue-300 border border-orange-200 dark:border-blue-800/60 text-xs font-black uppercase tracking-wider">
          <Zap className="w-4 h-4 text-orange-600 dark:text-blue-400" />
          <span>{lang === 'nl' ? 'Technologische Voorsprong' : 'Modern Tech Stack'}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white tracking-tight">
          {lang === 'nl' ? 'Waarom Next.js i.p.v. WordPress of Wix?' : 'Why Next.js Beats WordPress and Wix'}
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 font-medium leading-relaxed max-w-xl mx-auto">
          {lang === 'nl'
            ? 'Ontdek waarom moderne Nederlandse bedrijven afstappen van trage, kwetsbare CMS-systemen en kiezen voor de bliksemsnelle Next.js technologie van Samen Online.'
            : 'Discover why modern businesses leave slow, vulnerable CMS tools behind for lightning-fast Next.js.'}
        </p>
      </div>

      {/* Side-by-Side Benchmark Visual Cards (Google Stitch Pattern) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch mb-10">
        {/* WordPress / Legacy Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-stone-100/80 dark:bg-slate-900 border-2 border-stone-200 dark:border-slate-800 flex flex-col justify-between shadow-xs transition-colors">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-slate-800">
              <span className="px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 text-xs font-bold flex items-center gap-1.5 border border-rose-200 dark:border-rose-900/60">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                <span>Trage Legacy Website (WordPress / Wix)</span>
              </span>
              <span className="font-mono text-xl sm:text-2xl font-black text-rose-600 dark:text-rose-400">
                34 / 100
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white mt-4 leading-snug">
              Trage Laadtijden, Verouderde Plugins & Spambots
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 mt-2 leading-relaxed font-medium">
              Mobiele bezoekers moeten gemiddeld 4.8 seconden wachten voordat een pagina volledig rendert. Het resultaat: hoge bounce-rates en lagere zoekposities in Google.
            </p>

            {/* Metrics List */}
            <div className="mt-5 space-y-2 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-950 border border-stone-200/80 dark:border-slate-800">
                <span className="font-medium text-stone-600 dark:text-slate-400">Laadtijd op 4G mobiel</span>
                <span className="font-bold text-rose-600 dark:text-rose-400">4.8 seconden (Tragisch)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-950 border border-stone-200/80 dark:border-slate-800">
                <span className="font-medium text-stone-600 dark:text-slate-400">Bezoekershaak op smartphone</span>
                <span className="font-bold text-rose-600 dark:text-rose-400">48% verlaat direct de site</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-950 border border-stone-200/80 dark:border-slate-800">
                <span className="font-medium text-stone-600 dark:text-slate-400">Beveiliging & Lekken</span>
                <span className="font-bold text-rose-600 dark:text-rose-400">Kwetsbaar voor CMS-exploits</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-950 border border-stone-200/80 dark:border-slate-800">
                <span className="font-medium text-stone-600 dark:text-slate-400">Verplichte Maandelijkse Plugins</span>
                <span className="font-bold text-stone-700 dark:text-slate-300">€ 25 - € 60 p/mnd</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3.5 rounded-2xl bg-white dark:bg-slate-950 border border-stone-200/80 dark:border-slate-800 text-stone-600 dark:text-slate-400 text-xs">
            <span className="font-extrabold text-stone-900 dark:text-white block mb-0.5">Probleem in de praktijk:</span>
            Tientallen JavaScripts en logge database-aanvragen blokkeren het scherm van jouw klant.
          </div>
        </div>

        {/* Next.js / Samen Online Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-slate-950 dark:to-slate-900 border-2 border-orange-500 dark:border-blue-500 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-orange-500/10 dark:bg-blue-600/20 blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between pb-4 border-b border-orange-200/80 dark:border-white/10">
              <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-400 text-xs font-bold flex items-center gap-1.5 border border-emerald-300 dark:border-emerald-800/60">
                <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400"></span>
                <span>Samen Online (Next.js 16 Architectuur)</span>
              </span>
              <span className="font-mono text-xl sm:text-2xl font-black text-emerald-700 dark:text-emerald-400">
                99 / 100
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white mt-4 leading-snug">
              Bliksemsnel, Conversiegericht & 100% Jouw Eigendom
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 mt-2 leading-relaxed font-medium">
              Statische pre-rendering en supersnelle NVMe edge caching zorgen voor een directe laadtijd binnen 0.3 seconden. Bezoekers klikken en zijn direct op de pagina.
            </p>

            {/* Metrics List */}
            <div className="mt-5 space-y-2 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-white/10 border border-orange-200/80 dark:border-white/10 shadow-sm">
                <span className="text-stone-600 dark:text-slate-300 font-medium">Laadtijd op 4G mobiel</span>
                <span className="font-extrabold text-emerald-700 dark:text-emerald-400">0.3s (16x sneller)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-white/10 border border-orange-200/80 dark:border-white/10 shadow-sm">
                <span className="text-stone-600 dark:text-slate-300 font-medium">Mobiele Conversie Stijging</span>
                <span className="font-extrabold text-orange-700 dark:text-blue-400">+64% meer aanvragen</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-white/10 border border-orange-200/80 dark:border-white/10 shadow-sm">
                <span className="text-stone-600 dark:text-slate-300 font-medium">Veiligheid & Code Integriteit</span>
                <span className="font-extrabold text-emerald-700 dark:text-emerald-400">Geen DB-lekken, A+ SSL</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-white/10 border border-orange-200/80 dark:border-white/10 shadow-sm">
                <span className="text-stone-600 dark:text-slate-300 font-medium">Vaste Maandelijkse Kosten</span>
                <span className="font-extrabold text-stone-900 dark:text-white">€ 0 of € 9,50 p/mnd (All-in)</span>
              </div>
            </div>
          </div>

          <div className="mt-6 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-white/90 dark:bg-white/10 border border-orange-200/80 dark:border-white/10 shadow-sm">
            <div>
              <span className="font-bold text-stone-900 dark:text-white text-xs block">Klaar voor de overstap?</span>
              <span className="text-[11px] text-stone-600 dark:text-slate-300">Migratie van teksten en foto&apos;s gratis inbegrepen.</span>
            </div>
            <button
              type="button"
              onClick={onOpenRedesignRequest || onOpenRequestModal}
              className="shrink-0 px-4 py-2 rounded-xl bg-orange-700 hover:bg-orange-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-extrabold text-xs shadow-md shadow-orange-700/30 dark:shadow-blue-900/40 transition-all cursor-pointer whitespace-nowrap"
            >
              Start Gratis Migratiescan →
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-3xl border-2 border-stone-200 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-900/90 transition-colors">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-stone-200 dark:border-slate-800">
              <th className="p-4 sm:p-5 font-black text-stone-500 dark:text-slate-400 uppercase tracking-wider w-1/4 text-[11px] bg-stone-50 dark:bg-slate-950/60">
                Eigenschap
              </th>
              <th className="p-4 sm:p-5 font-black text-stone-900 dark:text-white w-2/5 border-l-2 border-r-2 border-orange-500 dark:border-blue-500 bg-orange-50/60 dark:bg-blue-950/30 relative">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-orange-950 dark:text-blue-300 flex items-center gap-1.5">
                    <span>🚀 Samen Online (Next.js)</span>
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-600 dark:bg-blue-600 text-white">
                    Aanbevolen
                  </span>
                </div>
              </th>
              <th className="p-4 sm:p-5 font-black text-stone-700 dark:text-slate-300 w-1/5 bg-stone-50/80 dark:bg-slate-950/80">
                <span>Traditioneel WordPress</span>
              </th>
              <th className="p-4 sm:p-5 font-black text-stone-700 dark:text-slate-300 w-1/5 bg-stone-50/80 dark:bg-slate-950/80">
                <span>Wix / Squarespace</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 dark:divide-slate-800 text-stone-700 dark:text-slate-300">
            {COMPARISON_DATA.map((row, idx) => (
              <tr key={idx} className="hover:bg-stone-50/50 dark:hover:bg-slate-800/40 transition-colors">
                {/* Category Name */}
                <td className="p-4 sm:p-5 font-bold text-stone-900 dark:text-white bg-stone-50/30 dark:bg-slate-950/40 align-top">
                  {row.category}
                </td>

                {/* Next.js Column */}
                <td className="p-4 sm:p-5 border-l-2 border-r-2 border-orange-500 dark:border-blue-500 bg-orange-50/20 dark:bg-blue-950/20 align-top">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-stone-950 dark:text-white text-xs font-black">
                        {row.nextjs.title}
                      </strong>
                      <span className="text-stone-600 dark:text-slate-300 text-[11px] font-medium leading-relaxed mt-0.5 block">
                        {row.nextjs.desc}
                      </span>
                    </div>
                  </div>
                </td>

                {/* WordPress Column */}
                <td className="p-4 sm:p-5 align-top bg-stone-50/20 dark:bg-slate-950/20">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-stone-800 dark:text-slate-200 text-xs font-bold">
                        {row.wordpress.title}
                      </strong>
                      <span className="text-stone-500 dark:text-slate-400 text-[11px] leading-relaxed mt-0.5 block">
                        {row.wordpress.desc}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Wix Column */}
                <td className="p-4 sm:p-5 align-top bg-stone-50/20 dark:bg-slate-950/20">
                  <div className="flex items-start gap-2">
                    <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-stone-800 dark:text-slate-200 text-xs font-bold">
                        {row.wix.title}
                      </strong>
                      <span className="text-stone-500 dark:text-slate-400 text-[11px] leading-relaxed mt-0.5 block">
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
      <div className="mt-8 p-6 rounded-3xl bg-orange-50/90 dark:bg-slate-900 border-2 border-orange-200/90 dark:border-slate-800 text-stone-900 dark:text-white flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors shadow-sm">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-black text-sm sm:text-base text-stone-900 dark:text-white">
            Klaar om jouw trage WordPress website in te ruilen voor razendsnelle Next.js technologie?
          </h3>
          <p className="text-xs text-stone-600 dark:text-slate-300 font-medium">
            Wij migreren al jouw bestaande teksten en afbeeldingen zonder verlies van Google posities.
          </p>
        </div>

        <button
          onClick={onOpenRedesignRequest || onOpenRequestModal}
          className="px-6 py-3 rounded-xl bg-orange-700 hover:bg-orange-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-extrabold text-xs transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-md shadow-orange-700/30 dark:shadow-blue-900/40 shrink-0"
        >
          <span>Vraag Next.js Website Aan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
