'use client';

import React, { useState } from 'react';
import { TemplateProps } from '../../types/theme';
import {
  Clock,
  Check,
  ShoppingBag,
  Heart,
  ArrowRight,
  Sun,
  Moon,
  Star,
  Sparkles,
  X,
  Plus,
  Minus,
  MapPin,
  Flame,
} from 'lucide-react';

interface BakeryItem {
  id: string;
  name: string;
  category: 'brood' | 'viennoiserie' | 'koffie';
  desc: string;
  price: number;
  badge?: string;
  image: string;
  ingredients: string;
  bakingTime: string;
}

const BAKERY_ITEMS: BakeryItem[] = [
  {
    id: 'b1',
    name: 'Haarlems Zuurdesem Landbrood',
    category: 'brood',
    desc: '36 uur natuurlijk gerezen met onze 12 jaar oude moederdeeg starter. Krokante korst en malse kruim.',
    price: 4.65,
    badge: 'Huisgemaakt Signatuur',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80',
    ingredients: 'Bio bloem, steengemalen rogge, water, Keltisch zeezout',
    bakingTime: 'Elke ochtend om 05:00',
  },
  {
    id: 'b2',
    name: 'Franse Roomboter Croissants (4 stuks)',
    category: 'viennoiserie',
    desc: 'Luchtig getoerd met 100% AOP Charentes-Poitou boter voor die ongeëvenaarde laagjes en roomgeur.',
    price: 5.80,
    badge: 'Dagvers',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=80',
    ingredients: 'Tarwebloem, AOP roomboter 84%, melk, gist, suiker, zout',
    bakingTime: 'Vers gebakken om 06:30',
  },
  {
    id: 'b3',
    name: 'Ambachtelijke Hollandse Appeltaart',
    category: 'viennoiserie',
    desc: 'Rijkelijk gevuld met Betuwse Elstar appels, Ceylon kaneel, walnoten en gewelde rozijnen. Goed voor 6-8 punten.',
    price: 15.50,
    badge: 'Familie Recept 1934',
    image: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=700&q=80',
    ingredients: 'Elstar appels, tarwebloem, roomboter, kaneel, rozijnen',
    bakingTime: 'Dagelijks vers op bestelling',
  },
  {
    id: 'b4',
    name: 'Zweedse Kardemombroodjes (Kardemummabulle)',
    category: 'viennoiserie',
    desc: 'Gevlochten deeg gekruid met versgemalen kardemom en afgewerkt met parelsuiker.',
    price: 3.40,
    badge: 'Favoriet',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=700&q=80',
    ingredients: 'Tarwebloem, melk, kardemom, rietsuiker, roomboter',
    bakingTime: 'Dagelijks om 07:00',
  },
  {
    id: 'b5',
    name: 'Rustiek Meergranen Baguette',
    category: 'brood',
    desc: 'Traditionele Franse stokbrood met zonnebloempitten, lijnzaad en sesamzaad.',
    price: 2.95,
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=700&q=80',
    ingredients: 'Tarwebloem, geroosterd sesam, lijnzaad, zuurdesem, zeezout',
    bakingTime: 'Twee keer per dag vers',
  },
  {
    id: 'b6',
    name: 'Haver Flat White & Verse Filterkoffie',
    category: 'koffie',
    desc: 'Single-origin bonen gebrand in Amsterdam door White Label Coffee, bereid door onze barista.',
    price: 3.85,
    badge: 'Barista Special',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80',
    ingredients: '100% Arabica bonen, bio havermelk of verse weidemelk',
    bakingTime: 'Direct vers bereid bij afhalen',
  },
];

