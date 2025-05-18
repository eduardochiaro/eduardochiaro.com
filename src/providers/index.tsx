'use client';

import GAProvider from '@/providers/GAProvider';
import ThemeProvider from '@/providers/ThemeProvider';
import AuthProvider from '@/providers/AuthProvider';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import tailwindConfig from '../../tailwind.config';
import { Suspense } from 'react';

function Fallback() {
  return <></>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Suspense fallback={<Fallback />}>
        <ProgressBar height="5px" color={tailwindConfig.theme.colors.secondary[500]} options={{ showSpinner: false }} shallowRouting />
        <GAProvider />
      </Suspense>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
