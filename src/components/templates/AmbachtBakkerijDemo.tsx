'use client';

import React, { useState } from 'react';
import { TemplateProps } from '../../types/theme';
import { Clock, Check, ShoppingBag, Heart, ArrowRight, Sun, Moon } from 'lucide-react';

export const AmbachtBakkerijDemo: React.FC<TemplateProps> = ({ theme, isDarkMode, onToggleDarkMode, onRequestQuote }) => {
  const [selectedSlot, setSelectedSlot] = useState('08:30 - 09:30');
  const [cartItems, setCartItems] = useState<{ name: string; price: number }[]>([]);

  const items = [
    { name: 'Oud-Hollands Zuurdesembrood', desc: '48 uur natuurlijk gerezen, knapperige korst', price: 4.25, icon: '🍞' },
    { name: 'Roomboter Croissants (4 stuks)', desc: 'Dagvers gebakken met Franse roomboter', price: 5.50, icon: '🥐' },
    { name: 'Ambachtelijke Appeltaart (6 pers.)', desc: 'Met Elstar appels, kaneel en rozijnen', price: 14.95, icon: '🥧' },
  ];

  const addItem = (item: typeof items[0]) => {
    setCartItems(prev => [...prev, { name: item.name, price: item.price }]);
  };

  const total = cartItems.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="min-h-full bg-stone-50 text-stone-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl ${theme.primary} text-white font-black flex items-center justify-center text-sm shadow-sm`}>
            AB
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight">AmbachtBakkerij van Oranje</span>
            <span className="block text-[10px] text-stone-500 font-medium">Haarlem • Sinds 1934</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs font-bold">
          <nav className="hidden sm:flex items-center gap-5 text-stone-600">
            <a href="#assortiment" className="hover:text-stone-900">Vers Assortiment</a>
            <a href="#tijdslot" className="hover:text-stone-900">Afhaaltijden</a>
            <a href="#verhaal" className="hover:text-stone-900">Ons Verhaal</a>
          </nav>
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer border border-stone-200"
              title={isDarkMode ? 'Lichte Modus' : 'Donkere Modus'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
            </button>
          )}
          <button
            onClick={onRequestQuote}
            className={`px-4 py-2 rounded-xl ${theme.primary} ${theme.primaryHover} text-white text-xs font-bold shadow-xs cursor-pointer`}
          >
            Bestelling Plaatsen
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className={`py-12 px-6 ${theme.bgLight} border-b ${theme.borderLight} text-center`}>
        <div className="max-w-2xl mx-auto">
          <span className="text-3xl mb-2 block">🌾</span>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-snug mb-3">
            Elke ochtend om 04:00 <span className={theme.textPrimary}>vers voor jou gekneed</span>.
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mb-6 max-w-lg mx-auto">
            Bestel voor 21:00 online en haal je warme brood en patisserie de volgende ochtend zonder wachttijd op.
          </p>
          <a
            href="#assortiment"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl ${theme.primary} ${theme.primaryHover} text-white font-bold text-xs shadow-md`}
          >
            <span>Bekijk Ons Dagvers Menu</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Assortment */}
      <section id="assortiment" className="py-12 px-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-stone-900">Dagverse Specialiteiten</h2>
            <p className="text-xs text-stone-500 font-medium">Kies jouw favoriete baksels voor morgenochtend</p>
          </div>
          {cartItems.length > 0 && (
            <div className="flex items-center gap-2 text-xs font-bold text-stone-800 bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-2xs">
              <ShoppingBag className={`w-4 h-4 ${theme.textPrimary}`} />
              <span>{cartItems.length} items (€{total.toFixed(2)})</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {items.map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-4xl block mb-3">{item.icon}</span>
                <h3 className="font-extrabold text-sm text-stone-900 mb-1">{item.name}</h3>
                <p className="text-xs text-stone-500 font-medium mb-4">{item.desc}</p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                <span className="font-black text-sm text-stone-900">€{item.price.toFixed(2)}</span>
                <button
                  onClick={() => addItem(item)}
                  className={`px-3 py-1.5 rounded-xl ${theme.primary} ${theme.primaryHover} text-white text-xs font-bold shadow-2xs cursor-pointer`}
                >
                  + Bestel
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Timeslot Picker */}
        <div id="tijdslot" className={`p-6 rounded-3xl ${theme.bgLight} border-2 ${theme.borderLight} text-center`}>
          <Clock className={`w-6 h-6 ${theme.textPrimary} mx-auto mb-2`} />
          <h3 className="font-extrabold text-base text-stone-900 mb-1">Kies Jouw Afhaaltijdslot</h3>
          <p className="text-xs text-stone-600 mb-4">Dan zorgen wij dat je bestelling warm en klaarstaat in onze winkel in Haarlem</p>
          
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            {['08:00 - 08:30', '08:30 - 09:30', '09:30 - 10:30', '10:30 - 12:00'].map(slot => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                  selectedSlot === slot ? `${theme.primary} text-white border-transparent shadow-xs` : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>

          <button
            onClick={onRequestQuote}
            className={`px-8 py-3 rounded-xl ${theme.primary} ${theme.primaryHover} text-white text-xs font-bold shadow-md cursor-pointer`}
          >
            Bevestig Bestelling ({selectedSlot})
          </button>
        </div>
      </section>
    </div>
  );
};
