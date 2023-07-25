'use client';

import { ThemeProvider } from 'next-themes';

export interface AuthContextProps {
  children: React.ReactNode;
}

export default function ThemeProviders({ children }: AuthContextProps) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      {children}
    </ThemeProvider>
  );
}
