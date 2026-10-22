'use client';

import React, { useState } from 'react';
import { TrendingUp, Calculator, ArrowRight, CheckCircle2, DollarSign, Sparkles, Clock, Target } from 'lucide-react';
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

  return (
    <section id="roi-calculator" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      <div className="bg-gradient-to-br from-stone-900 via-stone-900 to-stone-800 rounded-3xl border-2 border-stone-700 shadow-2xl overflow-hidden text-white">
        
        {/* Header */}
        <div className="p-6 sm:p-10 border-b border-stone-800 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-black uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'nl' ? 'MKB Rendement & Conversie Calculator' : 'SME ROI & Revenue Calculator'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            {lang === 'nl' ? 'Wat Levert Een Razendsnelle Website Jou Op?' : 'What Revenue Can A Fast Website Generate?'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 font-medium leading-relaxed">
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
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-stone-300">1. Geschat aantal websitebezoekers per maand:</span>
                <span className="text-base font-black text-orange-400 font-mono">{monthlyVisitors.toLocaleString('nl-NL')} bezoekers</span>
              </div>
              <input
                type="range"
                min={150}
                max={5000}
                step={50}
                value={monthlyVisitors}
                onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
                aria-label="Maandelijkse bezoekers"
              />
              <div className="flex justify-between text-[10px] text-stone-400">
                <span>150 (Lokale starter)</span>
                <span>2.500 (MKB / Specialist)</span>
                <span>5.000+ (Gevestigde speler)</span>
              </div>
            </div>

            {/* Input 2: Average Deal Value */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-stone-300">2. Gemiddelde orderwaarde / opbrengst per klant:</span>
                <span className="text-base font-black text-emerald-400 font-mono">€{avgDealValue}</span>
              </div>
              <input
                type="range"
                min={35}
                max={1500}
                step={15}
                value={avgDealValue}
                onChange={(e) => setAvgDealValue(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
                aria-label="Gemiddelde klantwaarde"
              />
              <div className="flex justify-between text-[10px] text-stone-400">
                <span>€35 (Kapper / Horeca)</span>
                <span>€350 (Schilder / Aannemer / B2B)</span>
                <span>€1.500+ (Grote projecten)</span>
              </div>
            </div>

            {/* Input 3: Current vs Projected Conversion */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-stone-300">3. Huidige conversieratio (afhakers vs contactopname):</span>
                <span className="text-sm font-black text-amber-400 font-mono">{currentConversion}%</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { rate: 0.5, label: '0.5% (Trage site / veel afhakers)' },
                  { rate: 1.0, label: '1.0% (Gemiddeld MKB)' },
                  { rate: 1.5, label: '1.5% (Al redelijk)' },
                ].map((item) => (
                  <button
                    key={item.rate}
                    type="button"
                    onClick={() => setCurrentConversion(item.rate)}
                    className={`py-2 px-2 rounded-xl text-[11px] font-bold border transition-all cursor-pointer text-center ${
                      currentConversion === item.rate
                        ? 'border-orange-500 bg-orange-500/20 text-orange-300'
                        : 'border-white/10 bg-white/5 text-stone-400 hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                🚀 Met Samen Online Next.js stijgt jouw conversie naar naar schatting <strong>{newConversion}%</strong> dankzij 0.3s laadtijd, mobiele 1-klik WhatsApp-knoppen en betere Google Maps vindbaarheid.
              </p>
            </div>

          </div>

          {/* Right: Results Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-stone-800 to-stone-900/90 p-6 sm:p-8 rounded-3xl border-2 border-emerald-500/40 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 rounded-full inline-block">
                Geschat Resultaat
              </span>

              <div>
                <span className="text-xs font-bold text-stone-400 block mb-1">
                  Verwachte extra omzet per maand:
                </span>
                <div className="text-4xl sm:text-5xl font-black text-emerald-400 tracking-tight">
                  +€{extraMonthlyRevenue.toLocaleString('nl-NL')}
                  <span className="text-xs text-stone-400 font-normal"> /mnd</span>
                </div>
              </div>

              {/* Annualized Benefit */}
              <div className="p-3.5 rounded-2xl bg-emerald-950/50 border border-emerald-500/30 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-300">
                  <span>Jaarlijkse extra omzet:</span>
                  <span className="text-sm font-black">+€{extraYearlyRevenue.toLocaleString('nl-NL')} /jaar</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-stone-300">
                  <span>Extra contactaanvragen:</span>
                  <span className="font-bold text-white">~{extraMonthlyLeads} extra klanten /mnd</span>
                </div>
              </div>

              {/* Payback period */}
              <div className="flex items-center gap-2.5 text-xs text-stone-300 bg-white/5 p-3 rounded-xl border border-white/10">
                <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                <span>
                  Bij een website-investering van <strong>€195</strong> is je site bij deze indicatie al binnen <strong>~{paybackDays} dagen</strong> terugverdiend.*
                </span>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <button
                type="button"
                onClick={handleApplyRoi}
                className="w-full py-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-600/30 transition-all cursor-pointer"
              >
                <span>{lang === 'nl' ? 'Bereken Jouw Investering (Vraag Offerte Aan)' : 'Calculate Investment (Request Quote)'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-3 text-[10px] font-bold text-stone-400 text-center">
                <span>🛡️ 100% Jouw Eigendom</span>
                <span>•</span>
                <span>⚡ Binnen 2 tot 5 dagen live</span>
              </div>

              <p className="text-[10px] text-stone-500 text-center leading-normal">
                * Indicatieve berekening ter illustratie van conversiewinst. Werkelijke resultaten variëren per branche en aanbod.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
