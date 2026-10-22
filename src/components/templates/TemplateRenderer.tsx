'use client';

import React from 'react';
import { ColorTheme } from '../../types/theme';
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
  onRequestQuote: () => void;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({
  templateId,
  theme,
  onRequestQuote,
}) => {
  switch (templateId) {
    case 'grachten-web-agency':
      return <GrachtenWebAgency theme={theme} onRequestQuote={onRequestQuote} />;
    case 'duurzaam-kleding-webshop':
      return <DuurzaamKledingShop theme={theme} onRequestQuote={onRequestQuote} />;
    case 'versvogel-boerenwinkel':
      return <VersVogelBoerderij theme={theme} onRequestQuote={onRequestQuote} />;
    case 'stroom-delen-saas':
      return <StroomDelenSaaS theme={theme} onRequestQuote={onRequestQuote} />;
    case 'fiets-craft-bv':
      return <FietsCraftConfigurator theme={theme} onRequestQuote={onRequestQuote} />;
    case 'ambacht-bakkerij':
      return <AmbachtBakkerijDemo theme={theme} onRequestQuote={onRequestQuote} />;
    case 'zonne-pionier-energy':
      return <ZonnePionierSolar theme={theme} onRequestQuote={onRequestQuote} />;
    case 'stadskliniek-fysio':
      return <StadskliniekFysio theme={theme} onRequestQuote={onRequestQuote} />;
    default:
      return <GrachtenWebAgency theme={theme} onRequestQuote={onRequestQuote} />;
  }
};
