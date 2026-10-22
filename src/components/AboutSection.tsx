'use client';

import React from 'react';
import { Heart, Compass, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { Language } from '../types/company';

interface AboutSectionProps {
  lang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  return (
    <section id="about-section" className="bg-orange-50/70 dark:bg-slate-900/60 py-16 px-4 sm:px-6 lg:px-8 my-16 rounded-3xl max-w-7xl mx-auto border-2 border-orange-100 dark:border-slate-800 shadow-xl shadow-orange-500/5 dark:shadow-indigo-500/5 relative overflow-hidden scroll-mt-24 transition-colors">
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 font-extrabold text-xs mb-6 border border-orange-200 dark:border-orange-800/60">
          <Heart className="w-3.5 h-3.5 fill-orange-600 text-orange-600 dark:text-orange-400" />
          <span>{lang === 'nl' ? 'Over Samen Online' : 'About Samen Online'}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-stone-900 dark:text-white mb-6">
          {lang === 'nl'
            ? 'Eerlijk webdesign voor de Nederlandse ondernemer'
            : 'Honest web design for Dutch entrepreneurs'}
        </h2>

        <p className="text-stone-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
          {lang === 'nl'
            ? 'Samen Online bouwt moderne, razendsnelle websites en webshops voor zelfstandigen en mkb-bedrijven in heel Nederland. Zonder bureaucratie, zonder dure kantoorpanden, maar met direct en persoonlijk contact.'
            : 'Samen Online crafts modern, high-speed websites and webshops for Dutch SMBs and freelancers. Zero overhead, zero agency bureaucracy, just direct and personal collaboration.'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-orange-100 dark:border-slate-800 shadow-xs flex flex-col transition-colors">
            <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-slate-800 text-orange-700 dark:text-orange-400 flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base mb-1.5 text-stone-900 dark:text-white">
              {lang === 'nl' ? 'Utrecht & Landelijk' : 'Based in Utrecht'}
            </h3>
            <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed font-medium">
              {lang === 'nl'
                ? 'Gevestigd in Utrecht, maar 100% digitaal actief in heel Nederland. Persoonlijk contact via videocall, WhatsApp of op afspraak.'
                : 'Based in Utrecht, active nationwide across the Netherlands. Personal contact via video call, WhatsApp or in Utrecht.'}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-orange-100 dark:border-slate-800 shadow-xs flex flex-col transition-colors">
            <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-slate-800 text-orange-700 dark:text-orange-400 flex items-center justify-center mb-4">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base mb-1.5 text-stone-900 dark:text-white">
              {lang === 'nl' ? 'Nederlandse Focus' : 'Dutch Market Focus'}
            </h3>
            <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed font-medium">
              {lang === 'nl'
                ? 'Volledig afgestemd op de Nederlandse markt: iDEAL, PostNL koppelingen, AVG/GDPR privacy en lokale consumentenverwachtingen.'
                : 'Tailored for the Dutch market: iDEAL payments, PostNL integrations, AVG/GDPR compliance and local standards.'}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-orange-100 dark:border-slate-800 shadow-xs flex flex-col transition-colors">
            <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-slate-800 text-orange-700 dark:text-orange-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base mb-1.5 text-stone-900 dark:text-white">
              {lang === 'nl' ? 'Onafhankelijk & Eerlijk' : 'Transparent & Honest'}
            </h3>
            <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed font-medium">
              {lang === 'nl'
                ? 'Geen verborgen abonnementskosten of wurgcontracten. Transparante eenmalige prijzen en 100% eigenaarschap van je website.'
                : 'No hidden subscription fees or lock-ins. Transparent fixed prices and 100% website ownership transferred to you.'}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-orange-100 dark:border-slate-800 shadow-xs flex flex-col transition-colors">
            <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-slate-800 text-orange-700 dark:text-orange-400 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base mb-1.5 text-stone-900 dark:text-white">
              {lang === 'nl' ? 'Next.js Snelheid' : 'Next.js Performance'}
            </h3>
            <p className="text-xs text-stone-600 dark:text-slate-300 leading-relaxed font-medium">
              {lang === 'nl'
                ? 'Gebouwd met Next.js en React voor razendsnelle laadtijden (Google 95-100), sterke lokale SEO en hoge conversie.'
                : 'Built with Next.js and React for blazing fast loading (Google 95-100), superior SEO and higher conversion rates.'}
            </p>
          </div>
        </div>

      </div>

    </section>
  );
};
