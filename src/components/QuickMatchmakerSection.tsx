'use client';

import React, { useState } from 'react';
import { Compass, Sparkles, CheckCircle2, ArrowRight, RotateCcw, Eye, ShieldCheck } from 'lucide-react';
import { WebTemplate, Language } from '../types/company';

interface QuickMatchmakerSectionProps {
  templates: WebTemplate[];
  lang: Language;
  onOpenLivePreview: (template: WebTemplate) => void;
  onOpenRequestModal: (template: WebTemplate) => void;
}

export const QuickMatchmakerSection: React.FC<QuickMatchmakerSectionProps> = ({
  templates,
  lang,
  onOpenLivePreview,
  onOpenRequestModal,
}) => {
  const [industry, setIndustry] = useState<string>('bouw');
  const [goal, setGoal] = useState<string>('leads');
  const [speed, setSpeed] = useState<string>('fast');

  const industries = [
    { id: 'bouw', label: '🏗️ Bouw & Vakmensen', cat: 'Local Services & Healthcare' },
    { id: 'horeca', label: '🍽️ Horeca & Restaurant', cat: 'Food & Hospitality' },
    { id: 'webshop', label: '🛒 Webshop & Producten', cat: 'Webshops & E-commerce' },
    { id: 'advies', label: '⚖️ Zakelijk, Advies & Boekhouding', cat: 'Creative & Agencies' },
    { id: 'zorg', label: '🧘 Zorg, Welzijn & Sport', cat: 'Local Services & Healthcare' },
    { id: 'tech', label: '🚀 Tech, SaaS & Innovatie', cat: 'Tech & SaaS' },
  ];

  const goals = [
    { id: 'leads', label: '📬 Offerteaanvragen & Leads ontvangen' },
    { id: 'sales', label: '💳 Direct verkopen via iDEAL checkout' },
    { id: 'booking', label: '📅 Online afspraken of reserveringen boeken' },
    { id: 'trust', label: '💎 Professioneel portfolio & autoriteit uitstralen' },
  ];

  const speeds = [
    { id: 'fast', label: '⚡ Binnen 2–3 werkdagen (Starter)', tier: 'Starter' },
    { id: 'standard', label: '💼 Binnen 3–5 werkdagen (Compleet MKB)', tier: 'Professional' },
    { id: 'full', label: '🛍️ Binnen 5–8 werkdagen (Webshop/Maatwerk)', tier: 'Custom Enterprise' },
  ];

  // Match recommendation logic
  const getMatches = (): WebTemplate[] => {
    let pool = [...templates];

    if (industry === 'webshop' || goal === 'sales') {
      const shopTemplates = pool.filter((t) => t.category === 'Webshops & E-commerce');
      if (shopTemplates.length > 0) return shopTemplates.slice(0, 2);
    }

    if (industry === 'horeca') {
      const horeca = pool.filter((t) => t.category === 'Food & Hospitality');
      if (horeca.length > 0) return horeca.slice(0, 2);
    }

    if (industry === 'tech') {
      const tech = pool.filter((t) => t.category === 'Tech & SaaS');
      if (tech.length > 0) return tech.slice(0, 2);
    }

    if (industry === 'advies') {
      const advies = pool.filter((t) => t.category === 'Creative & Agencies');
      if (advies.length > 0) return advies.slice(0, 2);
    }

    // Default to local services / bouw
    const local = pool.filter((t) => t.category === 'Local Services & Healthcare');
    if (local.length > 0) return local.slice(0, 2);

    return pool.slice(0, 2);
  };

  const matches = getMatches();

  return (
    <section id="matchmaker" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      <div className="bg-gradient-to-br from-stone-900 via-stone-900 to-orange-950 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 text-white rounded-3xl p-6 sm:p-10 border-2 border-orange-500/30 dark:border-blue-500/30 shadow-2xl relative overflow-hidden">
        
        {/* Glow sphere */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-2 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 text-xs font-black uppercase tracking-wider">
            <Compass className="w-4 h-4 text-orange-400" />
            <span>{lang === 'nl' ? '20-Seconden Website Matchmaker' : '20-Second Website Matchmaker'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            {lang === 'nl' ? 'Vind Direct de Perfecte Website Voor Jouw Doel' : 'Find Your Ideal Website Concept in 20 Seconds'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 font-medium">
            {lang === 'nl'
              ? 'Geen keuzestress meer tussen 40+ opties. Klik 3 keuzes aan en ontdek direct welk concept naadloos aansluit bij jouw onderneming.'
              : 'Choose your business type, goal and timeline to get instant tailored recommendations.'}
          </p>
        </div>

        {/* 3 Steps Selectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Step 1: Branche */}
          <div className="bg-white/5 dark:bg-slate-800/40 p-4 rounded-2xl border border-white/10">
            <span className="text-xs font-bold text-orange-400 dark:text-blue-300 block mb-3">
              1. Wat voor onderneming heb je?
            </span>
            <div className="space-y-1.5">
              {industries.map((ind) => (
                <button
                  key={ind.id}
                  type="button"
                  onClick={() => setIndustry(ind.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                    industry === ind.id
                      ? 'bg-orange-600 dark:bg-blue-600 text-white shadow-xs'
                      : 'bg-white/5 hover:bg-white/10 text-stone-300'
                  }`}
                >
                  <span>{ind.label}</span>
                  {industry === ind.id && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Doel */}
          <div className="bg-white/5 dark:bg-slate-800/40 p-4 rounded-2xl border border-white/10">
            <span className="text-xs font-bold text-orange-400 dark:text-blue-300 block mb-3">
              2. Wat is je belangrijkste online doel?
            </span>
            <div className="space-y-1.5">
              {goals.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGoal(g.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                    goal === g.id
                      ? 'bg-orange-600 dark:bg-blue-600 text-white shadow-xs'
                      : 'bg-white/5 hover:bg-white/10 text-stone-300'
                  }`}
                >
                  <span className="leading-snug">{g.label}</span>
                  {goal === g.id && <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0 ml-2" />}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Levertijd & Budget */}
          <div className="bg-white/5 dark:bg-slate-800/40 p-4 rounded-2xl border border-white/10">
            <span className="text-xs font-bold text-orange-400 dark:text-blue-300 block mb-3">
              3. Gewenste oplevering & type?
            </span>
            <div className="space-y-1.5">
              {speeds.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSpeed(s.id)}
                  className={`w-full text-left px-3 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                    speed === s.id
                      ? 'bg-orange-600 dark:bg-blue-600 text-white shadow-xs'
                      : 'bg-white/5 hover:bg-white/10 text-stone-300'
                  }`}
                >
                  <span>{s.label}</span>
                  {speed === s.id && <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0 ml-2" />}
                </button>
              ))}
            </div>

            <div className="mt-4 p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-[11px] text-orange-300 font-medium">
              ⚡ Alle concepten zijn 100% eigendom, inclusief mobiele optimalisatie en gratis revisieronde.
            </div>
          </div>
        </div>

        {/* Results Banner: Top 2 Matching Concepts */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-black text-white">
                Jouw Aanbevolen Concepten ({matches.length} Matches • 98% Score)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matches.map((tmpl) => (
              <div
                key={tmpl.id}
                className="bg-white/10 dark:bg-slate-800/80 rounded-2xl p-4 sm:p-5 border border-white/15 flex flex-col justify-between gap-4 hover:border-orange-400 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-orange-300 uppercase tracking-wider">
                      {tmpl.category}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/70 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                      98% Match
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white mb-1">{tmpl.name}</h3>
                  <p className="text-xs text-stone-300 leading-relaxed font-medium">
                    {lang === 'nl' ? tmpl.subtitleNl : tmpl.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {tmpl.badges.slice(0, 3).map((b, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-bold bg-white/10 text-stone-200 px-2 py-0.5 rounded-md"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => onOpenLivePreview(tmpl)}
                    className="flex-1 py-2 px-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Bekijk Demo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenRequestModal(tmpl)}
                    className="flex-1 py-2 px-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-orange-600/30 transition-transform active:scale-95 cursor-pointer"
                  >
                    <span>Vraag Aan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
