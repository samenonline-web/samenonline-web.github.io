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
  ShoppingBag,
  Plus,
  Minus,
  X,
  CreditCard,
  Printer,
  CheckCircle2,
  Trash2,
  Leaf,
} from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  category: 'voorgerechten' | 'hoofdgerechten' | 'desserts';
  isVegetarian?: boolean;
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
    isVegetarian: true,
    price: 19.5,
    desc: 'Huisgemaakte gnocchi met salieboter, geroosterde hazelnoten en zachte geitenkaas.',
    allergens: ['Vegetarisch', 'Noten'],
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=700&q=80',
    badge: '100% Vega',
  },
  {
    id: 'm4',
    name: 'Ambachtelijke Zeelandse Mosselen in Witte Wijn',
    category: 'hoofdgerechten',
    price: 22.5,
    desc: 'Klassiek bereid met fijne soepgroenten, knoflooksaus, huisgemaakte remoulade en dikke frieten.',
    allergens: ['Schaaldieren', 'Selderij'],
    image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'm5',
    name: 'Lopend Chocoladetaartje (Lava Cake)',
    category: 'desserts',
    isVegetarian: true,
    price: 9.5,
    desc: 'Van 70% pure Callebaut chocolade, met ambachtelijk vanille-bourbon ijs en rood fruit coulis.',
    allergens: ['Gluten', 'Lactose'],
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80',
    badge: 'Huisgemaakt',
  },
  {
    id: 'm6',
    name: 'Tarte Tatin van Hollandse Stoofpeer',
    category: 'desserts',
    isVegetarian: true,
    price: 8.5,
    desc: 'Gekarameliseerde Gieser Wildeman peren met kaneel-kruidnagelijs en crème fraîche.',
    allergens: ['Gluten', 'Lactose'],
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=700&q=80',
  },
];

