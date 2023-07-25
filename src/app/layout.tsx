import ThemeProviders from './theme-provider';
import AuthProvider from './auth-provider';
import '../styles/globals.scss';
import { Titillium_Web, Roboto_Mono } from 'next/font/google';

const header = Titillium_Web({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-header',
});

const mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata = {
  title: 'Tickets',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en" className={`${header.variable} ${mono.variable}`}>
      <body>
        <ThemeProviders>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProviders>
      </body>
    </html>
  );
}
