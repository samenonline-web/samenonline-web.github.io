'use client';

import React, { useState } from 'react';
import { Utensils, Calendar, Users, Clock, Plus, Minus, ShoppingBag, CheckCircle2, ArrowRight } from 'lucide-react';

export const InteractiveMenuReservation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'menu' | 'reserveren'>('menu');
  const [selectedCategory, setSelectedCategory] = useState<'voorgerechten' | 'hoofdgerechten' | 'desserts' | 'dranken'>('hoofdgerechten');
  
  // Cart state
  const [cart, setCart] = useState<Record<string, number>>({});
  
  // Reservation state
  const [guests, setGuests] = useState(2);
  const [resDate, setResDate] = useState('Vanavond');
  const [resTime, setResTime] = useState('19:00');
  const [isReserved, setIsReserved] = useState(false);

  const menuItems = [
    { id: '1', cat: 'voorgerechten', name: 'Carpaccio van Hollands Weiderund', desc: 'Met truffelmayonaise, Parmezaan en geroosterde pijnboompitten', price: 14.5 },
    { id: '2', cat: 'voorgerechten', name: 'Gerookte Zalm & Brioche', desc: 'Met dillecrème, kappertjes en ingelegde rode ui', price: 15.0 },
    { id: '3', cat: 'hoofdgerechten', name: 'Gebakken Zeebaarsfilet', desc: 'Op een bedje van seizoensgroenten met citroen-botersaus', price: 26.5 },
    { id: '4', cat: 'hoofdgerechten', name: 'Tournedos van de Grill (200g)', desc: 'Met rode wijnsaus, seizoensfrietjes en verse kruidenboter', price: 31.0 },
    { id: '5', cat: 'hoofdgerechten', name: 'Huisgemaakte Truffel Risotto (V)', desc: 'Met wilde bospaddenstoelen en Parmezaanschaafsel', price: 22.5 },
    { id: '6', cat: 'desserts', name: 'Lopend Chocoladetaartje', desc: 'Met ambachtelijk vanille-ijs en frambozencoulis', price: 9.5 },
    { id: '7', cat: 'desserts', name: 'Dame Blanche Royale', desc: 'Warm geserveerde Valrhona chocoladesaus en slagroom', price: 8.5 },
    { id: '8', cat: 'dranken', name: 'Huiswijn Rood / Wit (Fles)', desc: 'Verfijnde selectie uit Zuid-Frankrijk', price: 28.0 },
  ];

  const filteredItems = menuItems.filter((i) => i.cat === selectedCategory);

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[id] > 1) {
        next[id] -= 1;
      } else {
        delete next[id];
      }
      return next;
    });
  };

  const totalCartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalCartPrice = Object.entries(cart).reduce((sum, [id, count]) => {
    const item = menuItems.find((i) => i.id === id);
    return sum + (item ? item.price * count : 0);
  }, 0);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-md transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 text-xs font-black uppercase tracking-wider mb-2">
            <Utensils className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Horeca Demo Engine</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white tracking-tight">
            Digitale Menukaart &amp; Tafelreservering
          </h3>
          <p className="text-xs text-stone-600 dark:text-slate-300 font-medium">
            Klanten bestellen direct via QR-code aan tafel of reserveren online zonder dure commissie per couvert.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('menu')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'menu'
                ? 'bg-white dark:bg-slate-900 text-stone-900 dark:text-white shadow-xs'
                : 'text-stone-600 dark:text-slate-400 hover:text-stone-900'
            }`}
          >
            Menukaart ({menuItems.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reserveren')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'reserveren'
                ? 'bg-white dark:bg-slate-900 text-stone-900 dark:text-white shadow-xs'
                : 'text-stone-600 dark:text-slate-400 hover:text-stone-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Tafel Reserveren</span>
          </button>
        </div>
      </div>

      {activeTab === 'menu' ? (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Menu Items Column */}
          <div className="lg:col-span-8 space-y-4">
            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {(['voorgerechten', 'hoofdgerechten', 'desserts', 'dranken'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer shrink-0 border ${
                    selectedCategory === cat
                      ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800 text-stone-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Item list */}
            <div className="space-y-3">
              {filteredItems.map((item) => {
                const count = cart[item.id] || 0;
                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between gap-4 hover:border-amber-300 transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-xs sm:text-sm text-stone-900 dark:text-white">
                          {item.name}
                        </h4>
                      </div>
                      <p className="text-[11px] text-stone-500 dark:text-slate-400 font-medium truncate mt-0.5">
                        {item.desc}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono text-xs sm:text-sm font-black text-stone-900 dark:text-white">
                        €{item.price.toFixed(2).replace('.', ',')}
                      </span>

                      {count > 0 ? (
                        <div className="flex items-center gap-1.5 bg-amber-100 dark:bg-amber-950/80 rounded-xl p-1 border border-amber-300">
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="w-6 h-6 rounded-lg bg-white dark:bg-slate-800 text-stone-800 dark:text-white flex items-center justify-center cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-5 text-center text-xs font-black font-mono">{count}</span>
                          <button
                            type="button"
                            onClick={() => addToCart(item.id)}
                            className="w-6 h-6 rounded-lg bg-amber-600 text-white flex items-center justify-center cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => addToCart(item.id)}
                          className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Toevoegen</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-800/80 p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-stone-900 dark:text-white">
                <ShoppingBag className="w-4 h-4 text-amber-600" />
                <span>Bestelling ({totalCartCount})</span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                Tafel 04
              </span>
            </div>

            {totalCartCount === 0 ? (
              <p className="text-xs text-stone-500 text-center py-6">
                Klik op een gerecht om toe te voegen aan de bestelling.
              </p>
            ) : (
              <div className="space-y-3">
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {Object.entries(cart).map(([id, count]) => {
                    const item = menuItems.find((i) => i.id === id);
                    if (!item) return null;
                    return (
                      <div key={id} className="flex justify-between items-center text-xs">
                        <span className="truncate max-w-[140px] text-stone-700 dark:text-slate-300">
                          {count}x {item.name}
                        </span>
                        <span className="font-mono font-bold text-stone-900 dark:text-white">
                          €{(item.price * count).toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-baseline">
                  <span className="text-xs font-bold text-stone-700 dark:text-slate-300">Totaal:</span>
                  <span className="text-lg font-black font-mono text-stone-900 dark:text-white">
                    €{totalCartPrice.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => alert('Demo bestelling verzonden naar keuken!')}
                  className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-600/20 cursor-pointer"
                >
                  <span>Verzend naar Keuken (Demo)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Reservation Tab */
        <div className="mt-6 max-w-xl mx-auto space-y-6">
          {isReserved ? (
            <div className="p-8 text-center bg-emerald-50 dark:bg-emerald-950/40 rounded-3xl border border-emerald-200 dark:border-emerald-800 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-lg font-black text-stone-900 dark:text-white">
                Tafel Succesvol Gereserveerd!
              </h4>
              <p className="text-xs text-stone-600 dark:text-slate-300">
                Reservering voor {guests} personen op {resDate} om {resTime} uur. Bevestiging is direct verstuurd per SMS / e-mail.
              </p>
              <button
                type="button"
                onClick={() => setIsReserved(false)}
                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-emerald-300 text-emerald-800 dark:text-emerald-300 text-xs font-bold cursor-pointer"
              >
                Nieuwe reservering
              </button>
            </div>
          ) : (
            <div className="space-y-4 bg-slate-50 dark:bg-slate-800/60 p-6 rounded-3xl border border-slate-200 dark:border-slate-700">
              <h4 className="text-sm font-black text-stone-900 dark:text-white">
                Reserveer Direct Een Tafel
              </h4>

              {/* Guest selector */}
              <div>
                <label className="text-xs font-bold text-stone-700 dark:text-slate-300 block mb-1.5">
                  Aantal gasten
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, 6, 8].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuests(num)}
                      className={`flex-1 py-2 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                        guests === num
                          ? 'bg-amber-600 text-white border-amber-600'
                          : 'bg-white dark:bg-slate-900 text-stone-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeslots */}
              <div>
                <label className="text-xs font-bold text-stone-700 dark:text-slate-300 block mb-1.5">
                  Gewenst tijdslot vanavond
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['17:30', '18:15', '19:00', '19:45', '20:15', '20:45', '21:15', '21:45'].map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setResTime(time)}
                      className={`py-2 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                        resTime === time
                          ? 'bg-amber-600 text-white border-amber-600'
                          : 'bg-white dark:bg-slate-900 text-stone-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsReserved(true)}
                className="w-full py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-black text-xs shadow-md transition-all cursor-pointer"
              >
                Bevestig Reservering ({guests} gasten om {resTime})
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
