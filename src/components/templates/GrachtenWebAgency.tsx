'use client';

import React, { useState } from 'react';
import { TemplateProps } from '../../types/theme';
import { ArrowRight, CheckCircle2, Star, Sparkles, Send, Globe, Layers, Award, Users, Sun, Moon } from 'lucide-react';

export const GrachtenWebAgency: React.FC<TemplateProps> = ({ theme, isDarkMode, onToggleDarkMode, onRequestQuote }) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Branding' | 'Web' | 'E-commerce'>('All');
  const [formSent, setFormSent] = useState(false);

  const projects = [
    { title: 'Van Dijk Architekten', cat: 'Web', tag: 'Next.js & 3D Tour', metric: '+140% Aanvragen' },
    { title: 'Nordic Clean Coffee', cat: 'E-commerce', tag: 'Shopify & iDEAL', metric: '€85k/mnd omzet' },
    { title: 'Vondelpark Yoga Loft', cat: 'Branding', tag: 'Brand Identity', metric: 'Bekroond Design' },
    { title: 'FinFlow B.V. Fintech', cat: 'Web', tag: 'SaaS Platform', metric: 'Series A gefinancierd' },
  ];

  const filteredProjects = activeTab === 'All' ? projects : projects.filter(p => p.cat === activeTab);

  return (
    <div className="min-h-full bg-white text-stone-900 font-sans">
      {/* Mini Brand Header */}
      <header className="border-b border-stone-200 px-6 py-4 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl ${theme.primary} text-white font-black flex items-center justify-center text-sm shadow-sm`}>
            GW
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight">GrachtenWeb Studio</span>
            <span className="block text-[10px] text-stone-500 font-medium">Amsterdam • Digitaal Bureau</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs font-bold">
          <nav className="hidden sm:flex items-center gap-5 text-stone-600">
            <a href="#werk" className="hover:text-stone-900 transition-colors">Ons Werk</a>
            <a href="#diensten" className="hover:text-stone-900 transition-colors">Diensten</a>
            <a href="#reviews" className="hover:text-stone-900 transition-colors">Beoordelingen</a>
          </nav>
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 text-stone-700 transition-colors cursor-pointer border border-stone-200"
              title={isDarkMode ? 'Lichte Modus' : 'Donkere Modus'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
            </button>
          )}
          <button
            onClick={onRequestQuote}
            className={`px-4 py-2 rounded-xl ${theme.primary} ${theme.primaryHover} text-white text-xs font-bold transition-all shadow-sm cursor-pointer`}
          >
            Start Project
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`py-14 sm:py-20 px-6 ${theme.bgLight} border-b ${theme.borderLight} text-center`}>
        <div className="max-w-3xl mx-auto">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText} text-xs font-extrabold mb-4 border ${theme.borderLight}`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bekroond Digitaal Ontwerpbureau in Amsterdam</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight mb-4">
            Wij bouwen websites die <span className={theme.textPrimary}>merken laten groeien</span>
          </h1>
          <p className="text-stone-600 text-sm sm:text-base mb-8 max-w-xl mx-auto">
            Van high-end merkidentiteit tot razendsnelle webshops met native iDEAL-integratie. Jouw digitale succes begint hier.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onRequestQuote}
              className={`px-6 py-3 rounded-xl ${theme.primary} ${theme.primaryHover} text-white text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer`}
            >
              <span>Vraag Vrijblijvende Offerte Aan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#werk"
              className="px-6 py-3 rounded-xl bg-white text-stone-800 border border-stone-300 text-xs font-bold hover:bg-stone-50 cursor-pointer"
            >
              Bekijk Portfolio
            </a>
          </div>
        </div>
      </section>

      {/* Portfolio Grid with Interactive Tabs */}
      <section id="werk" className="py-12 px-6 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-black text-stone-900">Recent Opgeleverd Werk</h2>
            <p className="text-xs text-stone-500 font-medium">Selecteer een categorie om casestudies te filteren</p>
          </div>
          <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl text-xs font-bold">
            {(['All', 'Web', 'E-commerce', 'Branding'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === tab ? `${theme.primary} text-white shadow-xs` : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {tab === 'All' ? 'Alles' : tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredProjects.map((proj, idx) => (
            <div key={idx} className="group border border-stone-200 rounded-2xl p-5 hover:border-stone-400 transition-all bg-white shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${theme.badgeBg} ${theme.badgeText}`}>
                    {proj.cat}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {proj.metric}
                  </span>
                </div>
                <h3 className="font-extrabold text-base text-stone-900 mb-1 group-hover:text-stone-700">
                  {proj.title}
                </h3>
                <p className="text-xs text-stone-500 font-medium">{proj.tag}</p>
              </div>
              <div className="mt-6 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-stone-700">
                <span>Casestudy bekijken</span>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="diensten" className={`py-12 px-6 ${theme.bgLight} border-t ${theme.borderLight}`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl font-black text-stone-900">Alles-in-één Digitaal Pakket</h2>
            <p className="text-xs text-stone-600 font-medium">Van idee tot livegang binnen 2 weken</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <Layers className={`w-6 h-6 ${theme.textPrimary} mb-2`} />
              <h3 className="font-extrabold text-sm text-stone-900 mb-1">Maatwerk Webdesign</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">Uniek ontwerp afgestemd op jouw huisstijl, doelgroep en conversiedoelen.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <Award className={`w-6 h-6 ${theme.textPrimary} mb-2`} />
              <h3 className="font-extrabold text-sm text-stone-900 mb-1">iDEAL & E-Commerce</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">Directe koppeling met Mollie, Stripe, PostNL en voorraadbeheer.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <Globe className={`w-6 h-6 ${theme.textPrimary} mb-2`} />
              <h3 className="font-extrabold text-sm text-stone-900 mb-1">SEO & Google Vindbaarheid</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">Topscores in Google PageSpeed (95+) en lokale Nederlandse vindbaarheid.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Contact Box */}
      <section className="py-12 px-6 max-w-3xl mx-auto text-center">
        <div className={`p-8 rounded-3xl ${theme.bgLight} border-2 ${theme.borderLight}`}>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 mb-2">Klaar om jouw merk online te zetten?</h2>
          <p className="text-xs text-stone-600 mb-6 font-medium">Vraag een vrijblijvend intakegesprek of offerte aan. Binnen 24 uur antwoord.</p>
          
          {formSent ? (
            <div className="p-4 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Bedankt! We nemen vandaag nog contact met je op.</span>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="jouw@bedrijfsmail.nl"
                className="flex-1 px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-medium focus:outline-none bg-white"
              />
              <button
                onClick={() => setFormSent(true)}
                className={`px-5 py-2.5 rounded-xl ${theme.primary} ${theme.primaryHover} text-white text-xs font-bold transition-all shadow-sm cursor-pointer whitespace-nowrap`}
              >
                Verstuur
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
