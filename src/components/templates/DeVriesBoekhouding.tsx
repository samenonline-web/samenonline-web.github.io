'use client';

import React, { useState } from 'react';
import { TemplateProps } from '../../types/theme';
import {
  FileText,
  Calculator,
  Check,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Star,
  Sun,
  Moon,
  Sparkles,
  PieChart,
  TrendingUp,
  Receipt,
  Clock,
} from 'lucide-react';

export const DeVriesBoekhouding: React.FC<TemplateProps> = ({
  theme,
  isDarkMode,
  onToggleDarkMode,
  onRequestQuote,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'zzp' | 'mkb' | 'bv'>('zzp');
  const [yearlyRevenue, setYearlyRevenue] = useState(75000);
  const [appointmentDate, setAppointmentDate] = useState('2026-10-28');
  const [appointmentType, setAppointmentType] = useState<'kantoor' | 'video'>('video');
  const [booked, setBooked] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Estimated Tax Savings & Deductions
  const estimatedTaxDeductions = Math.round(yearlyRevenue * 0.08 + 2400);
  const hoursSavedPerMonth = selectedPlan === 'bv' ? 14 : selectedPlan === 'mkb' ? 10 : 6;

  const plans = [
    {
      id: 'zzp',
      name: 'ZZP Zorgeloos',
      price: 79,
      subtitle: 'Voor zelfstandigen & freelancers',
      features: [
        'Koppeling met Moneybird of Exact',
        'Elk kwartaal btw-aangifte (omzetbelasting)',
        'Jaarlijkse Inkomstenbelasting (IB) aangifte',
        'Onbeperkt fiscaal advies via WhatsApp & mail',
        'Controle op alle zelfstandigenaftrek & mkb-vrijstelling',
      ],
    },
    {
      id: 'mkb',
      name: 'MKB Ondernemer',
      price: 159,
      highlight: true,
      subtitle: 'Voor groeiende MKB bedrijven & VOF',
      features: [
        'Alles van ZZP Zorgeloos',
        'Volledige salarisadministratie (tot 3 medewerkers)',
        'Kwartaalrapportage & winst- en verliesrekening',
        'Jaarrekening en deponering KvK',
        'Periodiek strategisch fiscaal adviesgesprek',
      ],
    },
    {
      id: 'bv',
      name: 'Besloten Vennootschap (BV)',
      price: 249,
      subtitle: 'Voor DGA’s, holdings en BV-structuren',
      features: [
        'DGA salarisadministratie & loonaangifte',
        'Vennootschapsbelasting (VPB) aangifte',
        'Jaarrekening volgens de richtlijnen voor jaarverslaggeving',
        'Dividendplanning & optimalisatie holdingstructuur',
        'Persoonlijk vaste registeraccountant / belastingadviseur',
      ],
    },
  ];

  return (
    <div className="min-h-full bg-stone-50 text-stone-900 font-sans relative selection:bg-blue-600 selection:text-white">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold border border-stone-700 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <Sparkles className="w-4 h-4 text-sky-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className={`py-1.5 px-4 text-center text-xs font-bold text-white ${theme.primary} flex items-center justify-center gap-2 shadow-xs`}>
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>Lid van de NOAB (Nederlandse Orde van Administratie- en Belastingdeskundigen) • Geen uurtje-factuurtje</span>
      </div>

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${theme.primary} text-white font-black flex items-center justify-center text-sm shadow-md`}>
            DV
          </div>
          <div>
            <span className="font-black text-base sm:text-lg tracking-tight block">De Vries & Partners</span>
            <span className="text-[10px] text-stone-500 font-medium hidden sm:block">Den Haag & Rotterdam • Fiscaal & Financieel Advies</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-stone-700">
          <a href="#pakketten" className="hover:text-stone-900">Vaste Pakketten</a>
          <a href="#calculator" className="hover:text-stone-900">Bespaar Calculator</a>
          <a href="#intake" className="hover:text-stone-900">Kennismakingsgesprek</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer border border-stone-200 flex items-center gap-1.5"
              title={isDarkMode ? 'Lichte Modus' : 'Donkere Modus'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
              <span className="hidden sm:inline text-xs font-bold">{isDarkMode ? 'Licht' : 'Donker'}</span>
            </button>
          )}

          <a
            href="#intake"
            className={`px-4 py-2 rounded-xl ${theme.primary} ${theme.primaryHover} text-white text-xs font-black shadow-md cursor-pointer`}
          >
            Gratis Overstapcheck
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-stone-100/60 via-stone-50 to-white py-14 sm:py-20 px-4 sm:px-8 border-b border-stone-200 text-center">
        <div className="max-w-4xl mx-auto">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText} text-xs font-black mb-4 border ${theme.borderLight}`}>
            <Receipt className="w-3.5 h-3.5" />
            <span>Fiscaal Advies Zonder Verrassingen • Vaste Maandprijzen</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4">
            Besteed je boekhouding uit en <span className={theme.textPrimary}>bespaar direct duizenden euro’s</span>.
          </h1>

          <p className="text-sm sm:text-base text-stone-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Geen stress meer rond btw-kwartalen of belastingaangiftes. Wij optimaliseren alle fiscale aftrekposten en koppelen naadloos met jouw favoriete boekhoudsoftware.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <a
              href="#pakketten"
              className={`px-6 py-3 rounded-xl ${theme.primary} ${theme.primaryHover} text-white font-extrabold text-xs shadow-md flex items-center gap-2`}
            >
              <span>Bekijk Vaste Pakketten</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#intake"
              className="px-6 py-3 rounded-xl bg-white border border-stone-300 text-stone-800 text-xs font-extrabold hover:bg-stone-50 cursor-pointer shadow-xs"
            >
              Boek Gratis Intake
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-stone-500 pt-6 border-t border-stone-200">
            <span className="text-stone-800 font-extrabold">🔒 NOAB Gecertificeerd</span>
            <span>•</span>
            <span className="text-stone-800 font-extrabold">💼 Exact, Moneybird & SnelStart Partner</span>
            <span>•</span>
            <span className="text-stone-800 font-extrabold">📋 Vaste All-In Maandtarieven Zonder Nacalculatie</span>
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section id="pakketten" className="py-12 sm:py-16 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900">Transparante Maandpakketten</h2>
          <p className="text-xs sm:text-sm text-stone-500 font-medium">Alles inbegrepen. Geen onverwachte nacalculaties.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id as any)}
                className={`bg-white rounded-3xl border-2 p-6 flex flex-col justify-between transition-all cursor-pointer relative shadow-xs hover:shadow-lg ${
                  isSelected
                    ? `${theme.borderLight} ring-3 ring-orange-500/25 scale-102`
                    : 'border-stone-200'
                }`}
              >
                {plan.highlight && (
                  <span className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full ${theme.primary} text-white text-[10px] font-black uppercase shadow-xs`}>
                    Meest Gekozen
                  </span>
                )}

                <div>
                  <h3 className="font-black text-lg text-stone-900 mb-1">{plan.name}</h3>
                  <p className="text-xs text-stone-500 mb-4 font-medium">{plan.subtitle}</p>

                  <div className="text-3xl font-black text-stone-900 mb-6">
                    €{plan.price}{' '}
                    <span className="text-xs font-bold text-stone-400">/ maand (excl. btw)</span>
                  </div>

                  <ul className="space-y-2.5 text-xs font-medium text-stone-600 mb-6">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={onRequestQuote}
                  className={`w-full py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    isSelected ? `${theme.primary} text-white shadow-md` : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {isSelected ? 'Kies Dit Pakket' : 'Selecteer'}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tax Deduction Calculator */}
      <section id="calculator" className={`py-12 sm:py-16 px-4 sm:px-8 ${theme.bgLight} border-t ${theme.borderLight}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8">
            <Calculator className={`w-8 h-8 ${theme.textPrimary} mx-auto mb-2`} />
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900">Fiscaal Voordeel Calculator</h2>
            <p className="text-xs sm:text-sm text-stone-600 font-medium">Bereken hoeveel aftrekposten en uren je jaarlijks kunt besparen</p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-black text-stone-700">Geschatte Jaaromzet:</span>
                <span className={`text-base font-black ${theme.textPrimary}`}>€{yearlyRevenue.toLocaleString('nl-NL')}</span>
              </div>
              <input
                type="range"
                min="20000"
                max="250000"
                step="5000"
                value={yearlyRevenue}
                onChange={(e) => setYearlyRevenue(Number(e.target.value))}
                className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-bold mt-1.5">
                <span>€20.000</span>
                <span>€125.000</span>
                <span>€250.000+</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <span className="text-xs font-bold text-stone-500 block mb-1">Geschat Fiscale Aftrek & Voordeel:</span>
                <span className="text-3xl font-black text-emerald-700">€{estimatedTaxDeductions.toLocaleString('nl-NL')}</span>
                <span className="text-[10px] text-stone-400 block mt-1">Zelfstandigenaftrek + investeringsaftrek</span>
              </div>
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <span className="text-xs font-bold text-stone-500 block mb-1">Tijdwinst per maand:</span>
                <span className={`text-3xl font-black ${theme.textPrimary}`}>~{hoursSavedPerMonth} uur</span>
                <span className="text-[10px] text-stone-400 block mt-1">Tijd die je kunt besteden aan declarabele uren</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Intake Booking Tool */}
      <section id="intake" className="py-12 sm:py-16 px-4 sm:px-8 max-w-3xl mx-auto">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-stone-200 shadow-lg text-center">
          <Calendar className={`w-8 h-8 ${theme.textPrimary} mx-auto mb-2`} />
          <h2 className="text-2xl font-black text-stone-900 mb-1">Boek Een Vrijblijvende Kennismaking</h2>
          <p className="text-xs text-stone-500 font-medium mb-6">
            Binnen 30 minuten nemen we je huidige boekhouding door en bekijken we waar je belasting laat liggen
          </p>

          {booked ? (
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 space-y-2">
              <span className="text-3xl block">🎉</span>
              <h4 className="font-black text-base">Afspraak Bevestigd (Demo)!</h4>
              <p className="text-xs">Je kennismakingsgesprek staat gepland op <strong>{appointmentDate}</strong> ({appointmentType === 'video' ? 'via Microsoft Teams' : 'op kantoor'}).</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setBooked(true);
                showToast('Kennismakingsgesprek ingepland!');
              }}
              className="space-y-4 max-w-md mx-auto text-left"
            >
              <div>
                <label className="text-xs font-black text-stone-700 block mb-1.5">Kies type afspraak:</label>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setAppointmentType('video')}
                    className={`py-2 rounded-xl border transition-colors cursor-pointer text-center ${
                      appointmentType === 'video' ? `${theme.primary} text-white border-transparent shadow-xs` : 'bg-stone-50 border-stone-300 text-stone-700'
                    }`}
                  >
                    Online Video (Teams)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAppointmentType('kantoor')}
                    className={`py-2 rounded-xl border transition-colors cursor-pointer text-center ${
                      appointmentType === 'kantoor' ? `${theme.primary} text-white border-transparent shadow-xs` : 'bg-stone-50 border-stone-300 text-stone-700'
                    }`}
                  >
                    Op Kantoor (Den Haag)
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-stone-700 block mb-1.5">Voorkeursdatum:</label>
                <input
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3.5 rounded-xl ${theme.primary} ${theme.primaryHover} text-white font-black text-xs shadow-md cursor-pointer`}
              >
                Bevestig Gratis Adviesgesprek
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
