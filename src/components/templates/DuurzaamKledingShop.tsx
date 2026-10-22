'use client';

import React, { useState } from 'react';
import { ColorTheme } from '../../types/theme';
import { ShoppingBag, Heart, Check, Star, ShieldCheck, Truck, RefreshCw, X } from 'lucide-react';

interface TemplateProps {
  theme: ColorTheme;
  onRequestQuote: () => void;
}

export const DuurzaamKledingShop: React.FC<TemplateProps> = ({ theme, onRequestQuote }) => {
  const [cart, setCart] = useState<{ id: string; name: string; price: number }[]>([]);
  const [selectedSize, setSelectedSize] = useState<Record<string, string>>({
    p1: 'M',
    p2: 'L',
    p3: 'M',
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products = [
    {
      id: 'p1',
      name: 'Biologisch Katoenen Hoodie',
      tag: '100% GOTS Certificaat',
      price: 69.95,
      impact: '-1.4 kg CO₂ bespaard',
      sizes: ['S', 'M', 'L', 'XL'],
      badge: 'Besteller',
    },
    {
      id: 'p2',
      name: 'Gerecyclede Denim Jeans (Slim Fit)',
      tag: '80% Recycled Waterless Wash',
      price: 89.50,
      impact: '2.800 liter water bespaard',
      sizes: ['30', '32', '34', '36'],
      badge: 'Circulair',
    },
    {
      id: 'p3',
      name: 'Linnen Zomerblouse (Olijfgroen)',
      tag: 'Frans Eco-Vlas',
      price: 54.00,
      impact: 'Biologisch afbreekbaar',
      sizes: ['XS', 'S', 'M', 'L'],
      badge: 'Nieuw',
    },
  ];

  const addToCart = (product: typeof products[0]) => {
    setCart(prev => [...prev, { id: product.id, name: product.name, price: product.price }]);
    setIsCartOpen(true);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-full bg-stone-50 text-stone-900 font-sans relative">
      {/* Top Banner */}
      <div className={`py-1.5 px-4 text-center text-[11px] font-bold text-white ${theme.primary} flex items-center justify-center gap-2`}>
        <Truck className="w-3.5 h-3.5" />
        <span>Gratis verzending in Nederland & België vanaf €50 • Vandaag besteld, morgen in huis</span>
      </div>

      {/* Main Nav */}
      <header className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl ${theme.primary} text-white font-black flex items-center justify-center text-sm shadow-sm`}>
            DK
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight">DuurzaamKleding</span>
            <span className="block text-[10px] text-stone-500 font-medium">Utrecht • Circulaire Mode</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-stone-700">
          <a href="#collectie" className="hover:text-stone-900">Dames</a>
          <a href="#collectie" className="hover:text-stone-900">Heren</a>
          <a href="#collectie" className="hover:text-stone-900">Circulair</a>
          <a href="#impact" className="hover:text-stone-900">Onze Impact</a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 transition-colors text-xs font-bold text-stone-800 cursor-pointer relative"
          >
            <ShoppingBag className="w-4 h-4 text-stone-700" />
            <span>Winkelmand</span>
            {cart.length > 0 && (
              <span className={`w-5 h-5 rounded-full ${theme.primary} text-white text-[10px] font-extrabold flex items-center justify-center`}>
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white py-12 px-6 border-b border-stone-200">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-left">
            <span className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md ${theme.badgeBg} ${theme.badgeText} inline-block mb-3`}>
              Duurzaam & Eerlijk Geproduceerd
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-snug mb-3">
              Kleding ontworpen voor het leven, niet voor de afvalberg.
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mb-6 leading-relaxed">
              100% biologische en gerecyclede materialen. Transparante prijzen en een gesloten keten. Betaal veilig met iDEAL en Klarna.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#collectie"
                className={`px-5 py-2.5 rounded-xl ${theme.primary} ${theme.primaryHover} text-white font-bold text-xs shadow-sm`}
              >
                Bekijk Collectie
              </a>
              <button
                onClick={onRequestQuote}
                className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-bold text-xs hover:bg-stone-50 cursor-pointer"
              >
                Vraag Deze Webshop Aan
              </button>
            </div>
          </div>

          <div className={`w-full md:w-80 p-6 rounded-3xl ${theme.bgLight} border-2 ${theme.borderLight} text-center flex flex-col justify-center items-center shadow-xs`}>
            <span className="text-3xl mb-2">🌿</span>
            <h3 className="font-extrabold text-stone-900 text-base mb-1">Impact Tracker</h3>
            <p className="text-xs text-stone-600 mb-4">Realtime besparing door onze community</p>
            <div className="w-full space-y-2 text-left text-xs font-bold">
              <div className="bg-white p-2.5 rounded-xl border border-stone-200 flex justify-between">
                <span className="text-stone-500">Water bespaard:</span>
                <span className="text-emerald-700">142.000 L</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-stone-200 flex justify-between">
                <span className="text-stone-500">CO₂ reductie:</span>
                <span className="text-emerald-700">18.400 kg</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog */}
      <section id="collectie" className="py-12 px-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-stone-900">Populaire Collectie</h2>
            <p className="text-xs text-stone-500 font-medium">Klik op een maat en voeg direct toe aan je winkelmand</p>
          </div>
          <span className="text-xs font-bold text-stone-500">3 producten getoond</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs flex flex-col justify-between">
              <div>
                <div className="h-44 bg-stone-100 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                  <span className="text-5xl">👕</span>
                  <span className={`absolute top-2 left-2 text-[10px] font-extrabold px-2 py-0.5 rounded-md ${theme.badgeBg} ${theme.badgeText}`}>
                    {product.badge}
                  </span>
                </div>
                <h3 className="font-extrabold text-sm text-stone-900 mb-1">{product.name}</h3>
                <p className="text-[11px] text-stone-500 font-medium mb-2">{product.tag}</p>
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md w-fit mb-3">
                  <span>✓ {product.impact}</span>
                </div>

                {/* Size Selector */}
                <div className="flex items-center gap-1 mb-4">
                  <span className="text-[10px] font-bold text-stone-400 mr-1">Maat:</span>
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize({ ...selectedSize, [product.id]: size })}
                      className={`w-7 h-7 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                        selectedSize[product.id] === size
                          ? `${theme.primary} text-white border-transparent`
                          : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="font-extrabold text-base text-stone-900">€{product.price.toFixed(2)}</span>
                <button
                  onClick={() => addToCart(product)}
                  className={`px-3.5 py-1.5 rounded-xl ${theme.primary} ${theme.primaryHover} text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>In Mand</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cart Drawer Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs flex justify-end">
          <div className="bg-white w-full max-w-sm h-full shadow-2xl flex flex-col p-6 animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <ShoppingBag className={`w-5 h-5 ${theme.textPrimary}`} />
                <h3 className="font-extrabold text-base text-stone-900">Jouw Winkelmand</h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-stone-400 text-xs font-medium">
                  Je winkelmand is nog leeg. Klik op een product om toe te voegen!
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                    <div>
                      <span className="font-bold text-stone-900 block">{item.name}</span>
                      <span className="text-[10px] text-stone-500">Inclusief 21% BTW</span>
                    </div>
                    <span className="font-extrabold text-stone-900">€{item.price.toFixed(2)}</span>
                  </div>
                ))
              )}
            </div>

            <div className="pt-4 border-t border-stone-200 space-y-3">
              <div className="flex justify-between text-sm font-extrabold text-stone-900">
                <span>Totaal:</span>
                <span>€{totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={onRequestQuote}
                disabled={cart.length === 0}
                className={`w-full py-3 rounded-xl ${theme.primary} ${theme.primaryHover} disabled:bg-stone-300 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer`}
              >
                Afrekenen met iDEAL (Demo)
              </button>
              <div className="flex items-center justify-center gap-3 text-[10px] font-bold text-stone-500">
                <span>💳 iDEAL</span>
                <span>•</span>
                <span>📦 PostNL Track & Trace</span>
                <span>•</span>
                <span>🔄 30 Dagen Retour</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
