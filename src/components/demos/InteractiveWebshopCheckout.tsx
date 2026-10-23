'use client';

import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Trash2, 
  Plus, 
  Minus, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Star, 
  RotateCcw,
  Zap,
  Truck,
  CreditCard
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: 'Kleding' | 'Accessoires' | 'Lifestyle' | 'Tech';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  badge?: string;
  image: string;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
}

const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Minimalist Hoodie "Atelier"',
    category: 'Kleding',
    price: 69.95,
    originalPrice: 89.95,
    rating: 4.9,
    reviewsCount: 84,
    stock: 7,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Onyx Zwart', hex: '#18181b' },
      { name: 'Saliegroen', hex: '#65a30d' },
      { name: 'Warm Zand', hex: '#d6d3d1' },
    ],
  },
  {
    id: 'p2',
    name: 'Handgemaakte Leren Kaarthouder',
    category: 'Accessoires',
    price: 34.50,
    rating: 4.8,
    reviewsCount: 42,
    stock: 12,
    badge: 'Handgemaakt',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80',
    colors: [
      { name: 'Cognac', hex: '#9a3412' },
      { name: 'Middernacht', hex: '#0f172a' },
    ],
  },
  {
    id: 'p3',
    name: 'Draadloze Desk Mat & Qi Oplader',
    category: 'Tech',
    price: 49.00,
    originalPrice: 59.00,
    rating: 4.7,
    reviewsCount: 56,
    stock: 4,
    badge: 'Populair',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    colors: [
      { name: 'Antraciet', hex: '#334155' },
      { name: 'Camel', hex: '#b45309' },
    ],
  },
  {
    id: 'p4',
    name: 'Geurkaars Amber & Cederhout (300g)',
    category: 'Lifestyle',
    price: 24.95,
    rating: 5.0,
    reviewsCount: 31,
    stock: 15,
    badge: 'Eco Friendly',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'p5',
    name: 'Oversized Zwaargewicht T-Shirt',
    category: 'Kleding',
    price: 39.95,
    rating: 4.8,
    reviewsCount: 68,
    stock: 9,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Krijtwit', hex: '#f8fafc' },
      { name: 'Olijf', hex: '#3f6212' },
    ],
  },
  {
    id: 'p6',
    name: 'Roestvrijstalen Thermosfles (750ml)',
    category: 'Lifestyle',
    price: 29.50,
    rating: 4.9,
    reviewsCount: 112,
    stock: 22,
    badge: 'Levenslange garantie',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80',
    colors: [
      { name: 'Mat Zwart', hex: '#18181b' },
      { name: 'Borstelstaal', hex: '#94a3b8' },
    ],
  },
];

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  image: string;
}

const DUTCH_BANKS = [
  'Rabobank',
  'ING Bank',
  'ABN AMRO',
  'bunq',
  'SNS Bank',
  'RegioBank',
  'ASN Bank',
  'Knab',
];

