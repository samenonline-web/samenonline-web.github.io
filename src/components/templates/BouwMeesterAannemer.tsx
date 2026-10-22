'use client';

import React, { useState } from 'react';
import { TemplateProps } from '../../types/theme';
import {
  HardHat,
  Ruler,
  CheckCircle2,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Star,
  Sun,
  Moon,
  Sparkles,
  MapPin,
  Hammer,
  Layers,
  ChevronRight,
} from 'lucide-react';

interface ProjectCase {
  id: string;
  title: string;
  location: string;
  type: string;
  duration: string;
  beforeImg: string;
  afterImg: string;
}

const PROJECTS: ProjectCase[] = [
  {
    id: 'b1',
    title: 'Moderne Woonkeuken & Uitbouw (3.5m)',
    location: 'Amersfoort • Vathorst',
    type: 'Uitbouw & Glazen Pui',
    duration: '4 weken',
    beforeImg: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'b2',
    title: 'Luxe Wellness Badkamer & Inloopdouche',
    location: 'Utrecht • Tuindorp',
    type: 'Badkamer Renovatie',
    duration: '2.5 weken',
    beforeImg: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'b3',
    title: 'Prefab Kunststof Dakkapel (5 meter)',
    location: 'Hilversum • Crailo',
    type: 'Dakkapel & Zolderisolatie',
    duration: '1 dag geplaatst',
    beforeImg: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
  },
];

