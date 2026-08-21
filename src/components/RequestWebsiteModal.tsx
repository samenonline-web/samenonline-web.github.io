'use client';

import React, { useState, useEffect } from 'react';
import { X, Send, Sparkles, CheckCircle2, Heart, ShieldCheck } from 'lucide-react';
import { WebTemplate, Language } from '../types/company';

interface RequestWebsiteModalProps {
  isOpen: boolean;
  selectedTemplate: WebTemplate | null;
  lang: Language;
  onClose: () => void;
}

export const RequestWebsiteModal: React.FC<RequestWebsiteModalProps> = ({
  isOpen,
  selectedTemplate,
  lang,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    companyName: '',
    phone: '',
    templateName: '',
    budget: '€1.000 - €2.500',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (selectedTemplate) {
      setFormData((prev) => ({ ...prev, templateName: selectedTemplate.name }));
    } else {
      setFormData((prev) => ({ ...prev, templateName: 'Maatwerk Website Concept' }));
    }
  }, [selectedTemplate]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.email) return;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      <div 
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-amber-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <Heart className="w-5 h-5 fill-white text-white" />
            <span className="text-xs font-bold uppercase tracking-wider text-orange-100">
              Samen Online Webdesign
            </span>
          </div>

          <h2 className="text-2xl font-extrabold">
            {lang === 'nl' ? 'Vraag een Website Aan' : 'Request a Custom Website'}
          </h2>
          <p className="text-xs text-orange-100 mt-1">
            {lang === 'nl'
              ? 'Vrijblijvend advies & offerte voor jouw Nederlandse onderneming.'
              : 'Free quote & consultation for your Dutch web project.'}
          </p>
        </div>

        {/* Content */}
        {submitted ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              {lang === 'nl' ? 'Aanvraag Ontvangen!' : 'Request Received!'}
            </h3>
            <p className="text-sm text-slate-500">
              {lang === 'nl'
                ? 'Bedankt! Wij nemen binnen 24 uur contact met je op voor een vrijblijvend gesprek.'
                : 'Thank you! We will get in touch within 24 hours to discuss your website.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            
            {/* Selected Template Badge */}
            {formData.templateName && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs font-bold text-amber-900 flex items-center justify-between">
                <span>{lang === 'nl' ? 'Geselecteerd Concept:' : 'Selected Template:'}</span>
                <span className="text-orange-600">{formData.templateName}</span>
              </div>
            )}

            {/* Name */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                {lang === 'nl' ? 'Jouw Naam *' : 'Your Name *'}
              </label>
              <input
                type="text"
                required
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                placeholder="Bijv. Jan de Vries"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  {lang === 'nl' ? 'E-mailadres *' : 'Email Address *'}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jan@onderneming.nl"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  {lang === 'nl' ? 'Telefoonnummer' : 'Phone Number'}
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="06 12345678"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                {lang === 'nl' ? 'Bedrijfsnaam / Projectnaam' : 'Company / Project Name'}
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="Bijv. Bakkerij De Oranje Boer"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Budget Range */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                {lang === 'nl' ? 'Geschat Budget' : 'Estimated Budget'}
              </label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="€750 - €1.500">€750 - €1.500 (Starter Website)</option>
                <option value="€1.500 - €3.500">€1.500 - €3.500 (E-Commerce / Pro)</option>
                <option value="€3.500+">€3.500+ (Maatwerk SaaS / Platform)</option>
              </select>
            </div>

            {/* Message / Notes */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                {lang === 'nl' ? 'Specifieke Wensen / Toelichting' : 'Notes / Project details'}
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder={lang === 'nl' ? 'Vertel kort wat je wilt bereiken met jouw nieuwe website...' : 'Briefly describe what features you need...'}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>{lang === 'nl' ? 'Verstuur Vrijblijvende Aanvraag' : 'Send Free Consultation Request'}</span>
              </button>
            </div>

          </form>
        )}

      </div>

    </div>
  );
};
