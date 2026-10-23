'use client';

import React, { useState } from 'react';
import { TrendingUp, Sparkles, CheckCircle2, ArrowRight, DollarSign } from 'lucide-react';
import { Language } from '../types/company';

interface CustomerRoiBreakEvenProps {
  lang: Language;
  onOpenRequestModal: () => void;
}

export const CustomerRoiBreakEven: React.FC<CustomerRoiBreakEvenProps> = ({
  lang,
  onOpenRequestModal,
}) => {
  const [customerValue, setCustomerValue] = useState(350); // average ticket size in EUR
  const siteCost = 195; // professional website package

  const breakEvenMonths = (siteCost / customerValue).toFixed(1);
  const breakEvenDays = Math.max(2, Math.round((siteCost / customerValue) * 30));
  const yearlyGain = customerValue * 12 - siteCost;

  return (
    <div className="my-6 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm transition-colors">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs font-black uppercase tracking-wider mb-2">
            <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{lang === 'nl' ? 'Rendementsberekenaar' : 'Break-Even ROI Engine'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white tracking-tight">
            {lang === 'nl'
              ? 'Wanneer Heeft Jouw Nieuwe Website Zich Volledig Terugverdiend?'
              : 'When Does Your Website Pay for Itself?'}
          </h3>
          <p className="text-xs text-stone-600 dark:text-slate-300 font-medium max-w-xl">
            Verschuif de slider naar jouw gemiddelde klantwaarde om te zien hoe snel een professionele website winstgevend is.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenRequestModal}
          className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs flex items-center gap-2 shadow-md shadow-emerald-700/20 transition-all cursor-pointer whitespace-nowrap shrink-0"
        >
          <span>Start Jouw Winstgevende Site</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Slider & Metrics */}
      <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-emerald-200 dark:border-slate-800 shadow-xs">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-black text-stone-800 dark:text-slate-200">
              Wat is de gemiddelde omzet van 1 nieuwe klant voor jou?
            </label>
            <span className="text-lg font-black text-emerald-700 dark:text-emerald-400 font-mono">
              €{customerValue},-
            </span>
          </div>
          <input
            type="range"
            min="100"
            max="1500"
            step="50"
            value={customerValue}
            onChange={(e) => setCustomerValue(Number(e.target.value))}
            className="w-full h-2 bg-stone-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-[10px] text-stone-400 font-bold mt-1">
            <span>€100 (bijv. Schoonheidsbehandeling)</span>
            <span>€750 (bijv. Schilder / Advies)</span>
            <span>€1.500+ (bijv. Aannemer / Zaak)</span>
          </div>
        </div>

        {/* 3 Outcome Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-100 dark:border-slate-800">
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-slate-800 text-center sm:text-left">
            <span className="text-[10px] uppercase font-bold text-stone-500 dark:text-slate-400">
              Klanten nodig voor break-even:
            </span>
            <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400 mt-1">
              Slechts 1 Klant!
            </div>
            <p className="text-[11px] text-stone-600 dark:text-slate-300 font-medium mt-0.5">
              Bij €{customerValue} dekt de allereerste boeking al de hele site.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-slate-800 text-center sm:text-left">
            <span className="text-[10px] uppercase font-bold text-stone-500 dark:text-slate-400">
              Geschatte terugverdientijd:
            </span>
            <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400 mt-1">
              Binnen ~{breakEvenDays} Dagen
            </div>
            <p className="text-[11px] text-stone-600 dark:text-slate-300 font-medium mt-0.5">
              Vanaf dag 1 direct live voor potentiële Google zoekers.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-slate-800 text-center sm:text-left">
            <span className="text-[10px] uppercase font-bold text-stone-500 dark:text-slate-400">
              Jaarlijkse extra netto-omzet:
            </span>
            <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400 mt-1">
              +€{yearlyGain.toLocaleString('nl-NL')},-
            </div>
            <p className="text-[11px] text-stone-600 dark:text-slate-300 font-medium mt-0.5">
              Bij slechts 1 extra klant per maand via jouw nieuwe website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
