'use client';

import React, { useState } from 'react';
import { TemplateProps } from '../../types/theme';
import {
  Check,
  MapPin,
  Calendar,
  Heart,
  ArrowRight,
  Sparkles,
  Sun,
  Moon,
  Plus,
  CheckCircle2,
  Truck,
  Leaf,
  Star,
} from 'lucide-react';

interface BoxOption {
  id: 'basis' | 'familie' | 'fruit';
  name: string;
  subtitle: string;
  price: number;
  highlight?: boolean;
  image: string;
  features: string[];
}

const BOXES: BoxOption[] = [
  {
    id: 'basis',
    name: 'Basis Oogstbox',
    subtitle: 'Voor 1-2 personen',
    price: 17.5,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80',
    features: [
      '5 soorten seizoensgroenten',
      '1 kg biologische aardappelen',
      'Inclusief 2 weekrecepten',
      'Elke week wisselende teelt',
    ],
  },
  {
    id: 'familie',
    name: 'Familie Boerenkist',
    subtitle: 'Voor 3-5 personen • Meest gekozen',
    price: 26.5,
    highlight: true,
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=700&q=80',
    features: [
      '8 soorten verse seizoensgroenten',
      '2 soorten streekfruit (appels/peren)',
      '6 verse vrije-uitloopeieren',
      'Gratis gekoelde bezorging aan huis',
      'Weekmenu met gezinsvriendelijke recepten',
    ],
  },
  {
    id: 'fruit',
    name: 'Hollandse Fruitmand',
    subtitle: 'Rijk aan vitamines',
    price: 16.0,
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=700&q=80',
    features: [
      'Elstar & Jonagold handappels',
      'Conference handperen',
      'Seizoensbessen & pruimen',
      '100% Onbespoten Betuws fruit',
    ],
  },
];

const ADDONS = [
  { id: 'eggs', name: '6x Vrije-uitloop eieren', price: 3.25, icon: '🥚' },
  { id: 'cheese', name: 'Boeren Belegen Kaas (300g)', price: 5.75, icon: '🧀' },
  { id: 'honey', name: 'Rauwe Bloemenhoning (250g)', price: 4.95, icon: '🍯' },
  { id: 'juice', name: '1L Troebel Appelsap (Puur)', price: 2.85, icon: '🧃' },
];

