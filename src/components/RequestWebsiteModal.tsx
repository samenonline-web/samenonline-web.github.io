'use client';

import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Heart, AlertCircle, Loader2, MessageCircle, ArrowRight } from 'lucide-react';
import { WebTemplate, Language } from '../types/company';

interface RequestWebsiteModalProps {
  isOpen: boolean;
  selectedTemplate: WebTemplate | null;
  lang: Language;
  onClose: () => void;
  preferredTheme?: string;
  preferredFont?: string;
  initialCustomData?: {
    templateName: string;
    budget: string;
    notes: string;
  } | null;
}

export const RequestWebsiteModal: React.FC<RequestWebsiteModalProps> = ({
  isOpen,
  selectedTemplate,
  lang,
  onClose,
  preferredTheme,
  preferredFont,
  initialCustomData,
}) => {
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    companyName: '',
    phone: '',
    templateName: '',
    budget: 'Vanaf €50 (Starter / Snelle Setup)',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (initialCustomData) {
      setFormData((prev) => ({
        ...prev,
        templateName: initialCustomData.templateName || prev.templateName,
        budget: initialCustomData.budget || prev.budget,
        notes: initialCustomData.notes || prev.notes,
      }));
    } else if (selectedTemplate) {
      setFormData((prev) => ({
        ...prev,
        templateName: selectedTemplate.name,
      }));
    } else {
      setFormData((prev) => ({ ...prev, templateName: 'Maatwerk Website Concept' }));
    }
  }, [selectedTemplate, initialCustomData]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.email) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const payload = new FormData();
      payload.append('access_key', '160db110-507f-40b0-910c-97b0a6bc2f9d');
      payload.append('name', formData.clientName);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone || 'Niet opgegeven');
      payload.append('company', formData.companyName || 'Particulier / Nieuw project');
      payload.append('template', formData.templateName);
      payload.append('theme_configuration', `Thema: ${preferredTheme || 'Standaard'}, Font: ${preferredFont || 'Standaard'}`);
      payload.append('budget', formData.budget);
      payload.append(
        'message',
        `${formData.notes || 'Geen extra toelichting'}\n\n[Gekozen Huisstijl: ${preferredTheme || 'Standaard'}, Font: ${preferredFont || 'Standaard'}]`
      );
      payload.append('from_name', 'Samen Online');
      payload.append(
        'subject',
        `Nieuwe Website Aanvraag: ${formData.clientName} (${formData.templateName})`
      );

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: payload,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(
          data.message ||
            (lang === 'nl'
              ? 'Er is iets misgegaan bij het versturen. Probeer het opnieuw.'
              : 'Something went wrong. Please try again.')
        );
      }
    } catch (err) {
      setErrorMessage(
        lang === 'nl'
          ? 'Verbindingsfout. Controleer je internetverbinding en probeer het opnieuw.'
          : 'Network error. Please check your connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer"
    >
      <div
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border-2 border-orange-100 flex flex-col cursor-default max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-6 text-white relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <Heart className="w-5 h-5 fill-white text-white" />
            <span className="text-xs font-bold uppercase tracking-wider text-orange-100">
              Samen Online Webdesign
            </span>
          </div>

          <h2 className="text-2xl font-black">
            {lang === 'nl' ? 'Vraag een Website Aan' : 'Request a Custom Website'}
          </h2>
          <p className="text-xs text-orange-100 mt-1 font-medium">
            {lang === 'nl'
              ? 'Vrijblijvend advies & offerte voor jouw onderneming of project.'
              : 'Free quote & consultation for your web project.'}
          </p>
        </div>

        {/* Content */}
        {submitted ? (
          <div className="p-8 text-center space-y-4 overflow-y-auto">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-stone-900">
              {lang === 'nl' ? 'Aanvraag Succesvol Ontvangen!' : 'Request Sent Successfully!'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed max-w-sm mx-auto">
              {lang === 'nl'
                ? `Bedankt ${formData.clientName}! We hebben je gegevens ontvangen voor "${formData.templateName}". We nemen zo snel mogelijk (meestal binnen enkele uren) contact met je op.`
                : `Thank you ${formData.clientName}! We have received your inquiry for "${formData.templateName}". We will contact you as soon as possible.`}
            </p>

            {/* Reassurance Callout */}
            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-200 text-left space-y-2 mt-4">
              <div className="flex items-center gap-2 text-orange-950 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-orange-600" />
                <span>Wat gebeurt er nu?</span>
              </div>
              <ul className="text-[11px] text-stone-700 font-medium space-y-1 list-disc list-inside">
                <li>We bekijken jouw gekozen concept en wensen aandachtig.</li>
                <li>Je ontvangt binnen 24 uur een heldere reactie & vrijblijvende prijsindicatie per e-mail.</li>
                <li>Geen spam, geen ongewenste telefoontjes — jij behoudt de controle.</li>
              </ul>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors cursor-pointer mt-2"
            >
              Sluiten
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto text-stone-900">
            {/* Error Message if any */}
            {errorMessage && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Selected Template & Theme Config Badges */}
            <div className="p-3 bg-orange-50/80 rounded-2xl border border-orange-200 text-xs space-y-1">
              <div className="flex items-center justify-between font-bold">
                <span className="text-stone-600">{lang === 'nl' ? 'Gekozen Concept:' : 'Selected Concept:'}</span>
                <span className="text-orange-700 font-black">{formData.templateName}</span>
              </div>
              {(preferredTheme || preferredFont) && (
                <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium pt-1 border-t border-orange-200/60">
                  <span>Huisstijl configuratie:</span>
                  <span className="font-bold text-stone-800">
                    {preferredTheme ? `Kleur: ${preferredTheme}` : ''} {preferredFont ? `• Font: ${preferredFont}` : ''}
                  </span>
                </div>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                {lang === 'nl' ? 'Jouw Naam *' : 'Your Name *'}
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                placeholder="Bijv. Jan de Vries"
                className="w-full px-3.5 py-2.5 bg-orange-50/40 border border-orange-200/80 rounded-xl text-sm font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                  {lang === 'nl' ? 'E-mailadres *' : 'Email Address *'}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jan@onderneming.nl"
                  className="w-full px-3.5 py-2.5 bg-orange-50/40 border border-orange-200/80 rounded-xl text-sm font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                  {lang === 'nl' ? 'Telefoonnummer' : 'Phone Number'}
                </label>
                <input
                  type="tel"
                  name="phone"
                  inputMode="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Bijv. 06 12345678"
                  className="w-full px-3.5 py-2.5 bg-orange-50/40 border border-orange-200/80 rounded-xl text-sm font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                {lang === 'nl' ? 'Bedrijfsnaam / Projectnaam' : 'Company / Project Name'}
              </label>
              <input
                type="text"
                name="company"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="Bijv. Bouwbedrijf De Vries of Nieuw Project"
                className="w-full px-3.5 py-2.5 bg-orange-50/40 border border-orange-200/80 rounded-xl text-sm font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Budget Range */}
            <div>
              <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                {lang === 'nl' ? 'Geschat Budget' : 'Estimated Budget'}
              </label>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-orange-50/40 border border-orange-200/80 rounded-xl text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Message / Notes */}
            <div>
              <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                {lang === 'nl' ? 'Specifieke Wensen / Toelichting' : 'Notes / Project details'}
              </label>
              <textarea
                rows={3}
                name="message"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder={
                  lang === 'nl'
                    ? 'Vertel kort wat je wilt bereiken met jouw nieuwe website...'
                    : 'Briefly describe what features you need...'
                }
                className="w-full px-3.5 py-2.5 bg-orange-50/40 border border-orange-200/80 rounded-xl text-sm font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20 transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{lang === 'nl' ? 'Bezig met verzenden...' : 'Sending...'}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>
                      {lang === 'nl' ? 'Verstuur Vrijblijvende Aanvraag' : 'Send Free Consultation Request'}
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
