'use client';

import React, { useState } from 'react';
import { RefreshCw, Tag, Sparkles, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Language } from '../types/company';

interface TradeInTradeUpBannerProps {
  lang: Language;
  onClaimDiscount: (cms: string, discountCode: string, discountAmount: number) => void;
}

export const TradeInTradeUpBanner: React.FC<TradeInTradeUpBannerProps> = ({
  lang,
  onClaimDiscount,
}) => {
  const [selectedCms, setSelectedCms] = useState('wordpress');
  const [siteAge, setSiteAge] = useState('2-5');

  const cmsOptions = [
    { id: 'wordpress', name: 'WordPress (+ trage plugins)', discount: 75 },
    { id: 'wix', name: 'Wix / Squarespace (maandkosten)', discount: 65 },
    { id: 'joomla', name: 'Joomla / Oude CMS', discount: 75 },
    { id: 'mijnwebwinkel', name: 'MijnWebwinkel / Oude Shop', discount: 75 },
    { id: 'custom', name: 'Verouderde trage HTML / Anders', discount: 50 },
  ];

  const currentCms = cmsOptions.find((c) => c.id === selectedCms) || cmsOptions[0];
  const discountAmount = currentCms.discount;
  const couponCode = `SLOOPREGELING-${discountAmount}`;

  const handleClaim = () => {
    onClaimDiscount(currentCms.name, couponCode, discountAmount);
  };

  return (
    <section id="sloopregeling" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/15 to-red-500/10 dark:from-amber-950/40 dark:via-orange-950/50 dark:to-red-950/40 rounded-3xl p-6 sm:p-10 border-2 border-orange-400 dark:border-orange-500/60 shadow-xl relative overflow-hidden transition-colors">
        
        {/* Glow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-600 text-white text-xs font-black uppercase tracking-wider mb-4 shadow-sm">
          <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
          <span>{lang === 'nl' ? 'De Samen Online Sloopregeling' : 'Website Trade-in Program'}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left copy */}
          <div className="lg:col-span-7 space-y-3">
            <h2 className="text-2xl sm:text-4xl font-black text-stone-900 dark:text-white tracking-tight">
              {lang === 'nl'
                ? 'Ruil Je Trage WordPress Website In Voor €75,- Korting'
                : 'Trade in Your Slow WordPress Site for a €75 Discount'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-slate-300 font-medium leading-relaxed">
              {lang === 'nl'
                ? 'Heb je al een website, maar is deze traag, verouderd of zit je vast aan dure maandabonnementen? Lever hem bij ons in. Wij bouwen een razendsnelle Next.js site en trekken direct tot €75,- van je offerte af.'
                : 'Already have a site that is slow, dated or stuck with monthly retainers? Trade it in with us for a blazing-fast Next.js site with instant discount.'}
            </p>

            {/* Guarantees row */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-bold text-stone-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Geen verlies van Google posities (301 redirects inbegrepen)</span>
              </span>
              <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Teksten & foto’s nemen we kosteloos over</span>
              </span>
            </div>
          </div>

          {/* Right: Interactive Trade-In Calculator Box */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border-2 border-orange-200 dark:border-slate-800 shadow-md">
            <span className="text-[11px] font-black uppercase tracking-wider text-orange-700 dark:text-orange-400 block mb-3">
              Bereken Jouw Inruilpremie:
            </span>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-stone-800 dark:text-slate-200 block mb-1">
                  Wat draait je huidige website op?
                </label>
                <select
                  value={selectedCms}
                  onChange={(e) => setSelectedCms(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-50 dark:bg-slate-800 border border-stone-300 dark:border-slate-700 text-xs font-bold text-stone-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-orange-500 cursor-pointer"
                >
                  {cmsOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 dark:text-slate-200 block mb-1">
                  Hoe oud is je huidige website ongeveer?
                </label>
                <select
                  value={siteAge}
                  onChange={(e) => setSiteAge(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-stone-50 dark:bg-slate-800 border border-stone-300 dark:border-slate-700 text-xs font-bold text-stone-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-orange-500 cursor-pointer"
                >
                  <option value="<2">Minder dan 2 jaar oud</option>
                  <option value="2-5">2 tot 5 jaar oud (Meest gekozen)</option>
                  <option value="5+">Ouder dan 5 jaar (Dringend toe aan vernieuwing)</option>
                </select>
              </div>

              {/* Calculated Reward */}
              <div className="p-3 rounded-xl bg-orange-50 dark:bg-slate-800/80 border border-orange-200 dark:border-orange-800/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-stone-500 dark:text-slate-400 uppercase">
                    Jouw Inruilkorting:
                  </span>
                  <div className="text-2xl font-black text-orange-700 dark:text-orange-400">
                    - €{discountAmount},-
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-stone-500 dark:text-slate-400 uppercase">
                    Couponcode:
                  </span>
                  <div className="font-mono text-xs font-black text-stone-900 dark:text-white bg-white dark:bg-slate-900 px-2 py-1 rounded border border-orange-200 dark:border-slate-700">
                    {couponCode}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClaim}
                className="w-full py-3 rounded-xl bg-orange-700 hover:bg-orange-800 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-orange-700/30 transition-transform active:scale-95 cursor-pointer"
              >
                <span>{lang === 'nl' ? 'Claim Deze Inruilpremie' : 'Claim Trade-in Discount'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
