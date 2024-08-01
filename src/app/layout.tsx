import Providers from '@/providers';
import { Titillium_Web, Roboto_Mono } from 'next/font/google';
import '../styles/globals.scss';
import type { Viewport } from 'next';

const header = Titillium_Web({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-header',
});

const mono = Roboto_Mono({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata = {
  title: 'Eduardo Chiaro',
  description: 'Eduardo Chiaro - Software Engineer',
};

export const revalidate = 60;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en" className={`${header.variable} ${mono.variable}`}>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="manifest" href="/site.webmanifest" />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#EEF3F6' },
    { media: '(prefers-color-scheme: dark)', color: '#111A22' },
  ],
};
