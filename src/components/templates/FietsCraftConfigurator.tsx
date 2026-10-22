'use client';

import React, { useState } from 'react';
import { TemplateProps } from '../../types/theme';
import { Check, ArrowRight, ShieldCheck, Wrench, MapPin, Sun, Moon } from 'lucide-react';

export const FietsCraftConfigurator: React.FC<TemplateProps> = ({ theme, isDarkMode, onToggleDarkMode, onRequestQuote }) => {
  const [frameColor, setFrameColor] = useState<'matzwart' | 'koningsblauw' | 'bosgroen' | 'oranje'>('matzwart');
  const [motorType, setMotorType] = useState<'city' | 'sport' | 'cargo'>('city');
  const [batterySize, setBatterySize] = useState<'standard' | 'extra'>('standard');
  const [isTestRideBooked, setIsTestRideBooked] = useState(false);

  // Price Calculation
  const basePrice = 1899;
  const motorPrice = motorType === 'sport' ? 350 : motorType === 'cargo' ? 550 : 0;
  const batteryPrice = batterySize === 'extra' ? 249 : 0;
  const totalPrice = basePrice + motorPrice + batteryPrice;

  return (
    <div className="min-h-full bg-stone-50 text-stone-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl ${theme.primary} text-white font-black flex items-center justify-center text-sm shadow-sm`}>
            FC
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight">FietsCraft B.V.</span>
            <span className="block text-[10px] text-stone-500 font-medium">Rotterdam • Handgemaakte E-Bikes</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs font-bold">
          <nav className="hidden sm:flex items-center gap-5 text-stone-600">
            <a href="#configurator" className="hover:text-stone-900">Stel Jouw Fiets Samen</a>
            <a href="#proefrit" className="hover:text-stone-900">Boek Proefrit</a>
            <a href="#garantie" className="hover:text-stone-900">5 Jaar Garantie</a>
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
            Bestel Offerte
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white py-12 px-6 border-b border-stone-200 text-center">
        <div className="max-w-3xl mx-auto">
          <span className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md ${theme.badgeBg} ${theme.badgeText} inline-block mb-3`}>
            Rotterdams Vakmanschap • 100% Nederlands Frame
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-snug mb-3">
            Jouw ideale fiets, <span className={theme.textPrimary}>volledig naar eigen wens</span> gebouwd.
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mb-6 max-w-xl mx-auto">
            Kies framekleur, motorvermogen en actieradius. Live geprijsd en gratis proefrit aan huis mogelijk.
          </p>
        </div>
      </section>

      {/* Interactive Configurator Section */}
      <section id="configurator" className="py-12 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Visual Preview Card */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border-2 border-stone-200 shadow-sm flex flex-col items-center justify-center text-center sticky top-24">
            <div className="w-full h-64 bg-stone-100 rounded-2xl flex items-center justify-center relative overflow-hidden mb-6">
              <span className="text-8xl select-none">🚲</span>
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-lg border border-stone-200 text-[11px] font-bold">
                <span className="w-2.5 h-2.5 rounded-full" style={{
                  backgroundColor: frameColor === 'matzwart' ? '#1c1917' : frameColor === 'koningsblauw' ? '#0284c7' : frameColor === 'bosgroen' ? '#059669' : '#ea580c'
                }}></span>
                <span className="capitalize">{frameColor}</span>
              </div>
            </div>

            <div className="w-full grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                <span className="text-stone-400 block text-[10px]">Actieradius</span>
                <span className="font-extrabold text-stone-900">{batterySize === 'extra' ? 'Tot 130 km' : 'Tot 85 km'}</span>
              </div>
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                <span className="text-stone-400 block text-[10px]">Middenmotor</span>
                <span className="font-extrabold text-stone-900">{motorType === 'cargo' ? '85 Nm Bafang' : motorType === 'sport' ? '65 Nm Bosch' : '45 Nm Bafang'}</span>
              </div>
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                <span className="text-stone-400 block text-[10px]">Gewicht</span>
                <span className="font-extrabold text-stone-900">19,4 kg</span>
              </div>
            </div>
          </div>

          {/* Options Panel */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 1. Frame Color */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <h3 className="font-extrabold text-sm text-stone-900 mb-3">1. Kies Framekleur</h3>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                {[
                  { id: 'matzwart', label: 'Mat Zwart', color: '#1c1917' },
                  { id: 'koningsblauw', label: 'Koningsblauw', color: '#0284c7' },
                  { id: 'bosgroen', label: 'Bosgroen', color: '#059669' },
                  { id: 'oranje', label: 'Dutch Oranje', color: '#ea580c' },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setFrameColor(item.id as any)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all cursor-pointer ${
                      frameColor === item.id ? `${theme.borderLight} bg-stone-50 ring-2 ring-orange-500/30` : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full border border-stone-300" style={{ backgroundColor: item.color }}></span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Motor & Model */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <h3 className="font-extrabold text-sm text-stone-900 mb-3">2. Motor & Gebruik</h3>
              <div className="space-y-2 text-xs font-bold">
                {[
                  { id: 'city', title: 'City Comfort (45 Nm)', price: 'Standaard inbegrepen' },
                  { id: 'sport', title: 'Sport Plus (65 Nm Bosch)', price: '+ €350' },
                  { id: 'cargo', title: 'Heavy Duty / Cargo (85 Nm)', price: '+ €550' },
                ].map(item => (
                  <div
                    key={item.id}
                    onClick={() => setMotorType(item.id as any)}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      motorType === item.id ? `${theme.borderLight} bg-stone-50 ring-2 ring-orange-500/30` : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <span className="text-stone-900">{item.title}</span>
                    <span className="text-stone-500 font-medium">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Battery Capacity */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <h3 className="font-extrabold text-sm text-stone-900 mb-3">3. Accucapaciteit</h3>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <div
                  onClick={() => setBatterySize('standard')}
                  className={`p-3 rounded-xl border cursor-pointer text-center ${
                    batterySize === 'standard' ? `${theme.borderLight} bg-stone-50 ring-2 ring-orange-500/30` : 'border-stone-200'
                  }`}
                >
                  <span className="block text-stone-900">400 Wh Accu</span>
                  <span className="text-[10px] text-stone-500">Inbegrepen (85 km)</span>
                </div>
                <div
                  onClick={() => setBatterySize('extra')}
                  className={`p-3 rounded-xl border cursor-pointer text-center ${
                    batterySize === 'extra' ? `${theme.borderLight} bg-stone-50 ring-2 ring-orange-500/30` : 'border-stone-200'
                  }`}
                >
                  <span className="block text-stone-900">630 Wh Long-Range</span>
                  <span className="text-[10px] text-emerald-700">+ €249 (130 km)</span>
                </div>
              </div>
            </div>

            {/* Total Summary Box */}
            <div className={`p-6 rounded-2xl ${theme.bgLight} border-2 ${theme.borderLight}`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-stone-600">Rijklaar Totaal:</span>
                <span className="text-2xl font-black text-stone-900">€{totalPrice.toLocaleString('nl-NL')}</span>
              </div>
              <button
                onClick={onRequestQuote}
                className={`w-full py-3 rounded-xl ${theme.primary} ${theme.primaryHover} text-white font-extrabold text-xs shadow-md transition-all cursor-pointer`}
              >
                Vraag Vrijblijvende Offerte Aan
              </button>
              <div className="flex items-center justify-center gap-3 text-[10px] font-bold text-stone-500 mt-3">
                <span>🛡️ 5 Jaar Framegarantie</span>
                <span>•</span>
                <span>🚚 Gratis Thuisbezorging</span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
