'use client';

import React from 'react';
import { Zap, Clock, ShieldCheck, Layers, CreditCard, Award, HeartHandshake } from 'lucide-react';
import { Language } from '../types/company';

interface StatsBarProps {
  lang: Language;
}

export const StatsBar: React.FC<StatsBarProps> = ({ lang }) => {
  const stats = [
    {
      icon: <Layers className="w-4 h-4 text-orange-600 dark:text-blue-400" />,
      value: '40+',
      label: lang === 'nl' ? 'Next.js Concepten' : 'Next.js Concepts',
      sub: lang === 'nl' ? 'Direct te personaliseren' : 'Ready to customize',
    },
    {
      icon: <Zap className="w-4 h-4 text-amber-500 dark:text-cyan-400" />,
      value: '100/100',
      label: lang === 'nl' ? 'Core Web Vitals' : 'Core Web Vitals',
      sub: lang === 'nl' ? 'Google Lighthouse score' : 'Google Lighthouse score',
    },
    {
      icon: <Clock className="w-4 h-4 text-orange-600 dark:text-blue-400" />,
      value: '2–5 Dagen',
      label: lang === 'nl' ? 'Doorlooptijd' : 'Turnaround',
      sub: lang === 'nl' ? 'Van idee tot live' : 'From idea to live',
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
      value: '100%',
      label: lang === 'nl' ? 'Jouw Eigendom' : 'Full Ownership',
      sub: lang === 'nl' ? 'Geen platform lock-in' : 'Zero vendor lock-in',
    },
    {
      icon: <CreditCard className="w-4 h-4 text-orange-600 dark:text-blue-400" />,
      value: 'iDEAL',
      label: lang === 'nl' ? 'Direct Betaalgereed' : 'Payment Ready',
      sub: lang === 'nl' ? 'Mollie & Stripe integratie' : 'Mollie & Stripe ready',
    },
    {
      icon: <HeartHandshake className="w-4 h-4 text-amber-600 dark:text-cyan-400" />,
      value: '0 Zorgen',
      label: lang === 'nl' ? 'Persoonlijk Contact' : 'Direct Support',
      sub: lang === 'nl' ? 'Geen bureaucratisch doolhof' : 'No corporate maze',
    },
  ];

  return (
    <section className="relative z-10 bg-white/90 dark:bg-[#090E1A]/95 border-b border-slate-200/80 dark:border-slate-800/80 py-3.5 px-4 sm:px-6 transition-colors shadow-2xs">
      <div className="max-w-7xl mx-auto">
        {/* Horizontal scroller on mobile, centered grid on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="group relative flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 border border-slate-200/70 dark:border-slate-700/60 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200 shadow-2xs hover:shadow-xs"
            >
              <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700/80 flex items-center justify-center shrink-0 border border-slate-200/60 dark:border-slate-600/60 group-hover:scale-105 transition-transform">
                {stat.icon}
              </div>
              <div className="min-w-0">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-black text-stone-900 dark:text-white tracking-tight">
                    {stat.value}
                  </span>
                </div>
                <div className="text-[11px] font-bold text-stone-700 dark:text-slate-200 truncate">
                  {stat.label}
                </div>
                <div className="text-[10px] text-stone-500 dark:text-slate-400 truncate">
                  {stat.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
