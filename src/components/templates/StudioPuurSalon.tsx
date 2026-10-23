'use client';

import React, { useState } from 'react';
import { TemplateProps } from '../../types/theme';
import {
  Scissors,
  Sparkles,
  Calendar,
  Clock,
  Check,
  Star,
  Sun,
  Moon,
  Heart,
  ArrowRight,
  ShieldCheck,
  MapPin,
} from 'lucide-react';

interface Service {
  id: string;
  name: string;
  category: 'haar' | 'kleur' | 'spa';
  duration: string;
  price: number;
  desc: string;
  image: string;
}

const SERVICES: Service[] = [
  {
    id: 's1',
    name: 'Dames Knippen, Wassen & Blow-dry',
    category: 'haar',
    duration: '45 min',
    price: 49.5,
    desc: 'Inclusief ontspannende hoofdhuidmassage en styling met Kevin Murphy eco-producten.',
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 's2',
    name: 'Balayage & Olaplex Herstelbehandeling',
    category: 'kleur',
    duration: '120 min',
    price: 135.0,
    desc: 'Natuurlijke sunkissed overloop inclusief toner en diepvoedende Olaplex binding-hersteller.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 's3',
    name: 'Heren Cut & Hot Towel Baardstyling',
    category: 'haar',
    duration: '35 min',
    price: 36.5,
    desc: 'Strakke fade of klassieke snit afgewerkt met warme handdoek en verzorgende baardolie.',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 's4',
    name: 'Gezichtsbehandeling & Glow Peeling',
    category: 'spa',
    duration: '60 min',
    price: 74.0,
    desc: 'Dieptereiniging, milde enzymatische peeling en intens hydraterend hyaluronzuur masker.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=700&q=80',
  },
];

const STYLISTS = [
  { id: 'noa', name: 'Noa van Leeuwen', role: 'Art Director & Master Colorist', avatar: '👩🏼' },
  { id: 'thomas', name: 'Thomas Bakker', role: 'Senior Stylist & Barber', avatar: '🧔🏻' },
  { id: 'fleur', name: 'Fleur Jansen', role: 'Huidtherapeut & Schoonheidsspecialist', avatar: '👩🏻' },
];

