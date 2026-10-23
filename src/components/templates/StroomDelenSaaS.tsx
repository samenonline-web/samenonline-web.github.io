'use client';

import React, { useState } from 'react';
import { TemplateProps } from '../../types/theme';
import {
  Zap,
  Check,
  ArrowRight,
  BarChart3,
  ShieldCheck,
  Activity,
  Users,
  Sun,
  Moon,
  BatteryCharging,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';

export const StroomDelenSaaS: React.FC<TemplateProps> = ({
  theme,
  isDarkMode,
  onToggleDarkMode,
  onRequestQuote,
}) => {
  const [kwhMonthly, setKwhMonthly] = useState(550);
  const [batteryCapacity, setBatteryCapacity] = useState(10); // in kWh
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [activeTab, setActiveTab] = useState<'p2p' | 'battery' | 'tarieven' | 'api'>('p2p');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Realistic dynamic calculations
  const p2pDirectShare = Math.round(kwhMonthly * 0.65);
  const batteryStored = Math.round(batteryCapacity * 24);
  const annualCashback = Math.round((p2pDirectShare * 0.22 + batteryStored * 0.08) * 12);
  const co2Avoided = ((kwhMonthly * 0.38 * 12) / 1000).toFixed(1);

  const faqs = [
    {
      q: 'Hoe werkt energie delen met buren juridisch in Nederland?',
      a: 'Sinds de herziene Energiewet 2024 en de Clean Energy Package van de EU is peer-to-peer energieoverdracht binnen hetzelfde middenspanningsstation volledig legaal. Onze software regelt de meetdata-uitwisseling met TenneT en je netbeheerder (Liander, Enexis, Stedin).',
    },
    {
      q: 'Heb ik een thuisbatterij nodig om mee te doen?',
      a: 'Nee! Met enkel zonnepanelen kun je al overtollige stroom op piekmomenten direct doorleveren aan aangesloten buren of laadpalen in de straat. Een thuisbatterij verhoogt je rendement met gemiddeld nog eens 40%.',
    },
    {
      q: 'Wat gebeurt er als de salderingsregeling afloopt?',
      a: 'StroomDelen is specifiek gebouwd voor het tijdperk ná de salderingsregeling. In plaats van terugleverboetes aan traditionele energiereuzen te betalen, verkoop je direct tegen marktprijzen aan lokale afnemers.',
    },
    {
      q: 'Kan ik mijn bestaande omvormer en slimme meter aansluiten?',
      a: 'Ja. We ondersteunen via onze P1-dongle of directe API-koppeling vrijwel alle gangbare merken: SolarEdge, Enphase, SMA, Growatt, Huawei en Tesla Powerwall.',
    },
  ];

  return (
    <div className="min-h-full bg-stone-50 text-stone-900 font-sans relative selection:bg-emerald-600 selection:text-white">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold border border-stone-700 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className={`py-1.5 px-4 text-center text-xs font-bold text-white ${theme.primary} flex items-center justify-center gap-2 shadow-xs`}>
        <Activity className="w-3.5 h-3.5 text-emerald-200" />
        <span>Live Energie Netwerk: 42.800 kWh gedeeld vandaag in NL • Netstabiliteit 100%</span>
      </div>

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 min-w-[40px] min-h-[40px] shrink-0 aspect-square rounded-xl ${theme.primary} text-white font-black flex items-center justify-center text-sm shadow-md`}>
            SD
          </div>
          <div>
            <span className="font-black text-base sm:text-lg tracking-tight block">StroomDelen CleanTech</span>
            <span className="text-[10px] text-stone-500 font-medium hidden sm:block">Eindhoven • P2P Energy Trading Platform</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-stone-700">
          <a href="#calculator" className="hover:text-stone-900">Bespaar Calculator</a>
          <a href="#functies" className="hover:text-stone-900">Platform Features</a>
          <a href="#prijzen" className="hover:text-stone-900">Abonnementen</a>
          <a href="#faq" className="hover:text-stone-900">Veelgestelde Vragen</a>
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

          <button
            onClick={onRequestQuote}
            className={`px-4 py-2 rounded-xl ${theme.primary} ${theme.primaryHover} text-white text-xs font-black shadow-md cursor-pointer`}
          >
            Start Gratis Trial
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-stone-100/60 via-stone-50 to-white py-12 sm:py-20 px-4 sm:px-8 border-b border-stone-200 text-center">
        <div className="max-w-4xl mx-auto">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText} text-xs font-black mb-4 border ${theme.borderLight}`}>
            <Zap className="w-3.5 h-3.5" />
            <span>Nieuwe Energiewet Ready • Geen Terugleverboetes Meer</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4">
            Deel overtollige zonne-energie <span className={theme.textPrimary}>direct met jouw buurt</span>.
          </h1>

          <p className="text-sm sm:text-base text-stone-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Verdien tot wel 45% meer aan je eigen opwekking. Verkoop rechtstreeks aan buren en lokale laadpalen via slimme AI-gestuurde energiecontracten.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <a
              href="#calculator"
              className={`px-6 py-3 rounded-xl ${theme.primary} ${theme.primaryHover} text-white font-extrabold text-xs shadow-md flex items-center gap-2`}
            >
              <span>Bereken Jouw Jaaropbrengst</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={onRequestQuote}
              className="px-6 py-3 rounded-xl bg-white border border-stone-300 text-stone-800 text-xs font-extrabold hover:bg-stone-50 cursor-pointer shadow-xs"
            >
              Vraag Deze SaaS Template Aan
            </button>
          </div>

          {/* Compatibility Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-stone-500 pt-6 border-t border-stone-200">
            <span>Compatibel met:</span>
            <span className="text-stone-800 font-extrabold">⚡ Enexis & Liander</span>
            <span className="text-stone-800 font-extrabold">🔋 Tesla Powerwall</span>
            <span className="text-stone-800 font-extrabold">☀️ SolarEdge & Enphase</span>
            <span className="text-stone-800 font-extrabold">🔒 ISO 27001 Gecertificeerd</span>
          </div>
        </div>
      </section>

      {/* Interactive Savings Calculator */}
      <section id="calculator" className="py-12 sm:py-16 px-4 sm:px-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl border-2 border-stone-200 p-6 sm:p-10 shadow-lg">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900">Wat levert StroomDelen jou op?</h2>
            <p className="text-xs sm:text-sm text-stone-500 font-medium mt-1">
              Pas de schuifbalken aan om je zonnecapaciteit en thuisbatterij te simuleren
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Sliders */}
            <div className="lg:col-span-7 space-y-6">
              {/* Slider 1: Monthly kWh */}
              <div className="bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-black text-stone-700">Maandelijkse zonnestroom opwekking:</span>
                  <span className={`text-base font-black ${theme.textPrimary}`}>{kwhMonthly} kWh</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="1400"
                  step="50"
                  value={kwhMonthly}
                  onChange={(e) => setKwhMonthly(Number(e.target.value))}
                  className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <div className="flex justify-between text-[10px] text-stone-400 font-bold mt-1.5">
                  <span>150 kWh (6 panelen)</span>
                  <span>750 kWh (16 panelen)</span>
                  <span>1400 kWh (30 panelen)</span>
                </div>
              </div>

              {/* Slider 2: Battery Capacity */}
              <div className="bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-black text-stone-700">Thuisbatterij opslag:</span>
                  <span className={`text-base font-black ${theme.textPrimary}`}>
                    {batteryCapacity === 0 ? 'Geen batterij' : `${batteryCapacity} kWh`}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  step="5"
                  value={batteryCapacity}
                  onChange={(e) => setBatteryCapacity(Number(e.target.value))}
                  className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <div className="flex justify-between text-[10px] text-stone-400 font-bold mt-1.5">
                  <span>0 kWh</span>
                  <span>10 kWh (Standaard)</span>
                  <span>25 kWh (Pro)</span>
                </div>
              </div>
            </div>

            {/* Live Calculation Output Card */}
            <div className={`lg:col-span-5 ${theme.bgLight} p-6 rounded-3xl border-2 ${theme.borderLight} text-left flex flex-col justify-between`}>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md inline-block mb-3">
                  Gecalculeerde Jaarwinst
                </span>
                <div className="text-3xl sm:text-4xl font-black text-stone-900 mb-1">
                  €{annualCashback.toLocaleString('nl-NL')}
                  <span className="text-xs font-bold text-stone-500"> / jaar</span>
                </div>
                <p className="text-xs text-stone-600 mb-6 font-medium">
                  +€420 meer vergeleken met traditionele teruglevering na aftrek van abonnementskosten.
                </p>

                <div className="space-y-2 text-xs font-bold text-stone-700">
                  <div className="bg-white p-2.5 rounded-xl border border-stone-200 flex justify-between">
                    <span>Direct gedeeld met wijk:</span>
                    <span className="font-black text-emerald-700">{p2pDirectShare} kWh/mnd</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-stone-200 flex justify-between">
                    <span>CO₂ reductie per jaar:</span>
                    <span className="font-black text-emerald-700">-{co2Avoided} ton</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onRequestQuote}
                className={`w-full py-3 rounded-xl ${theme.primary} ${theme.primaryHover} text-white font-black text-xs shadow-md mt-6 cursor-pointer`}
              >
                Sluit Jouw Omvormer Aan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Tabs */}
      <section id="functies" className="py-12 sm:py-16 px-4 sm:px-8 max-w-5xl mx-auto border-t border-stone-200">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900">Slimme Energie Architectuur</h2>
          <p className="text-xs sm:text-sm text-stone-500 font-medium">
            Volledig geautomatiseerde sturing zonder ingewikkelde handmatige instellingen
          </p>
        </div>

        {/* Tab buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { id: 'p2p', label: 'Peer-to-Peer Handel', icon: Users },
            { id: 'battery', label: 'Batterij AI Sturing', icon: BatteryCharging },
            { id: 'tarieven', label: 'Dynamische Prijzen', icon: TrendingUp },
            { id: 'api', label: 'P1 Dongle & API', icon: Cpu },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? `${theme.primary} text-white shadow-sm`
                    : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Box */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm">
          {activeTab === 'p2p' && (
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <Users className="w-8 h-8" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-black text-lg text-stone-900 mb-1">Directe Wijkhandel Zonder Tussenpersoon</h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
                  Verkoop je overtollige zonnestroom aan buren in de straat met een elektrische auto of warmtepomp. De software vereffent de kWh-balans per 15 minuten en stort de opbrengst maandelijks automatisch op je IBAN.
                </p>
              </div>
            </div>
          )}
          {activeTab === 'battery' && (
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                <BatteryCharging className="w-8 h-8" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-black text-lg text-stone-900 mb-1">AI-Gestuurd Laden & Ontladen</h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
                  Onze machine learning voorspelt het weer en energieprijzen tot 48 uur vooruit. De batterij laadt automatisch op tijdens negatieve uurtarieven en levert stroom terug tijdens de duurste avonduren.
                </p>
              </div>
            </div>
          )}
          {activeTab === 'tarieven' && (
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
                <TrendingUp className="w-8 h-8" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-black text-lg text-stone-900 mb-1">EPEX Spotmarkt Integratie</h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
                  Direct gekoppeld aan de Europese day-ahead elektriciteitsbeurs. Profiteer realtime van de laagste inkoopprijzen en hoogste verkoopmarges in Nederland.
                </p>
              </div>
            </div>
          )}
          {activeTab === 'api' && (
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                <Cpu className="w-8 h-8" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-black text-lg text-stone-900 mb-1">Plug & Play P1 Dongle</h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
                  Binnen 2 minuten geïnstalleerd. Plug onze compacte Wi-Fi P1 dongle in je slimme meter (DSMR 4/5) en je dashboard is direct live operationeel.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Pricing Tiers with Toggle */}
      <section id="prijzen" className={`py-12 sm:py-16 px-4 sm:px-8 ${theme.bgLight} border-t ${theme.borderLight}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mb-2">Transparante Software Prijzen</h2>
          <p className="text-xs text-stone-600 font-medium mb-6">Geen contractduur, op elk moment opzegbaar</p>

          <div className="inline-flex items-center gap-2 p-1 bg-white rounded-2xl border border-stone-300 text-xs font-bold mb-8">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer ${
                billingCycle === 'monthly' ? `${theme.primary} text-white` : 'text-stone-600'
              }`}
            >
              Maandelijks
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer ${
                billingCycle === 'yearly' ? `${theme.primary} text-white` : 'text-stone-600'
              }`}
            >
              Jaarlijks (2 Maanden Gratis 🎉)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
            {/* Tier 1 */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-stone-400 uppercase">Particulier Woning</span>
                <h3 className="text-lg font-black text-stone-900 mt-1 mb-2">Thuis Delen Basic</h3>
                <div className="text-3xl font-black text-stone-900 mb-4">
                  {billingCycle === 'monthly' ? '€4,99' : '€3,99'}{' '}
                  <span className="text-xs font-bold text-stone-400">/ maand</span>
                </div>
                <ul className="space-y-2 text-xs font-medium text-stone-600 mb-6">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Tot 1 omvormer & slimme meter</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Live app inzicht per 15 minuten</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Automatische P2P verkoop aan buren</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Maandelijkse IBAN uitbetaling</li>
                </ul>
              </div>
              <button
                onClick={onRequestQuote}
                className="w-full py-2.5 rounded-xl border border-stone-300 text-stone-800 text-xs font-black hover:bg-stone-50 cursor-pointer"
              >
                Kies Thuis Delen
              </button>
            </div>

            {/* Tier 2 */}
            <div className="bg-white p-6 rounded-3xl border-2 border-stone-300 shadow-md flex flex-col justify-between relative">
              <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full ${theme.primary} text-white text-[10px] font-black uppercase shadow-xs`}>
                Populairste Keuze
              </div>
              <div>
                <span className="text-xs font-black text-stone-400 uppercase">Zakelijk & VvE</span>
                <h3 className="text-lg font-black text-stone-900 mt-1 mb-2">Energy Hub Pro</h3>
                <div className="text-3xl font-black text-stone-900 mb-4">
                  {billingCycle === 'monthly' ? '€19,99' : '€15,99'}{' '}
                  <span className="text-xs font-bold text-stone-400">/ maand</span>
                </div>
                <ul className="space-y-2 text-xs font-medium text-stone-600 mb-6">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Onbeperkt omvormers & thuisbatterijen</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Dynamische uurtarieven sturing</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Facturatie en btw-splitsing voor VvE</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Dedicated support & API-toegang</li>
                </ul>
              </div>
              <button
                onClick={onRequestQuote}
                className={`w-full py-2.5 rounded-xl ${theme.primary} ${theme.primaryHover} text-white text-xs font-black shadow-xs cursor-pointer`}
              >
                Start 14 Dagen Gratis Proef
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section id="faq" className="py-12 sm:py-16 px-4 sm:px-8 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <HelpCircle className={`w-8 h-8 ${theme.textPrimary} mx-auto mb-2`} />
          <h2 className="text-2xl font-black text-stone-900">Veelgestelde Vragen</h2>
          <p className="text-xs text-stone-500 font-medium">Alles over de techniek, netbeheerders en uitbetaling</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-black text-stone-900 cursor-pointer hover:bg-stone-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-stone-600 leading-relaxed font-medium border-t border-stone-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
