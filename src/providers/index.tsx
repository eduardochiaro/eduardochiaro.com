'use client';

import GAProvider from '@/providers/GAProvider';
import ThemeProvider from '@/providers/ThemeProvider';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { Suspense } from 'react';

function Fallback() {
  return <></>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Suspense fallback={<Fallback />}>
        <ProgressBar height="5px" color="#5C89AD" options={{ showSpinner: false }} shallowRouting />
        <GAProvider />
      </Suspense>
      {children}
    </ThemeProvider>
  );
}
