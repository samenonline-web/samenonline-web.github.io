'use client';

import React, { useState } from 'react';
import { TemplateProps } from '../../types/theme';
import {
  UtensilsCrossed,
  Calendar,
  Clock,
  Check,
  Star,
  Sun,
  Moon,
  Sparkles,
  Users,
  MapPin,
  Wine,
  Flame,
  ArrowRight,
} from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  category: 'voorgerechten' | 'hoofdgerechten' | 'desserts';
  price: number;
  desc: string;
  allergens: string[];
  image: string;
  badge?: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: 'Hollands Rundercarpaccio met Truffelcrème',
    category: 'voorgerechten',
    price: 14.5,
    desc: 'Met Parmezaanse kaas schilfers, pijnboompitten, rucola en krokant zuurdesemkruim.',
    allergens: ['Noten', 'Lactose'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80',
    badge: 'Favoriet',
  },
  {
    id: 'm2',
    name: 'Op de Huid Gebakken Zeebaarsfilet',
    category: 'hoofdgerechten',
    price: 24.5,
    desc: 'Geserveerd met romige saffraanrisotto, gegrilde groene asperges en beurre blanc saus.',
    allergens: ['Vis', 'Lactose'],
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=700&q=80',
    badge: 'Chef Special',
  },
  {
    id: 'm3',
    name: 'Geroosterde Pompoen Gnocchi (Vega)',
    category: 'hoofdgerechten',
    price: 19.5,
    desc: 'Huisgemaakte gnocchi met salieboter, geroosterde hazelnoten en zachte geitenkaas.',
    allergens: ['Vegetarisch', 'Noten'],
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'm4',
    name: 'Lopend Chocoladetaartje (Lava Cake)',
    category: 'desserts',
    price: 9.5,
    desc: 'Van 70% pure Callebaut chocolade, met ambachtelijk vanille-bourbon ijs en rood fruit coulis.',
    allergens: ['Gluten', 'Lactose'],
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80',
  },
];

