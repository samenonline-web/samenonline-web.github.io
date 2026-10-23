'use client';

import React, { useState } from 'react';
import {
  Calculator,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  ShieldCheck,
  Zap,
  Sparkles,
} from 'lucide-react';
import { Language } from '../types/company';

interface CostComparisonCalculatorProps {
  lang: Language;
  onOpenRequestModal: () => void;
  onScrollToPricing: () => void;
}

type SituationType = 'zzp' | 'mkb' | 'webshop';

export const CostComparisonCalculator: React.FC<CostComparisonCalculatorProps> = ({
  lang,
  onOpenRequestModal,
  onScrollToPricing,
}) => {
  const [situation, setSituation] = useState<SituationType>('mkb');

  const data = {
    zzp: {
      titleNl: 'ZZP & Lokale Zelfstandigen (1–3 Pagina’s)',
      titleEn: 'Freelance & Local Services (1–3 Pages)',
      agencyBuild: 1850,
      agencyMonthly: 85,
      agencyTotal: 1850 + 85 * 24, // €3.890
      saasBuild: 0,
      saasMonthly: 36,
      saasTotal: 36 * 24, // €864
      samenBuild: 125,
      samenMonthly: 9.5,
      samenTotal: 125 + 9.5 * 24, // €353
      savingsAgency: 1850 + 85 * 24 - (125 + 9.5 * 24), // €3.537
    },
    mkb: {
      titleNl: 'Groeiend MKB Bedrijf (5–10 Pagina’s & Leadgeneratie)',
      titleEn: 'Growing SMB (5–10 Pages & Lead Generation)',
      agencyBuild: 3200,
      agencyMonthly: 145,
      agencyTotal: 3200 + 145 * 24, // €6.680
      saasBuild: 350,
      saasMonthly: 65,
      saasTotal: 350 + 65 * 24, // €1.910
      samenBuild: 245,
      samenMonthly: 9.5,
      samenTotal: 245 + 9.5 * 24, // €473
      savingsAgency: 3200 + 145 * 24 - (245 + 9.5 * 24), // €6.207
    },
    webshop: {
      titleNl: 'Webshop met iDEAL Checkout & Producten',
      titleEn: 'E-commerce Shop with iDEAL & Catalog',
      agencyBuild: 4500,
      agencyMonthly: 195,
      agencyTotal: 4500 + 195 * 24, // €9.180
      saasBuild: 500,
      saasMonthly: 95,
      saasTotal: 500 + 95 * 24, // €2.780
      samenBuild: 385,
      samenMonthly: 14.5,
      samenTotal: 385 + 14.5 * 24, // €733
      savingsAgency: 4500 + 195 * 24 - (385 + 14.5 * 24), // €8.447
    },
  };

  const current = data[situation];

  return (
    <section id="kosten-vergelijker" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 text-xs font-black uppercase tracking-wider">
          <TrendingDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{lang === 'nl' ? 'Eerlijke Kostenvergelijking' : 'Cost Breakdown Comparison'}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white tracking-tight">
          {lang === 'nl' ? 'Wat Kost Een Website Jou Écht Over 2 Jaar?' : 'What Does a Website Truly Cost Over 2 Years?'}
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto">
          {lang === 'nl'
            ? 'Veel bureaus rekenen torenhoge opstartkosten plus verplichte maandcontracten. Bij SaaS-platformen bezit je nooit de code. Bekijk hieronder wat je bespaart met Samen Online.'
            : 'Many agencies bill huge up-front fees plus mandatory retainer contracts. With Samen Online you own 100% of your site without hidden fees.'}
        </p>

        {/* Situation Tabs */}
        <div className="inline-flex p-1.5 rounded-2xl bg-stone-100 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 gap-1.5 mt-4">
          <button
            type="button"
            onClick={() => setSituation('zzp')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              situation === 'zzp'
                ? 'bg-white dark:bg-slate-900 text-stone-900 dark:text-white shadow-xs'
                : 'text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            {lang === 'nl' ? 'ZZP / Starter' : 'Freelancer'}
          </button>
          <button
            type="button"
            onClick={() => setSituation('mkb')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              situation === 'mkb'
                ? 'bg-white dark:bg-slate-900 text-stone-900 dark:text-white shadow-xs'
                : 'text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            {lang === 'nl' ? 'MKB Bedrijf' : 'SMB Business'}
          </button>
          <button
            type="button"
            onClick={() => setSituation('webshop')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              situation === 'webshop'
                ? 'bg-white dark:bg-slate-900 text-stone-900 dark:text-white shadow-xs'
                : 'text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            {lang === 'nl' ? 'Webshop / iDEAL' : 'E-commerce Shop'}
          </button>
        </div>
      </div>

      {/* 3-Way Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative items-stretch">
        
        {/* Card 1: Traditional Agency */}
        <div className="bg-white dark:bg-slate-900/80 rounded-3xl p-6 sm:p-7 border-2 border-stone-200 dark:border-slate-800 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-wider text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-3 py-1 rounded-full border border-rose-200 dark:border-rose-900/50">
                Traditioneel Bureau
              </span>
              <XCircle className="w-5 h-5 text-rose-500" />
            </div>

            <div className="mb-6">
              <div className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white">
                €{current.agencyTotal.toLocaleString('nl-NL')}
              </div>
              <span className="text-[11px] font-bold text-stone-500">Totaal over 2 jaar</span>
            </div>

            <ul className="space-y-3 text-xs font-medium text-stone-600 dark:text-slate-300 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span>Opstartkosten: <strong>€{current.agencyBuild.toLocaleString('nl-NL')}</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span>Onderhoudscontract: <strong>€{current.agencyMonthly}/mnd</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span>Uurtarief voor kleine aanpassingen: <strong>€85 – €110/uur</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span>WordPress plugins & database updates vereist</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span>Levertijd: 6 tot 12 weken</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-stone-100 dark:border-slate-800 text-[11px] font-bold text-stone-500">
            Hoge opstartdrempel & structurele bureau-afhankelijkheid
          </div>
        </div>

        {/* Card 2: DIY SaaS (Shopify / Wix) */}
        <div className="bg-white dark:bg-slate-900/80 rounded-3xl p-6 sm:p-7 border-2 border-stone-200 dark:border-slate-800 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-900/50">
                Wix / Shopify / Squarespace
              </span>
              <AlertTriangle className="w-5 h-5 text-amber-500" />
            </div>

            <div className="mb-6">
              <div className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white">
                €{current.saasTotal.toLocaleString('nl-NL')}
              </div>
              <span className="text-[11px] font-bold text-stone-500">Totaal over 2 jaar + transactiekosten</span>
            </div>

            <ul className="space-y-3 text-xs font-medium text-stone-600 dark:text-slate-300 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold shrink-0">!</span>
                <span>Abonnementskosten: <strong>€{current.saasMonthly}/mnd</strong> (stijgt elk jaar)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold shrink-0">!</span>
                <span><strong>0% Eigendom:</strong> Stop je met betalen, dan is alles weg</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold shrink-0">!</span>
                <span>Zelf tientallen uren instellen & frustraties</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold shrink-0">!</span>
                <span>Trage mobiele laadtijden & suboptimale Google SEO</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold shrink-0">!</span>
                <span>Extra betaalde plugins voor simpele formulieren</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-stone-100 dark:border-slate-800 text-[11px] font-bold text-stone-500">
            Eeuwig abonnement zonder ooit eigenaar te worden
          </div>
        </div>

        {/* Card 3: Samen Online (The Clear Winner) */}
        <div className="bg-gradient-to-b from-orange-50/90 via-white to-amber-50/60 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/90 rounded-3xl p-6 sm:p-7 border-2 border-orange-400 dark:border-blue-500 flex flex-col justify-between shadow-xl ring-2 ring-orange-500/20 dark:ring-blue-500/30 relative">
          
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 dark:from-blue-600 dark:to-cyan-500 text-white text-[11px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5 whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Slimste Keuze</span>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4 mt-2">
              <span className="text-xs font-black uppercase tracking-wider text-orange-800 dark:text-blue-300 bg-orange-100 dark:bg-blue-950/80 px-3 py-1 rounded-full border border-orange-200 dark:border-blue-800/60">
                Samen Online (Next.js)
              </span>
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            </div>

            <div className="mb-6">
              <div className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white">
                €{current.samenTotal.toLocaleString('nl-NL')}
              </div>
              <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                All-in over 2 jaar (incl. hosting & domein)
              </span>
            </div>

            <ul className="space-y-3 text-xs font-medium text-stone-700 dark:text-slate-200 mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Vaste eenmalige bouwprijs: <strong>€{current.samenBuild}</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>100% Jouw Eigendom:</strong> Geen verplichte maandkosten</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>100/100 Core Web Vitals:</strong> Bliksemsnelle Next.js technologie</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Optionele all-in ontzorging: slechts €9,50/mnd incl. NVMe SSD & .nl domein</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Oplevering binnen <strong>2 tot 5 werkdagen</strong></span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-orange-200/80 dark:border-slate-800 flex items-center justify-between">
            <div className="text-[11px] font-black text-emerald-700 dark:text-emerald-400">
              Jouw besparing: €{current.savingsAgency.toLocaleString('nl-NL')}
            </div>
            <button
              type="button"
              onClick={onOpenRequestModal}
              className="px-4 py-2 rounded-xl bg-orange-700 hover:bg-orange-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-black text-xs flex items-center gap-1 shadow-md shadow-orange-700/30 transition-transform active:scale-95 cursor-pointer"
            >
              <span>Start Nu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Savings Banner */}
      <div className="mt-8 p-5 sm:p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-black text-emerald-900 dark:text-emerald-100">
              {lang === 'nl'
                ? `Met Samen Online bespaar je €${current.savingsAgency.toLocaleString('nl-NL')} én bezit je de code 100% zelf.`
                : `Save €${current.savingsAgency.toLocaleString('nl-NL')} and own 100% of your source code.`}
            </div>
            <p className="text-xs text-emerald-800 dark:text-emerald-300 font-medium">
              Geen verborgen uren • Geen vendor lock-in • Gratis revisieronde tot 100% tevredenheid.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onScrollToPricing}
          className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs shrink-0 transition-colors cursor-pointer"
        >
          {lang === 'nl' ? 'Bekijk Tarieven & Pakketten →' : 'View All Packages →'}
        </button>
      </div>
    </section>
  );
};
