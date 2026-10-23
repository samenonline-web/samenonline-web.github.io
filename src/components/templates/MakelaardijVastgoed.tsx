'use client';

import React, { useState } from 'react';
import { TemplateProps } from '../../types/theme';
import {
  Home,
  Search,
  MapPin,
  CheckCircle2,
  Euro,
  Key,
  ShieldCheck,
  ChevronRight,
  Sun,
  Moon,
  Sparkles,
  BedDouble,
  Maximize2,
  Award,
  Calendar,
  Phone,
  MessageCircle,
  X,
  Clock,
  Calculator,
} from 'lucide-react';

interface PropertyItem {
  id: string;
  title: string;
  address: string;
  price: number;
  areaM2: number;
  bedrooms: number;
  energyLabel: string;
  status: 'Nieuw' | 'Verkocht o.v.' | 'Open Huis';
  img: string;
}

const PROPERTIES: PropertyItem[] = [
  {
    id: 'p1',
    title: 'Karakteristieke Jaren 30 Tweekapper',
    address: 'Emmalaan 14 • Utrecht',
    price: 545000,
    areaM2: 138,
    bedrooms: 4,
    energyLabel: 'A',
    status: 'Nieuw',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'p2',
    title: 'Luxe Loft met Dakterras & Parkeerplaats',
    address: 'Westerdok 82 • Amsterdam',
    price: 685000,
    areaM2: 96,
    bedrooms: 2,
    energyLabel: 'A+++',
    status: 'Open Huis',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'p3',
    title: 'Moderne Gezinswoning met Zonnige Tuin',
    address: 'Veldhovenring 29 • Breda',
    price: 425000,
    areaM2: 122,
    bedrooms: 3,
    energyLabel: 'B',
    status: 'Verkocht o.v.',
    img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'p4',
    title: 'Statig Grachtenappartement aan de Vecht',
    address: 'Vechtoever 41 • Maarssen (Utrecht)',
    price: 615000,
    areaM2: 145,
    bedrooms: 3,
    energyLabel: 'A+',
    status: 'Nieuw',
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
  },
];

