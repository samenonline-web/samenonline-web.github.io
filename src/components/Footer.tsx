'use client';

import React from 'react';
import { Heart, MapPin } from 'lucide-react';
import { Language } from '../types/company';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  return (
    <footer className="bg-white text-slate-600 py-12 border-t border-slate-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white font-bold">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <span className="font-extrabold text-xl text-slate-900">
                Samen<span className="text-orange-600">Online</span> 🇳🇱
              </span>
            </div>

            <p className="text-xs text-slate-500 max-w-md leading-relaxed font-medium">
              {lang === 'nl'
                ? 'Samen Online is dé vriendelijke gids voor Nederlandse bedrijven, webwinkels en digitale initiatieven. Ontworpen met oog voor gemeenschap, toegankelijkheid en vakmanschap.'
                : 'Samen Online is the friendly directory for companies, webshops, and digital initiatives based in & for the Netherlands.'}
            </p>

            <div className="flex items-center gap-2 text-xs font-bold text-orange-600">
              <MapPin className="w-3.5 h-3.5" />
              <span>Gemaakt met ❤️ in Nederland</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-4">
              {lang === 'nl' ? 'Categorieën' : 'Categories'}
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#" className="hover:text-orange-600 transition-colors">Tech & Software</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Webshops & E-commerce</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Duurzaam & Groen</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Creatief & Digitaal</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Voeding & Horeca</a></li>
            </ul>
          </div>

          {/* Col 3: Community & Support */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-4">
              {lang === 'nl' ? 'Platform' : 'Platform'}
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#" className="hover:text-orange-600 transition-colors">{lang === 'nl' ? 'Over Samen Online' : 'About Samen Online'}</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">{lang === 'nl' ? 'Website Aanvragen' : 'Request Website'}</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">{lang === 'nl' ? 'Richtlijnen & Transparantie' : 'Guidelines & Transparency'}</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">{lang === 'nl' ? 'Contact & Vragen' : 'Contact & Questions'}</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-400">
          <p>© {new Date().getFullYear()} Samen Online. {lang === 'nl' ? 'Alle rechten voorbehouden.' : 'All rights reserved.'}</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-600">{lang === 'nl' ? 'Privacybeleid' : 'Privacy Policy'}</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-600">{lang === 'nl' ? 'Voorwaarden' : 'Terms'}</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-600">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
