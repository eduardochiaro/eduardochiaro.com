'use client';

import CacheProvider from 'react-inlinesvg/provider';

export interface AuthContextProps {
  children: React.ReactNode;
}

export default function Provider({ children }: AuthContextProps) {
  return (
    <CacheProvider>
      {children}
    </CacheProvider>
  );
}
