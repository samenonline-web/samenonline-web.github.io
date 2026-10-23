'use client';

import React, { useState } from 'react';
import { Calculator, Hammer, Home, CheckCircle2, ArrowRight, Sparkles, Ruler, Shield } from 'lucide-react';

interface InteractiveConstructionCalculatorProps {
  onOpenQuoteRequest?: (data: { projectType: string; sizeM2: number; estimatedCost: number; finishLevel: string }) => void;
}

export const InteractiveConstructionCalculator: React.FC<InteractiveConstructionCalculatorProps> = ({
  onOpenQuoteRequest,
}) => {
  const [projectType, setProjectType] = useState<'aanbouw' | 'dakkapel' | 'badkamer' | 'kozijnen'>('aanbouw');
  const [size, setSize] = useState<number>(20); // m² or units
  const [finishLevel, setFinishLevel] = useState<'standaard' | 'luxe'>('standaard');
  const [includePermit, setIncludePermit] = useState<boolean>(true);

  const projectConfig = {
    aanbouw: {
      title: 'Aanbouw / Uitbouw',
      unitLabel: 'Oppervlakte',
      unitSymbol: 'm²',
      min: 10,
      max: 50,
      basePerUnit: 1850,
      luxuryMultiplier: 1.25,
      permitFee: 1450,
      durationDays: '15–20 werkdagen',
    },
    dakkapel: {
      title: 'Dakkapel Plaatsing',
      unitLabel: 'Breedte',
      unitSymbol: 'meter',
      min: 2,
      max: 7,
      basePerUnit: 1400,
      luxuryMultiplier: 1.2,
      permitFee: 450,
      durationDays: '1–2 werkdagen',
    },
    badkamer: {
      title: 'Badkamer Renovatie',
      unitLabel: 'Vloeroppervlakte',
      unitSymbol: 'm²',
      min: 4,
      max: 18,
      basePerUnit: 1250,
      luxuryMultiplier: 1.35,
      permitFee: 0,
      durationDays: '7–10 werkdagen',
    },
    kozijnen: {
      title: 'Kunststof / Hout Kozijnen',
      unitLabel: 'Aantal Ramen / Deuren',
      unitSymbol: 'stuks',
      min: 2,
      max: 16,
      basePerUnit: 850,
      luxuryMultiplier: 1.3,
      permitFee: 0,
      durationDays: '3–5 werkdagen',
    },
  };

  const currentCfg = projectConfig[projectType];
  const unitCost = currentCfg.basePerUnit * (finishLevel === 'luxe' ? currentCfg.luxuryMultiplier : 1);
  const subtotal = Math.round(unitCost * size);
  const permitCost = includePermit ? currentCfg.permitFee : 0;
  const totalEstimate = subtotal + permitCost;

  const handleRequestQuote = () => {
    if (onOpenQuoteRequest) {
      onOpenQuoteRequest({
        projectType: currentCfg.title,
        sizeM2: size,
        estimatedCost: totalEstimate,
        finishLevel,
      });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-md transition-colors">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/70 text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-orange-800/60 text-xs font-black uppercase tracking-wider mb-2">
            <Calculator className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span>Interactieve Bouwcalculator</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white tracking-tight">
            Bereken Direct Jouw Richtprijs &amp; Bouwtijd
          </h3>
          <p className="text-xs text-stone-600 dark:text-slate-300 font-medium max-w-xl mt-1">
            Transparante kostenindicatie voor particulieren en aannemers in Nederland. Direct inzicht in materiaal, arbeid en vergunning.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold shrink-0">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Vaste Richtprijzen 2026</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Project Type Selector */}
          <div>
            <label className="text-xs font-bold text-stone-700 dark:text-slate-300 block mb-2">
              1. Kies Type Verbouwing
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['aanbouw', 'dakkapel', 'badkamer', 'kozijnen'] as const).map((key) => {
                const isSelected = projectType === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setProjectType(key);
                      setSize(projectConfig[key].min + Math.round((projectConfig[key].max - projectConfig[key].min) / 3));
                    }}
                    className={`p-3 rounded-2xl text-left border text-xs font-extrabold transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                      isSelected
                        ? 'bg-orange-700 text-white border-orange-700 shadow-md shadow-orange-700/20'
                        : 'bg-slate-50 dark:bg-slate-800/80 text-stone-800 dark:text-slate-200 border-slate-200/80 dark:border-slate-700 hover:border-orange-300'
                    }`}
                  >
                    <Hammer className="w-4 h-4" />
                    <span>{projectConfig[key].title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Size Slider */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-3">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-stone-700 dark:text-slate-300 flex items-center gap-1.5">
                <Ruler className="w-4 h-4 text-orange-600" />
                <span>{currentCfg.unitLabel}:</span>
              </span>
              <span className="text-base font-black font-mono text-orange-700 dark:text-orange-400">
                {size} {currentCfg.unitSymbol}
              </span>
            </div>
            <input
              type="range"
              min={currentCfg.min}
              max={currentCfg.max}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full accent-orange-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-stone-500 font-mono">
              <span>Min. {currentCfg.min} {currentCfg.unitSymbol}</span>
              <span>Max. {currentCfg.max} {currentCfg.unitSymbol}</span>
            </div>
          </div>

          {/* 3. Finish Level */}
          <div>
            <label className="text-xs font-bold text-stone-700 dark:text-slate-300 block mb-2">
              3. Afwerkingsniveau
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFinishLevel('standaard')}
                className={`p-3.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer text-left ${
                  finishLevel === 'standaard'
                    ? 'bg-orange-50 dark:bg-orange-950/60 border-orange-500 text-orange-950 dark:text-orange-200 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-stone-700 dark:text-slate-300'
                }`}
              >
                <div className="font-black text-sm">Standaard Afbouw</div>
                <div className="text-[11px] opacity-80 mt-0.5">Casco gereed + stucwerk &amp; basis leidingwerk</div>
              </button>

              <button
                type="button"
                onClick={() => setFinishLevel('luxe')}
                className={`p-3.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer text-left ${
                  finishLevel === 'luxe'
                    ? 'bg-orange-50 dark:bg-orange-950/60 border-orange-500 text-orange-950 dark:text-orange-200 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-stone-700 dark:text-slate-300'
                }`}
              >
                <div className="font-black text-sm flex items-center gap-1.5">
                  <span>Luxe Afwerking</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <div className="text-[11px] opacity-80 mt-0.5">Vloerverwarming, spots &amp; premium materialen</div>
              </button>
            </div>
          </div>

          {/* Permit Toggle */}
          {currentCfg.permitFee > 0 && (
            <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 cursor-pointer text-xs font-bold text-stone-800 dark:text-slate-200">
              <input
                type="checkbox"
                checked={includePermit}
                onChange={(e) => setIncludePermit(e.target.checked)}
                className="w-4 h-4 accent-orange-600 rounded cursor-pointer"
              />
              <span className="flex-1">Inclusief omgevingsvergunning &amp; constructieberekening (+€{currentCfg.permitFee})</span>
            </label>
          )}
        </div>

        {/* Real-Time Result Box */}
        <div className="lg:col-span-5 bg-gradient-to-br from-stone-900 via-stone-900 to-slate-900 text-white rounded-3xl p-6 sm:p-7 border border-stone-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <span className="text-xs font-mono font-bold text-stone-400">Kostencalculatie</span>
            <span className="text-[11px] font-black uppercase tracking-wider text-orange-400 bg-orange-950/80 px-2.5 py-0.5 rounded-full border border-orange-500/30">
              {currentCfg.durationDays}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center text-stone-300">
              <span>{currentCfg.title} ({size} {currentCfg.unitSymbol}):</span>
              <span className="font-mono font-bold text-white">€{subtotal.toLocaleString('nl-NL')}</span>
            </div>
            {includePermit && currentCfg.permitFee > 0 && (
              <div className="flex justify-between items-center text-stone-300">
                <span>Vergunning &amp; Bouwtekening:</span>
                <span className="font-mono font-bold text-white">€{currentCfg.permitFee.toLocaleString('nl-NL')}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-stone-300">
              <span>Afwerkingsniveau:</span>
              <span className="font-bold text-orange-300 capitalize">{finishLevel}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 space-y-1">
            <span className="text-xs text-stone-400 font-medium">Geschatte Totaalinvestering:</span>
            <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white flex items-baseline gap-2">
              <span>€{totalEstimate.toLocaleString('nl-NL')}</span>
              <span className="text-xs font-normal text-stone-400 font-sans">indicatief incl. btw</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={handleRequestQuote}
              className="w-full py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-600/30 transition-transform active:scale-95 cursor-pointer"
            >
              <span>Vrijblijvende Offerte Ontvangen</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex items-center justify-center gap-2 text-[10px] text-stone-400">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Vrijblijvend • Reactie binnen 24 uur</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