export const BistroDeGracht: React.FC<TemplateProps> = ({
  theme,
  isDarkMode,
  onToggleDarkMode,
  onRequestQuote,
}) => {
  const [activeCategory, setActiveCategory] = useState<'alles' | 'voorgerechten' | 'hoofdgerechten' | 'desserts'>('alles');
  const [guests, setGuests] = useState(2);
  const [resDate, setResDate] = useState('Vrijdag 24 okt');
  const [resTime, setResTime] = useState('19:00');
  const [seating, setSeating] = useState<'binnen' | 'terras'>('binnen');
  const [reserved, setReserved] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const filteredItems =
    activeCategory === 'alles'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((i) => i.category === activeCategory);

  return (
    <div className="min-h-full bg-stone-50 text-stone-900 font-sans relative selection:bg-amber-600 selection:text-white">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold border border-stone-700 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className={`py-1.5 px-4 text-center text-xs font-bold text-white ${theme.primary} flex items-center justify-center gap-2 shadow-xs`}>
        <UtensilsCrossed className="w-3.5 h-3.5" />
        <span>Seizoensgebonden Frans-Nederlandse Keuken • Uitzicht over de historische gracht • Open vanaf 17:00</span>
      </div>

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${theme.primary} text-white font-black flex items-center justify-center text-sm shadow-md`}>
            BG
          </div>
          <div>
            <span className="font-black text-base sm:text-lg tracking-tight block">Bistro De Gracht</span>
            <span className="text-[10px] text-stone-500 font-medium hidden sm:block">Oudegracht Utrecht • Gastronomie & Wijn</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-stone-700">
          <a href="#menukaart" className="hover:text-stone-900">Menukaart</a>
          <a href="#reserveren" className="hover:text-stone-900">Tafel Reserveren</a>
          <a href="#arrangement" className="hover:text-stone-900">Chef’s Menu</a>
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
            href="#reserveren"
            className={`px-4 py-2 rounded-xl ${theme.primary} ${theme.primaryHover} text-white text-xs font-black shadow-md cursor-pointer`}
          >
            Reserveer Tafel
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-amber-100/30 via-stone-50 to-white py-14 sm:py-20 px-4 sm:px-8 border-b border-stone-200 text-center">
        <div className="max-w-4xl mx-auto">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText} text-xs font-black mb-4 border ${theme.borderLight}`}>
            <Wine className="w-3.5 h-3.5" />
            <span>Bib Gourmand Bekroond • Lokale Dagverse Ingrediënten</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4">
            Genieten van de pure keuken aan de <span className={theme.textPrimary}>historische Utrechtse gracht</span>.
          </h1>

          <p className="text-sm sm:text-base text-stone-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Een intieme sfeer in een sfeervol werfkelderpand. Kom lunchen aan het water of geniet van ons wisselende 3- of 4-gangen Chef&apos;s Tasting menu.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <a
              href="#reserveren"
              className={`px-6 py-3 rounded-xl ${theme.primary} ${theme.primaryHover} text-white font-extrabold text-xs shadow-md flex items-center gap-2`}
            >
              <Calendar className="w-4 h-4" />
              <span>Reserveer Jouw Tafel</span>
            </a>
            <a
              href="#menukaart"
              className="px-6 py-3 rounded-xl bg-white border border-stone-300 text-stone-800 text-xs font-extrabold hover:bg-stone-50 cursor-pointer shadow-xs"
            >
              Bekijk Onze Menukaart
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-stone-500 pt-6 border-t border-stone-200">
            <span className="text-stone-800 font-extrabold">🍷 45+ Geselecteerde Natuurwijnen</span>
            <span>•</span>
            <span className="text-stone-800 font-extrabold">🌊 Terras direct aan het water</span>
            <span>•</span>
            <span className="text-stone-800 font-extrabold">🍽️ Seizoensgebonden Dagspecialiteiten</span>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menukaart" className="py-12 sm:py-16 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">Onze Menukaart</h2>
            <p className="text-xs sm:text-sm text-stone-500 font-medium">Bereid met ingrediënten van lokale boeren en visafslagen</p>
          </div>

          <div className="flex items-center gap-1.5 bg-stone-200/60 p-1.5 rounded-2xl text-xs font-bold">
            {(['alles', 'voorgerechten', 'hoofdgerechten', 'desserts'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl transition-all capitalize cursor-pointer ${
                  activeCategory === cat ? 'bg-white text-stone-900 shadow-sm font-black' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat === 'alles' ? 'Alles' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="h-56 w-full relative overflow-hidden bg-stone-100">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                {item.badge && (
                  <span className={`absolute top-3 left-3 text-[10px] font-black px-2.5 py-1 rounded-md ${theme.primary} text-white shadow-xs`}>
                    {item.badge}
                  </span>
                )}
                <div className="absolute bottom-3 left-3 flex gap-1">
                  {item.allergens.map((alg, i) => (
                    <span key={i} className="text-[10px] font-bold bg-stone-900/80 backdrop-blur-xs text-stone-200 px-2 py-0.5 rounded-md">
                      {alg}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-black text-base text-stone-900 leading-snug">{item.name}</h3>
                    <span className="font-black text-lg text-stone-900 ml-2">€{item.price.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-stone-500 font-medium mb-4 leading-relaxed">{item.desc}</p>
                </div>

                <a
                  href="#reserveren"
                  className="w-full py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold text-center transition-colors cursor-pointer"
                >
                  Reserveer & Proef
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Table Reservation Tool */}
      <section id="reserveren" className="py-12 sm:py-16 px-4 sm:px-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl border-2 border-stone-200 p-6 sm:p-10 shadow-lg">
          <div className="text-center max-w-xl mx-auto mb-8">
            <Calendar className={`w-8 h-8 ${theme.textPrimary} mx-auto mb-2`} />
            <h2 className="text-2xl font-black text-stone-900">Direct Online Tafel Reserveren</h2>
            <p className="text-xs text-stone-500 font-medium">Binnen enkele seconden bevestigd. Geen wachttijd aan de telefoon.</p>
          </div>

          {reserved ? (
            <div className="p-8 text-center bg-amber-50 rounded-3xl border border-amber-200 space-y-3 max-w-md mx-auto">
              <span className="text-4xl block">🥂</span>
              <h3 className="font-black text-lg text-stone-900">Tafel Gereserveerd (Demo)!</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                Je tafel voor <strong>{guests} personen</strong> ({seating === 'binnen' ? 'in de sfeervolle werfkelder' : 'op het terras aan het water'}) staat klaar op <strong>{resDate} om {resTime} uur</strong>!
              </p>
              <button
                onClick={() => setReserved(false)}
                className="text-xs text-stone-500 font-bold underline cursor-pointer hover:text-stone-900"
              >
                Nieuwe reservering maken
              </button>
            </div>
          ) : (
            <div className="space-y-6 max-w-xl mx-auto text-left">
              {/* Guests Count */}
              <div>
                <label className="text-xs font-black text-stone-700 block mb-2">Aantal personen:</label>
                <div className="grid grid-cols-6 gap-1.5">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      onClick={() => setGuests(num)}
                      className={`py-2 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                        guests === num ? `${theme.primary} text-white border-transparent shadow-xs` : 'border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      {num} {num === 1 ? 'pers' : 'pers'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Seating preference */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSeating('binnen')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    seating === 'binnen' ? `${theme.borderLight} bg-stone-50 ring-2 ring-orange-500/25` : 'border-stone-200'
                  }`}
                >
                  <span className="font-black text-xs text-stone-900 block">Sfeervol Binnen</span>
                  <span className="text-[10px] text-stone-500">Historische gewelven</span>
                </button>
                <button
                  onClick={() => setSeating('terras')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    seating === 'terras' ? `${theme.borderLight} bg-stone-50 ring-2 ring-orange-500/25` : 'border-stone-200'
                  }`}
                >
                  <span className="font-black text-xs text-stone-900 block">Terras aan de Gracht</span>
                  <span className="text-[10px] text-stone-500">Verwarmd bij fris weer</span>
                </button>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-black text-stone-700 block mb-1.5">Datum:</label>
                  <select
                    value={resDate}
                    onChange={(e) => setResDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white focus:outline-none"
                  >
                    <option value="Vanavond">Vanavond</option>
                    <option value="Vrijdag 24 okt">Vrijdag 24 okt</option>
                    <option value="Zaterdag 25 okt">Zaterdag 25 okt</option>
                    <option value="Zondag 26 okt">Zondag 26 okt</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-black text-stone-700 block mb-1.5">Tijdstip:</label>
                  <select
                    value={resTime}
                    onChange={(e) => setResTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold bg-white focus:outline-none"
                  >
                    <option value="17:30">17:30 uur</option>
                    <option value="18:30">18:30 uur</option>
                    <option value="19:00">19:00 uur</option>
                    <option value="20:00">20:00 uur</option>
                    <option value="20:30">20:30 uur</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => {
                  setReserved(true);
                  showToast('Tafelreservering bevestigd!');
                }}
                className={`w-full py-4 rounded-xl ${theme.primary} ${theme.primaryHover} text-white font-black text-xs shadow-md cursor-pointer`}
              >
                Bevestig Reservering ({guests} pers. op {resDate} om {resTime})
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
