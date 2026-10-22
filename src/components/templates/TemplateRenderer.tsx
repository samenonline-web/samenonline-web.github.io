'use client';

import React from 'react';
import { ColorTheme, FontStyle, TemplateProps } from '../../types/theme';
import { GrachtenWebAgency } from './GrachtenWebAgency';
import { DuurzaamKledingShop } from './DuurzaamKledingShop';
import { VersVogelBoerderij } from './VersVogelBoerderij';
import { StroomDelenSaaS } from './StroomDelenSaaS';
import { FietsCraftConfigurator } from './FietsCraftConfigurator';
import { AmbachtBakkerijDemo } from './AmbachtBakkerijDemo';
import { ZonnePionierSolar } from './ZonnePionierSolar';
import { StadskliniekFysio } from './StadskliniekFysio';

interface TemplateRendererProps {
  templateId: string;
  theme: ColorTheme;
  fontStyle?: FontStyle;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  onRequestQuote: () => void;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({
  templateId,
  theme,
  fontStyle,
  isDarkMode = false,
  onToggleDarkMode,
  onRequestQuote,
}) => {
  const effectiveTheme: ColorTheme = isDarkMode
    ? {
        ...theme,
        bgLight: 'bg-stone-900/90 border border-stone-800 text-stone-100',
        borderLight: 'border-stone-800',
        badgeBg: 'bg-stone-800/80 border border-stone-700',
        badgeText: 'text-stone-200',
      }
    : theme;

  const templateProps: TemplateProps = {
    theme: effectiveTheme,
    isDarkMode,
    onToggleDarkMode,
    onRequestQuote,
  };

  const renderContent = () => {
    switch (templateId) {
      case 'grachten-web-agency':
        return <GrachtenWebAgency {...templateProps} />;
      case 'duurzaam-kleding-webshop':
        return <DuurzaamKledingShop {...templateProps} />;
      case 'versvogel-boerenwinkel':
        return <VersVogelBoerderij {...templateProps} />;
      case 'stroom-delen-saas':
        return <StroomDelenSaaS {...templateProps} />;
      case 'fiets-craft-bv':
        return <FietsCraftConfigurator {...templateProps} />;
      case 'ambacht-bakkerij':
        return <AmbachtBakkerijDemo {...templateProps} />;
      case 'zonne-pionier-energy':
        return <ZonnePionierSolar {...templateProps} />;
      case 'stadskliniek-fysio':
        return <StadskliniekFysio {...templateProps} />;
      default:
        return <GrachtenWebAgency {...templateProps} />;
    }
  };

  return (
    <div
      style={{ fontFamily: fontStyle?.fontFamily || 'inherit' }}
      className={`template-font-scope min-h-full transition-colors duration-200 ${
        isDarkMode ? 'template-dark-mode' : ''
      }`}
    >
      {renderContent()}
    </div>
  );
};


