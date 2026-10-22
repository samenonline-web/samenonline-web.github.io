'use client';

import React, { useState, useRef, useCallback } from 'react';
import {
  Sparkles,
  Zap,
  Gauge,
  Clock,
  Smartphone,
  ShieldCheck,
  ArrowRight,
  SplitSquareVertical,
  CheckCircle2,
  AlertTriangle,
  FileText,
} from 'lucide-react';
import { Language } from '../types/company';
import { CaseStudyModal } from './CaseStudyModal';

interface BeforeAfterRedesignSectionProps {
  lang: Language;
  onOpenRedesignRequest: () => void;
}

export const BeforeAfterRedesignSection: React.FC<BeforeAfterRedesignSectionProps> = ({
  lang,
  onOpenRedesignRequest,
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedPercentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(clampedPercentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section id="redesign-slider" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-black uppercase tracking-wider">
          <SplitSquareVertical className="w-4 h-4 text-orange-600" />
          <span>{lang === 'nl' ? 'Interactieve Transformatie' : 'Interactive Transformation'}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
          {lang === 'nl' ? 'Oude Trage Website vs. Razendsnelle Next.js Site' : 'Old Slow Website vs. Blazing Fast Next.js'}
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed max-w-xl mx-auto">
          {lang === 'nl'
            ? 'Sleep de hendel hieronder naar links en rechts en ontdek hoe wij verouderde WordPress- of Wix-websites ombouwen naar moderne, conversiegerichte platforms.'
            : 'Drag the slider below to see how we modernize slow websites into lightning-fast, high-converting platforms.'}
        </p>

        {/* Quick Position Buttons */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            type="button"
            onClick={() => setSliderPosition(15)}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              sliderPosition < 30
                ? 'bg-rose-100 text-rose-800 border border-rose-300'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {lang === 'nl' ? 'Toon Oude Site' : 'Show Old Site'}
          </button>
          <button
            type="button"
            onClick={() => setSliderPosition(50)}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              sliderPosition >= 30 && sliderPosition <= 70
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {lang === 'nl' ? '50 / 50 Vergelijking' : '50 / 50 Comparison'}
          </button>
          <button
            type="button"
            onClick={() => setSliderPosition(85)}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
              sliderPosition > 70
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {lang === 'nl' ? 'Toon Nieuwe Site' : 'Show New Site'}
          </button>
        </div>
      </div>

      {/* Main Interactive Visual Comparison Frame */}
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full h-[400px] sm:h-[480px] rounded-3xl overflow-hidden border-2 border-orange-200/90 shadow-2xl select-none cursor-ew-resize bg-stone-900"
      >
        {/* NEW SITE LAYER (Right / Background Base) */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-orange-950 p-6 sm:p-10 flex flex-col justify-between text-white">
          {/* Top Bar Simulated Browser */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-md border border-emerald-500/30">
                🔒 https://jouwbedrijf.nl (Next.js 16 • NVMe SSL)
              </span>
            </div>
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-500/40">
              ⚡ PageSpeed 99/100
            </span>
          </div>

          {/* New Site Content Mockup */}
          <div className="my-auto max-w-xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-bold inline-block">
              ✨ 2026 Modern Design & Conversie Machine
            </span>
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight text-white">
              Samen Online: Vloeiend, Snel & 100% Jouw Eigendom
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 font-medium leading-relaxed">
              Geen zware PHP databasevertragingen meer. Bezoekers klikken en de pagina staat er instant binnen 0.3 seconden. Resultaat: meer aanvragen en betere Google posities.
            </p>
            <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-bold">
              <span className="px-2.5 py-1 rounded-lg bg-white/10 text-emerald-300 border border-white/10">
                🚀 0.3s Laadtijd
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/10 text-emerald-300 border border-white/10">
                📱 100% Mobiel Responsive
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/10 text-emerald-300 border border-white/10">
                💬 Directe WhatsApp & Formulier
              </span>
            </div>
          </div>

          <div className="text-[11px] font-semibold text-stone-400 border-t border-white/10 pt-3 flex justify-between items-center">
            <span>Volledig geoptimaliseerd voor conversie in Nederland</span>
            <span className="font-bold text-emerald-400">✓ Actieve Next.js Engine</span>
          </div>
        </div>

        {/* OLD SITE LAYER (Left / Clipped Overlay) */}
        <div
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
          className="absolute inset-0 bg-stone-200 border-r-2 border-rose-500 p-6 sm:p-10 flex flex-col justify-between text-stone-800"
        >
          {/* Top Bar Old Simulated Browser */}
          <div className="flex items-center justify-between border-b border-stone-300 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="text-xs font-mono font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-md border border-rose-300">
                ⚠️ Niet Veilig • Verouderd CMS (2014)
              </span>
            </div>
            <span className="text-[11px] font-black uppercase tracking-wider text-rose-700 bg-rose-100 px-3 py-1 rounded-full border border-rose-300">
              🐌 PageSpeed 34/100
            </span>
          </div>

          {/* Old Site Content Mockup */}
          <div className="my-auto max-w-xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 border border-rose-300 text-xs font-bold inline-block">
              ⌛ Verouderde WordPress / Wix Site
            </span>
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight text-stone-900 font-serif">
              Trage Laadtijden, Verouderde Plugins & Slechte Mobiele Weergave
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed font-serif">
              Hoge bounce-rate doordat mobiele bezoekers 4.8 seconden moeten wachten. Onduidelijke contactopties en kwetsbaar voor beveiligingslekken en spambots.
            </p>
            <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-bold">
              <span className="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-800 border border-rose-200">
                ❌ 4.8s Wachttijd
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-800 border border-rose-200">
                ❌ 48% Haakt Af op Mobiel
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-800 border border-rose-200">
                ❌ Verplichte Plugin Updates
              </span>
            </div>
          </div>

          <div className="text-[11px] font-semibold text-stone-500 border-t border-stone-300 pt-3 flex justify-between items-center font-serif">
            <span>Hoge maandelijkse onderhoudskosten voor trage plugins</span>
            <span className="font-bold text-rose-700">⚠️ Verouderde Software</span>
          </div>
        </div>

        {/* Center Divider Slider Line & Handle */}
        <div
          style={{ left: `${sliderPosition}%` }}
          className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl pointer-events-none transform -translate-x-1/2 flex items-center justify-center z-20"
        >
          <div className="w-10 h-10 rounded-full bg-orange-600 text-white font-black text-xs flex items-center justify-center shadow-xl border-2 border-white pointer-events-auto cursor-ew-resize transform hover:scale-110 active:scale-95 transition-transform">
            ⇄
          </div>
        </div>

        {/* Floating Labels */}
        <span className="absolute bottom-4 left-4 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs text-rose-300 text-[10px] font-bold uppercase tracking-wider border border-rose-400/30">
          ◀ Oude Situatie
        </span>
        <span className="absolute bottom-4 right-4 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-400/30">
          Nieuwe Situatie ▶
        </span>
      </div>

      {/* Accessible Slider Input for Screen Readers / Easy Touch */}
      <div className="mt-3 px-2 flex items-center gap-3 text-xs font-semibold text-stone-500">
        <span>Oude Site</span>
        <input
          type="range"
          min={0}
          max={100}
          value={sliderPosition}
          onChange={(e) => setSliderPosition(Number(e.target.value))}
          className="w-full accent-orange-600 cursor-pointer"
          aria-label="Vergelijk oude website met nieuwe website slider"
        />
        <span>Nieuwe Next.js Site</span>
      </div>

      {/* Realtime Performance Audit Scorecard */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 rounded-2xl bg-white border-2 border-stone-200/90 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-stone-500">Google PageSpeed Score</span>
            <Gauge className="w-4 h-4 text-orange-600" />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold text-rose-700">Oud: 34 / 100</span>
              <span className="text-xl font-black text-emerald-600">Nieuw: 99 / 100</span>
            </div>
            <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden flex">
              <div className="bg-rose-500 h-full w-[34%]" />
              <div className="bg-emerald-500 h-full w-[65%]" />
            </div>
          </div>
          <span className="text-[10px] text-stone-400 mt-2 font-medium">
            Next.js levert razendsnelle statische caching
          </span>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-2xl bg-white border-2 border-stone-200/90 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-stone-500">Laadtijd (LCP Benchmark)</span>
            <Clock className="w-4 h-4 text-orange-600" />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold text-rose-700">Oud: 4.8 sec</span>
              <span className="text-xl font-black text-emerald-600">Nieuw: 0.3 sec</span>
            </div>
            <span className="text-xs font-black text-emerald-700 block">
              ⚡ 16x snellere gebruikerservaring
            </span>
          </div>
          <span className="text-[10px] text-stone-400 mt-2 font-medium">
            Bezoekers haken niet meer af tijdens het laden
          </span>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-2xl bg-white border-2 border-stone-200/90 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-stone-500">Mobiele Conversie</span>
            <Smartphone className="w-4 h-4 text-orange-600" />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold text-rose-700">Oud: 48% haakt af</span>
              <span className="text-xl font-black text-emerald-600">Nieuw: +64% leads</span>
            </div>
            <span className="text-xs font-black text-emerald-700 block">
              1-klik WhatsApp & belknop
            </span>
          </div>
          <span className="text-[10px] text-stone-400 mt-2 font-medium">
            Perfect geoptimaliseerd voor smartphones
          </span>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-2xl bg-white border-2 border-stone-200/90 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-stone-500">Veiligheid & Onderhoud</span>
            <ShieldCheck className="w-4 h-4 text-orange-600" />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold text-rose-700">Oud: Lekke plugins</span>
              <span className="text-xl font-black text-emerald-600">Nieuw: 100% Veilig</span>
            </div>
            <span className="text-xs font-black text-emerald-700 block">
              Geen kwetsbare database
            </span>
          </div>
          <span className="text-[10px] text-stone-400 mt-2 font-medium">
            Gratis A+ SSL certificaat inbegrepen
          </span>
        </div>
      </div>

      {/* CTA Box */}
      <div className="mt-8 text-center bg-orange-50/80 border-2 border-orange-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left space-y-1">
          <h4 className="font-black text-stone-900 text-base sm:text-lg">
            {lang === 'nl' ? 'Heb je al een bestaande website die traag of verouderd is?' : 'Have an existing slow or outdated website?'}
          </h4>
          <p className="text-xs text-stone-600 font-medium">
            {lang === 'nl'
              ? 'Wij migreren al jouw bestaande teksten en afbeeldingen kosteloos naar een gloednieuwe Next.js site vanaf €175.'
              : 'We migrate all your texts and photos into a fresh Next.js website starting at €175.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto shrink-0">
          <button
            type="button"
            onClick={() => setIsCaseStudyOpen(true)}
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border-2 border-stone-300 font-extrabold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer whitespace-nowrap"
          >
            <FileText className="w-4 h-4 text-orange-600" />
            <span>{lang === 'nl' ? 'Bekijk Casestudie (+64% Leads)' : 'View Case Study (+64%)'}</span>
          </button>

          <button
            onClick={onOpenRedesignRequest}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-600/30 transition-all cursor-pointer whitespace-nowrap"
          >
            <span>{lang === 'nl' ? 'Gratis Redesign Scan' : 'Free Redesign Scan'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        isOpen={isCaseStudyOpen}
        onClose={() => setIsCaseStudyOpen(false)}
        lang={lang}
        onOpenRedesignRequest={onOpenRedesignRequest}
      />
    </section>
  );
};
