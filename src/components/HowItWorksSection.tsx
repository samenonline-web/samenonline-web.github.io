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
        'Kies uit 40+ interactieve branche-templates, vraag een redesign aan van je huidige website, of lever een eigen Figma schets aan.',
      descEn:
        'Select from 40+ industry templates, request an existing site redesign, or supply your own wireframe or Figma plan.',
      badgeNl: 'Stap 1: Jouw Keuze',
      badgeEn: 'Step 1: Your Choice',
      verifiedNl: '100% Vrijblijvend',
      verifiedEn: '100% Obligation-free',
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
    <section id="hoe-wij-werken" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 dark:bg-blue-950/60 text-orange-800 dark:text-blue-300 border border-orange-200 dark:border-blue-800/60 text-xs font-black uppercase tracking-wider">
          <CheckCircle2 className="w-4 h-4 text-orange-600 dark:text-blue-400" />
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

      {/* Horizontal Stepper Timeline on Desktop / Vertical Connected on Mobile */}
      <div className="relative">
        {/* Desktop Connecting Line behind step badges */}
        <div 
          aria-hidden="true" 
          className="hidden lg:block absolute top-7 left-12 right-12 h-1 bg-gradient-to-r from-orange-300 via-amber-400 to-emerald-400 dark:from-blue-600 dark:via-cyan-500 dark:to-emerald-500 z-0 rounded-full opacity-60" 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative flex flex-col group"
              >
                {/* Step Circle & Connector Node */}
                <div className="flex items-center gap-4 lg:flex-col lg:items-center mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border-2 border-orange-500 dark:border-blue-500 shadow-md flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 relative z-10">
                    <span className="text-base font-black text-orange-600 dark:text-blue-400 font-mono">
                      {item.step}
                    </span>
                  </div>
                  <div className="lg:hidden flex-1 h-0.5 bg-gradient-to-r from-orange-400 to-transparent dark:from-blue-500" />
                </div>

                {/* Card Container */}
                <div className="flex-1 bg-white dark:bg-slate-900/90 rounded-3xl p-6 border-2 border-orange-100/90 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-orange-300 dark:hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group-hover:-translate-y-1">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-black uppercase tracking-wider text-orange-700 dark:text-blue-300 bg-orange-100 dark:bg-blue-950/80 px-2.5 py-0.5 rounded-full inline-block">
                        {lang === 'nl' ? item.badgeNl : item.badgeEn}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-slate-800 border border-orange-200 dark:border-slate-700 text-orange-600 dark:text-blue-400 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="font-black text-base text-stone-900 dark:text-white leading-snug mb-2">
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
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-orange-100/80 via-orange-50/90 to-amber-100/70 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-800 border-2 border-orange-200 dark:border-slate-700 text-stone-900 dark:text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm transition-colors">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-black text-stone-900 dark:text-white">
            {lang === 'nl' ? 'Klaar om jouw onderneming online te laten schitteren?' : 'Ready to launch your business online?'}
          </h3>
          <p className="text-xs text-stone-600 dark:text-slate-300 font-medium">
            {lang === 'nl'
              ? 'Kies een concept sjabloon of vraag direct een vrijblijvend adviesgesprek aan.'
              : 'Choose a template or request a free consultation today.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onScrollToTemplates}
            className="px-5 py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-700 text-stone-800 dark:text-slate-200 font-bold text-xs transition-all cursor-pointer shadow-2xs border border-orange-200 dark:border-slate-700"
          >
            {lang === 'nl' ? 'Bekijk Alle 40+ Concepten' : 'View All 40+ Concepts'}
          </button>
          <button
            type="button"
            onClick={onOpenRequestModal}
            className="px-5 py-3 rounded-xl bg-orange-700 hover:bg-orange-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-black text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-orange-700/30 dark:shadow-blue-900/40 whitespace-nowrap"
          >
            <span>{lang === 'nl' ? 'Start Jouw Aanvraag' : 'Start Your Project'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