export const MakelaardijVastgoed: React.FC<TemplateProps> = ({
  theme,
  isDarkMode,
  onToggleDarkMode,
  onRequestQuote,
  customBrandName,
  customCity,
}) => {
  const brandName = customBrandName || 'Van Houten Makelaardij & Taxaties';
  const city = customCity || 'Utrecht & Midden-Nederland';

  const [priceMax, setPriceMax] = useState<number>(750000);
  const [statusFilter, setStatusFilter] = useState<'all' | 'Nieuw' | 'Open Huis' | 'Verkocht o.v.'>('all');
  const [valuationSubmitted, setValuationSubmitted] = useState(false);
  const [valuationData, setValuationData] = useState({
    name: '',
    email: '',
    postcode: '',
    houseNumber: '',
  });

  // Viewing booking modal state
  const [selectedViewingProperty, setSelectedViewingProperty] = useState<PropertyItem | null>(null);
  const [viewingTime, setViewingTime] = useState<string>('Vrijdag 14:00 - 14:45');
  const [viewingData, setViewingData] = useState({ name: '', phone: '', email: '' });
  const [viewingConfirmed, setViewingConfirmed] = useState<boolean>(false);

  // Mortgage Calculator State
  const [mortgagePrice, setMortgagePrice] = useState<number>(485000);
  const [mortgageSavings, setMortgageSavings] = useState<number>(50000);
  const [mortgageInterestRate, setMortgageInterestRate] = useState<number>(3.8);

  const loanAmount = Math.max(0, mortgagePrice - mortgageSavings);
  const monthlyInterestRate = mortgageInterestRate / 100 / 12;
  const numberOfMonths = 360; // 30 jaar
  const grossMonthlyPayment =
    monthlyInterestRate > 0 && loanAmount > 0
      ? Math.round(
          (loanAmount *
            (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths))) /
            (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1)
        )
      : 0;
  const netMonthlyPayment = Math.round(grossMonthlyPayment * 0.78);
  const isNhgEligible = mortgagePrice <= 450000;

  const filteredProperties = PROPERTIES.filter((p) => {
    const matchesPrice = p.price <= priceMax;
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesPrice && matchesStatus;
  });

  const handleViewingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!viewingData.name || !viewingData.phone) return;
    setViewingConfirmed(true);
  };

  const handleInquireProperty = (property: PropertyItem) => {
    setSelectedViewingProperty(property);
    setViewingConfirmed(false);
  };

  const handleValuationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valuationData.name || !valuationData.postcode) return;
    setValuationSubmitted(true);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-stone-950 text-stone-100' : 'bg-stone-50 text-stone-800'}`}>
      
      {/* Demo Concept Disclaimer Bar */}
      <div className="bg-stone-900 text-stone-300 py-1.5 px-4 text-center text-xs border-b border-stone-800 flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>
          <strong>Voorbeeldconcept:</strong> Makelaarskantoor, Vastgoed & Taxatie website lay-out (NVM-stijl & funda-ready).
        </span>
      </div>

      {/* Top Navbar */}
      <header className={`sticky top-0 z-30 backdrop-blur-md border-b transition-colors ${
        isDarkMode ? 'bg-stone-950/90 border-stone-800' : 'bg-white/95 border-stone-200'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 min-w-[40px] min-h-[40px] shrink-0 aspect-square rounded-2xl flex items-center justify-center text-white font-black shadow-md ${theme.primary}`}>
              <Home className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-base sm:text-lg tracking-tight block leading-none">
                {brandName}
              </span>
              <span className="text-[11px] font-semibold text-stone-500">
                Gecertificeerd NVM Makelaar • {city}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {onToggleDarkMode && (
              <button
                onClick={onToggleDarkMode}
                aria-label="Toggle Dark Mode"
                className={`p-2 rounded-xl border text-xs cursor-pointer transition-colors ${
                  isDarkMode
                    ? 'border-stone-800 bg-stone-900 text-yellow-400 hover:bg-stone-800'
                    : 'border-stone-200 bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}

            <button
              onClick={onRequestQuote}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black text-white shadow-md transition-all cursor-pointer ${theme.primary} hover:opacity-95`}
            >
              Gratis Waardebepaling
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-14 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${theme.badgeBg} ${theme.badgeText}`}>
              <Award className="w-4 h-4" />
              <span>NVM & VastgoedCert Gecertificeerde Makelaars</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Jouw Droomhuis Kopen of Verkopen in <span className={theme.textPrimary}>{city}</span>
            </h1>

            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-medium leading-relaxed max-w-xl">
              Persoonlijke begeleiding, een modern verkoopconcept met 3D-tours en stylingadvies, en maximale opbrengst via Funda en ons exclusieve zoekersbestand.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-stone-600 dark:text-stone-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Geen verkoop = geen kosten</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Professionele Funda fotograaf</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>NWWI Taxatierapporten</span>
              </div>
            </div>
          </div>

          {/* Right Card: Gratis Waardebepaling Formulier */}
          <div className="lg:col-span-5">
            <div className={`p-6 sm:p-7 rounded-3xl border-2 shadow-xl ${
              isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Key className="w-5 h-5 text-orange-600" />
                  <h3 className="font-black text-lg">Gratis Waardebepaling</h3>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-900">
                  Vrijblijvend
                </span>
              </div>

              {valuationSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-black text-base">Aanvraag Ontvangen!</h4>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto">
                    Bedankt {valuationData.name}! Onze NVM-makelaar neemt binnen 24 uur contact op voor een gratis waardebepaling op locatie aan {valuationData.postcode} {valuationData.houseNumber}.
                  </p>
                  <button
                    onClick={() => setValuationSubmitted(false)}
                    className="text-xs font-bold text-stone-500 underline cursor-pointer mt-2"
                  >
                    Nieuwe aanvraag doen
                  </button>
                </div>
              ) : (
                <form onSubmit={handleValuationSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-xs font-bold block mb-1">Postcode</label>
                      <input
                        type="text"
                        required
                        value={valuationData.postcode}
                        onChange={(e) => setValuationData({ ...valuationData, postcode: e.target.value })}
                        placeholder="bijv. 3512 AB"
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold block mb-1">Huisnummer</label>
                      <input
                        type="text"
                        required
                        value={valuationData.houseNumber}
                        onChange={(e) => setValuationData({ ...valuationData, houseNumber: e.target.value })}
                        placeholder="14 A"
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold block mb-1">Jouw Volledige Naam</label>
                    <input
                      type="text"
                      required
                      value={valuationData.name}
                      onChange={(e) => setValuationData({ ...valuationData, name: e.target.value })}
                      placeholder="bijv. Mark van Houten"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold block mb-1">E-mailadres</label>
                    <input
                      type="email"
                      required
                      value={valuationData.email}
                      onChange={(e) => setValuationData({ ...valuationData, email: e.target.value })}
                      placeholder="mark@voorbeeld.nl"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-3.5 rounded-xl text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${theme.primary} hover:opacity-90`}
                  >
                    <span>Vrijblijvende Waardebepaling Aanvragen</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Woningaanbod Showcase Grid */}
      <section className={`py-14 px-4 sm:px-6 border-t ${
        isDarkMode ? 'bg-stone-900/60 border-stone-800' : 'bg-white border-stone-200'
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-orange-600">
                Actueel Woningaanbod
              </span>
              <h2 className="text-2xl sm:text-3xl font-black">
                Woningen Te Koop in {city}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
              {/* Status Filter Buttons */}
              <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl">
                {(['all', 'Nieuw', 'Open Huis', 'Verkocht o.v.'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      statusFilter === st
                        ? 'bg-orange-600 text-white shadow-xs'
                        : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
                    }`}
                  >
                    {st === 'all' ? 'Alles' : st}
                  </button>
                ))}
              </div>

              {/* Price Slider */}
              <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-800 px-3 py-1.5 rounded-xl text-stone-700 dark:text-stone-300">
                <span className="text-[11px]">Max. €{priceMax.toLocaleString('nl-NL')}</span>
                <input
                  type="range"
                  min={400000}
                  max={850000}
                  step={25000}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="accent-orange-600 cursor-pointer w-24"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProperties.map((p) => (
              <div
                key={p.id}
                className={`rounded-3xl border overflow-hidden transition-all flex flex-col justify-between ${
                  isDarkMode ? 'bg-stone-900 border-stone-800 hover:border-orange-500/50' : 'bg-stone-50 border-stone-200 hover:border-orange-300'
                }`}
              >
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-stone-200">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-black uppercase tracking-wider">
                      {p.status}
                    </span>
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-black">
                      Label {p.energyLabel}
                    </span>
                  </div>

                  <div className="p-4">
                    <div className="text-lg font-black text-stone-900 dark:text-stone-100 mb-0.5">
                      € {p.price.toLocaleString('nl-NL')} k.k.
                    </div>
                    <h4 className="font-bold text-xs text-stone-800 dark:text-stone-200 line-clamp-1 mb-1">
                      {p.title}
                    </h4>
                    <span className="text-[11px] text-stone-500 block mb-3 flex items-center gap-1 truncate">
                      <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      {p.address}
                    </span>

                    <div className="flex items-center gap-2 text-[11px] text-stone-600 dark:text-stone-400 font-semibold border-t border-stone-200 dark:border-stone-800 pt-2.5">
                      <span className="flex items-center gap-1">
                        <Maximize2 className="w-3 h-3" />
                        {p.areaM2} m²
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <BedDouble className="w-3 h-3" />
                        {p.bedrooms} slp
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 space-y-2">
                  <button
                    onClick={() => {
                      setSelectedViewingProperty(p);
                      setViewingConfirmed(false);
                    }}
                    className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Bezichtiging Plannen</span>
                  </button>

                  <button
                    onClick={() => handleInquireProperty(p)}
                    className="w-full py-1.5 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Home className="w-3 h-3 text-orange-600" />
                    <span>Informatie Aanvragen</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Hypotheek & Maandlasten Calculator */}
      <section className={`py-14 px-4 sm:px-6 border-t ${
        isDarkMode ? 'bg-stone-950 border-stone-800' : 'bg-stone-100/70 border-stone-200'
      }`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-orange-100 text-orange-900 dark:bg-orange-950/70 dark:text-orange-300 mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>Hypotheek Calculator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white">
              Bereken Jouw Maandlasten in {city}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 font-medium">
              Indicatieve berekening op basis van 30 jaar annuïtair inclusief renteaftrek
            </p>
          </div>

          <div className={`p-6 sm:p-8 rounded-3xl border shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
            isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
          }`}>
            {/* Sliders Input */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <div className="flex justify-between items-center text-xs font-black mb-1.5">
                  <span className="text-stone-700 dark:text-stone-300">Woningwaarde / Koopsom:</span>
                  <span className="text-orange-600 font-black text-sm">€{mortgagePrice.toLocaleString('nl-NL')}</span>
                </div>
                <input
                  type="range"
                  min={250000}
                  max={950000}
                  step={10000}
                  value={mortgagePrice}
                  onChange={(e) => setMortgagePrice(Number(e.target.value))}
                  className="w-full accent-orange-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400 font-bold mt-1">
                  <span>€250.000</span>
                  <span>€600.000</span>
                  <span>€950.000</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-black mb-1.5">
                  <span className="text-stone-700 dark:text-stone-300">Eigen Inleg / Spaargeld:</span>
                  <span className="text-stone-900 dark:text-stone-100 font-black text-sm">€{mortgageSavings.toLocaleString('nl-NL')}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={200000}
                  step={5000}
                  value={mortgageSavings}
                  onChange={(e) => setMortgageSavings(Number(e.target.value))}
                  className="w-full accent-orange-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400 font-bold mt-1">
                  <span>€0 (100% lenen)</span>
                  <span>€100.000</span>
                  <span>€200.000</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-black mb-1.5">
                  <span className="text-stone-700 dark:text-stone-300">Indicatieve Hypotheekrente (10 jr vast):</span>
                  <span className="text-stone-900 dark:text-stone-100 font-black text-sm">{mortgageInterestRate}%</span>
                </div>
                <input
                  type="range"
                  min={2.5}
                  max={6.0}
                  step={0.1}
                  value={mortgageInterestRate}
                  onChange={(e) => setMortgageInterestRate(Number(e.target.value))}
                  className="w-full accent-orange-600 cursor-pointer"
                />
              </div>

              {/* NHG Indicator Badge */}
              <div className={`p-3 rounded-2xl border text-xs flex items-center justify-between ${
                isNhgEligible
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300'
                  : 'bg-stone-50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400'
              }`}>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold">Nationale Hypotheek Garantie (NHG):</span>
                </div>
                <span className="font-black">
                  {isNhgEligible ? '✅ Komt in aanmerking (< €450k)' : '❌ Boven NHG-grens'}
                </span>
              </div>
            </div>

            {/* Live Monthly Payment Result Card */}
            <div className={`lg:col-span-5 p-6 rounded-3xl border-2 text-left flex flex-col justify-between ${theme.bgLight} ${theme.borderLight}`}>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-orange-900 bg-orange-100 dark:bg-orange-950/80 px-2.5 py-1 rounded-md inline-block mb-3">
                  Indicatieve Maandlasten
                </span>

                <div className="mb-4">
                  <span className="text-[11px] text-stone-500 font-bold block">Netto per maand:</span>
                  <div className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white">
                    €{netMonthlyPayment.toLocaleString('nl-NL')}
                    <span className="text-xs font-bold text-stone-500"> / mnd*</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs font-bold text-stone-700 dark:text-stone-300">
                  <div className="bg-white dark:bg-stone-900/90 p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 flex justify-between">
                    <span>Bruto maandlast:</span>
                    <span className="font-black text-stone-900 dark:text-white">€{grossMonthlyPayment.toLocaleString('nl-NL')} / mnd</span>
                  </div>
                  <div className="bg-white dark:bg-stone-900/90 p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 flex justify-between">
                    <span>Benodigde hypotheek:</span>
                    <span className="font-black text-stone-900 dark:text-white">€{loanAmount.toLocaleString('nl-NL')}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={onRequestQuote}
                  className={`w-full py-3 px-4 rounded-xl text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 ${theme.primary} hover:opacity-90`}
                >
                  <span>Vrijblijvend Hypotheekgesprek Plannen</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <span className="text-[10px] text-stone-400 block text-center mt-2 font-medium">
                  *Indicatie op basis van annuïteiten. Geen rechten aan te ontlenen.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Bezichtiging Plannen Modal */}
      {selectedViewingProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedViewingProperty(null)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer p-1"
              aria-label="Sluiten"
            >
              <X className="w-5 h-5" />
            </button>

            {viewingConfirmed ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-stone-900 dark:text-white">
                  Bezichtiging Gereserveerd!
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 max-w-sm mx-auto leading-relaxed">
                  Beste <strong>{viewingData.name}</strong>, je tijdslot op <strong>{viewingTime}</strong> voor <strong>{selectedViewingProperty.title}</strong> staat voorlopig vast. Onze makelaar stuurt de Funda-verkoopbrochure naar <strong>{viewingData.email}</strong>.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSelectedViewingProperty(null)}
                    className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    Venster Sluiten
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  <h3 className="text-lg font-black text-stone-900 dark:text-white">
                    Plan Bezichtiging
                  </h3>
                </div>

                <div className="p-3 rounded-2xl bg-stone-100 dark:bg-stone-800/80 mb-5 flex items-center gap-3">
                  <img
                    src={selectedViewingProperty.img}
                    alt={selectedViewingProperty.title}
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <strong className="block text-xs font-bold text-stone-900 dark:text-white truncate">
                      {selectedViewingProperty.title}
                    </strong>
                    <span className="text-[11px] text-stone-500 block truncate">
                      {selectedViewingProperty.address}
                    </span>
                    <span className="text-xs font-black text-orange-600">
                      € {selectedViewingProperty.price.toLocaleString('nl-NL')} k.k.
                    </span>
                  </div>
                </div>

                <form onSubmit={handleViewingSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1.5">
                      Kies Voorkeursmoment
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[
                        'Vrijdag 14:00 - 14:45',
                        'Vrijdag 15:30 - 16:15',
                        'Zaterdag 10:30 - 11:15',
                        'Zaterdag 13:00 - 13:45',
                      ].map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setViewingTime(slot)}
                          className={`p-2 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                            viewingTime === slot
                              ? 'border-orange-600 bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400'
                              : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-orange-300'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <div>
                      <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                        Jouw Naam
                      </label>
                      <input
                        type="text"
                        required
                        value={viewingData.name}
                        onChange={(e) => setViewingData({ ...viewingData, name: e.target.value })}
                        placeholder="bijv. Sophie van Dijk"
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                          Telefoonnummer
                        </label>
                        <input
                          type="tel"
                          required
                          value={viewingData.phone}
                          onChange={(e) => setViewingData({ ...viewingData, phone: e.target.value })}
                          placeholder="06 12345678"
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                          E-mailadres
                        </label>
                        <input
                          type="email"
                          required
                          value={viewingData.email}
                          onChange={(e) => setViewingData({ ...viewingData, email: e.target.value })}
                          placeholder="sophie@voorbeeld.nl"
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer mt-2"
                  >
                    <span>Bevestig Tijdslot Reservering</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer Demo Note */}
      <footer className="py-8 px-4 text-center text-xs text-stone-500 border-t border-stone-200 dark:border-stone-800">
        <p>© 2026 {brandName} • Gemaakt met Samen Online Webconcepten</p>
      </footer>

    </div>
  );
};
