'use client';

import React from 'react';
import { Heart, Compass, ShieldCheck, Sparkles } from 'lucide-react';
import { Language } from '../types/company';

interface AboutSectionProps {
  lang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  return (
    <section id="about-section" className="bg-orange-50/70 py-16 px-4 sm:px-6 lg:px-8 my-16 rounded-3xl max-w-7xl mx-auto border-2 border-orange-100 shadow-xl shadow-orange-500/5 relative overflow-hidden scroll-mt-24">
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-800 font-extrabold text-xs mb-6 border border-orange-200">
          <Heart className="w-3.5 h-3.5 fill-orange-600 text-orange-600" />
          <span>{lang === 'nl' ? 'Waarom Samen Online?' : 'Why Samen Online?'}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-stone-900 mb-6">
          {lang === 'nl'
            ? 'Het vriendelijke platform voor de Nederlandse online community'
            : 'The friendly platform for the Dutch online community'}
        </h2>

        <p className="text-stone-600 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
          {lang === 'nl'
            ? 'Samen Online toont moderne, betrouwbare website concepten en digitale oplossingen voor Nederlandse ondernemers. Wij geloven in eerlijke zichtbaarheid voor lokale makers, innovatieve startups en duurzame pioniers.'
            : 'Samen Online presents modern, reliable website concepts and digital solutions for Dutch entrepreneurs. We believe in friendly visibility for local makers and innovative startups.'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base mb-1.5 text-stone-900">
              {lang === 'nl' ? 'Nederlandse Focus' : 'Dutch Focus'}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-medium">
              {lang === 'nl'
                ? 'Geoptimaliseerd voor iDEAL, PostNL en Nederlandse consumentenverwachtingen.'
                : 'Optimized for iDEAL, PostNL and Dutch consumer expectations.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base mb-1.5 text-stone-900">
              {lang === 'nl' ? 'Onafhankelijk & Eerlijk' : 'Independent & Honest'}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-medium">
              {lang === 'nl'
                ? 'Geen verborgen kosten. Transparante prijzen en duidelijke oplevertijden.'
                : 'No hidden fees. Transparent pricing and clear build timelines.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base mb-1.5 text-stone-900">
              {lang === 'nl' ? 'Maatwerk & Snelheid' : 'Custom & Fast'}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-medium">
              {lang === 'nl'
                ? 'Gebouwd met moderne Next.js technologie voor razendsnelle laadtijden.'
                : 'Built with modern Next.js technology for lightning fast load speeds.'}
            </p>
          </div>
        </div>

      </div>

    </section>
  );
};
