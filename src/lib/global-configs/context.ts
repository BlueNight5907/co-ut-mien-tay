import { GlobalConfig } from '@/types/global/Global';
import { createContext, useContext } from 'react';

export const defaultConfig = {
  siteName: '',
  siteUrl: '',
  logo: undefined,
  favicon: undefined,
  mainColor: undefined,
  siteTitle: undefined,
  siteDescription: undefined,
  buyProductRedirectUrl: '',
  socialLinks: [],
  footerSections: [],
};

export const GlobalContext = createContext<GlobalConfig>(defaultConfig);

export const useGlobalConfig = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error('useGlobalConfig should be place inside GlobalContext');
  }

  return context;
};