export const VersVogelBoerderij: React.FC<TemplateProps> = ({
  theme,
  isDarkMode,
  onToggleDarkMode,
  onRequestQuote,
}) => {
  const [postcode, setPostcode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState<string | null>(null);
  const [selectedBoxId, setSelectedBoxId] = useState<'basis' | 'familie' | 'fruit'>('familie');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['eggs']);
  const [activeSeason, setActiveSeason] = useState<'lente' | 'zomer' | 'herfst' | 'winter'>('lente');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const checkPostcode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postcode.trim()) return;
    const clean = postcode.replace(/\s+/g, '');
    const num = parseInt(clean.substring(0, 4), 10);
    if (!isNaN(num) && num >= 1000 && num <= 9999) {
      setDeliveryResult(
        `✅ Goed nieuws! In postcode ${num} bezorgen we elke donderdag tussen 17:00 en 21:00 met elektrische koelbussen.`
      );
      showToast('Bezorging mogelijk in jouw regio!');
    } else {
      setDeliveryResult('Vul een geldige 4-cijferige postcode in (bijv. 9712 of 1012).');
    }
  };

  const currentBox = BOXES.find((b) => b.id === selectedBoxId) || BOXES[1];
  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const item = ADDONS.find((a) => a.id === id);
    return sum + (item ? item.price : 0);
  }, 0);
  const totalWeeklyPrice = currentBox.price + addonsTotal;

  return (
    <div className="min-h-full bg-emerald-50/20 text-stone-900 font-sans relative selection:bg-emerald-600 selection:text-white">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold border border-stone-700 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className={`py-1.5 px-4 text-center text-xs font-bold text-white ${theme.primary} flex items-center justify-center gap-2 shadow-xs`}>
        <Leaf className="w-3.5 h-3.5 text-emerald-200" />
        <span>Vandaag geoogst in Groningen • Vrijdag vers op jouw keukentafel • Flexibel opzegbaar</span>
      </div>

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${theme.primary} text-white font-black flex items-center justify-center text-sm shadow-md`}>
            VV
          </div>
          <div>
            <span className="font-black text-base sm:text-lg tracking-tight block">VersVogel Boerderij</span>
            <span className="text-[10px] text-stone-500 font-medium hidden sm:block">Groningen • Eerlijke Korte Keten</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-stone-700">
          <a href="#pakketten" className="hover:text-stone-900">Onze Boerenboxen</a>
          <a href="#oogstkalender" className="hover:text-stone-900">Seizoensoogst</a>
          <a href="#bezorging" className="hover:text-stone-900">Postcode Check</a>
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
            href="#pakketten"
            className={`px-4 py-2 rounded-xl ${theme.primary} ${theme.primaryHover} text-white text-xs font-black shadow-md cursor-pointer`}
          >
            Stel Jouw Box Samen
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-emerald-100/30 via-stone-50 to-white py-12 sm:py-16 px-4 sm:px-8 border-b border-stone-200">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-left">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText} text-xs font-black mb-4 border ${theme.borderLight}`}>
              <Truck className="w-3.5 h-3.5" />
              <span>Direct van het land, zonder tussenhandel</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4">
              Echt verse groenten hebben geen lange koelhuizen nodig.
            </h1>
            <p className="text-sm sm:text-base text-stone-600 mb-6 leading-relaxed max-w-xl">
              Sluit je aan bij meer dan 1.400 huishoudens. Elke week een rijk gevulde seizoensbox vol vitaminen, geteeld door Groningse regeneratieve boeren.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <a
                href="#pakketten"
                className={`px-6 py-3 rounded-xl ${theme.primary} ${theme.primaryHover} text-white font-extrabold text-xs shadow-md flex items-center gap-2`}
              >
                <span>Kies Jouw Boerenpakket</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={onRequestQuote}
                className="px-5 py-3 rounded-xl border border-stone-300 text-stone-800 font-extrabold text-xs hover:bg-white cursor-pointer"
              >
                Vraag Deze Boerenwebsite Aan
              </button>
            </div>

            <div className="flex items-center gap-5 text-xs font-bold text-stone-600 pt-3 border-t border-stone-200">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Wekelijks opzegbaar</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Geen bezorgkosten</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Onbespoten</span>
              </div>
            </div>
          </div>

          {/* Featured Family Box Card */}
          <div className="w-full md:w-88 bg-white p-6 rounded-3xl border border-stone-200 shadow-xl overflow-hidden relative">
            <div className={`absolute top-3 right-3 px-3 py-1 rounded-full ${theme.primary} text-white text-[10px] font-black uppercase shadow-xs`}>
              Meest Populair
            </div>
            <img
              src={BOXES[1].image}
              alt="Familie Boerenkist"
              className="w-full h-44 object-cover rounded-2xl mb-4"
            />
            <h3 className="font-black text-lg text-stone-900 mb-1">Familie Boerenkist</h3>
            <p className="text-xs text-stone-500 mb-3 font-medium">8 soorten groenten + 2 streekfruit + 6 eieren</p>
            <div className="flex items-baseline gap-1 text-2xl font-black text-stone-900 mb-4">
              <span>€26,50</span>
              <span className="text-xs text-stone-400 font-bold">/ week bezorgd</span>
            </div>
            <a
              href="#pakketten"
              className={`w-full py-2.5 rounded-xl ${theme.primary} ${theme.primaryHover} text-white text-xs font-black shadow-md block text-center`}
            >
              Configureer Jouw Pakket
            </a>
          </div>
        </div>
      </section>

      {/* Subscription Box Selector */}
      <section id="pakketten" className="py-12 sm:py-16 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">Kies Jouw Wekelijkse Box</h2>
          <p className="text-xs sm:text-sm text-stone-500 font-medium mt-1">
            Klik op een box en voeg eventueel verse boerderij extra&apos;s toe
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {BOXES.map((box) => {
            const isSelected = selectedBoxId === box.id;
            return (
              <div
                key={box.id}
                onClick={() => {
                  setSelectedBoxId(box.id);
                  showToast(`${box.name} geselecteerd!`);
                }}
                className={`bg-white rounded-3xl border-2 p-5 flex flex-col justify-between transition-all cursor-pointer shadow-xs hover:shadow-lg ${
                  isSelected
                    ? `${theme.borderLight} ring-3 ring-orange-500/30 scale-102`
                    : 'border-stone-200'
                }`}
              >
                <div>
                  <div className="h-44 w-full rounded-2xl overflow-hidden mb-4 relative">
                    <img src={box.image} alt={box.name} className="w-full h-full object-cover" />
                    {box.highlight && (
                      <span className={`absolute top-2 left-2 px-2.5 py-0.5 rounded-md ${theme.primary} text-white text-[10px] font-black uppercase`}>
                        Meest Gekozen
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-black text-stone-400 uppercase tracking-wider block">
                    {box.subtitle}
                  </span>
                  <h3 className="font-black text-lg text-stone-900 mt-0.5 mb-2">{box.name}</h3>
                  <div className="text-2xl font-black text-stone-900 mb-4">
                    €{box.price.toFixed(2)}{' '}
                    <span className="text-xs font-bold text-stone-400">/ week</span>
                  </div>

                  <ul className="space-y-2 text-xs font-medium text-stone-600 mb-6">
                    {box.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className={`w-full py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    isSelected ? `${theme.primary} text-white shadow-md` : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {isSelected ? '✓ Geselecteerd' : 'Kies Dit Pakket'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Optional Addons Builder */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md max-w-4xl mx-auto mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="font-black text-lg text-stone-900">Voeg verse streekproducten toe</h3>
              <p className="text-xs text-stone-500 font-medium">Rechtstreeks meegeleverd in jouw wekelijkse boerderijkist</p>
            </div>
            <span className="text-xs font-bold text-stone-400">Optioneel per week</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {ADDONS.map((addon) => {
              const active = selectedAddons.includes(addon.id);
              return (
                <button
                  key={addon.id}
                  onClick={() => toggleAddon(addon.id)}
                  className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    active
                      ? `${theme.borderLight} bg-stone-50 ring-2 ring-orange-500/20`
                      : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{addon.icon}</span>
                    <div>
                      <span className="font-extrabold text-xs text-stone-900 block leading-tight">
                        {addon.name}
                      </span>
                      <span className="text-[11px] font-black text-stone-600">+€{addon.price.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-black ${
                    active ? `${theme.primary} text-white` : 'border border-stone-300 text-transparent'
                  }`}>
                    ✓
                  </div>
                </button>
              );
            })}
          </div>

          {/* Total calculation bar */}
          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs text-stone-500 font-bold block">Totaalprijs per levering:</span>
              <span className="text-2xl font-black text-stone-900">
                €{totalWeeklyPrice.toFixed(2)}{' '}
                <span className="text-xs text-stone-400 font-normal">({currentBox.name} + {selectedAddons.length} extra&apos;s)</span>
              </span>
            </div>
            <button
              onClick={onRequestQuote}
              className={`px-8 py-3.5 rounded-xl ${theme.primary} ${theme.primaryHover} text-white font-black text-xs shadow-md cursor-pointer`}
            >
              Start Met Deze Box (Proefweek)
            </button>
          </div>
        </div>
      </section>

      {/* Harvest Season Tracker */}
      <section id="oogstkalender" className="bg-stone-100/70 py-12 px-4 sm:px-8 border-t border-stone-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-black text-stone-900 mb-2">Onze Oogstkalender</h2>
          <p className="text-xs text-stone-500 font-medium mb-6">Wat vind je op dit moment vers geoogst in jouw box?</p>

          <div className="flex justify-center gap-2 mb-6">
            {(['lente', 'zomer', 'herfst', 'winter'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setActiveSeason(s)}
                className={`px-4 py-1.5 rounded-xl text-xs font-black capitalize transition-all cursor-pointer ${
                  activeSeason === s ? 'bg-stone-900 text-white shadow-xs' : 'bg-white text-stone-600 hover:text-stone-900'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            {activeSeason === 'lente' && (
              <>
                <div className="p-3 bg-stone-50 rounded-xl">
                  <span className="text-xl block mb-1">🌱</span>
                  <span className="font-extrabold text-xs block text-stone-900">Verse Asperges</span>
                  <span className="text-[10px] text-stone-500">Witte & groene teelt</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl">
                  <span className="text-xl block mb-1">🥬</span>
                  <span className="font-extrabold text-xs block text-stone-900">Meiraapjes & Radijs</span>
                  <span className="text-[10px] text-stone-500">Knapperig en zoet</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl">
                  <span className="text-xl block mb-1">🌿</span>
                  <span className="font-extrabold text-xs block text-stone-900">Wilde Spinazie</span>
                  <span className="text-[10px] text-stone-500">Rijk aan ijzer</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl">
                  <span className="text-xl block mb-1">🍓</span>
                  <span className="font-extrabold text-xs block text-stone-900">Eerste Aardbeien</span>
                  <span className="text-[10px] text-stone-500">Zongerijpt streekfruit</span>
                </div>
              </>
            )}
            {activeSeason === 'zomer' && (
              <>
                <div className="p-3 bg-stone-50 rounded-xl">
                  <span className="text-xl block mb-1">🍅</span>
                  <span className="font-extrabold text-xs block text-stone-900">Coeur de Boeuf Tomaten</span>
                  <span className="text-[10px] text-stone-500">Volle zonnesmaak</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl">
                  <span className="text-xl block mb-1">🥒</span>
                  <span className="font-extrabold text-xs block text-stone-900">Mini Komkommers</span>
                  <span className="text-[10px] text-stone-500">Ongewassen en puur</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl">
                  <span className="text-xl block mb-1">🫐</span>
                  <span className="font-extrabold text-xs block text-stone-900">Blauwe Bessen</span>
                  <span className="text-[10px] text-stone-500">Met de hand geplukt</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl">
                  <span className="text-xl block mb-1">🫑</span>
                  <span className="font-extrabold text-xs block text-stone-900">Zoete Puntpaprika</span>
                  <span className="text-[10px] text-stone-500">Crispy & gezond</span>
                </div>
              </>
            )}
            {activeSeason === 'herfst' && (
              <>
                <div className="p-3 bg-stone-50 rounded-xl">
                  <span className="text-xl block mb-1">🎃</span>
                  <span className="font-extrabold text-xs block text-stone-900">Hokkaido Pompoen</span>
                  <span className="text-[10px] text-stone-500">Perfect voor herfstragout</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl">
                  <span className="text-xl block mb-1">🍄</span>
                  <span className="font-extrabold text-xs block text-stone-900">Oesterzwammen</span>
                  <span className="text-[10px] text-stone-500">Geteeld op koffiedik</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl">
                  <span className="text-xl block mb-1">🍎</span>
                  <span className="font-extrabold text-xs block text-stone-900">Elstar Handappels</span>
                  <span className="text-[10px] text-stone-500">Betuwse oogst</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl">
                  <span className="text-xl block mb-1">🥕</span>
                  <span className="font-extrabold text-xs block text-stone-900">Gekleurde Bospeen</span>
                  <span className="text-[10px] text-stone-500">Paars, geel en oranje</span>
                </div>
              </>
            )}
            {activeSeason === 'winter' && (
              <>
                <div className="p-3 bg-stone-50 rounded-xl">
                  <span className="text-xl block mb-1">🥬</span>
                  <span className="font-extrabold text-xs block text-stone-900">Verse Boerenkool</span>
                  <span className="text-[10px] text-stone-500">Na de eerste nachtvorst</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl">
                  <span className="text-xl block mb-1">🥔</span>
                  <span className="font-extrabold text-xs block text-stone-900">Bildtstar Aardappelen</span>
                  <span className="text-[10px] text-stone-500">Groningse kleigrond</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl">
                  <span className="text-xl block mb-1">🧅</span>
                  <span className="font-extrabold text-xs block text-stone-900">Rode Winteruien</span>
                  <span className="text-[10px] text-stone-500">Pittig en zoet</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl">
                  <span className="text-xl block mb-1">🍐</span>
                  <span className="font-extrabold text-xs block text-stone-900">Gieser Wildeman</span>
                  <span className="text-[10px] text-stone-500">Klassieke stoofperen</span>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Postcode Delivery Checker */}
      <section id="bezorging" className="py-12 sm:py-16 px-4 sm:px-8 max-w-3xl mx-auto">
        <div className={`p-8 rounded-3xl ${theme.bgLight} border-2 ${theme.borderLight} text-center`}>
          <MapPin className={`w-8 h-8 ${theme.textPrimary} mx-auto mb-2`} />
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 mb-2">Bezorgen we bij jou in de buurt?</h2>
          <p className="text-xs text-stone-600 mb-6 font-medium">Controleer direct of jouw postcode in onze bezorgregio valt</p>

          <form onSubmit={checkPostcode} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto mb-4">
            <input
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              placeholder="Bijv. 9712 of 1012"
              className="flex-1 px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-bold focus:outline-none bg-white uppercase"
            />
            <button
              type="submit"
              className={`px-5 py-2.5 rounded-xl ${theme.primary} ${theme.primaryHover} text-white text-xs font-bold shadow-sm whitespace-nowrap cursor-pointer`}
            >
              Check Postcode
            </button>
          </form>

          {deliveryResult && (
            <div className="p-3.5 bg-white rounded-xl border border-stone-200 text-xs font-bold text-stone-800 max-w-md mx-auto animate-in fade-in leading-relaxed">
              {deliveryResult}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
