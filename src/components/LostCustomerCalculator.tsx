'use client';

import React, { useState, useMemo } from 'react';
import { 
  TrendingDown, 
  Clock, 
  Users, 
  Euro, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  HelpCircle,
  CheckCircle2
} from 'lucide-react';

interface LostCustomerCalculatorProps {
  onOpenRedesignRequest?: (data: {
    monthlyLoss: number;
    visitors: number;
    loadTime: number;
  }) => void;
}

export default function LostCustomerCalculator({ onOpenRedesignRequest }: LostCustomerCalculatorProps) {
  // Inputs
  const [monthlyVisitors, setMonthlyVisitors] = useState<number>(1200);
  const [currentLoadSeconds, setCurrentLoadSeconds] = useState<number>(4.2);
  const [averageCustomerValue, setAverageCustomerValue] = useState<number>(180);
  const [conversionRatePercent, setConversionRatePercent] = useState<number>(2.5);

  // Benchmarked loss calculation based on Google & Akamai mobile latency studies:
  // Baseline fast site (Next.js): ~0.6s
  // 1s -> 2s: +10% drop
  // 2s -> 3s: +32% drop
  // 3s -> 4s: +53% abandonment
  // 4s -> 5s+: +90% bounce probability
  const calculations = useMemo(() => {
    let bounceMultiplier = 0;
    if (currentLoadSeconds <= 1.0) {
      bounceMultiplier = 0.05;
    } else if (currentLoadSeconds <= 2.0) {
      bounceMultiplier = 0.15;
    } else if (currentLoadSeconds <= 3.0) {
      bounceMultiplier = 0.32;
    } else if (currentLoadSeconds <= 4.0) {
      bounceMultiplier = 0.53;
    } else {
      // 4.0s - 7.0s
      bounceMultiplier = Math.min(0.85, 0.53 + (currentLoadSeconds - 4.0) * 0.12);
    }

    // Baseline potential converters if fast
    const potentialLeads = (monthlyVisitors * (conversionRatePercent / 100));
    // Lost leads due to bounce
    const lostLeadsMonthly = Math.round(potentialLeads * bounceMultiplier);
    const lostRevenueMonthly = Math.round(lostLeadsMonthly * averageCustomerValue);
    const lostRevenueYearly = lostRevenueMonthly * 12;

    // Investment cost of a typical Samen Online Next.js website (e.g. €195 - €385)
    const redesignInvestment = 195;
    const paybackWeeks = lostRevenueMonthly > 0 
      ? Math.max(0.5, Math.round((redesignInvestment / (lostRevenueMonthly / 4.3)) * 10) / 10)
      : 1;

    return {
      bounceMultiplierPercent: Math.round(bounceMultiplier * 100),
      lostLeadsMonthly,
      lostRevenueMonthly,
      lostRevenueYearly,
      paybackWeeks,
    };
  }, [monthlyVisitors, currentLoadSeconds, averageCustomerValue, conversionRatePercent]);

  return (
    <section id="omzetlek-calculator" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-800/70 text-rose-700 dark:text-rose-400 text-xs font-bold uppercase tracking-wider">
          <TrendingDown className="w-3.5 h-3.5" />
          <span>Omzetverlies & Afhaak Calculator</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Hoeveel Klanten Verlies Je aan een{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-orange-600 to-amber-500">
            Trage Website?
          </span>
        </h2>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Onderzoek van Google toont aan dat <strong>53% van de mobiele bezoekers</strong> direct wegklikt als een pagina langer dan 3 seconden laadt (typisch voor WordPress en Wix). 
          Bereken hieronder hoeveel omzet jouw bedrijf maandelijks laat liggen.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Input Sliders (6 cols) */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
          <h3 className="font-bold text-base text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span>Jouw Bedrijfssituatie</span>
            <span className="text-xs font-semibold text-slate-400">Verstel de schuifbalken</span>
          </h3>

          {/* Slider 1: Maandelijkse bezoekers */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-orange-500" />
                <span>Geschat aantal maandelijkse bezoekers</span>
              </span>
              <span className="font-mono text-sm font-black text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/60 px-2.5 py-0.5 rounded-lg">
                {monthlyVisitors.toLocaleString('nl-NL')}
              </span>
            </div>
            <input
              type="range"
              min="200"
              max="15000"
              step="100"
              value={monthlyVisitors}
              onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>200 (lokale starter)</span>
              <span>2.500 (actief MKB)</span>
              <span>15.000+ (webshop)</span>
            </div>
          </div>

          {/* Slider 2: Huidige Laadtijd */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-rose-500" />
                <span>Huidige laadtijd website op mobiel</span>
              </span>
              <span className={`font-mono text-sm font-black px-2.5 py-0.5 rounded-lg ${
                currentLoadSeconds > 3.0
                  ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
                  : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
              }`}>
                {currentLoadSeconds.toFixed(1)}s {currentLoadSeconds > 3.0 ? '⚠️ Traag' : '✓ Redelijk'}
              </span>
            </div>
            <input
              type="range"
              min="0.8"
              max="7.0"
              step="0.1"
              value={currentLoadSeconds}
              onChange={(e) => setCurrentLoadSeconds(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>0.8s (Next.js standaard)</span>
              <span>3.0s (Google grenswaarde)</span>
              <span>7.0s (Trage WordPress/Wix)</span>
            </div>
          </div>

          {/* Slider 3: Gemiddelde Klantwaarde */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Euro className="w-3.5 h-3.5 text-emerald-500" />
                <span>Gemiddelde orderwaarde / omzet per nieuwe klant</span>
              </span>
              <span className="font-mono text-sm font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-lg">
                €{averageCustomerValue}
              </span>
            </div>
            <input
              type="range"
              min="30"
              max="1500"
              step="10"
              value={averageCustomerValue}
              onChange={(e) => setAverageCustomerValue(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>€30 (kapper / lunch)</span>
              <span>€180 (consult / onderhoud)</span>
              <span>€1.500+ (bouw / zakelijk)</span>
            </div>
          </div>

          {/* Quick preset chips */}
          <div className="pt-2">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-2">
              Of kies een brancheprofiel:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setMonthlyVisitors(800);
                  setCurrentLoadSeconds(4.5);
                  setAverageCustomerValue(450);
                }}
                className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-orange-950 text-slate-700 dark:text-slate-200 transition-colors"
              >
                🔨 Aannemer / Schilder
              </button>
              <button
                onClick={() => {
                  setMonthlyVisitors(1800);
                  setCurrentLoadSeconds(3.8);
                  setAverageCustomerValue(65);
                }}
                className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-orange-950 text-slate-700 dark:text-slate-200 transition-colors"
              >
                🍽️ Horeca / Restaurant
              </button>
              <button
                onClick={() => {
                  setMonthlyVisitors(3500);
                  setCurrentLoadSeconds(5.2);
                  setAverageCustomerValue(85);
                }}
                className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-orange-950 text-slate-700 dark:text-slate-200 transition-colors"
              >
                🛍️ MKB Webshop
              </button>
            </div>
          </div>
        </div>

        {/* Right: The Shocking Contrast / Leak Result (6 cols) */}
        <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 via-slate-900 to-rose-950 text-white rounded-3xl border border-rose-900/60 p-6 sm:p-8 shadow-xl flex flex-col justify-between">
          <div className="space-y-6">
            {/* Leak alert banner */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 bg-rose-500/20 border border-rose-500/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Geschat Omzetlek</span>
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {calculations.bounceMultiplierPercent}% mobiel afhaakrisico
              </span>
            </div>

            {/* Big Monthly Loss Number */}
            <div>
              <span className="text-xs text-rose-300 font-semibold block mb-1">
                Gemiste omzet per maand door laadtijdvertraging:
              </span>
              <div className="text-4xl sm:text-5xl font-black text-rose-400 tracking-tight">
                -€{calculations.lostRevenueMonthly.toLocaleString('nl-NL')}
                <span className="text-sm font-bold text-slate-400"> / maand</span>
              </div>
              <p className="text-xs text-slate-400 mt-1.5 font-medium">
                Dat is op jaarbasis maar liefst{' '}
                <strong className="text-rose-300">
                  €{calculations.lostRevenueYearly.toLocaleString('nl-NL')}
                </strong>{' '}
                aan potentiële klanten die overstappen naar een snellere concurrent.
              </p>
            </div>

            {/* Breakdown cards */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                <span className="text-[11px] text-slate-400 block mb-1">Verloren aanvragen:</span>
                <span className="text-xl font-black text-white">
                  ~{calculations.lostLeadsMonthly} klanten
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">per maand weggeklikt</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                <span className="text-[11px] text-slate-400 block mb-1">Terugverdientijd redesign:</span>
                <span className="text-xl font-black text-emerald-400">
                  {calculations.paybackWeeks} {calculations.paybackWeeks === 1 ? 'week' : 'weken'}
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Snelste ROI in het MKB</span>
              </div>
            </div>

            {/* Solution comparison */}
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/50 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <Zap className="w-4 h-4" />
                <span>Oplossing: Samen Online Next.js Redesign (0.4s laadtijd)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Wij herbouwen je website op de nieuwste Next.js 16 stack. Geen trage databases, geen zware plugins. 
                De pagina staat direct klaar in het geheugen van de bezoeker.
              </p>
            </div>
          </div>

          {/* Action CTA Button */}
          <div className="pt-6 border-t border-slate-800/80 mt-6">
            <button
              onClick={() => {
                if (onOpenRedesignRequest) {
                  onOpenRedesignRequest({
                    monthlyLoss: calculations.lostRevenueMonthly,
                    visitors: monthlyVisitors,
                    loadTime: currentLoadSeconds,
                  });
                }
              }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-orange-600/30 transition-all active:scale-[0.98] cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Stop Dit Omzetverlies — Vraag Redesign Aan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
