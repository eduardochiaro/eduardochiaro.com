'use client';

import GAProvider from '@/providers/GAProvider';
import ThemeProvider from '@/providers/ThemeProvider';
import AuthProvider from '@/providers/AuthProvider';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import tailwindConfig from '../../tailwind.config';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GAProvider>
      <ThemeProvider>
        <ProgressBar height="5px" color={tailwindConfig.theme.colors.secondary[500]} options={{ showSpinner: false }} shallowRouting />
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </GAProvider>
  );
}
