'use client';

import React, { useState } from 'react';
import { TemplateProps } from '../../types/theme';
import {
  ShoppingBag,
  Heart,
  Check,
  Star,
  ShieldCheck,
  Truck,
  RefreshCw,
  X,
  Sun,
  Moon,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2,
} from 'lucide-react';

interface ProductItem {
  id: string;
  name: string;
  category: 'dames' | 'heren' | 'accessoires';
  tag: string;
  price: number;
  originalPrice?: number;
  impact: string;
  sizes: string[];
  badge: string;
  image: string;
  rating: number;
  reviewCount: number;
}

const PRODUCTS: ProductItem[] = [
  {
    id: 'p1',
    name: 'Biologisch Katoenen Hoodie',
    category: 'heren',
    tag: '100% GOTS Gecertificeerd',
    price: 69.95,
    originalPrice: 89.95,
    impact: '-1.8 kg CO₂ bespaard',
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=700&q=80',
    rating: 4.9,
    reviewCount: 124,
  },
  {
    id: 'p2',
    name: 'Circulaire Denim Jeans (Tapered)',
    category: 'heren',
    tag: '80% Recycled Waterless Wash',
    price: 89.50,
    impact: '2.800 liter water bespaard',
    sizes: ['30', '32', '34', '36'],
    badge: 'Circulair',
    image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=700&q=80',
    rating: 4.8,
    reviewCount: 98,
  },
  {
    id: 'p3',
    name: 'Linnen Zomerblouse (Olijfgroen)',
    category: 'dames',
    tag: '100% Frans Eco-Vlas',
    price: 54.00,
    originalPrice: 65.00,
    impact: 'Biologisch afbreekbaar',
    sizes: ['XS', 'S', 'M', 'L'],
    badge: 'Nieuw',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=700&q=80',
    rating: 5.0,
    reviewCount: 46,
  },
  {
    id: 'p4',
    name: 'Gerecyclede Wollen Beanie',
    category: 'accessoires',
    tag: 'Geregenereerde Italiaanse wol',
    price: 29.50,
    impact: 'Zero waste design',
    sizes: ['One Size'],
    badge: 'Duurzaam Favoriet',
    image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=700&q=80',
    rating: 4.7,
    reviewCount: 82,
  },
  {
    id: 'p5',
    name: 'Oversized Eco-Sweater (Zand)',
    category: 'dames',
    tag: 'Ongebleekt biologisch katoen',
    price: 74.95,
    impact: '-2.1 kg CO₂ bespaard',
    sizes: ['XS', 'S', 'M', 'L'],
    badge: 'Trending',
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=700&q=80',
    rating: 4.9,
    reviewCount: 110,
  },
  {
    id: 'p6',
    name: 'Canvas Weekender Reistas',
    category: 'accessoires',
    tag: 'Heavy-duty gerecycled canvas',
    price: 95.00,
    impact: 'Levenslange garantie',
    sizes: ['35L'],
    badge: 'Premium Eco',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80',
    rating: 4.8,
    reviewCount: 64,
  },
];