export const AmbachtBakkerijDemo: React.FC<TemplateProps> = ({
  theme,
  isDarkMode,
  onToggleDarkMode,
  onRequestQuote,
}) => {
  const [activeCategory, setActiveCategory] = useState<'alles' | 'brood' | 'viennoiserie' | 'koffie'>('alles');
  const [selectedSlot, setSelectedSlot] = useState('08:30 - 09:30');
  const [slicePreference, setSlicePreference] = useState<Record<string, 'heel' | 'gesneden'>>({});
  const [cart, setCart] = useState<{ item: BakeryItem; quantity: number; sliced?: boolean }[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const addToCart = (item: BakeryItem) => {
    const isSliced = slicePreference[item.id] === 'gesneden';
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id && c.sliced === isSliced);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id && c.sliced === isSliced
            ? { ...c, quantity: c.quantity + 1 }
            : c
        );
      }
      return [...prev, { item, quantity: 1, sliced: isSliced }];
    });
    showToast(`✓ ${item.name} klaargezet voor ${selectedSlot}!`);
  };

  const updateQuantity = (itemId: string, sliced: boolean | undefined, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => {
          if (c.item.id === itemId && c.sliced === sliced) {
            const nextQty = c.quantity + delta;
            return nextQty > 0 ? { ...c, quantity: nextQty } : null;
          }
          return c;
        })
        .filter(Boolean) as { item: BakeryItem; quantity: number; sliced?: boolean }[]
    );
  };

  const totalItemsCount = cart.reduce((sum, c) => sum + c.quantity, 0);
  const totalPrice = cart.reduce((sum, c) => sum + c.item.price * c.quantity, 0);

  const filteredItems =
    activeCategory === 'alles'
      ? BAKERY_ITEMS
      : BAKERY_ITEMS.filter((i) => i.category === activeCategory);

  return (
    <div className="min-h-full bg-amber-50/20 text-stone-900 font-sans relative selection:bg-amber-600 selection:text-white">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold border border-stone-700 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className={`py-1.5 px-4 text-center text-xs font-bold text-white ${theme.primary} flex items-center justify-center gap-2 shadow-xs`}>
        <Flame className="w-3.5 h-3.5 text-amber-200" />
        <span>Vandaag voor 21:00 besteld = morgenochtend warm & knapperig ophalen in Haarlem</span>
      </div>

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${theme.primary} text-white font-black flex items-center justify-center text-sm shadow-md`}>
            AB
          </div>
          <div>
            <span className="font-black text-base sm:text-lg tracking-tight block">Bakkerij van Oranje</span>
            <span className="text-[10px] text-stone-500 font-medium hidden sm:block">Grote Markt Haarlem • Ambacht sinds 1934</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-stone-700">
          <a href="#assortiment" className="hover:text-stone-900">Dagvers Brood</a>
          <a href="#ambacht" className="hover:text-stone-900">Ons Geheim</a>
          <a href="#tijdslot" className="hover:text-stone-900">Afhaallocatie</a>
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
            onClick={() => setIsDrawerOpen(true)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl ${theme.primary} ${theme.primaryHover} text-white transition-all text-xs font-black shadow-md cursor-pointer`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bestelling</span>
            <span className="bg-white/25 px-1.5 py-0.5 rounded-full text-[11px] font-black">
              {totalItemsCount}
            </span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-amber-100/40 via-stone-50 to-white py-12 sm:py-16 px-4 sm:px-8 border-b border-stone-200">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-left">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText} text-xs font-black mb-4 border ${theme.borderLight}`}>
              <Clock className="w-3.5 h-3.5" />
              <span>Elke nacht om 03:00 vers gekneed & gebakken</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4">
              Echt zuurdesembrood vraagt om geduld en passie.
            </h1>
            <p className="text-sm sm:text-base text-stone-600 mb-6 leading-relaxed max-w-xl">
              Geen kunstmatige gistversnellers of meelverbeteraars. Enkel 100% biologisch Frans steengemalen meel, water, zeezout en 36 uur natuurlijke fermentatie.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <a
                href="#assortiment"
                className={`px-6 py-3 rounded-xl ${theme.primary} ${theme.primaryHover} text-white font-extrabold text-xs shadow-md flex items-center gap-2`}
              >
                <span>Bekijk Dagvers Menu</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={onRequestQuote}
                className="px-5 py-3 rounded-xl border border-stone-300 text-stone-800 font-extrabold text-xs hover:bg-white cursor-pointer"
              >
                Vraag Deze Bakkersite Aan
              </button>
            </div>

            <div className="flex items-center gap-5 text-xs font-bold text-stone-600 pt-3 border-t border-stone-200">
              <div className="flex items-center gap-1.5">
                <span className="text-amber-500">🌾</span>
                <span>Bio Molengraan</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-amber-500">⏱️</span>
                <span>36u Fermentatie</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-amber-500">⭐</span>
                <span>4.9 / 5 (Haarlem)</span>
              </div>
            </div>
          </div>

          {/* Quick Pickup Selector Box */}
          <div className="w-full md:w-88 bg-white p-6 rounded-3xl border border-stone-200 shadow-xl text-left">
            <div className="flex items-center gap-2 mb-3">
              <Clock className={`w-5 h-5 ${theme.textPrimary}`} />
              <h3 className="font-black text-base text-stone-900">Morgen Afhalen</h3>
            </div>
            <p className="text-xs text-stone-500 mb-4 font-medium">Kies jouw voorkeurstijdstip voor warme afhaal:</p>

            <div className="grid grid-cols-2 gap-2 mb-5">
              {['08:00 - 08:30', '08:30 - 09:30', '09:30 - 10:30', '10:30 - 12:00'].map((slot) => (
                <button
                  key={slot}
                  onClick={() => {
                    setSelectedSlot(slot);
                    showToast(`Afhaaltijd gekozen: ${slot}`);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    selectedSlot === slot
                      ? `${theme.primary} text-white border-transparent shadow-xs scale-102`
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>

            <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200/80 text-xs font-medium text-amber-900 mb-4 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>Grote Markt 14, Haarlem. Bestellingen staan verpakt klaar bij de afhaalbalie!</span>
            </div>

            <button
              onClick={() => setIsDrawerOpen(true)}
              className={`w-full py-2.5 rounded-xl ${theme.primary} ${theme.primaryHover} text-white text-xs font-black shadow-md cursor-pointer`}
            >
              Bekijk Bestelling ({totalItemsCount} items)
            </button>
          </div>
        </div>
      </section>

      {/* Menu / Catalog */}
      <section id="assortiment" className="py-12 sm:py-16 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">Dagvers Assortiment</h2>
            <p className="text-xs sm:text-sm text-stone-500 font-medium">
              Alles wordt dezelfde nacht met de hand gevormd en gebakken in onze stenen vloeroven
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-stone-200/60 p-1.5 rounded-2xl text-xs font-bold">
            {(['alles', 'brood', 'viennoiserie', 'koffie'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl transition-all capitalize cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-white text-stone-900 shadow-sm font-black'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat === 'brood' ? 'Zuurdesembrood' : cat === 'viennoiserie' ? 'Gebak & Croissants' : cat === 'koffie' ? 'Koffie & To Go' : 'Alles'}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isSliced = slicePreference[item.id] === 'gesneden';

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
              >
                <div className="h-56 w-full relative overflow-hidden bg-stone-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {item.badge && (
                    <span className={`absolute top-3 left-3 text-[10px] font-black px-2.5 py-1 rounded-lg ${theme.primary} text-white shadow-md`}>
                      {item.badge}
                    </span>
                  )}
                  <span className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    {item.bakingTime}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-base text-stone-900 mb-1 leading-snug">{item.name}</h3>
                    <p className="text-xs text-stone-500 font-medium mb-3 leading-relaxed">{item.desc}</p>
                    <p className="text-[11px] text-amber-800 bg-amber-50/80 px-2.5 py-1 rounded-lg font-bold mb-4">
                      Ingrediënten: {item.ingredients}
                    </p>

                    {/* Sliced option for bread */}
                    {item.category === 'brood' && (
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-[10px] font-bold text-stone-400">Snijoptie:</span>
                        <button
                          onClick={() => setSlicePreference({ ...slicePreference, [item.id]: 'heel' })}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                            !isSliced ? `${theme.primary} text-white border-transparent` : 'border-stone-200 text-stone-600'
                          }`}
                        >
                          Heel Brood
                        </button>
                        <button
                          onClick={() => setSlicePreference({ ...slicePreference, [item.id]: 'gesneden' })}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                            isSliced ? `${theme.primary} text-white border-transparent` : 'border-stone-200 text-stone-600'
                          }`}
                        >
                          Dun Gesneden
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="font-black text-lg text-stone-900">€{item.price.toFixed(2)}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className={`px-4 py-2 rounded-xl ${theme.primary} ${theme.primaryHover} text-white text-xs font-black shadow-md flex items-center gap-1.5 cursor-pointer hover:scale-102 transition-all`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Bestel voor morgen</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bakery Story / Ambacht */}
      <section id="ambacht" className="bg-stone-100/70 py-12 px-4 sm:px-8 border-t border-stone-200">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-3xl mb-2 block">🌾</span>
          <h2 className="text-2xl font-black text-stone-900 mb-3">Waarom ons zuurdesem zo goed verteert</h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl mx-auto mb-8 font-medium">
            Door de lange koude fermentatie van 36 uur breken enzymen de gluten en fytinezuren op natuurlijke wijze af. Het resultaat is een vollere smaak, een diepe goudbruine korst en een brood dat vriendelijk is voor je maag.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="bg-white p-5 rounded-2xl border border-stone-200">
              <span className="text-xl mb-1 block">⏳</span>
              <h4 className="font-black text-sm text-stone-900 mb-1">36 Uur Rijstijd</h4>
              <p className="text-xs text-stone-500 font-medium">Geen haastwerk. Geduld creëert de allerbeste smaakstructuur.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-stone-200">
              <span className="text-xl mb-1 block">🥖</span>
              <h4 className="font-black text-sm text-stone-900 mb-1">Franse Vloeroven</h4>
              <p className="text-xs text-stone-500 font-medium">Gebakken op vulkanische stenen platen voor die échte knapperige korst.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-stone-200">
              <span className="text-xl mb-1 block">❤️</span>
              <h4 className="font-black text-sm text-stone-900 mb-1">0% Toevoegingen</h4>
              <p className="text-xs text-stone-500 font-medium">Uitsluitend pure grondstoffen zonder E-nummers of broodverbeteraars.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Order Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col p-6 animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <ShoppingBag className={`w-5 h-5 ${theme.textPrimary}`} />
                <h3 className="font-black text-lg text-stone-900">Jouw Bakkersbestelling</h3>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-stone-400 space-y-2">
                  <span className="text-4xl block">🥐</span>
                  <p className="text-sm font-bold text-stone-600">Je bestelling is nog leeg</p>
                  <p className="text-xs text-stone-400">Voeg een brood of croissant toe om te reserveren!</p>
                </div>
              ) : (
                cart.map((c, idx) => (
                  <div key={idx} className="flex gap-3 p-3 bg-stone-50 rounded-2xl border border-stone-200">
                    <img src={c.item.image} alt={c.item.name} className="w-16 h-16 rounded-xl object-cover" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-extrabold text-xs text-stone-900 block leading-tight">
                            {c.item.name}
                          </span>
                          {c.sliced !== undefined && (
                            <span className="text-[10px] text-stone-500 font-bold">
                              {c.sliced ? 'Gesneden brood' : 'Heel brood'}
                            </span>
                          )}
                        </div>
                        <span className="font-black text-xs text-stone-900">
                          €{(c.item.price * c.quantity).toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => updateQuantity(c.item.id, c.sliced, -1)}
                          className="w-6 h-6 rounded-lg bg-white border border-stone-300 flex items-center justify-center text-stone-700 hover:bg-stone-100 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-black text-stone-800 min-w-4 text-center">
                          {c.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(c.item.id, c.sliced, 1)}
                          className="w-6 h-6 rounded-lg bg-white border border-stone-300 flex items-center justify-center text-stone-700 hover:bg-stone-100 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-4 border-t border-stone-200 space-y-3">
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs font-bold text-amber-950 flex items-center justify-between">
                <span>Afhaaltijd morgen:</span>
                <span className="font-black">{selectedSlot}</span>
              </div>

              <div className="flex justify-between text-base font-black text-stone-900">
                <span>Totaalbedrag:</span>
                <span>€{totalPrice.toFixed(2)}</span>
              </div>

              <button
                onClick={onRequestQuote}
                disabled={cart.length === 0}
                className={`w-full py-3.5 rounded-xl ${theme.primary} ${theme.primaryHover} disabled:bg-stone-300 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2`}
              >
                <span>Reservering Bevestigen met iDEAL</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
