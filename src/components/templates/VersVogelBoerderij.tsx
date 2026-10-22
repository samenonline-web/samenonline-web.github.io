'use client';

import React, { useState } from 'react';
import { ColorTheme } from '../../types/theme';
import { Check, MapPin, Calendar, Heart, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

interface TemplateProps {
  theme: ColorTheme;
  onRequestQuote: () => void;
}

export const VersVogelBoerderij: React.FC<TemplateProps> = ({ theme, onRequestQuote }) => {
  const [postcode, setPostcode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState<string | null>(null);
  const [selectedBox, setSelectedBox] = useState<'basis' | 'familie' | 'fruit'>('familie');

  const checkPostcode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postcode) return;
    const num = parseInt(postcode.substring(0, 4), 10);
    if (!isNaN(num) && num >= 1000 && num <= 9999) {
      setDeliveryResult('✅ Goed nieuws! Wij bezorgen elke donderdag en zaterdag vers bij jou aan huis.');
    } else {
      setDeliveryResult('Vul een geldige 4-cijferige Nederlandse postcode in (bijv. 9712).');
    }
  };

  return (
    <div className="min-h-full bg-amber-50/20 text-stone-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl ${theme.primary} text-white font-black flex items-center justify-center text-sm shadow-sm`}>
            VV
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight">VersVogel Boerenwinkel</span>
            <span className="block text-[10px] text-stone-500 font-medium">Groningen • Eerlijke Streekproducten</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold">
          <nav className="hidden sm:flex items-center gap-5 text-stone-600">
            <a href="#pakketten" className="hover:text-stone-900">Groenteboxen</a>
            <a href="#oogst" className="hover:text-stone-900">Seizoensoogst</a>
            <a href="#bezorging" className="hover:text-stone-900">Postcodecheck</a>
          </nav>
          <button
            onClick={onRequestQuote}
            className={`px-4 py-2 rounded-xl ${theme.primary} ${theme.primaryHover} text-white text-xs font-bold shadow-xs cursor-pointer`}
          >
            Bestel Proefbox
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className={`py-14 px-6 ${theme.bgLight} border-b ${theme.borderLight} text-center`}>
        <div className="max-w-3xl mx-auto">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText} text-xs font-extrabold mb-4 border ${theme.borderLight}`}>
            <span>🚜 Rechtstreeks van het land naar jouw keukentafel</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4">
            Echt vers smaakt <span className={theme.textPrimary}>gewoon beter</span>.
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Geen tussenschakels of lange koelhuizen. Oogst van vandaag, morgen in jouw wekelijkse groentepakket thuisbezorgd.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#pakketten"
              className={`px-6 py-3 rounded-xl ${theme.primary} ${theme.primaryHover} text-white font-bold text-xs shadow-md flex items-center gap-2`}
            >
              <span>Kies Jouw Groentepakket</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#bezorging"
              className="px-6 py-3 rounded-xl bg-white border border-stone-300 text-stone-800 text-xs font-bold hover:bg-stone-50"
            >
              Doe Postcodecheck
            </a>
          </div>
        </div>
      </section>

      {/* Subscription Boxes */}
      <section id="pakketten" className="py-12 px-6 max-w-5xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl font-black text-stone-900">Wekelijkse Boerenboxen</h2>
          <p className="text-xs text-stone-500 font-medium">Flexibel pauzeren of opzeggen wanneer je wilt</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Basis */}
          <div 
            onClick={() => setSelectedBox('basis')}
            className={`p-6 rounded-3xl border-2 transition-all cursor-pointer bg-white flex flex-col justify-between ${
              selectedBox === 'basis' ? `${theme.borderLight} ring-2 ring-orange-500/30 shadow-md` : 'border-stone-200'
            }`}
          >
            <div>
              <span className="text-xs font-extrabold text-stone-400 uppercase">1-2 Personen</span>
              <h3 className="text-lg font-black text-stone-900 mt-1 mb-2">Basis Oogstbox</h3>
              <div className="text-2xl font-black text-stone-900 mb-4">€17,50 <span className="text-xs font-bold text-stone-400">/ week</span></div>
              <ul className="space-y-2 text-xs font-medium text-stone-600 mb-6">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 5 soorten seizoensgroenten</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 1 kg biologische aardappelen</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Inclusief 2 weekrecepten</li>
              </ul>
            </div>
            <button className={`w-full py-2.5 rounded-xl text-xs font-bold ${selectedBox === 'basis' ? `${theme.primary} text-white` : 'bg-stone-100 text-stone-700'}`}>
              {selectedBox === 'basis' ? 'Geselecteerd' : 'Kies Basisbox'}
            </button>
          </div>

          {/* Familie (Highlight) */}
          <div 
            onClick={() => setSelectedBox('familie')}
            className={`p-6 rounded-3xl border-2 transition-all cursor-pointer bg-white flex flex-col justify-between relative ${
              selectedBox === 'familie' ? `${theme.borderLight} ring-2 ring-orange-500/30 shadow-lg scale-102` : 'border-stone-200'
            }`}
          >
            <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full ${theme.primary} text-white text-[10px] font-extrabold uppercase shadow-sm`}>
              Meest Gekozen
            </div>
            <div>
              <span className="text-xs font-extrabold text-stone-400 uppercase">3-5 Personen</span>
              <h3 className="text-lg font-black text-stone-900 mt-1 mb-2">Familie Boerenkist</h3>
              <div className="text-2xl font-black text-stone-900 mb-4">€26,50 <span className="text-xs font-bold text-stone-400">/ week</span></div>
              <ul className="space-y-2 text-xs font-medium text-stone-600 mb-6">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 8 soorten verse groenten</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 2 soorten streekfruit</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 6 verse vrije-uitloopeieren</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Gratis bezorging aan huis</li>
              </ul>
            </div>
            <button className={`w-full py-2.5 rounded-xl text-xs font-bold ${selectedBox === 'familie' ? `${theme.primary} text-white` : 'bg-stone-100 text-stone-700'}`}>
              {selectedBox === 'familie' ? 'Geselecteerd' : 'Kies Familiebox'}
            </button>
          </div>

          {/* Fruit */}
          <div 
            onClick={() => setSelectedBox('fruit')}
            className={`p-6 rounded-3xl border-2 transition-all cursor-pointer bg-white flex flex-col justify-between ${
              selectedBox === 'fruit' ? `${theme.borderLight} ring-2 ring-orange-500/30 shadow-md` : 'border-stone-200'
            }`}
          >
            <div>
              <span className="text-xs font-extrabold text-stone-400 uppercase">Gezond & Lekker</span>
              <h3 className="text-lg font-black text-stone-900 mt-1 mb-2">Hollandse Fruitmand</h3>
              <div className="text-2xl font-black text-stone-900 mb-4">€16,00 <span className="text-xs font-bold text-stone-400">/ week</span></div>
              <ul className="space-y-2 text-xs font-medium text-stone-600 mb-6">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Elstar & Jonagold appels</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Conference handperen</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Seizoensbessen & pruimen</li>
              </ul>
            </div>
            <button className={`w-full py-2.5 rounded-xl text-xs font-bold ${selectedBox === 'fruit' ? `${theme.primary} text-white` : 'bg-stone-100 text-stone-700'}`}>
              {selectedBox === 'fruit' ? 'Geselecteerd' : 'Kies Fruitmand'}
            </button>
          </div>
        </div>
      </section>

      {/* Postcode Delivery Checker */}
      <section id="bezorging" className="py-12 px-6 max-w-3xl mx-auto">
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
            <div className="p-3 bg-white rounded-xl border border-stone-200 text-xs font-bold text-stone-800 max-w-md mx-auto animate-in fade-in">
              {deliveryResult}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