export const DuurzaamKledingShop: React.FC<TemplateProps> = ({
  theme,
  isDarkMode,
  onToggleDarkMode,
  onRequestQuote,
}) => {
  const [activeCategory, setActiveCategory] = useState<'alles' | 'dames' | 'heren' | 'accessoires'>('alles');
  const [cart, setCart] = useState<{ product: ProductItem; size: string; quantity: number }[]>([]);
  const [selectedSize, setSelectedSize] = useState<Record<string, string>>({
    p1: 'M',
    p2: '32',
    p3: 'S',
    p4: 'One Size',
    p5: 'M',
    p6: '35L',
  });
  const [wishlist, setWishlist] = useState<string[]>(['p3']);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
    showToast(wishlist.includes(productId) ? 'Verwijderd uit verlanglijst' : 'Bewaard op verlanglijst ❤️');
  };

  const addToCart = (product: ProductItem) => {
    const size = selectedSize[product.id] || product.sizes[0];
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, size, quantity: 1 }];
    });
    showToast(`✓ ${product.name} toegevoegd!`);
  };

  const updateQuantity = (productId: string, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as { product: ProductItem; size: string; quantity: number }[]
    );
  };

  const filteredProducts =
    activeCategory === 'alles'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = discountApplied ? subtotal * 0.1 : 0;
  const totalPrice = Math.max(0, subtotal - discountAmount);
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-full bg-stone-50 text-stone-900 font-sans relative selection:bg-orange-500 selection:text-white">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold border border-stone-700 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Notification Announcement */}
      <div className={`py-2 px-4 text-center text-xs font-bold text-white ${theme.primary} flex items-center justify-center gap-2 shadow-xs`}>
        <Truck className="w-3.5 h-3.5" />
        <span>Gratis verzending in NL & BE vanaf €50 • Vandaag besteld = morgen in huis</span>
        <span className="hidden sm:inline bg-black/20 px-2 py-0.5 rounded-full text-[10px]">Code DEMO10 voor 10% korting</span>
      </div>

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${theme.primary} text-white font-black flex items-center justify-center text-sm shadow-md`}>
            DK
          </div>
          <div>
            <span className="font-black text-base sm:text-lg tracking-tight block">DuurzaamKleding</span>
            <span className="text-[10px] text-stone-500 font-medium hidden sm:block">Utrecht • 100% Eerlijke & Circulaire Mode</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-bold text-stone-700">
          <button
            onClick={() => setActiveCategory('alles')}
            className={`transition-colors cursor-pointer ${activeCategory === 'alles' ? theme.textPrimary : 'hover:text-stone-900'}`}
          >
            Alle Collecties
          </button>
          <button
            onClick={() => setActiveCategory('dames')}
            className={`transition-colors cursor-pointer ${activeCategory === 'dames' ? theme.textPrimary : 'hover:text-stone-900'}`}
          >
            Dames
          </button>
          <button
            onClick={() => setActiveCategory('heren')}
            className={`transition-colors cursor-pointer ${activeCategory === 'heren' ? theme.textPrimary : 'hover:text-stone-900'}`}
          >
            Heren
          </button>
          <button
            onClick={() => setActiveCategory('accessoires')}
            className={`transition-colors cursor-pointer ${activeCategory === 'accessoires' ? theme.textPrimary : 'hover:text-stone-900'}`}
          >
            Accessoires
          </button>
          <a href="#impact" className="hover:text-stone-900 transition-colors">
            Onze Impact
          </a>
        </nav>

        {/* Right Actions: Dark mode, Wishlist, Cart */}
        <div className="flex items-center gap-2 sm:gap-3">
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

          {/* Wishlist Button */}
          <button
            onClick={() => showToast(`Je hebt ${wishlist.length} item(s) op je verlanglijst!`)}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer border border-stone-200 flex items-center gap-1.5 relative"
            title="Verlanglijst"
          >
            <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : 'text-stone-600'}`} />
            <span className="hidden sm:inline text-xs font-bold">{wishlist.length}</span>
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl ${theme.primary} ${theme.primaryHover} text-white transition-all text-xs font-black shadow-md cursor-pointer`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Mand</span>
            <span className="bg-white/25 px-1.5 py-0.5 rounded-full text-[11px] font-black">
              {totalCartCount}
            </span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-stone-100/60 to-white py-10 sm:py-16 px-4 sm:px-8 border-b border-stone-200">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 text-left">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText} text-xs font-black mb-4 border ${theme.borderLight}`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Nieuwe Lente/Zomer Collectie 2026</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4">
              Kleding gemaakt om te dragen, niet om te verspillen.
            </h1>
            <p className="text-sm sm:text-base text-stone-600 mb-6 leading-relaxed max-w-xl">
              100% biologische en gerecyclede materialen met een transparante keten. Van biologisch geteeld vlas tot aan jouw garderobe.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <a
                href="#collectie"
                className={`px-6 py-3 rounded-xl ${theme.primary} ${theme.primaryHover} text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2`}
              >
                <span>Ontdek Catalogus</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={onRequestQuote}
                className="px-5 py-3 rounded-xl border border-stone-300 text-stone-800 font-extrabold text-xs hover:bg-stone-50 cursor-pointer transition-colors"
              >
                Vraag Deze Webshop Aan
              </button>
            </div>

            {/* Trust points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-stone-200 text-xs font-bold text-stone-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>GOTS Gecertificeerd</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>30 Dagen Bedenktijd</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Gratis Retour via PostNL</span>
              </div>
            </div>
          </div>

          {/* Interactive Live Eco Calculator Card */}
          <div className="w-full lg:w-96 bg-white p-6 rounded-3xl border border-stone-200 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                  Community Impact
                </span>
                <span className="text-xs font-bold text-stone-400">Live 2026</span>
              </div>
              <h3 className="font-black text-lg text-stone-900 mb-1">Onze Gezamenlijke Besparing</h3>
              <p className="text-xs text-stone-500 mb-5">Elke bestelling vervangt fast-fashion met circulaire textiel.</p>

              <div className="space-y-3 mb-6">
                <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">💧</span>
                    <div>
                      <span className="text-xs font-bold text-stone-500 block">Schoon Drinkwater</span>
                      <span className="text-sm font-black text-emerald-700">142.800 Liter</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-emerald-600 bg-emerald-100/70 px-2 py-0.5 rounded-md">+14% mnd</span>
                </div>

                <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🌿</span>
                    <div>
                      <span className="text-xs font-bold text-stone-500 block">CO₂ Uitstoot Vermeden</span>
                      <span className="text-sm font-black text-emerald-700">18.420 Kilogram</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-emerald-600 bg-emerald-100/70 px-2 py-0.5 rounded-md">-45% toxisch</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => showToast('Jouw bestelling draagt direct bij aan het herplanten van bomen!')}
              className={`w-full py-2.5 rounded-xl ${theme.bgLight} ${theme.textPrimary} border ${theme.borderLight} text-xs font-black hover:opacity-90 cursor-pointer`}
            >
              Bereken Jouw Persoonlijke Besparing
            </button>
          </div>
        </div>
      </section>

      {/* Product Catalog Section */}
      <section id="collectie" className="py-12 sm:py-16 px-4 sm:px-8 max-w-6xl mx-auto">
        {/* Category Filter Tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">Onze Duurzame Collectie</h2>
            <p className="text-xs sm:text-sm text-stone-500 font-medium">Klik op een maat en voeg direct toe aan je winkelmand</p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-stone-200/60 p-1.5 rounded-2xl text-xs font-bold">
            {(['alles', 'dames', 'heren', 'accessoires'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl transition-all capitalize cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-white text-stone-900 shadow-sm font-black'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const isLiked = wishlist.includes(product.id);
            const activeSize = selectedSize[product.id] || product.sizes[0];

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
              >
                {/* Product Photo */}
                <div className="h-64 sm:h-72 w-full relative overflow-hidden bg-stone-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Badge */}
                  <span className={`absolute top-3 left-3 text-[10px] font-black px-2.5 py-1 rounded-lg ${theme.primary} text-white shadow-md`}>
                    {product.badge}
                  </span>

                  {/* Wishlist Heart */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-stone-700 hover:text-rose-500 shadow-md transition-colors cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  {/* Eco impact tag */}
                  <div className="absolute bottom-3 left-3 bg-stone-900/85 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-sm">
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>{product.impact}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Eco Quality Badge */}
                    <div className="flex items-center gap-1.5 mb-2 text-[11px] font-bold text-emerald-800">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200">
                        🌿 100% Duurzaam Katoen
                      </span>
                    </div>

                    <h3 className="font-extrabold text-base text-stone-900 leading-snug mb-1">{product.name}</h3>
                    <p className="text-xs text-stone-500 font-medium mb-3">{product.tag}</p>

                    {/* Size Selector */}
                    <div className="flex items-center gap-1.5 mb-4">
                      <span className="text-[10px] font-black text-stone-400 uppercase tracking-wider mr-1">Maat:</span>
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize({ ...selectedSize, [product.id]: size })}
                          className={`min-w-7 h-7 px-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                            activeSize === size
                              ? `${theme.primary} text-white border-transparent shadow-xs scale-105`
                              : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="font-black text-lg text-stone-900">€{product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-stone-400 line-through ml-1.5 font-bold">
                          €{product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className={`px-4 py-2 rounded-xl ${theme.primary} ${theme.primaryHover} text-white text-xs font-black flex items-center gap-1.5 shadow-md hover:scale-102 transition-all cursor-pointer`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>In Mand</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Customer Reviews Section (Demo Widget) */}
      <section className="bg-stone-100/70 py-12 px-4 sm:px-8 border-t border-stone-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full inline-block mb-2">
              Voorbeeld Review Integratie
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 mb-1">
              Klaar voor Echte Klantbeoordelingen
            </h2>
            <p className="text-xs text-stone-500 font-medium">
              In jouw uiteindelijke webshop koppelen we dit 1-op-1 aan jouw geverifieerde reviews via WebwinkelKeur, Trustpilot of Google.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <div className="flex text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-stone-700 leading-relaxed font-medium mb-3">
                &ldquo;Voorbeeld van een productreview: De hoodie zit heerlijk zacht en behoudt perfect zijn pasvorm.&rdquo;
              </p>
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="text-stone-900">Voorbeeld Klantreview 1</span>
                <span className="text-stone-500 font-bold">Demo sjabloon</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <div className="flex text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-stone-700 leading-relaxed font-medium mb-3">
                &ldquo;Voorbeeld van een verzendreview: Snelle PostNL levering en plasticvrije verpakking.&rdquo;
              </p>
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="text-stone-900">Voorbeeld Klantreview 2</span>
                <span className="text-stone-500 font-bold">Demo sjabloon</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <div className="flex text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-stone-700 leading-relaxed font-medium mb-3">
                &ldquo;Voorbeeld van een algemene review: Transparante communicatie, mooie webshop en eerlijke prijzen.&rdquo;
              </p>
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="text-stone-900">Voorbeeld Klantreview 3</span>
                <span className="text-stone-500 font-bold">Demo sjabloon</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shopping Cart Drawer Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col p-6 animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <ShoppingBag className={`w-5 h-5 ${theme.textPrimary}`} />
                <h3 className="font-black text-lg text-stone-900">Jouw Winkelmand</h3>
                <span className="text-xs font-bold text-stone-500">({totalCartCount})</span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-stone-400 space-y-2">
                  <ShoppingBag className="w-12 h-12 mx-auto stroke-1 text-stone-300" />
                  <p className="text-sm font-bold text-stone-600">Je winkelmand is leeg</p>
                  <p className="text-xs text-stone-400">Voeg een artikel toe om de checkout te testen!</p>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="flex gap-3 p-3 bg-stone-50 rounded-2xl border border-stone-200">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-extrabold text-xs text-stone-900 block leading-tight">
                            {item.product.name}
                          </span>
                          <span className="text-[11px] text-stone-500 font-bold">Maat: {item.size}</span>
                        </div>
                        <span className="font-black text-xs text-stone-900">
                          €{(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, -1)}
                          className="w-6 h-6 rounded-lg bg-white border border-stone-300 flex items-center justify-center text-stone-700 hover:bg-stone-100 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-black text-stone-800 min-w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, 1)}
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

            {/* Discount Code & Checkout Summary */}
            <div className="pt-4 border-t border-stone-200 space-y-3">
              {/* Promo code form */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Kortingscode (DEMO10)"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold uppercase focus:outline-none"
                />
                <button
                  onClick={() => {
                    if (discountCode.trim().toUpperCase() === 'DEMO10') {
                      setDiscountApplied(true);
                      showToast('Kortingscode DEMO10 toegepast (-10%)! 🎉');
                    } else {
                      showToast('Voer code DEMO10 in voor korting!');
                    }
                  }}
                  className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold cursor-pointer"
                >
                  Toepassen
                </button>
              </div>

              {discountApplied && (
                <div className="flex justify-between text-xs font-bold text-emerald-700 bg-emerald-50 p-2 rounded-xl">
                  <span>10% Korting (DEMO10):</span>
                  <span>-€{discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-base font-black text-stone-900">
                <span>Totaalbedrag:</span>
                <span>€{totalPrice.toFixed(2)}</span>
              </div>

              <button
                onClick={onRequestQuote}
                disabled={cart.length === 0}
                className={`w-full py-3.5 rounded-xl ${theme.primary} ${theme.primaryHover} disabled:bg-stone-300 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2`}
              >
                <span>Afrekenen met iDEAL (Demo)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-3 text-[10px] font-bold text-stone-500 pt-1">
                <span>💳 iDEAL & Bancontact</span>
                <span>•</span>
                <span>📦 PostNL</span>
                <span>•</span>
                <span>🔒 SSL Beveiligd</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
