'use client';

import React from 'react';
import { Zap, Clock, ShieldCheck, ArrowRight, HelpCircle } from 'lucide-react';
import { Language } from '../types/company';

interface ExpressDeliveryCalloutProps {
  lang: Language;
  onOpenExpressRequest: () => void;
}

export const ExpressDeliveryCallout: React.FC<ExpressDeliveryCalloutProps> = ({
  lang,
  onOpenExpressRequest,
}) => {
  const handleStartExpressQuestionnaire = () => {
    window.location.href = '/vragenlijst?spoed=true';
  };

  return (
    <div className="my-6 p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-center justify-between gap-5 transition-colors">
      <div className="flex items-center gap-4 text-center md:text-left">
        <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/30 animate-pulse">
          <Zap className="w-6 h-6 fill-white" />
        </div>
        <div>
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <span className="text-xs font-black uppercase tracking-wider text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-300 dark:border-amber-800">
              ⚡ 72-Uur Spoedservice
            </span>
            <span className="text-xs font-bold text-stone-500 dark:text-slate-400">
              Voor Openingen & Beurzen
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-stone-900 dark:text-white mt-1">
            {lang === 'nl'
              ? 'Dringend een website nodig deze week? Wij kunnen binnen 72 uur live zijn!'
              : 'Urgent deadline this week? We can launch your site within 72 hours!'}
          </h3>
          <p className="text-xs text-stone-600 dark:text-slate-300 font-medium">
            Geen 8 weken wachttijd zoals bij bureaus. Vandaag besproken, binnen 3 dagen jouw eigen .nl website online.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto">
        <button
          type="button"
          onClick={handleStartExpressQuestionnaire}
          className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-orange-600/30 transition-transform active:scale-95 cursor-pointer whitespace-nowrap"
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>Start Spoed Vragenlijst (2 min)</span>
        </button>

        <button
          type="button"
          onClick={onOpenExpressRequest}
          className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-600/30 transition-transform active:scale-95 cursor-pointer whitespace-nowrap"
        >
          <span>Vraag Spoedlevering Aan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
