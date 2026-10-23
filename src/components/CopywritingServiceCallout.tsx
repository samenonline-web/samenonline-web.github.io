'use client';

import React from 'react';
import { PenTool, CheckCircle2, Sparkles, ArrowRight, Heart } from 'lucide-react';
import { Language } from '../types/company';

interface CopywritingServiceCalloutProps {
  lang: Language;
  onOpenRequestModal: () => void;
}

export const CopywritingServiceCallout: React.FC<CopywritingServiceCalloutProps> = ({
  lang,
  onOpenRequestModal,
}) => {
  const steps = [
    { num: '1', title: '5 Steekwoorden', desc: 'Vertel ons in een paar zinnen wat je doet en wie je doelgroep is.' },
    { num: '2', title: 'Professionele Teksten', desc: 'Wij schrijven wervende teksten voor Home, Over Ons, Diensten en Contact.' },
    { num: '3', title: 'Google SEO Titels', desc: 'Inclusief doeltreffende zoekwoorden voor jouw stad en regio.' },
    { num: '4', title: 'Kosteloos Aanpassen', desc: 'Niet 100% tevreden? We herschrijven kosteloos tot het klopt.' },
  ];

  return (
    <div className="my-10 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-orange-100 dark:border-slate-800 shadow-md transition-colors">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-blue-950/80 text-orange-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-xs">
            <PenTool className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-orange-50 dark:bg-blue-950/60 text-orange-700 dark:text-blue-300 text-[10px] font-black uppercase tracking-wider mb-1">
              <Sparkles className="w-3 h-3" />
              <span>{lang === 'nl' ? 'De Samen Online Schrijfservice' : 'Copywriting Assistance'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white tracking-tight">
              {lang === 'nl'
                ? 'Geen Inspiratie voor Teksten? Wij Regelen Het Voor Je!'
                : 'Struggling with Copywriting? We Write It For You!'}
            </h3>
            <p className="text-xs text-stone-600 dark:text-slate-300 font-medium max-w-xl">
              {lang === 'nl'
                ? 'De meeste ondernemers stellen een website uit omdat ze opzien tegen het schrijven van teksten. Bij ons hoef je alleen 5 steekwoorden door te geven.'
                : 'Do not let copy stall your launch. Give us 5 keywords and we write tailored, professional Dutch texts.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenRequestModal}
          className="px-5 py-2.5 rounded-xl bg-orange-700 hover:bg-orange-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-md shadow-orange-700/20 transition-all cursor-pointer whitespace-nowrap shrink-0"
        >
          <span>Laat Ons Jouw Teksten Schrijven</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-orange-100/70 dark:border-slate-800">
        {steps.map((s) => (
          <div key={s.num} className="p-3.5 rounded-2xl bg-orange-50/40 dark:bg-slate-800/40 border border-orange-100/60 dark:border-slate-700/60">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-6 h-6 rounded-lg bg-orange-600 text-white text-[11px] font-black flex items-center justify-center shrink-0">
                {s.num}
              </span>
              <span className="text-xs font-black text-stone-900 dark:text-white">
                {s.title}
              </span>
            </div>
            <p className="text-[11px] text-stone-600 dark:text-slate-300 font-medium leading-relaxed">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
