'use client';

import React, { useState } from 'react';
import { TemplateProps } from '../../types/theme';
import {
  Check,
  ArrowRight,
  ShieldCheck,
  Wrench,
  MapPin,
  Sun,
  Moon,
  Sparkles,
  Zap,
  Gauge,
  Navigation,
  Calendar,
  X,
  Star,
} from 'lucide-react';

interface FrameColorOption {
  id: 'matzwart' | 'koningsblauw' | 'bosgroen' | 'oranje' | 'zand';
  label: string;
  hex: string;
  image: string;
}

const FRAME_COLORS: FrameColorOption[] = [
  {
    id: 'matzwart',
    label: 'Mat Zwart (Onyx)',
    hex: '#18181b',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'koningsblauw',
    label: 'Koningsblauw Metallic',
    hex: '#0284c7',
    image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'bosgroen',
    label: 'Veluwe Bosgroen',
    hex: '#065f46',
    image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'oranje',
    label: 'Dutch Edition Oranje',
    hex: '#ea580c',
    image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'zand',
    label: 'Duinzand Sahara',
    hex: '#d97706',
    image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=800&q=80',
  },
];

const ACCESSORIES = [
  { id: 'gps', label: 'Smart GPS Tracker met opsporingsdienst (2 jr)', price: 129, icon: '🛰️' },
  { id: 'carrier', label: 'Heavy-duty Voordrager met bamboe plank', price: 89, icon: '📦' },
  { id: 'suspension', label: 'Geveerde Kinekt Zadelpen (rugcomfort)', price: 119, icon: '💺' },
  { id: 'panniers', label: 'Dubbele waterdichte Ortlieb fietstassen', price: 149, icon: '🎒' },
];

