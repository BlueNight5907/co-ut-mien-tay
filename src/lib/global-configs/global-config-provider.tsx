'use client';

import { GlobalConfig } from '@/types/global/Global';
import React from 'react';
import { defaultConfig, GlobalContext } from './context';

type Props = {
  config: GlobalConfig | undefined;
  children: React.ReactNode;
};

export const GlobalConfigProvider = (props: Props) => {
  const { children, config = defaultConfig } = props;
  return <GlobalContext.Provider value={config}>{children}</GlobalContext.Provider>;
};
