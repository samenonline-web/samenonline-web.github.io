'use client';

import React, { useEffect } from 'react';
import { X, ShieldCheck, Heart } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  title: string;
  content: string;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  isOpen,
  title,
  content,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200 cursor-pointer"
    >
      <div 
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border-2 border-orange-100 flex flex-col cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-orange-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <Heart className="w-5 h-5 fill-white text-white" />
            <span className="text-xs font-bold uppercase tracking-wider text-orange-100">
              Samen Online
            </span>
          </div>

          <h2 className="text-2xl font-extrabold">{title}</h2>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4 text-stone-700 text-sm leading-relaxed whitespace-pre-line font-medium">
          {content}
        </div>

        {/* Footer */}
        <div className="p-4 bg-orange-50/40 border-t border-orange-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Sluiten
          </button>
        </div>
      </div>
    </div>
  );
};
