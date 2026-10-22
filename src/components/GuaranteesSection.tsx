'use client';

import React from 'react';
import { ShieldCheck, Clock, BadgeEuro, RotateCcw, CheckCircle2, Sparkles, Lock, ArrowRight } from 'lucide-react';
import { Language } from '../types/company';

interface GuaranteesSectionProps {
  lang: Language;
  onOpenCalculator?: () => void;
  onOpenRequestModal?: () => void;
}

export const GuaranteesSection: React.FC<GuaranteesSectionProps> = ({
  lang,
  onOpenCalculator,
  onOpenRequestModal,
}) => {
  const guarantees = [
    {
      id: 'ownership',
      icon: ShieldCheck,
      badge: lang === 'nl' ? '100% Jouw Bezit' : '100% Your Property',
      title: lang === 'nl' ? '100% Volledig Eigendom' : 'Full 100% Ownership',
      subtitle: lang === 'nl' ? 'Geen maandelijks wurgcontract' : 'No monthly lock-in contracts',
      description:
        lang === 'nl'
          ? 'Je zit nergens aan vast. De broncode, rechten, teksten en afbeeldingen zijn en blijven 100% jouw eigendom. Geen verplichte opzegtermijnen of boetes bij vertrek.'
          : 'You own everything outright. Code, content, and imagery belong to you without any lock-in or migration fees.',
      highlight: lang === 'nl' ? 'Volledige onafhankelijkheid' : 'Complete freedom',
      color: 'emerald',
    },
    {
      id: 'speed',
      icon: Clock,
      badge: lang === 'nl' ? 'Gegarandeerde Bouwtijd' : 'Guaranteed Delivery',
      title: lang === 'nl' ? 'Binnen 2 tot 5 Werkdagen Live' : 'Live Within 2 to 5 Workdays',
      subtitle: lang === 'nl' ? 'Direct online zichtbaar' : 'Rapid turnaround',
      description:
        lang === 'nl'
          ? 'Geen maandenlange bureau-vergaderingen. Zodra we jouw basisgegevens hebben, bouwen we je website strak op en staat hij binnen 2 tot 5 dagen werkend online.'
          : 'No months of back-and-forth. Once we have your brand assets, your website goes live in 2 to 5 business days.',
      highlight: lang === 'nl' ? 'Snelle time-to-market' : 'Fast turnaround',
      color: 'orange',
    },
    {
      id: 'pricing',
      icon: BadgeEuro,
      badge: lang === 'nl' ? 'Vast Tarief' : 'Fixed Price',
      title: lang === 'nl' ? 'Harde Vaste Prijsafspraak' : 'Fixed-Fee Guarantee',
      subtitle: lang === 'nl' ? 'Geen nacalculatie achteraf' : 'Zero hidden surprise bills',
      description:
        lang === 'nl'
          ? 'Wat in je offerte of pakket staat, is wat je betaalt. Geen onverwachte uurtjes achteraf, geen verborgen opstartkosten en geen kleine lettertjes.'
          : 'The quote is fixed. No surprise post-launch billing, no hidden startup charges, and 100% clear terms.',
      highlight: lang === 'nl' ? 'Geen verrassingen achteraf' : 'No surprise invoices',
      color: 'blue',
    },
    {
      id: 'revision',
      icon: RotateCcw,
      badge: lang === 'nl' ? 'Tevredenheidsgarantie' : 'Revision Included',
      title: lang === 'nl' ? 'Kosteloze Correctieronde' : 'Free Post-Launch Revision',
      subtitle: lang === 'nl' ? 'Totdat het precies klopt' : 'Until you are satisfied',
      description:
        lang === 'nl'
          ? 'Na de conceptoplevering lopen we samen de puntjes op de i door. Teksten, afbeeldingen, contactgegevens of kleuren passen we kosteloos voor je aan.'
          : 'After initial delivery, we fine-tune your copy, pictures, and color accents free of charge until everything feels right.',
      highlight: lang === 'nl' ? '100% tevredenheid' : '100% satisfaction',
      color: 'purple',
    },
  ];

  return (
    <section id="garanties" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-black uppercase tracking-wider mb-4 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{lang === 'nl' ? '4 Harde Samen Online Zekerheden' : '4 Firm Guarantees'}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight">
          {lang === 'nl' ? (
            <>
              Webdesign Zónder <span className="text-orange-600 underline decoration-orange-300 decoration-wavy">Wurgcontracten</span> of Verrassingen
            </>
          ) : (
            'Websites Built with Total Transparency'
          )}
        </h2>
        <p className="mt-4 text-stone-600 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
          {lang === 'nl'
            ? 'Veel ondernemers zijn bang voor dure bureaus die maanden werk rekenen of maandelijkse abonnementen die je website gijzelen. Wij doen het radicaal anders.'
            : 'Clear delivery times, full ownership, and transparent pricing without predatory vendor lock-in.'}
        </p>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {guarantees.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="group relative bg-white rounded-3xl p-6 sm:p-7 border-2 border-stone-200/80 shadow-md hover:shadow-xl hover:border-orange-400/80 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Top Badge & Number */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                    {item.badge}
                  </span>
                  <span className="text-2xl font-black text-stone-200 group-hover:text-orange-200 transition-colors">
                    0{idx + 1}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 border border-orange-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-base sm:text-lg font-black text-stone-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs font-bold text-orange-600 mt-0.5">
                    {item.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-stone-600 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>

              {/* Bottom Feature Pill */}
              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-[11px] font-black text-stone-800">
                  {item.highlight}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust Quote Bar */}
      <div className="mt-10 p-5 sm:p-6 rounded-3xl bg-stone-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white">
              {lang === 'nl' ? 'Transparantie gegarandeerd in elke offerte' : 'Full transparency on every estimate'}
            </h3>
            <p className="text-xs text-stone-400">
              {lang === 'nl'
                ? 'Geen automatische stilzwijgende verlengingen. Je betaalt eenmalig de bouwkosten en eventueel €9,50/mnd voor all-in hosting.'
                : 'One-off build investment with optional €9.50/mo hosting. Cancel anytime.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
          {onOpenCalculator && (
            <button
              onClick={onOpenCalculator}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              {lang === 'nl' ? 'Bereken Jouw Prijs' : 'Calculate Price'}
            </button>
          )}
          {onOpenRequestModal && (
            <button
              onClick={onOpenRequestModal}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-lg shadow-orange-600/30 transition-all cursor-pointer"
            >
              <span>{lang === 'nl' ? 'Direct Aanvragen' : 'Get Started'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