export default function InteractiveWebshopCheckout() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Alles');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  
  // Selected variant state per product id
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    p1: 'M',
    p5: 'L',
  });
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({
    p1: 'Onyx Zwart',
    p2: 'Cognac',
    p3: 'Antraciet',
    p5: 'Krijtwit',
    p6: 'Mat Zwart',
  });

  // Cart & Drawer
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'p1-M-Onyx Zwart',
      productId: 'p1',
      name: 'Minimalist Hoodie "Atelier"',
      price: 69.95,
      quantity: 1,
      size: 'M',
      color: 'Onyx Zwart',
      image: PRODUCTS[0].image,
    },
  ]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Checkout State
  const [selectedBank, setSelectedBank] = useState<string>('Rabobank');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderRef, setOrderRef] = useState<string>('');

  const categories = ['Alles', 'Kleding', 'Accessoires', 'Lifestyle', 'Tech'];

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat = selectedCategory === 'Alles' || p.category === selectedCategory;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  // Cart calculations
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 50.0;
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 4.95;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const total = subtotal + shippingCost;

  const handleAddToCart = (product: Product) => {
    const size = product.sizes ? selectedSizes[product.id] || product.sizes[0] : undefined;
    const color = product.colors ? selectedColors[product.id] || product.colors[0].name : undefined;
    const cartItemId = `${product.id}-${size || 'default'}-${color || 'default'}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          size,
          color,
          image: product.image,
        },
      ];
    });

    setIsDrawerOpen(true);
    setPaymentSuccess(false);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSimulatePayment = () => {
    setIsProcessingPayment(true);
    setPaymentSuccess(false);

    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentSuccess(true);
      setOrderRef(`SO-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    }, 1200);
  };

  const handleResetOrder = () => {
    setPaymentSuccess(false);
    setCart([
      {
        id: 'p1-M-Onyx Zwart',
        productId: 'p1',
        name: 'Minimalist Hoodie "Atelier"',
        price: 69.95,
        quantity: 1,
        size: 'M',
        color: 'Onyx Zwart',
        image: PRODUCTS[0].image,
      },
    ]);
  };

  return (
    <div className="relative rounded-3xl bg-slate-900 border border-slate-800 text-slate-100 overflow-hidden shadow-2xl">
      {/* Top Banner / Feature Callout */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/60 border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Echte Web-App Demo
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-xs font-medium text-slate-300">
            Next.js E-Commerce met iDEAL Mini-Checkout Simulator
          </span>
        </div>

        <button
          onClick={() => setIsDrawerOpen(true)}
          className="relative inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-3.5 py-1.5 rounded-full transition-all shadow-md shadow-emerald-500/20 active:scale-95"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Winkelmand ({totalItems})</span>
          <span className="bg-slate-950 text-emerald-400 text-[10px] px-1.5 py-0.5 rounded-full font-black">
            €{subtotal.toFixed(2)}
          </span>
        </button>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {/* Filter & Search Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-56">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Zoek product..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/70 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-800/70 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 cursor-pointer"
            >
              <option value="featured">Aanbevolen</option>
              <option value="price-asc">Prijs laag → hoog</option>
              <option value="price-desc">Prijs hoog → laag</option>
              <option value="rating">Hoogste score</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((product) => {
            const activeColor = selectedColors[product.id] || (product.colors ? product.colors[0].name : undefined);
            const activeSize = selectedSizes[product.id] || (product.sizes ? product.sizes[0] : undefined);

            return (
              <div
                key={product.id}
                className="group rounded-2xl bg-slate-800/40 border border-slate-800 hover:border-slate-700 p-4 transition-all duration-200 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Image container */}
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-950 mb-3.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />

                    {/* Badge */}
                    {product.badge && (
                      <span className="absolute top-2.5 left-2.5 bg-slate-900/90 backdrop-blur-md border border-slate-700 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {product.badge}
                      </span>
                    )}

                    {/* Stock pill */}
                    <span className="absolute bottom-2.5 left-2.5 bg-slate-950/80 backdrop-blur-sm text-slate-300 text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {product.stock} op voorraad
                    </span>
                  </div>

                  {/* Title & Rating */}
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="font-semibold text-sm text-white line-clamp-1">{product.name}</h3>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400 shrink-0">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  {/* Category & Reviews */}
                  <p className="text-xs text-slate-400 mb-3">
                    {product.category} • {product.reviewsCount} reviews
                  </p>

                  {/* Variant Pickers (Colors & Sizes) */}
                  <div className="space-y-2 mb-4">
                    {product.colors && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-400 mr-1">Kleur:</span>
                        {product.colors.map((c) => (
                          <button
                            key={c.name}
                            title={c.name}
                            onClick={() =>
                              setSelectedColors((prev) => ({ ...prev, [product.id]: c.name }))
                            }
                            className={`w-4 h-4 rounded-full border transition-all ${
                              activeColor === c.name
                                ? 'scale-125 border-emerald-400 ring-2 ring-emerald-400/30'
                                : 'border-slate-700 hover:scale-110'
                            }`}
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                      </div>
                    )}

                    {product.sizes && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-400 mr-1">Maat:</span>
                        {product.sizes.map((s) => (
                          <button
                            key={s}
                            onClick={() =>
                              setSelectedSizes((prev) => ({ ...prev, [product.id]: s }))
                            }
                            className={`text-[10px] font-bold px-2 py-0.5 rounded border transition-all ${
                              activeSize === s
                                ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                                : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Price & Add to Cart Button */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-black text-white">€{product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-slate-500 line-through">
                          €{product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-emerald-500 text-slate-200 hover:text-slate-950 font-semibold text-xs px-3 py-1.5 rounded-xl transition-all duration-150 active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>In mandje</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Benefits bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80 text-center">
          <div className="p-2.5 rounded-xl bg-slate-800/20 flex flex-col items-center justify-center gap-1">
            <Truck className="w-4 h-4 text-emerald-400" />
            <span className="text-[11px] font-semibold text-slate-300">Vandaag besteld, morgen in huis</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800/20 flex flex-col items-center justify-center gap-1">
            <CreditCard className="w-4 h-4 text-emerald-400" />
            <span className="text-[11px] font-semibold text-slate-300">iDEAL & Bancontact ready</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800/20 flex flex-col items-center justify-center gap-1">
            <RotateCcw className="w-4 h-4 text-emerald-400" />
            <span className="text-[11px] font-semibold text-slate-300">30 dagen gratis retourneren</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800/20 flex flex-col items-center justify-center gap-1">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span className="text-[11px] font-semibold text-slate-300">0.4s laadtijd op mobiel</span>
          </div>
        </div>
      </div>

      {/* Mini-Cart & iDEAL Checkout Drawer (Overlay) */}
      {isDrawerOpen && (
        <div className="absolute inset-0 z-30 bg-slate-950/70 backdrop-blur-sm flex justify-end transition-opacity">
          <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-sm text-white">Winkelmandje ({totalItems})</h3>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="text-xs font-semibold text-slate-400 hover:text-white px-2.5 py-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                Sluiten ✕
              </button>
            </div>

            {/* Free shipping bar */}
            <div className="px-5 py-3 bg-slate-800/40 border-b border-slate-800">
              <div className="flex justify-between text-[11px] font-semibold mb-1.5">
                <span className="text-slate-300">
                  {remainingForFreeShipping === 0 ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Gefeliciteerd! Gratis verzending inbegrepen.
                    </span>
                  ) : (
                    <span>Nog €{remainingForFreeShipping.toFixed(2)} voor gratis verzending</span>
                  )}
                </span>
                <span className="text-slate-400 font-mono">
                  {Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100))}%
                </span>
              </div>
              <div className="w-full bg-slate-700/60 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {paymentSuccess ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-base text-white">iDEAL Betaling Geslaagd!</h4>
                    <p className="text-xs text-slate-400">
                      Bestelnummer: <span className="font-mono text-emerald-400 font-bold">{orderRef}</span>
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 text-left text-xs space-y-1.5">
                    <p className="text-slate-300 font-medium">
                      Simulatie geslaagd via <span className="text-white font-bold">{selectedBank}</span>.
                    </p>
                    <p className="text-[11px] text-slate-400">
                      In een echte Samen Online webshop ontvangt de klant direct een e-mail met factuur, Track & Trace en synchroniseert de voorraad in realtime.
                    </p>
                  </div>
                  <button
                    onClick={handleResetOrder}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
                  >
                    Opnieuw testen met nieuw mandje
                  </button>
                </div>
              ) : cart.length === 0 ? (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <ShoppingBag className="w-10 h-10 mx-auto text-slate-600 stroke-1" />
                  <p className="text-xs font-medium">Je winkelmandje is leeg.</p>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="text-xs text-emerald-400 font-semibold hover:underline"
                  >
                    Kies een product uit de catalogus
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 items-center p-3 rounded-xl bg-slate-800/40 border border-slate-800"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-lg bg-slate-950 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-white truncate">{item.name}</h4>
                      <p className="text-[10px] text-slate-400">
                        {item.size ? `Maat: ${item.size} • ` : ''}
                        {item.color ? `${item.color}` : ''}
                      </p>
                      <p className="text-xs font-bold text-emerald-400 mt-1">€{item.price.toFixed(2)}</p>

                      <div className="flex items-center gap-2 mt-1.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-5 h-5 rounded bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-slate-200"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-slate-200 w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-5 h-5 rounded bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-slate-200"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-slate-500 hover:text-red-400 p-1.5 transition-colors"
                      title="Verwijder"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer (Summary & iDEAL Trigger) */}
            {!paymentSuccess && cart.length > 0 && (
              <div className="p-5 border-t border-slate-800 bg-slate-900/90 space-y-4">
                {/* Cost breakdown */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotaal</span>
                    <span className="font-medium text-slate-200">€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Verzendkosten</span>
                    <span className="font-medium text-slate-200">
                      {shippingCost === 0 ? (
                        <span className="text-emerald-400 font-bold">Gratis</span>
                      ) : (
                        `€${shippingCost.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Inclusief 21% BTW</span>
                    <span>€{((total / 1.21) * 0.21).toFixed(2)}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold text-white">
                    <span>Totaalbedrag</span>
                    <span className="text-emerald-400 text-base font-black">€{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Bank Selector for iDEAL */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Kies je bank voor iDEAL 2.0:
                  </label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    {DUTCH_BANKS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleSimulatePayment}
                  disabled={isProcessingPayment}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-black text-xs py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {isProcessingPayment ? (
                    <>
                      <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Verbinden met {selectedBank}...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Direct Afrekenen via {selectedBank} (€{total.toFixed(2)})</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