export const FietsCraftConfigurator: React.FC<TemplateProps> = ({
  theme,
  isDarkMode,
  onToggleDarkMode,
  onRequestQuote,
}) => {
  const [frameColor, setFrameColor] = useState<FrameColorOption['id']>('matzwart');
  const [motorType, setMotorType] = useState<'city' | 'sport' | 'cargo'>('sport');
  const [batterySize, setBatterySize] = useState<'standard' | 'extra'>('standard');
  const [beltDrive, setBeltDrive] = useState<boolean>(true);
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>(['gps']);
  const [isTestRideModalOpen, setIsTestRideModalOpen] = useState(false);
  const [testRideDate, setTestRideDate] = useState('2026-10-25');
  const [testRidePostcode, setTestRidePostcode] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleAccessory = (id: string) => {
    setSelectedAccessories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Base and Addon Pricing
  const basePrice = 2199;
  const motorPrice = motorType === 'sport' ? 350 : motorType === 'cargo' ? 550 : 0;
  const batteryPrice = batterySize === 'extra' ? 249 : 0;
  const beltPrice = beltDrive ? 180 : 0;
  const accessoriesTotal = selectedAccessories.reduce((sum, id) => {
    const acc = ACCESSORIES.find((a) => a.id === id);
    return sum + (acc ? acc.price : 0);
  }, 0);

  const totalPrice = basePrice + motorPrice + batteryPrice + beltPrice + accessoriesTotal;

  // Realtime Bike Specs
  const currentRange = batterySize === 'extra' ? (motorType === 'cargo' ? 110 : 135) : (motorType === 'cargo' ? 75 : 90);
  const currentTorque = motorType === 'cargo' ? 85 : motorType === 'sport' ? 75 : 55;
  const currentWeight = (18.6 + (batterySize === 'extra' ? 0.9 : 0) + (selectedAccessories.length * 0.4)).toFixed(1);

  const activeColorConfig = FRAME_COLORS.find((c) => c.id === frameColor) || FRAME_COLORS[0];

  return (
    <div className="min-h-full bg-stone-50 text-stone-900 font-sans relative selection:bg-orange-500 selection:text-white">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold border border-stone-700 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className={`py-1.5 px-4 text-center text-xs font-bold text-white ${theme.primary} flex items-center justify-center gap-2 shadow-xs`}>
        <Wrench className="w-3.5 h-3.5" />
        <span>Handgemaakt in Rotterdam • Rijklaar binnen 14 dagen aan huis geleverd met 5 jaar garantie</span>
      </div>

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 min-w-[40px] min-h-[40px] shrink-0 aspect-square rounded-xl ${theme.primary} text-white font-black flex items-center justify-center text-sm shadow-md`}>
            FC
          </div>
          <div>
            <span className="font-black text-base sm:text-lg tracking-tight block">FietsCraft B.V.</span>
            <span className="text-[10px] text-stone-500 font-medium hidden sm:block">Rotterdam • Handgemaakte E-Bikes</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-stone-700">
          <a href="#configurator" className="hover:text-stone-900">3D Configurator</a>
          <a href="#specs" className="hover:text-stone-900">Technische Specificaties</a>
          <a href="#proefrit" className="hover:text-stone-900">Proefrit aan Huis</a>
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
            onClick={() => setIsTestRideModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all cursor-pointer border border-stone-200"
          >
            Gratis Proefrit
          </button>

          <button
            onClick={onRequestQuote}
            className={`px-4 py-2 rounded-xl ${theme.primary} ${theme.primaryHover} text-white text-xs font-black shadow-md cursor-pointer`}
          >
            Bestel Jouw Fiets
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-stone-100/60 via-stone-50 to-white py-12 sm:py-16 px-4 sm:px-8 border-b border-stone-200 text-center">
        <div className="max-w-4xl mx-auto">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText} text-xs font-black mb-4 border ${theme.borderLight}`}>
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Dutch Craftsmanship • Bafang & Bosch Aandrijving</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4">
            Jouw droomfiets, <span className={theme.textPrimary}>tot in elk detail</span> op maat gebouwd.
          </h1>

          <p className="text-sm sm:text-base text-stone-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Configureer live jouw framekleur, motorvermogen, riemaandrijving en accessoires. Realtime berekende actieradius en direct vrijblijvende offerte.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#configurator"
              className={`px-6 py-3 rounded-xl ${theme.primary} ${theme.primaryHover} text-white font-extrabold text-xs shadow-md flex items-center gap-2`}
            >
              <span>Start Met Configureren</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => setIsTestRideModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-white border border-stone-300 text-stone-800 text-xs font-extrabold hover:bg-stone-50 cursor-pointer shadow-xs"
            >
              Plan Proefrit Aan Huis
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Configurator Section */}
      <section id="configurator" className="py-12 sm:py-16 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Dynamic Bike Visualizer */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md sticky top-24">
            <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden mb-6 bg-stone-100 flex items-center justify-center">
              <img
                src={activeColorConfig.image}
                alt={activeColorConfig.label}
                className="w-full h-full object-cover transition-all duration-500"
              />

              {/* Color Tag Badge */}
              <div className="absolute top-4 left-4 bg-stone-950/80 backdrop-blur-md text-white text-xs font-black px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-md">
                <span className="w-3 h-3 rounded-full border border-white" style={{ backgroundColor: activeColorConfig.hex }} />
                <span>{activeColorConfig.label}</span>
              </div>

              {beltDrive && (
                <div className="absolute bottom-4 left-4 bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-[11px] font-bold px-3 py-1 rounded-lg flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Gates CDX Carbon Belt Drive</span>
                </div>
              )}
            </div>

            {/* Live Real-time Specs Bar */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200">
                <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-stone-500 mb-0.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Actieradius</span>
                </div>
                <span className="font-black text-base sm:text-lg text-stone-900">{currentRange} km</span>
              </div>

              <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200">
                <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-stone-500 mb-0.5">
                  <Gauge className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Trekkracht</span>
                </div>
                <span className="font-black text-base sm:text-lg text-stone-900">{currentTorque} Nm</span>
              </div>

              <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200">
                <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-stone-500 mb-0.5">
                  <Wrench className="w-3.5 h-3.5 text-stone-400" />
                  <span>Gewicht</span>
                </div>
                <span className="font-black text-base sm:text-lg text-stone-900">{currentWeight} kg</span>
              </div>
            </div>
          </div>

          {/* Right: Configurator Option Controls */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* 1. Frame Color */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <h3 className="font-black text-xs sm:text-sm text-stone-900 mb-3">1. Kies Poedercoating Framekleur</h3>
              <div className="grid grid-cols-2 gap-2">
                {FRAME_COLORS.map((c) => {
                  const isSelected = frameColor === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => {
                        setFrameColor(c.id);
                        showToast(`Kleur aangepast: ${c.label}`);
                      }}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs font-bold transition-all text-left cursor-pointer ${
                        isSelected
                          ? `${theme.borderLight} bg-stone-50 ring-2 ring-orange-500/25`
                          : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full border border-stone-300 shrink-0" style={{ backgroundColor: c.hex }} />
                      <span className="truncate">{c.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Motor Power */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <h3 className="font-black text-xs sm:text-sm text-stone-900 mb-3">2. Middenmotor & Koppel</h3>
              <div className="space-y-2">
                {[
                  { id: 'city', title: 'Bafang M400 City (55 Nm)', desc: 'Stil, efficiënt voor woon-werk in de stad', price: 'Inbegrepen' },
                  { id: 'sport', title: 'Bosch Performance Line (75 Nm)', desc: 'Krachtig tegenwind- en heuvelsysteem', price: '+€350' },
                  { id: 'cargo', title: 'Bosch Cargo Line (85 Nm)', desc: 'Maximaal koppel voor kinderzitjes & zware tassen', price: '+€550' },
                ].map((item) => {
                  const isSelected = motorType === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setMotorType(item.id as any)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isSelected
                          ? `${theme.borderLight} bg-stone-50 ring-2 ring-orange-500/25`
                          : 'border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div>
                        <span className="font-extrabold text-xs text-stone-900 block">{item.title}</span>
                        <span className="text-[10px] text-stone-500">{item.desc}</span>
                      </div>
                      <span className="text-xs font-black text-stone-700 shrink-0 ml-2">{item.price}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Aandrijving: Belt vs Ketting */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <h3 className="font-black text-xs sm:text-sm text-stone-900 mb-3">3. Aandrijving & Ketting</h3>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <button
                  onClick={() => setBeltDrive(true)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    beltDrive ? `${theme.borderLight} bg-stone-50 ring-2 ring-orange-500/25` : 'border-stone-200'
                  }`}
                >
                  <span className="block font-black text-stone-900">Gates Belt Drive</span>
                  <span className="text-[10px] text-emerald-700 font-bold">+€180 (Schoon & stil)</span>
                </button>
                <button
                  onClick={() => setBeltDrive(false)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    !beltDrive ? `${theme.borderLight} bg-stone-50 ring-2 ring-orange-500/25` : 'border-stone-200'
                  }`}
                >
                  <span className="block font-black text-stone-900">Shimano E-Ketting</span>
                  <span className="text-[10px] text-stone-500">Standaard inbegrepen</span>
                </button>
              </div>
            </div>

            {/* 4. Accu Keuze */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <h3 className="font-black text-xs sm:text-sm text-stone-900 mb-3">4. Accu Capaciteit</h3>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <button
                  onClick={() => setBatterySize('standard')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    batterySize === 'standard' ? `${theme.borderLight} bg-stone-50 ring-2 ring-orange-500/25` : 'border-stone-200'
                  }`}
                >
                  <span className="block font-black text-stone-900">500 Wh Accu</span>
                  <span className="text-[10px] text-stone-500">Tot 90 km bereik</span>
                </button>
                <button
                  onClick={() => setBatterySize('extra')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    batterySize === 'extra' ? `${theme.borderLight} bg-stone-50 ring-2 ring-orange-500/25` : 'border-stone-200'
                  }`}
                >
                  <span className="block font-black text-stone-900">750 Wh Long-Range</span>
                  <span className="text-[10px] text-emerald-700 font-bold">+€249 (Tot 135 km)</span>
                </button>
              </div>
            </div>

            {/* 5. Accessoires */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <h3 className="font-black text-xs sm:text-sm text-stone-900 mb-3">5. Optionele Fabrieksaccessoires</h3>
              <div className="space-y-2">
                {ACCESSORIES.map((acc) => {
                  const active = selectedAccessories.includes(acc.id);
                  return (
                    <button
                      key={acc.id}
                      onClick={() => toggleAccessory(acc.id)}
                      className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-xs transition-all cursor-pointer ${
                        active
                          ? `${theme.borderLight} bg-stone-50 ring-2 ring-orange-500/25`
                          : 'border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{acc.icon}</span>
                        <span className="font-bold text-stone-900">{acc.label}</span>
                      </div>
                      <span className="font-black text-stone-700 shrink-0 ml-2">+€{acc.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Summary & Checkout Card */}
            <div className={`p-6 rounded-3xl ${theme.bgLight} border-2 ${theme.borderLight}`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs font-bold text-stone-500 block">Rijklaar Totaalbedrag:</span>
                  <span className="text-3xl font-black text-stone-900">€{totalPrice.toLocaleString('nl-NL')}</span>
                </div>
                <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
                  Inclusief 21% BTW
                </span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={onRequestQuote}
                  className={`w-full py-3.5 rounded-xl ${theme.primary} ${theme.primaryHover} text-white font-black text-xs shadow-md transition-all cursor-pointer`}
                >
                  Vraag Vrijblijvende Offerte Aan
                </button>
                <button
                  onClick={() => setIsTestRideModalOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-white border border-stone-300 text-stone-800 font-extrabold text-xs hover:bg-stone-50 cursor-pointer shadow-xs"
                >
                  Plan Gratis Proefrit Aan Huis
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[10px] font-bold text-stone-500 mt-4">
                <span>🛡️ 5 Jaar Garantie</span>
                <span>•</span>
                <span>🚚 Gratis Levering</span>
                <span>•</span>
                <span>⚙️ 1e Beurt Gratis</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Test Ride Modal */}
      {isTestRideModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className={`w-5 h-5 ${theme.textPrimary}`} />
                <h3 className="font-black text-base text-stone-900">Boek Een Proefrit Aan Huis</h3>
              </div>
              <button
                onClick={() => setIsTestRideModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-600 mb-5 font-medium leading-relaxed">
              Wij komen met jouw geconfigureerde fiets ({activeColorConfig.label}) naar jouw adres voor een 45-minuten proefrit. Volledig gratis en zonder aankoopverplichting.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsTestRideModalOpen(false);
                showToast('Proefrit aanvraag succesvol verstuurd! We bellen je voor de definitieve bevestiging.');
              }}
              className="space-y-3"
            >
              <div>
                <label className="text-[11px] font-black text-stone-700 block mb-1">Gewenste datum:</label>
                <input
                  type="date"
                  value={testRideDate}
                  onChange={(e) => setTestRideDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-black text-stone-700 block mb-1">Postcode & Huisnummer:</label>
                <input
                  type="text"
                  placeholder="Bijv. 3011 AA, 12"
                  value={testRidePostcode}
                  onChange={(e) => setTestRidePostcode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3 rounded-xl ${theme.primary} ${theme.primaryHover} text-white font-black text-xs shadow-md mt-4 cursor-pointer`}
              >
                Bevestig Proefrit Aanvraag
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