export const BistroDeGracht: React.FC<TemplateProps> = ({
  theme,
  isDarkMode,
  onToggleDarkMode,
  onRequestQuote,
  customBrandName,
  customCity,
  onOpenIdealCheckout,
}) => {
  const brandTitle = customBrandName || 'Bistro De Gracht';
  const cityName = customCity || 'Utrecht';

  const [activeCategory, setActiveCategory] = useState<'alles' | 'voorgerechten' | 'hoofdgerechten' | 'desserts' | 'vega'>('alles');
  const [guests, setGuests] = useState(2);
  const [resDate, setResDate] = useState('Vrijdag 24 okt');
  const [resTime, setResTime] = useState('19:00');
  const [seating, setSeating] = useState<'binnen' | 'terras'>('binnen');
  const [reserved, setReserved] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart & Ordering State
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderType, setOrderType] = useState<'tafel' | 'afhalen'>('tafel');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const addToCart = (item: MenuItem) => {
    setCart((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));
    showToast(`✓ ${item.name} toegevoegd!`);
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      const current = prev[itemId] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      }
      return { ...prev, [itemId]: next };
    });
  };

  const clearCart = () => {
    setCart({});
  };

  const totalCartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalCartPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = MENU_ITEMS.find((m) => m.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const handleCheckoutSimulator = () => {
    if (totalCartPrice <= 0) return;
    if (onOpenIdealCheckout) {
      onOpenIdealCheckout(Math.round(totalCartPrice * 100) / 100, brandTitle);
    } else {
      showToast('iDEAL betaalsimulator gestart!');
    }
  };

  const filteredItems = MENU_ITEMS.filter((i) => {
    if (activeCategory === 'alles') return true;
    if (activeCategory === 'vega') return i.isVegetarian === true;
    return i.category === activeCategory;
  });

  return (
    <div className="min-h-full bg-stone-50 text-stone-900 font-sans relative selection:bg-amber-600 selection:text-white">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold border border-stone-700 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Cart Launcher Button */}
      {totalCartCount > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 left-6 z-40 bg-stone-900 hover:bg-black text-white px-5 py-3 rounded-2xl shadow-2xl border border-amber-500/40 flex items-center gap-3 cursor-pointer hover:scale-105 transition-all animate-in zoom-in-95 duration-200"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <span className="absolute -top-2 -right-2 bg-amber-500 text-stone-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {totalCartCount}
            </span>
          </div>
          <div className="text-left text-xs">
            <div className="font-bold text-amber-300">Jouw Bestelling ({totalCartCount})</div>
            <div className="font-black text-white font-mono">€{totalCartPrice.toFixed(2)}</div>
          </div>
          <ArrowRight className="w-4 h-4 text-amber-400 ml-1" />
        </button>
      )}

      {/* Slide-over Cart Modal */}
      {isCartOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Winkelmand en Bestelling"
          className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200"
          >
            {/* Header */}
            <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-600" />
                <h3 className="font-black text-base text-stone-900">Jouw Bestelling bij {brandTitle}</h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-xl hover:bg-stone-200 text-stone-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content / Items */}
            <div className="p-5 flex-1 overflow-y-auto space-y-4">
              {/* Type Switcher */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-stone-100 rounded-xl text-xs font-bold">
                <button
                  onClick={() => setOrderType('tafel')}
                  className={`py-2 rounded-lg transition-all cursor-pointer ${orderType === 'tafel' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'}`}
                >
                  Aan Tafel Serveren
                </button>
                <button
                  onClick={() => setOrderType('afhalen')}
                  className={`py-2 rounded-lg transition-all cursor-pointer ${orderType === 'afhalen' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'}`}
                >
                  Afhalen in {cityName}
                </button>
              </div>

              {totalCartCount === 0 ? (
                <div className="py-12 text-center text-stone-400 text-xs font-semibold">
                  Je winkelmandje is nog leeg. Klik op een gerecht om toe te voegen!
                </div>
              ) : (
                <div className="space-y-3">
                  {Object.entries(cart).map(([id, qty]) => {
                    const item = MENU_ITEMS.find((m) => m.id === id);
                    if (!item) return null;
                    return (
                      <div
                        key={id}
                        className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <h4 className="font-bold text-xs text-stone-900 truncate">{item.name}</h4>
                          <span className="text-[11px] font-mono text-stone-500">€{item.price.toFixed(2)} p.st.</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(id, -1)}
                            className="w-6 h-6 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 flex items-center justify-center font-bold text-xs cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono font-black text-xs w-4 text-center">{qty}</span>
                          <button
                            onClick={() => updateQuantity(id, 1)}
                            className="w-6 h-6 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 flex items-center justify-center font-bold text-xs cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <span className="font-mono font-bold text-xs text-stone-900 w-14 text-right">
                            €{(item.price * qty).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={clearCart}
                      className="text-[11px] text-stone-400 hover:text-rose-600 font-bold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Bestelling wissen</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer / Checkout */}
            <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-stone-600">Totaal (incl. btw):</span>
                <span className="font-mono font-black text-xl text-stone-900">€{totalCartPrice.toFixed(2)}</span>
              </div>

              <button
                disabled={totalCartCount === 0}
                onClick={handleCheckoutSimulator}
                className="w-full py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-black transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <CreditCard className="w-4 h-4" />
                <span>Test iDEAL 2.0 Checkout Simulator</span>
              </button>

              <p className="text-[10px] text-stone-400 text-center font-medium">
                Live demonstratie • Geen echte betaling afgeschreven
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Top Banner */}
      <div className={`py-1.5 px-4 text-center text-xs font-bold text-white ${theme.primary} flex items-center justify-center gap-2 shadow-xs`}>
        <UtensilsCrossed className="w-3.5 h-3.5" />
        <span>Seizoensgebonden Frans-Nederlandse Keuken • Uitzicht over de gracht in {cityName} • Open vanaf 17:00</span>
      </div>

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 min-w-[40px] min-h-[40px] shrink-0 aspect-square rounded-xl ${theme.primary} text-white font-black flex items-center justify-center text-sm shadow-md`}>
            BG
          </div>
          <div>
            <span className="font-black text-base sm:text-lg tracking-tight block">{brandTitle}</span>
            <span className="text-[10px] text-stone-500 font-medium hidden sm:block">Grachtenzijde {cityName} • Gastronomie & Wijn</span>
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
          {totalCartCount > 0 && (
            <button
              onClick={() => setIsCartOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 font-bold text-xs flex items-center gap-1.5 cursor-pointer hover:bg-amber-200 transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-700" />
              <span>{totalCartCount} item(s)</span>
            </button>
          )}

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
            <span>Bib Gourmand Bekroond • Dagverse Ingrediënten in {cityName}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4">
            Genieten van de pure keuken aan het water in <span className={theme.textPrimary}>{cityName}</span>.
          </h1>

          <p className="text-sm sm:text-base text-stone-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Een intieme sfeer in een sfeervol historisch pand. Kom lunchen aan het water of geniet van ons wisselende 3- of 4-gangen Chef&apos;s Tasting menu.
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
              Bekijk Menukaart & Bestel
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-stone-500 pt-6 border-t border-stone-200">
            <span className="text-stone-800 font-extrabold">🍷 45+ Geselecteerde Natuurwijnen</span>
            <span>•</span>
            <span className="text-stone-800 font-extrabold">🌊 Terras direct aan de gracht</span>
            <span>•</span>
            <span className="text-stone-800 font-extrabold">🍽️ Seizoensgebonden Dagspecialiteiten</span>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menukaart" className="py-12 sm:py-16 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">Onze Menukaart & Live Bestellen</h2>
            <p className="text-xs sm:text-sm text-stone-500 font-medium">Kies gerechten voor aan tafel of voor afhalen</p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-stone-200/60 p-1.5 rounded-2xl text-xs font-bold">
            {(['alles', 'voorgerechten', 'hoofdgerechten', 'desserts', 'vega'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl transition-all capitalize cursor-pointer flex items-center gap-1 ${
                  activeCategory === cat ? 'bg-white text-stone-900 shadow-sm font-black' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat === 'vega' && <Leaf className="w-3 h-3 text-emerald-600" />}
                <span>{cat === 'alles' ? 'Alles' : cat === 'vega' ? 'Vegetarisch' : cat}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const inCartCount = cart[item.id] || 0;
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="h-48 w-full relative overflow-hidden bg-stone-100">
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

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-baseline justify-between mb-1.5">
                      <h3 className="font-black text-sm text-stone-900 leading-snug">{item.name}</h3>
                      <span className="font-black text-base text-stone-900 ml-2 font-mono">€{item.price.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-stone-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>

                  {/* Add to Cart Actions */}
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                    {inCartCount === 0 ? (
                      <button
                        onClick={() => addToCart(item)}
                        className={`w-full py-2.5 rounded-xl ${theme.primary} ${theme.primaryHover} text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Voeg Toe Aan Bestelling</span>
                      </button>
                    ) : (
                      <div className="w-full flex items-center justify-between bg-stone-100 p-1 rounded-xl">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 rounded-lg bg-white text-stone-800 shadow-xs flex items-center justify-center font-bold cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-stone-900">
                          {inCartCount} in bestelling
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 rounded-lg bg-white text-stone-800 shadow-xs flex items-center justify-center font-bold cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
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
            <div className="p-8 text-center bg-amber-50 rounded-3xl border border-amber-200 space-y-4 max-w-md mx-auto">
              <span className="text-4xl block">🥂</span>
              <h3 className="font-black text-lg text-stone-900">Tafel Gereserveerd bij {brandTitle}!</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                Je tafel voor <strong>{guests} personen</strong> ({seating === 'binnen' ? 'in de sfeervolle werfkelder' : 'op het terras aan het water'}) staat klaar op <strong>{resDate} om {resTime} uur</strong> in {cityName}!
              </p>
              
              <div className="p-3 bg-white rounded-2xl border border-amber-200 text-[11px] text-stone-600 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Reserveringsticket #BG-{Math.floor(1000 + Math.random() * 9000)} bevestigd</span>
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-stone-800 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Ticket</span>
                </button>
                <button
                  onClick={() => setReserved(false)}
                  className="text-xs text-stone-500 font-bold underline cursor-pointer hover:text-stone-900"
                >
                  Nieuwe boeking
                </button>
              </div>
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

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-black text-stone-700 block mb-2">Datum:</label>
                  <select
                    value={resDate}
                    onChange={(e) => setResDate(e.target.value)}
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    <option value="Vrijdag 24 okt">Vrijdag 24 okt</option>
                    <option value="Zaterdag 25 okt">Zaterdag 25 okt</option>
                    <option value="Zondag 26 okt">Zondag 26 okt</option>
                    <option value="Dinsdag 28 okt">Dinsdag 28 okt</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-black text-stone-700 block mb-2">Gewenst Tijdslot:</label>
                  <select
                    value={resTime}
                    onChange={(e) => setResTime(e.target.value)}
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    <option value="17:30">17:30 (Vroege zitting)</option>
                    <option value="18:30">18:30</option>
                    <option value="19:00">19:00 (Populairst)</option>
                    <option value="20:00">20:00</option>
                    <option value="20:30">20:30 (Late zitting)</option>
                  </select>
                </div>
              </div>

              {/* Seating preference */}
              <div>
                <label className="text-xs font-black text-stone-700 block mb-2">Tafelvoorkeur:</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSeating('binnen')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      seating === 'binnen' ? `${theme.primary} text-white border-transparent shadow-xs` : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    🍷 Sfeervolle Werfkelder
                  </button>
                  <button
                    onClick={() => setSeating('terras')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      seating === 'terras' ? `${theme.primary} text-white border-transparent shadow-xs` : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    🌊 Terras aan het Water
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                onClick={() => setReserved(true)}
                className={`w-full py-4 rounded-2xl ${theme.primary} ${theme.primaryHover} text-white text-xs font-black transition-all shadow-md cursor-pointer flex items-center justify-center gap-2`}
              >
                <Check className="w-4 h-4" />
                <span>Bevestig Reservering Direct</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 px-4 sm:px-8 text-center text-xs border-t border-stone-800">
        <p className="font-bold text-stone-300 mb-1">{brandTitle} • Gastronomisch Genieten in {cityName}</p>
        <p>© {new Date().getFullYear()} {brandTitle}. Live demo gebouwd op Next.js door Samen Online.</p>
      </footer>
    </div>
  );
};