export const StudioPuurSalon: React.FC<TemplateProps> = ({
  theme,
  isDarkMode,
  onToggleDarkMode,
  onRequestQuote,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'alles' | 'haar' | 'kleur' | 'spa'>('alles');
  const [selectedService, setSelectedService] = useState(SERVICES[0].id);
  const [selectedStylist, setSelectedStylist] = useState(STYLISTS[0].id);
  const [selectedDay, setSelectedDay] = useState('Vrijdag 24 okt');
  const [selectedTime, setSelectedTime] = useState('11:00');
  const [booked, setBooked] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const filteredServices =
    selectedCategory === 'alles'
      ? SERVICES
      : SERVICES.filter((s) => s.category === selectedCategory);

  const activeServiceObj = SERVICES.find((s) => s.id === selectedService) || SERVICES[0];
  const activeStylistObj = STYLISTS.find((s) => s.id === selectedStylist) || STYLISTS[0];

  return (
    <div className="min-h-full bg-stone-50 text-stone-900 font-sans relative selection:bg-rose-500 selection:text-white">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold border border-stone-700 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <Sparkles className="w-4 h-4 text-rose-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className={`py-1.5 px-4 text-center text-xs font-bold text-white ${theme.primary} flex items-center justify-center gap-2 shadow-xs`}>
        <Scissors className="w-3.5 h-3.5" />
        <span>100% Vegan & Dierproefvrije Verzorging • Gekozen tot Beste Salon van Breda 2026</span>
      </div>

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 min-w-[40px] min-h-[40px] shrink-0 aspect-square rounded-xl ${theme.primary} text-white font-black flex items-center justify-center text-sm shadow-md`}>
            SP
          </div>
          <div>
            <span className="font-black text-base sm:text-lg tracking-tight block">Studio Puur Salon</span>
            <span className="text-[10px] text-stone-500 font-medium hidden sm:block">Breda Centrum • Kapper & Schoonheid</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-stone-700">
          <a href="#menu" className="hover:text-stone-900">Behandelingen</a>
          <a href="#afspraak" className="hover:text-stone-900">Online Afspraak</a>
          <a href="#salon" className="hover:text-stone-900">Over de Salon</a>
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
            href="#afspraak"
            className={`px-4 py-2 rounded-xl ${theme.primary} ${theme.primaryHover} text-white text-xs font-black shadow-md cursor-pointer`}
          >
            Direct Boeken
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-rose-50/40 via-stone-50 to-white py-14 sm:py-20 px-4 sm:px-8 border-b border-stone-200 text-center">
        <div className="max-w-4xl mx-auto">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText} text-xs font-black mb-4 border ${theme.borderLight}`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ervaar Rust, Aandacht en Perfectie in Onze Salon</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4">
            Haar en huidverzorging met een <span className={theme.textPrimary}>natuurlijke glow</span>.
          </h1>

          <p className="text-sm sm:text-base text-stone-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Neem even tijd voor jezelf. Onze topstylisten en huidspecialisten combineren de nieuwste knip- en kleurtechnieken met biologische verzorgingsproducten.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <a
              href="#afspraak"
              className={`px-6 py-3 rounded-xl ${theme.primary} ${theme.primaryHover} text-white font-extrabold text-xs shadow-md flex items-center gap-2`}
            >
              <Calendar className="w-4 h-4" />
              <span>Boek Jouw Stoel Online</span>
            </a>
            <a
              href="#menu"
              className="px-6 py-3 rounded-xl bg-white border border-stone-300 text-stone-800 text-xs font-extrabold hover:bg-stone-50 cursor-pointer shadow-xs"
            >
              Bekijk Prijslijst
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-stone-500 pt-6 border-t border-stone-200">
            <span className="text-stone-800 font-extrabold">🌿 100% Natuurlijke Producten</span>
            <span>•</span>
            <span className="text-stone-800 font-extrabold">☕ Verse Cappuccino & Ontspanning</span>
            <span>•</span>
            <span className="text-stone-800 font-extrabold">✨ 100% Vegan & Dierproefvrije Verzorging</span>
          </div>
        </div>
      </section>

      {/* Services Menu */}
      <section id="menu" className="py-12 sm:py-16 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">Onze Behandelingen</h2>
            <p className="text-xs sm:text-sm text-stone-500 font-medium">Kies een behandeling om direct online een tijdslot te reserveren</p>
          </div>

          <div className="flex items-center gap-1.5 bg-stone-200/60 p-1.5 rounded-2xl text-xs font-bold">
            {(['alles', 'haar', 'kleur', 'spa'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl transition-all capitalize cursor-pointer ${
                  selectedCategory === cat ? 'bg-white text-stone-900 shadow-sm font-black' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat === 'haar' ? 'Knippen' : cat === 'kleur' ? 'Kleuren' : cat === 'spa' ? 'Glow Spa' : 'Alles'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="h-56 w-full relative overflow-hidden bg-stone-100">
                <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                <span className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md">
                  {service.duration}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-black text-base text-stone-900 leading-snug">{service.name}</h3>
                    <span className="font-black text-lg text-stone-900 ml-2">€{service.price.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-stone-500 font-medium mb-4 leading-relaxed">{service.desc}</p>
                </div>

                <a
                  href="#afspraak"
                  onClick={() => {
                    setSelectedService(service.id);
                    showToast(`${service.name} geselecteerd voor afspraak!`);
                  }}
                  className={`w-full py-2.5 rounded-xl ${theme.primary} ${theme.primaryHover} text-white font-extrabold text-xs shadow-xs text-center cursor-pointer`}
                >
                  Selecteer & Kies Tijdslot
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Online Booking Tool */}
      <section id="afspraak" className="py-12 sm:py-16 px-4 sm:px-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl border-2 border-stone-200 p-6 sm:p-10 shadow-lg">
          <div className="text-center max-w-xl mx-auto mb-8">
            <Calendar className={`w-8 h-8 ${theme.textPrimary} mx-auto mb-2`} />
            <h2 className="text-2xl font-black text-stone-900">Plan Jouw Afspraak Online</h2>
            <p className="text-xs text-stone-500 font-medium">Binnen 1 minuut geregeld met directe sms-bevestiging</p>
          </div>

          {booked ? (
            <div className="p-8 text-center bg-rose-50 rounded-3xl border border-rose-200 space-y-3 max-w-md mx-auto">
              <span className="text-4xl block">✨</span>
              <h3 className="font-black text-lg text-stone-900">Afspraak Bevestigd (Demo)!</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                Je afspraak voor <strong>{activeServiceObj.name}</strong> bij <strong>{activeStylistObj.name}</strong> op <strong>{selectedDay} om {selectedTime} uur</strong> staat genoteerd!
              </p>
              <button
                onClick={() => setBooked(false)}
                className="text-xs text-stone-500 font-bold underline cursor-pointer hover:text-stone-900"
              >
                Plan nog een behandeling
              </button>
            </div>
          ) : (
            <div className="space-y-6 max-w-xl mx-auto text-left">
              {/* Selected Treatment Badge */}
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex justify-between items-center text-xs">
                <div>
                  <span className="text-stone-400 font-bold block text-[10px]">Gekozen Behandeling:</span>
                  <strong className="text-stone-900">{activeServiceObj.name}</strong>
                </div>
                <span className="font-black text-base text-stone-900">€{activeServiceObj.price.toFixed(2)}</span>
              </div>

              {/* Stylist Selector */}
              <div>
                <label className="text-xs font-black text-stone-700 block mb-2">Kies jouw stylist:</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {STYLISTS.map((st) => (
                    <button
                      key={st.id}
                      onClick={() => setSelectedStylist(st.id)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        selectedStylist === st.id
                          ? `${theme.borderLight} bg-stone-50 ring-2 ring-orange-500/25`
                          : 'border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <span className="text-2xl block mb-1">{st.avatar}</span>
                      <span className="font-black text-xs text-stone-900 block leading-tight">{st.name}</span>
                      <span className="text-[10px] text-stone-500">{st.role.split('&')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Day & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-black text-stone-700 block mb-1.5">Dag:</label>
                  <select
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white focus:outline-none"
                  >
                    <option value="Vrijdag 24 okt">Vrijdag 24 okt</option>
                    <option value="Zaterdag 25 okt">Zaterdag 25 okt</option>
                    <option value="Dinsdag 28 okt">Dinsdag 28 okt</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-black text-stone-700 block mb-1.5">Tijdstip:</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white focus:outline-none"
                  >
                    <option value="09:30">09:30 uur</option>
                    <option value="11:00">11:00 uur</option>
                    <option value="13:30">13:30 uur</option>
                    <option value="15:00">15:00 uur</option>
                    <option value="16:30">16:30 uur</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => {
                  setBooked(true);
                  showToast('Afspraak succesvol geboekt!');
                }}
                className={`w-full py-4 rounded-xl ${theme.primary} ${theme.primaryHover} text-white font-black text-xs shadow-md cursor-pointer`}
              >
                Bevestig Boeking ({selectedDay} om {selectedTime})
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
