'use client';

import React from 'react';
import { Check, ArrowRight, Sparkles, ShieldCheck, Zap, Globe, Clock } from 'lucide-react';
import { Language } from '../types/company';

interface PricingPackagesSectionProps {
  lang: Language;
  onSelectPackage: (packageName: string, budget: string, notes: string) => void;
}

export const PricingPackagesSection: React.FC<PricingPackagesSectionProps> = ({
  lang,
  onSelectPackage,
}) => {
  const packages = [
    {
      id: 'starter',
      nameNl: 'Starter One-Page',
      nameEn: 'Starter One-Page',
      price: 75,
      days: 3,
      descNl: 'Compact, overzichtelijk en snel online. Ideaal voor zelfstandigen en lokale starters.',
      descEn: 'Compact and online fast. Perfect for freelancers and local starters.',
      features: [
        '1 overzichtelijke one-page met soepele navigatie',
        'Direct contact- & aanvraagformulier',
        '100% Mobiel- en tabletvriendelijk',
        'WhatsApp direct contactknop',
        'Gratis A+ SSL-veiligheidscertificaat',
        'Oplevering binnen 3 werkdagen',
      ],
      badge: null,
      highlight: false,
    },
    {
      id: 'business',
      nameNl: 'Complete MKB Bedrijfswebsite',
      nameEn: 'Complete Corporate MKB Website',
      price: 195,
      days: 5,
      descNl: 'Meerdere pagina’s, dienstenoverzicht en maximale vindbaarheid in Google.',
      descEn: 'Multi-page website with services showcase and local Google SEO.',
      features: [
        'Tot 6 complete pagina’s (Home, Diensten, Over Ons, Contact, etc.)',
        'Lokale Google SEO & Schema.org LocalBusiness opzet',
        'Interactief offerte- en leadformulier met spamfilter',
        'Foto- en projectengalerij voor portfolio',
        'Vaste geduldige ontwerper & gratis correctieronde',
        'Oplevering binnen 5 werkdagen',
      ],
      badge: 'Meest Gekozen',
      highlight: true,
    },
    {
      id: 'ecommerce',
      nameNl: 'Webshop met iDEAL & Klarna',
      nameEn: 'E-commerce Shop with iDEAL',
      price: 385,
      days: 8,
      descNl: 'Professionele webwinkel met winkelmand, betaalprovider en geautomatiseerde orders.',
      descEn: 'Online store with shopping cart, Mollie iDEAL checkout, and shipping engine.',
      features: [
        'Volledige productencatalogus & winkelmand drawer',
        'Koppeling met Mollie (iDEAL, Bancontact, Klarna & Creditcard)',
        'PostNL verzendopties & automatische verzendkosten',
        'Automatische e-mailbevestigingen naar klant en jou',
        'Geen maandelijkse commissie per verkoop',
        'Oplevering binnen 8 werkdagen',
      ],
      badge: 'Compleet E-commerce',
      highlight: false,
    },
  ];

  return (
    <div id="tarieven-pakketten" className="py-4 scroll-mt-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 dark:bg-blue-950/60 text-orange-800 dark:text-blue-300 border border-orange-200 dark:border-blue-800/60 text-xs font-black uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-orange-600 dark:text-blue-400" />
          <span>{lang === 'nl' ? 'Transparante Vaste Pakketten' : 'Fixed Price Packages'}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white tracking-tight">
          {lang === 'nl' ? 'Helder Tarief, Geen Verrassingen Achteraf' : 'Clear Pricing, No Hidden Traps'}
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 font-medium leading-relaxed max-w-xl mx-auto">
          {lang === 'nl'
            ? 'Geen dure uurtarieven of verplichte wurgcontracten. Je betaalt eenmalig voor de bouw en de website is 100% jouw eigendom.'
            : 'No endless hourly rates or lock-in contracts. You pay a one-time fee and the website is 100% yours.'}
        </p>
      </div>

      {/* 3 Packages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all relative ${
              pkg.highlight
                ? 'border-2 border-orange-500 dark:border-blue-500 bg-orange-50/20 dark:bg-slate-900/90 shadow-xl ring-2 ring-orange-500/10 dark:ring-blue-500/20'
                : 'border-2 border-stone-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm hover:shadow-md dark:hover:border-slate-700'
            }`}
          >
            {pkg.badge && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-orange-700 dark:bg-blue-600 text-white font-black text-[11px] uppercase tracking-wider shadow-md">
                {pkg.badge}
              </span>
            )}

            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-black text-xl text-stone-900 dark:text-white">{pkg.nameNl}</h3>
                <span className="text-[11px] font-bold text-stone-500 dark:text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-orange-600 dark:text-blue-400" />
                  <span>~{pkg.days} dagen</span>
                </span>
              </div>

              <p className="text-xs text-stone-500 dark:text-slate-400 mb-6 font-medium leading-relaxed">
                {pkg.descNl}
              </p>

              <div className="mb-6 pb-6 border-b border-stone-200 dark:border-slate-800">
                <div className="text-4xl sm:text-5xl font-black text-stone-900 dark:text-white tracking-tight">
                  €{pkg.price}
                  <span className="text-xs font-bold text-stone-400 dark:text-slate-400"> (eenmalig)</span>
                </div>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold block mt-1">
                  100% Jouw Eigendom • Geen verplichte maandelijks abonnement
                </span>
              </div>

              {/* Features List */}
              <ul className="space-y-3 text-xs text-stone-700 dark:text-slate-300 font-medium mb-8">
                {pkg.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <button
                type="button"
                onClick={() =>
                  onSelectPackage(
                    pkg.nameNl,
                    `€${pkg.price} (Eenmalig)`,
                    `Gekozen pakket via overzicht: ${pkg.nameNl} (€${pkg.price}). Oplevertijd: ~${pkg.days} werkdagen.`
                  )
                }
                className={`w-full py-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md ${
                  pkg.highlight
                    ? 'bg-orange-700 hover:bg-orange-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white shadow-orange-700/30 dark:shadow-blue-900/40'
                    : 'bg-stone-900 dark:bg-slate-800 hover:bg-stone-800 dark:hover:bg-slate-700 text-white shadow-stone-900/20 dark:border dark:border-slate-700'
                }`}
              >
                <span>Kies {pkg.nameNl}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Hosting & Domain Assurance Banner */}
      <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-emerald-50 dark:bg-slate-900/90 border-2 border-emerald-200 dark:border-emerald-800/60 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-black text-sm sm:text-base text-emerald-950 dark:text-emerald-300">
                Optioneel: All-in Webhosting & .NL Domein (+€9,50 per maand)
              </span>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-200 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300">
                Ontzorgd
              </span>
            </div>
            <p className="text-xs text-emerald-800 dark:text-slate-300 leading-relaxed font-medium">
              Inclusief registratie van jouw .nl domeinnaam, supersnelle NVMe SSD opslag, gratis SSL en een zakelijk e-mailadres (bijv. info@jouwbedrijf.nl). Liever zelf hosten bij een eigen registrar? Dat is uiteraard ook 100% mogelijk voor €0/mnd.
            </p>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-2 text-xs font-black text-emerald-900 dark:text-emerald-300 bg-white dark:bg-slate-950 px-4 py-2.5 rounded-xl border border-emerald-300 dark:border-emerald-800">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Maandelijks Opzegbaar</span>
        </div>
      </div>
    </div>
  );
};