export const BouwMeesterAannemer: React.FC<TemplateProps> = ({
  theme,
  isDarkMode,
  onToggleDarkMode,
  onRequestQuote,
}) => {
  const [renovationType, setRenovationType] = useState<'uitbouw' | 'dakkapel' | 'badkamer' | 'totaal'>('uitbouw');
  const [squareMeters, setSquareMeters] = useState(25);
  const [activeProject, setActiveProject] = useState(PROJECTS[0].id);
  const [showAfter, setShowAfter] = useState<Record<string, boolean>>({ b1: true, b2: true, b3: true });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Realistic Price Estimator
  const baseRates = {
    uitbouw: 2200, // per m2
    dakkapel: 1100, // per meter/m2
    badkamer: 1400,
    totaal: 950,
  };

  const calculatedCost = squareMeters * baseRates[renovationType];
  const calculatedWeeks = Math.max(2, Math.round(squareMeters / 6));

  const currentProjectObj = PROJECTS.find((p) => p.id === activeProject) || PROJECTS[0];

  return (
    <div className="min-h-full bg-stone-50 text-stone-900 font-sans relative selection:bg-orange-600 selection:text-white">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold border border-stone-700 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className={`py-1.5 px-4 text-center text-xs font-bold text-white ${theme.primary} flex items-center justify-center gap-2 shadow-xs`}>
        <HardHat className="w-3.5 h-3.5" />
        <span>BouwGarant Erkend • 10 Jaar Constructiegarantie • Vaste Prijsafspraak Zonder Meerwerk-Verrassingen</span>
      </div>

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${theme.primary} text-white font-black flex items-center justify-center text-sm shadow-md`}>
            BM
          </div>
          <div>
            <span className="font-black text-base sm:text-lg tracking-tight block">BouwMeester Aannemers</span>
            <span className="text-[10px] text-stone-500 font-medium hidden sm:block">Midden-Nederland • Verbouwingen & Aanbouw</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-stone-700">
          <a href="#calculator" className="hover:text-stone-900">M² Calculator</a>
          <a href="#projecten" className="hover:text-stone-900">Voor & Na Projecten</a>
          <a href="#garanties" className="hover:text-stone-900">Bouwzekerheid</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer border border-stone-200 flex items-center gap-1.5"
              title={isDarkMode ? 'Lichte Modus' : 'Donkere Modus'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
              <span className="hidden sm:inline text-xs font-bold">{isDarkMode ? 'Licht' : 'Donker'}</span>
            </button>
          )}

          <a
            href="#calculator"
            className={`px-4 py-2 rounded-xl ${theme.primary} ${theme.primaryHover} text-white text-xs font-black shadow-md cursor-pointer`}
          >
            Bereken Kosten
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-stone-100/60 via-stone-50 to-white py-14 sm:py-20 px-4 sm:px-8 border-b border-stone-200 text-center">
        <div className="max-w-4xl mx-auto">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText} text-xs font-black mb-4 border ${theme.borderLight}`}>
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Erkend Aannemersbedrijf • Meer dan 280+ Verbouwingen Uitgevoerd</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4">
            Zorgeloos verbouwen met een <span className={theme.textPrimary}>betrouwbare aannemer</span>.
          </h1>

          <p className="text-sm sm:text-base text-stone-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Van fundering en staalconstructie tot hoogwaardige stuc- en tegelafwerking. Eén vast aanspreekpunt, heldere planning en gegarandeerde opleverdatum.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <a
              href="#calculator"
              className={`px-6 py-3 rounded-xl ${theme.primary} ${theme.primaryHover} text-white font-extrabold text-xs shadow-md flex items-center gap-2`}
            >
              <Ruler className="w-4 h-4" />
              <span>Bereken Jouw Verbouwing</span>
            </a>
            <button
              onClick={onRequestQuote}
              className="px-6 py-3 rounded-xl bg-white border border-stone-300 text-stone-800 text-xs font-extrabold hover:bg-stone-50 cursor-pointer shadow-xs"
            >
              Plan Werkopname op Locatie
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-stone-500 pt-6 border-t border-stone-200">
            <span className="text-stone-800 font-extrabold">🏆 BouwGarant Keurmerk</span>
            <span>•</span>
            <span className="text-stone-800 font-extrabold">🔨 VCA** Veiligheidsnormen</span>
            <span>•</span>
            <span className="text-stone-800 font-extrabold">⭐ 4.9/5 op Werkspot (180+ reviews)</span>
          </div>
        </div>
      </section>

      {/* Interactive M² Construction Calculator */}
      <section id="calculator" className="py-12 sm:py-16 px-4 sm:px-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl border-2 border-stone-200 p-6 sm:p-10 shadow-lg">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900">Directe Verbouwing M² Calculator</h2>
            <p className="text-xs sm:text-sm text-stone-500 font-medium mt-1">
              Kies jouw type verbouwing en verschuif de oppervlakte voor een realistische richtprijs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Controls */}
            <div className="lg:col-span-7 space-y-6">
              {/* Type Selection */}
              <div>
                <label className="text-xs font-black text-stone-700 block mb-2">1. Kies type verbouwing:</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'uitbouw', label: 'Woonkamer / Keuken Uitbouw', icon: '🏡' },
                    { id: 'dakkapel', label: 'Dakkapel & Zolderverbouw', icon: '🪟' },
                    { id: 'badkamer', label: 'Luxe Badkamer Renovatie', icon: '🚿' },
                    { id: 'totaal', label: 'Complete Woningrenovatie', icon: '🔨' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setRenovationType(item.id as any)}
                      className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                        renovationType === item.id
                          ? `${theme.borderLight} bg-stone-50 ring-2 ring-orange-500/25`
                          : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-extrabold text-xs text-stone-900">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider for m² */}
              <div className="bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-black text-stone-700">Geschat oppervlakte / afmeting:</span>
                  <span className={`text-base font-black ${theme.textPrimary}`}>{squareMeters} m²</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="80"
                  step="5"
                  value={squareMeters}
                  onChange={(e) => setSquareMeters(Number(e.target.value))}
                  className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <div className="flex justify-between text-[10px] text-stone-400 font-bold mt-1.5">
                  <span>5 m²</span>
                  <span>40 m²</span>
                  <span>80 m²</span>
                </div>
              </div>
            </div>

            {/* Price Output Card */}
            <div className={`lg:col-span-5 ${theme.bgLight} p-6 sm:p-8 rounded-3xl border-2 ${theme.borderLight} text-left flex flex-col justify-between`}>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-orange-800 bg-orange-100 px-2.5 py-1 rounded-md inline-block mb-3">
                  Indicatieve Investering
                </span>
                <div className="text-3xl sm:text-4xl font-black text-stone-900 mb-1">
                  €{calculatedCost.toLocaleString('nl-NL')}
                  <span className="text-xs font-bold text-stone-500"> incl. btw & materialen</span>
                </div>
                <p className="text-xs text-stone-600 mb-6 font-medium">
                  Geschatte doorlooptijd: <strong className="text-stone-900">~{calculatedWeeks} werkweken</strong> van sloop tot oplevering.
                </p>

                <div className="space-y-2 text-xs font-bold text-stone-700">
                  <div className="bg-white p-2.5 rounded-xl border border-stone-200 flex justify-between">
                    <span>Bouwtekening & constructieberekening:</span>
                    <span className="font-black text-emerald-700">Inbegrepen</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-stone-200 flex justify-between">
                    <span>Afvoer sloopafval & container:</span>
                    <span className="font-black text-emerald-700">Inbegrepen</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-stone-200 flex justify-between">
                    <span>10 Jaar BouwGarant zekerheid:</span>
                    <span className="font-black text-emerald-700">Gedekt</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onRequestQuote}
                className={`w-full py-3.5 rounded-xl ${theme.primary} ${theme.primaryHover} text-white font-black text-xs shadow-md mt-6 cursor-pointer`}
              >
                Vraag Vrijblijvende Offerte & Werkopname Aan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Before / After Project Showcase */}
      <section id="projecten" className="bg-stone-100/70 py-12 sm:py-16 px-4 sm:px-8 border-t border-stone-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900">Voor & Na Verbouwingen</h2>
            <p className="text-xs sm:text-sm text-stone-500 font-medium">Bekijk het resultaat van onze recente projecten in de regio</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROJECTS.map((proj) => {
              const isAfter = showAfter[proj.id] ?? true;
              return (
                <div key={proj.id} className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs flex flex-col justify-between">
                  <div className="relative h-56 w-full overflow-hidden bg-stone-100">
                    <img
                      src={isAfter ? proj.afterImg : proj.beforeImg}
                      alt={proj.title}
                      className="w-full h-full object-cover transition-all duration-300"
                    />

                    {/* Toggle Button Overlay */}
                    <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md rounded-xl p-1 flex gap-1 text-[10px] font-black text-white">
                      <button
                        onClick={() => setShowAfter({ ...showAfter, [proj.id]: false })}
                        className={`px-2 py-0.5 rounded-lg cursor-pointer transition-colors ${!isAfter ? 'bg-orange-600 text-white' : 'text-stone-300'}`}
                      >
                        Voor
                      </button>
                      <button
                        onClick={() => setShowAfter({ ...showAfter, [proj.id]: true })}
                        className={`px-2 py-0.5 rounded-lg cursor-pointer transition-colors ${isAfter ? 'bg-emerald-600 text-white' : 'text-stone-300'}`}
                      >
                        Na
                      </button>
                    </div>

                    <span className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md">
                      {proj.duration}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-black text-orange-600 uppercase tracking-wider block mb-1">
                        {proj.type}
                      </span>
                      <h3 className="font-black text-base text-stone-900 mb-1 leading-snug">{proj.title}</h3>
                      <p className="text-xs text-stone-500 font-medium mb-3">{proj.location}</p>
                    </div>

                    <button
                      onClick={onRequestQuote}
                      className="w-full py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Bespreek Dit Type Verbouwing
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
