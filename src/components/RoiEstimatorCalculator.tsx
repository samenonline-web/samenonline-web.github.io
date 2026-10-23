'use client';

import React, { useState } from 'react';
import { TrendingUp, Calculator, ArrowRight, CheckCircle2, DollarSign, Sparkles, Clock, Target, Mail } from 'lucide-react';
import { Language } from '../types/company';

interface RoiEstimatorCalculatorProps {
  lang: Language;
  onOpenRequestModal: (customData?: { templateName: string; budget: string; notes: string }) => void;
}

export const RoiEstimatorCalculator: React.FC<RoiEstimatorCalculatorProps> = ({
  lang,
  onOpenRequestModal,
}) => {
  const [monthlyVisitors, setMonthlyVisitors] = useState<number>(850);
  const [avgDealValue, setAvgDealValue] = useState<number>(175);
  const [currentConversion, setCurrentConversion] = useState<number>(1.0); // 1.0%

  // Next.js fast conversion benchmark improvement: usually 2.4% - 3.0%
  const newConversion = Math.min(5.0, Number((currentConversion + 1.6).toFixed(1))); // +1.6% lift

  // Calculations
  const currentLeads = Math.round(monthlyVisitors * (currentConversion / 100));
  const currentRevenue = currentLeads * avgDealValue;

  const newLeads = Math.round(monthlyVisitors * (newConversion / 100));
  const newRevenue = newLeads * avgDealValue;

  const extraMonthlyRevenue = Math.max(0, newRevenue - currentRevenue);
  const extraYearlyRevenue = extraMonthlyRevenue * 12;
  const extraMonthlyLeads = Math.max(1, newLeads - currentLeads);

  // Payback period for standard website investment (€195) in days
  const dailyExtraRevenue = extraMonthlyRevenue / 30;
  const paybackDays = dailyExtraRevenue > 0 ? Math.max(3, Math.round(195 / dailyExtraRevenue)) : 14;

  const handleApplyRoi = () => {
    onOpenRequestModal({
      templateName: 'Rendementsgerichte MKB Website',
      budget: 'Vanaf €195 (Investering)',
      notes: `Aanvraag via ROI Rendement-calculator: ${monthlyVisitors} maandelijkse bezoekers, gemiddelde klantwaarde €${avgDealValue}, gewenste conversiegroei van ${currentConversion}% naar ${newConversion}%. Geschat omzetpotentieel: +€${extraMonthlyRevenue}/mnd (+€${extraYearlyRevenue}/jr).`,
    });
  };

  const handleEmailRoi = () => {
    const user = ['s', 'a', 'm', 'e', 'n', '_', 'o', 'n', 'l', 'i', 'n', 'e'].join('');
    const host = ['o', 'u', 't', 'l', 'o', 'o', 'k', '.', 'c', 'o', 'm'].join('');
    const targetEmail = `${user}@${host}`;

    const message = `Hallo Samen Online! Ik heb zojuist de ROI-calculator bekeken:
- Geschat aantal bezoekers/mnd: ${monthlyVisitors.toLocaleString('nl-NL')}
- Gemiddelde orderwaarde: €${avgDealValue}
- Huidige conversie: ${currentConversion}%
- Potentiële meeropbrengst: +€${extraMonthlyRevenue.toLocaleString('nl-NL')}/mnd (+€${extraYearlyRevenue.toLocaleString('nl-NL')}/jr)
- Geschatte terugverdientijd: ~${paybackDays} dagen

Ik wil graag vrijblijvend overleggen over de mogelijkheden voor mijn website!`;

    const subject = encodeURIComponent('Vrijblijvend advies: ROI & Rendement Website');
    const body = encodeURIComponent(message);
    window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <div id="roi-calculator" className="my-6 scroll-mt-24">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden text-stone-900 dark:text-white transition-colors">
        
        {/* Header */}
        <div className="p-6 sm:p-10 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 dark:bg-orange-950/70 text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-orange-800/60 text-xs font-black uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span>{lang === 'nl' ? 'MKB Rendement & Conversie Calculator' : 'SME ROI & Revenue Calculator'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-stone-900 dark:text-white tracking-tight">
            {lang === 'nl' ? 'Wat Levert Een Razendsnelle Website Jou Op?' : 'What Revenue Can A Fast Website Generate?'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 font-medium leading-relaxed">
            {lang === 'nl'
              ? 'Een trage website kost je dagelijks betalende klanten. Bereken in 30 seconden hoeveel extra omzet een professionele Samen Online Next.js website jouw bedrijf maandelijks kan opleveren.'
              : 'Calculate how much extra revenue a high-speed, modern website can add to your business each month.'}
          </p>
        </div>

        {/* Calculator Body */}
        <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Input Sliders */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Input 1: Monthly Visitors */}
            <div className="p-5 rounded-2xl bg-orange-50/30 dark:bg-slate-950/60 border border-orange-100 dark:border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-stone-700 dark:text-slate-300">1. Geschat aantal websitebezoekers per maand:</span>
                <span className="text-base font-black text-orange-700 dark:text-orange-400 font-mono">{monthlyVisitors.toLocaleString('nl-NL')} bezoekers</span>
              </div>
              <input
                type="range"
                min={150}
                max={5000}
                step={50}
                value={monthlyVisitors}
                onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
                className="w-full accent-orange-600 cursor-pointer"
                aria-label="Maandelijkse bezoekers"
              />
              <div className="flex justify-between text-[10px] text-stone-500 dark:text-slate-400 font-medium">
                <span>150 (Lokale starter)</span>
                <span>2.500 (MKB / Specialist)</span>
                <span>5.000+ (Gevestigde speler)</span>
              </div>
            </div>

            {/* Input 2: Average Deal Value */}
            <div className="p-5 rounded-2xl bg-orange-50/30 dark:bg-slate-950/60 border border-orange-100 dark:border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-stone-700 dark:text-slate-300">2. Gemiddelde orderwaarde / opbrengst per klant:</span>
                <span className="text-base font-black text-orange-700 dark:text-orange-400 font-mono">€{avgDealValue}</span>
              </div>
              <input
                type="range"
                min={35}
                max={1500}
                step={15}
                value={avgDealValue}
                onChange={(e) => setAvgDealValue(Number(e.target.value))}
                className="w-full accent-orange-600 cursor-pointer"
                aria-label="Gemiddelde klantwaarde"
              />
              <div className="flex justify-between text-[10px] text-stone-500 dark:text-slate-400 font-medium">
                <span>€35 (Kapper / Horeca)</span>
                <span>€350 (Schilder / Aannemer / B2B)</span>
                <span>€1.500+ (Grote projecten)</span>
              </div>
            </div>

            {/* Input 3: Current vs Projected Conversion */}
            <div className="p-5 rounded-2xl bg-orange-50/30 dark:bg-slate-950/60 border border-orange-100 dark:border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-stone-700 dark:text-slate-300">3. Huidige conversieratio (afhakers vs contactopname):</span>
                <span className="text-sm font-black text-orange-700 dark:text-orange-400 font-mono">{currentConversion}%</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { rate: 0.5, label: '0.5% (Trage site / afhakers)' },
                  { rate: 1.0, label: '1.0% (Gemiddeld MKB)' },
                  { rate: 1.5, label: '1.5% (Al redelijk)' },
                ].map((item) => (
                  <button
                    key={item.rate}
                    type="button"
                    onClick={() => setCurrentConversion(item.rate)}
                    className={`py-2 px-2 rounded-xl text-[11px] font-bold border transition-all cursor-pointer text-center ${
                      currentConversion === item.rate
                        ? 'border-orange-600 bg-orange-600 text-white font-extrabold shadow-xs'
                        : 'border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-stone-700 dark:text-slate-300 hover:border-orange-300 hover:bg-orange-50/50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-stone-600 dark:text-slate-400 leading-relaxed">
                🚀 Met Samen Online Next.js stijgt jouw conversie naar naar schatting <strong className="text-stone-900 dark:text-white">{newConversion}%</strong> dankzij 0.3s laadtijd, mobiele 1-klik WhatsApp-knoppen en betere Google Maps vindbaarheid.
              </p>
            </div>

          </div>

          {/* Right: Results Card */}
          <div className="lg:col-span-5 bg-slate-950 text-white p-6 sm:p-8 rounded-3xl border-2 border-orange-500/40 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-orange-500/15 blur-3xl pointer-events-none"></div>

            <div className="relative z-10 space-y-4">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-3 py-1 rounded-full inline-block">
                Geschat Resultaat
              </span>

              <div>
                <span className="text-xs font-bold text-slate-300 block mb-1">
                  Verwachte extra omzet per maand:
                </span>
                <div className="text-4xl sm:text-5xl font-black text-emerald-400 tracking-tight font-mono">
                  +€{extraMonthlyRevenue.toLocaleString('nl-NL')}
                  <span className="text-xs text-slate-400 font-normal"> /mnd</span>
                </div>
              </div>

              {/* Annualized Benefit */}
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                  <span>Jaarlijkse extra omzet:</span>
                  <span className="text-sm font-black text-orange-400 font-mono">+€{extraYearlyRevenue.toLocaleString('nl-NL')} /jaar</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-300">
                  <span>Extra contactaanvragen:</span>
                  <span className="font-bold text-white">~{extraMonthlyLeads} extra klanten /mnd</span>
                </div>
              </div>

              {/* Payback period */}
              <div className="flex items-center gap-2.5 text-xs text-slate-200 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                <span>
                  Bij een website-investering van <strong className="text-white">€195</strong> is je site bij deze indicatie al binnen <strong className="text-emerald-400">~{paybackDays} dagen</strong> terugverdiend.*
                </span>
              </div>
            </div>

            <div className="relative z-10 pt-6 space-y-2.5">
              <button
                type="button"
                onClick={handleApplyRoi}
                className="w-full py-4 rounded-xl bg-orange-700 hover:bg-orange-800 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-700/30 transition-all cursor-pointer"
              >
                <span>{lang === 'nl' ? 'Bereken Jouw Investering (Vraag Offerte Aan)' : 'Calculate Investment (Request Quote)'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleEmailRoi}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4 text-orange-400" />
                <span>{lang === 'nl' ? 'Bespreek Direct per E-mail' : 'Discuss Directly via Email'}</span>
              </button>

              <div className="flex items-center justify-center gap-3 text-[10px] font-bold text-slate-400 text-center pt-1">
                <span>🛡️ 100% Jouw Eigendom</span>
                <span>•</span>
                <span>⚡ Binnen 2 tot 5 dagen live</span>
              </div>

              <p className="text-[10px] text-slate-500 text-center leading-normal">
                * Indicatieve berekening ter illustratie van conversiewinst. Werkelijke resultaten variëren per branche en aanbod.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
