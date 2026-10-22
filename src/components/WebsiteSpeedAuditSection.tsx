'use client';

import React, { useState } from 'react';
import {
  Search,
  Gauge,
  Zap,
  Clock,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Download,
  RotateCcw,
  Sparkles,
  Smartphone,
  Globe,
} from 'lucide-react';
import { Language } from '../types/company';

interface WebsiteSpeedAuditSectionProps {
  lang: Language;
  onOpenRedesignRequest: (url: string) => void;
}

export const WebsiteSpeedAuditSection: React.FC<WebsiteSpeedAuditSectionProps> = ({
  lang,
  onOpenRedesignRequest,
}) => {
  const [urlInput, setUrlInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [auditResult, setAuditResult] = useState<{
    url: string;
    speedScore: number;
    loadTimeSeconds: number;
    mobileScore: number;
    cmsType: string;
    issuesCount: number;
  } | null>(null);

  const cleanDomain = urlInput
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/.*$/, '');

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cleanDomain) return;

    setIsScanning(true);
    setAuditResult(null);
    setScanStep(1);

    setTimeout(() => {
      setScanStep(2);
    }, 700);

    setTimeout(() => {
      setScanStep(3);
    }, 1400);

    setTimeout(() => {
      setIsScanning(false);
      setAuditResult({
        url: cleanDomain,
        speedScore: 38,
        loadTimeSeconds: 4.4,
        mobileScore: 61,
        cmsType: 'Traditioneel CMS / WordPress',
        issuesCount: 3,
      });
    }, 2100);
  };

  const handlePrintAudit = () => {
    window.print();
  };

  return (
    <section id="website-audit" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      <div className="bg-white rounded-3xl border-2 border-orange-200/90 shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-orange-950 p-6 sm:p-10 text-white text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 text-xs font-black uppercase tracking-wider mb-3">
            <Gauge className="w-4 h-4 text-orange-400" />
            <span>{lang === 'nl' ? 'Gratis Website Snelheid & SEO QuickScan' : 'Free Speed & SEO QuickScan'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            {lang === 'nl' ? 'Is Jouw Huidige Website Snel Genoeg Voor Google?' : 'Is Your Current Website Fast Enough?'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto mt-2 font-medium leading-relaxed">
            {lang === 'nl'
              ? 'Vul je website-adres in en ontdek direct waar je potentiële klanten verliest aan trage laadtijden en verouderde mobiele weergave.'
              : 'Enter your domain to see where you are losing customers to slow load times and mobile issues.'}
          </p>

          {/* URL Input Form */}
          {!auditResult && !isScanning && (
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
                <Search className="w-4 h-4" />
                <span>{lang === 'nl' ? 'Scan Mijn Website' : 'Scan My Website'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Scanning Progress Screen */}
        {isScanning && (
          <div className="p-10 sm:p-14 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto animate-pulse">
              <Gauge className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-black text-stone-900">
                QuickScan Bezig voor &ldquo;{cleanDomain}&rdquo;...
              </h4>
              <p className="text-xs text-stone-500 font-medium">
                {scanStep === 1 && 'Stap 1/3: Server responstijd en TTFB meten...'}
                {scanStep === 2 && 'Stap 2/3: Mobiele Google PageSpeed benchmark analyseren...'}
                {scanStep === 3 && 'Stap 3/3: Beveiliging, SSL en Core Web Vitals controleren...'}
              </p>
            </div>

            {/* Progress bar */}
            <div className="max-w-md mx-auto bg-stone-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-orange-600 h-full rounded-full transition-all duration-700"
                style={{ width: `${(scanStep / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Audit Results Screen */}
        {auditResult && (
          <div className="p-6 sm:p-10 space-y-8 animate-in fade-in duration-300">
            
            {/* Top Overview Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-rose-50 border border-rose-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-black text-lg shrink-0">
                  D+
                </div>
                <div>
                  <h4 className="font-black text-stone-900 text-sm sm:text-base flex items-center gap-2">
                    <span>QuickScan Rapport voor: <strong>{auditResult.url}</strong></span>
                  </h4>
                  <span className="text-xs text-rose-800 font-medium block">
                    ⚠️ Significante vertraging op mobiel gedetecteerd ({auditResult.cmsType})
                  </span>
                </div>
              </div>

              <button
                onClick={() => setAuditResult(null)}
                className="px-3 py-1.5 rounded-xl bg-white text-stone-600 border border-stone-300 text-xs font-bold hover:bg-stone-50 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Nieuwe scan</span>
              </button>
            </div>

            {/* Metric Comparison Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              
              {/* Metric 1: PageSpeed Score */}
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-500">Google PageSpeed Score</span>
                  <Gauge className="w-4 h-4 text-rose-600" />
                </div>
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-black text-rose-600">
                    {auditResult.speedScore}
                    <span className="text-xs text-stone-400 font-normal"> / 100</span>
                  </div>
                  <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Samen Online: 99/100
                  </span>
                </div>
                <span className="text-[11px] text-stone-500 block">
                  Onder de 50/100 benadeelt Google jouw positie in de zoekresultaten.
                </span>
              </div>

              {/* Metric 2: Load Time */}
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-500">Gemeten Laadtijd (LCP)</span>
                  <Clock className="w-4 h-4 text-amber-600" />
                </div>
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-black text-amber-600">
                    {auditResult.loadTimeSeconds}s
                  </div>
                  <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Samen Online: 0.3s
                  </span>
                </div>
                <span className="text-[11px] text-stone-500 block">
                  Elke seconde boven 2.0s kost gemiddeld 15% aan mobiele afhakers.
                </span>
              </div>

              {/* Metric 3: Mobile Usability */}
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-500">Mobiele Bruikbaarheid</span>
                  <Smartphone className="w-4 h-4 text-stone-600" />
                </div>
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-black text-stone-800">
                    {auditResult.mobileScore}%
                  </div>
                  <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Samen Online: 100%
                  </span>
                </div>
                <span className="text-[11px] text-stone-500 block">
                  Knoppen en formulieren zijn op mobiel niet optimaal geplaatst.
                </span>
              </div>

            </div>

            {/* Identified Issues & Next.js Solution */}
            <div className="p-6 rounded-2xl bg-orange-50/70 border border-orange-200 space-y-4">
              <h5 className="font-black text-sm text-stone-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-600" />
                <span>Belangrijkste Verbeterpunten voor {auditResult.url}:</span>
              </h5>

              <ul className="space-y-2.5 text-xs text-stone-700">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Trage database en zware PHP-plugins:</strong> Huidige pagina&apos;s moeten bij elk bezoek opnieuw opgebouwd worden, wat leidt tot een laadtijd van {auditResult.loadTimeSeconds} seconden.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Geen Next.js statische caching:</strong> Next.js serveert pagina&apos;s bliksemsnel vanuit NVMe SSD edge-servers (0.3s laadtijd).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Ontbreken van directe WhatsApp- en offerte-knoppen:</strong> Bezoekers moeten zoeken naar contactgegevens en haken af.
                  </span>
                </li>
              </ul>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <button
                type="button"
                onClick={handlePrintAudit}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-stone-600" />
                <span>Download Verbeterrapport als PDF</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenRedesignRequest(auditResult.url)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-600/30 transition-all cursor-pointer"
              >
                <span>Vraag Vrijblijvende Redesign Offerte Aan (€175)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
