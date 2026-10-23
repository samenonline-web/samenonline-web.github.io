'use client';

import React from 'react';
import { Layout, MessageSquareCheck, Palette, Rocket, CheckCircle2, ArrowRight } from 'lucide-react';
import { Language } from '../types/company';

interface HowItWorksSectionProps {
  lang: Language;
  onOpenRequestModal: () => void;
  onScrollToTemplates: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  lang,
  onOpenRequestModal,
  onScrollToTemplates,
}) => {
  const steps = [
    {
      step: '01',
      icon: Layout,
      titleNl: 'Kies een Concept of Lever Eigen Plan Aan',
      titleEn: 'Choose a Concept or Submit Your Own Plan',
      descNl:
        'Kies uit 33 interactieve branche-templates, vraag een redesign aan van je huidige trage website, of lever een eigen Figma schets aan.',
      descEn:
        'Select from 33 industry templates, request an existing site redesign, or supply your own wireframe or Figma plan.',
      badgeNl: 'Stap 1: Jouw Keuze',
      badgeEn: 'Step 1: Your Choice',
      verifiedNl: '100% Tevredenheid',
      verifiedEn: '100% Satisfaction',
    },
    {
      step: '02',
      icon: MessageSquareCheck,
      titleNl: 'Persoonlijk Contact & Vaste Prijsafspraak',
      titleEn: 'Personal Contact & Transparent Fixed Price',
      descNl:
        'Binnen 24 uur bespreken we jouw wensen. Je ontvangt direct een heldere offerte zonder nacalculatie of verborgen abonnementskosten.',
      descEn:
        'Within 24 hours we review your needs and give a fixed, clear quote with no hidden recurring subscription traps.',
      badgeNl: 'Stap 2: Afstemming',
      badgeEn: 'Step 2: Alignment',
      verifiedNl: 'Binnen 24u reactie',
      verifiedEn: 'Response within 24h',
    },
    {
      step: '03',
      icon: Palette,
      titleNl: 'Inrichten met Jouw Huisstijl & Hosting',
      titleEn: 'Custom Branding, Content & Hosting Setup',
      descNl:
        'We vullen de website met jouw logo, teksten, foto’s en kleuren. Wij koppelen je gewenste .nl domeinnaam en NVMe SSD webhosting.',
      descEn:
        'We tailor your logo, texts, photos, and brand colors. We link your .nl domain and high-speed NVMe hosting.',
      badgeNl: 'Stap 3: Realisatie',
      badgeEn: 'Step 3: Customization',
      verifiedNl: 'Kosteloze correctieronde',
      verifiedEn: 'Free revision round',
    },
    {
      step: '04',
      icon: Rocket,
      titleNl: 'Binnen 2 tot 5 Werkdagen Live op Internet',
      titleEn: 'Live on Google in 2 to 5 Business Days',
      descNl:
        'Na jouw finale akkoord zetten we de website live. Razendsnel, 100% jouw eigendom en optimaal beveiligd met gratis SSL certificaat.',
      descEn:
        'Upon your approval, your site launches online. Ultra fast, 100% your own property, and secured with SSL.',
      badgeNl: 'Stap 4: Lancering',
      badgeEn: 'Step 4: Launch',
      verifiedNl: '2-5 werkdagen live',
      verifiedEn: '2-5 business days live',
    },
  ];

  return (
    <section id="hoe-wij-werken" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-orange-800/60 text-xs font-black uppercase tracking-wider">
          <CheckCircle2 className="w-4 h-4 text-orange-600 dark:text-orange-400" />
          <span>{lang === 'nl' ? 'Transparante Werkwijze' : 'How We Work'}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white tracking-tight">
          {lang === 'nl' ? 'Van Eerste Idee Tot Live Website in 4 Stappen' : 'From Idea to Live Website in 4 Simple Steps'}
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 font-medium leading-relaxed max-w-xl mx-auto">
          {lang === 'nl'
            ? 'Geen maandenlange trajecten of ondoorzichtige uurtarieven. Samen Online staat voor snelheid, heldere communicatie en 100% eigendom.'
            : 'No endless meetings or opaque hourly billing. We offer fast turnaround, transparent communication, and 100% ownership.'}
        </p>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.step}
              className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-7 border-2 border-stone-200/90 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-orange-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between relative group"
            >
              <div>
                {/* Step Top Bar */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-black text-stone-300 dark:text-slate-700 group-hover:text-orange-500 transition-colors font-mono">
                    {item.step}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-slate-800 border border-orange-200 dark:border-slate-700 text-orange-600 dark:text-orange-400 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <span className="text-[10px] font-black uppercase tracking-wider text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-950/80 px-2.5 py-0.5 rounded-full inline-block mb-3">
                  {lang === 'nl' ? item.badgeNl : item.badgeEn}
                </span>

                <h3 className="font-black text-base sm:text-lg text-stone-900 dark:text-white leading-snug mb-2">
                  {lang === 'nl' ? item.titleNl : item.titleEn}
                </h3>

                <p className="text-xs text-stone-600 dark:text-slate-300 font-medium leading-relaxed">
                  {lang === 'nl' ? item.descNl : item.descEn}
                </p>
              </div>

              {/* Step Footer Indicator */}
              <div className="pt-4 mt-4 border-t border-stone-100 dark:border-slate-800 flex items-center text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                <span>{lang === 'nl' ? item.verifiedNl : item.verifiedEn}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA Banner */}
      <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-stone-900 to-stone-800 dark:from-slate-950 dark:to-slate-900 dark:border dark:border-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl transition-colors">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-black text-white">
            {lang === 'nl' ? 'Klaar om jouw onderneming online te laten schitteren?' : 'Ready to launch your business online?'}
          </h3>
          <p className="text-xs text-stone-300 dark:text-slate-300 font-medium">
            {lang === 'nl'
              ? 'Kies een concept sjabloon of vraag direct een vrijblijvend adviesgesprek aan.'
              : 'Choose a template or request a free consultation today.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onScrollToTemplates}
            className="px-5 py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-stone-100 dark:hover:bg-slate-700 text-stone-900 dark:text-slate-200 font-black text-xs transition-all cursor-pointer shadow-sm border border-stone-200 dark:border-slate-700"
          >
            {lang === 'nl' ? 'Bekijk Alle 33 Concepten' : 'View All 33 Concepts'}
          </button>
          <button
            onClick={onOpenRequestModal}
            className="px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-orange-600/30"
          >
            <span>{lang === 'nl' ? 'Start Jouw Aanvraag' : 'Start Your Project'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
