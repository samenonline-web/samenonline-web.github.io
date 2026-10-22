'use client';

import React, { useState } from 'react';
import {
  Search,
  Gauge,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Download,
  RotateCcw,
  Sparkles,
  Smartphone,
  ExternalLink,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import { Language } from '../types/company';
import { AuditReportPdfModal } from './AuditReportPdfModal';

interface WebsiteSpeedAuditSectionProps {
  lang: Language;
  onOpenRedesignRequest: (url: string) => void;
}

export const WebsiteSpeedAuditSection: React.FC<WebsiteSpeedAuditSectionProps> = ({
  lang,
  onOpenRedesignRequest,
}) => {
  const [urlInput, setUrlInput] = useState('');
  const [analyzedDomain, setAnalyzedDomain] = useState<string | null>(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  const cleanDomain = urlInput
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/.*$/, '');

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cleanDomain) return;

    // Open official Google PageSpeed Insights in a new tab for true, honest, unmanipulated measurement
    const officialGoogleUrl = `https://pagespeed.web.dev/analysis?url=https://${encodeURIComponent(cleanDomain)}`;
    window.open(officialGoogleUrl, '_blank', 'noopener,noreferrer');

    setAnalyzedDomain(cleanDomain);
  };

  return (
    <section id="website-audit" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      <div className="bg-white dark:bg-slate-900/90 rounded-3xl border-2 border-orange-200/90 dark:border-slate-800 shadow-xl overflow-hidden transition-colors">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-orange-950 dark:from-slate-950 dark:via-slate-900 dark:to-orange-950 p-6 sm:p-10 text-white text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 text-xs font-black uppercase tracking-wider mb-3">
            <Gauge className="w-4 h-4 text-orange-400" />
            <span>{lang === 'nl' ? 'Eerlijke & Onafhankelijke Website Scan' : 'Honest & Objective Website Audit'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            {lang === 'nl' ? 'Is Jouw Huidige Website Snel Genoeg Voor Google?' : 'Is Your Current Website Fast Enough?'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto mt-2 font-medium leading-relaxed">
            {lang === 'nl'
              ? 'Geen verzonnen scores of neppe verkoopscans. Test jouw échte mobiele prestaties direct via de officiële Google PageSpeed tool, of vraag een gratis handmatige review aan.'
              : 'No fake diagnostic scores. Test your true mobile performance directly via Google PageSpeed, or request a free manual expert review.'}
          </p>

          {/* URL Input Form */}
          <form onSubmit={handleStartScan} className="max-w-xl mx-auto mt-6 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-3 text-stone-400 text-xs font-mono select-none">
                https://
              </span>
              <input
                type="text"
                required
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="jouw-huidige-bedrijf.nl"
                className="w-full pl-20 pr-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-stone-400 text-xs sm:text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-600/30 transition-all cursor-pointer whitespace-nowrap"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{lang === 'nl' ? 'Test via Officiële Google PageSpeed' : 'Test with Google PageSpeed'}</span>
            </button>
          </form>

          <p className="text-[11px] text-stone-400 mt-2.5 font-medium">
            💡 Opent direct in een nieuw tabblad op <strong className="text-orange-300">pagespeed.web.dev</strong> (Google’s officiële meettool).
          </p>
        </div>

        {/* Results / Next Steps Card when domain entered */}
        {analyzedDomain && (
          <div className="p-6 sm:p-10 space-y-8 animate-in fade-in duration-300 border-b border-stone-200 dark:border-slate-800 bg-orange-50/30 dark:bg-slate-950/60">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                  <ExternalLink className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-stone-900 dark:text-white text-sm sm:text-base">
                    Officiële Google PageSpeed Geopend voor: <strong>{analyzedDomain}</strong>
                  </h3>
                  <span className="text-xs text-emerald-800 dark:text-emerald-300 font-medium block">
                    Google analyseert nu jouw live website op Core Web Vitals en mobiele laadtijd.
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  const googleUrl = `https://pagespeed.web.dev/analysis?url=https://${encodeURIComponent(analyzedDomain)}`;
                  window.open(googleUrl, '_blank', 'noopener,noreferrer');
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 shadow-xs"
              >
                <span>Google Test Heropenen</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Two Action Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Option 1: Handmatige Gratis Review */}
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-950 border-2 border-stone-200 dark:border-slate-800 space-y-4 flex flex-col justify-between shadow-xs">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-orange-800/60 text-[11px] font-black uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                    <span>Persoonlijk & Vrijblijvend</span>
                  </div>
                  <h3 className="text-lg font-black text-stone-900 dark:text-white">
                    Gratis Handmatige Review door Samen Online
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed font-medium">
                    Geen geautomatiseerde bot-score, maar een echte inhoudelijke blik. Wij bekijken jouw website op mobiele conversie, Google vindbaarheid, teksten en techniek en sturen je binnen 24 uur een helder advies.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenRedesignRequest(analyzedDomain)}
                  className="w-full py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20 transition-all cursor-pointer"
                >
                  <span>Vraag Gratis Review Aan voor {analyzedDomain}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Option 2: Prestatiegids PDF Download */}
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-950 border-2 border-stone-200 dark:border-slate-800 space-y-4 flex flex-col justify-between shadow-xs">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-slate-300 border border-stone-200 dark:border-slate-700 text-[11px] font-black uppercase">
                    <FileText className="w-3.5 h-3.5 text-stone-600 dark:text-slate-400" />
                    <span>Downloadbaar Document</span>
                  </div>
                  <h3 className="text-lg font-black text-stone-900 dark:text-white">
                    Website Prestatiegids & Optimalisatie Checklist
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed font-medium">
                    Download direct een professionele A4-gids met de officiële Google Core Web Vitals richtlijnen en ontdek de concrete voordelen van een moderne Next.js website t.o.v. traditionele platforms.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsPdfModalOpen(true)}
                  className="w-full py-3.5 rounded-xl bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 text-stone-800 dark:text-slate-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer border border-stone-300 dark:border-slate-700"
                >
                  <Download className="w-4 h-4 text-stone-600 dark:text-slate-400" />
                  <span>Download Prestatiegids als PDF (A4)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 4 Signs Self-Check Grid */}
        <div className="p-6 sm:p-10 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <h3 className="text-lg sm:text-2xl font-black text-stone-900 dark:text-white">
              Wanneer is een Website Upgrade Nodig? De 4 Zelf-Check Punten:
            </h3>
            <p className="text-xs text-stone-500 dark:text-slate-400 font-medium">
              Controleer zelf of jouw huidige website jouw onderneming potentiële klanten kost:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-5 rounded-2xl bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 space-y-2.5 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-black text-xs sm:text-sm text-stone-900 dark:text-white">
                1. Laadtijd boven 2.5s op 4G
              </h4>
              <p className="text-[11px] text-stone-600 dark:text-slate-300 leading-relaxed font-medium">
                Meer dan 53% van de mobiele bezoekers haakt af als een pagina langer dan 3 seconden moet laden. Next.js laadt instant binnen 0.3s.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 space-y-2.5 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <h4 className="font-black text-xs sm:text-sm text-stone-900 dark:text-white">
                2. Geen 1-Klik WhatsApp Knop
              </h4>
              <p className="text-[11px] text-stone-600 dark:text-slate-300 leading-relaxed font-medium">
                Bezoekers willen anno 2026 niet eerst zoeken naar een e-mailadres. Een directe mobiele actieknop verhoogt aanvragen gemiddeld met +35%.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 space-y-2.5 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-black text-xs sm:text-sm text-stone-900 dark:text-white">
                3. Dure Pluginkosten & Updates
              </h4>
              <p className="text-[11px] text-stone-600 dark:text-slate-300 leading-relaxed font-medium">
                Maandelijkse abonnementskosten voor formulier-plugins, beveiliging en pagebuilders tikken snel aan. Samen Online levert websites 100% in jouw eigendom.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 space-y-2.5 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                <Gauge className="w-5 h-5" />
              </div>
              <h4 className="font-black text-xs sm:text-sm text-stone-900 dark:text-white">
                4. Afwezig in Google Maps
              </h4>
              <p className="text-[11px] text-stone-600 dark:text-slate-300 leading-relaxed font-medium">
                Ontbreken van gestructureerde Schema.org LocalBusiness data betekent dat lokale concurrenten voorrang krijgen in Google zoekresultaten.
              </p>
            </div>

          </div>
        </div>

      </div>

      <AuditReportPdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        lang={lang}
        domain={analyzedDomain || 'jouw-bedrijf.nl'}
      />
    </section>
  );
};
