import { useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/router';
import { Titillium_Web, Roboto_Mono, Inter } from 'next/font/google';
import { pageview } from '@/utils/ga';
import NextProgress from 'next-progress';
import tailwindConfig from '../../tailwind.config';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '@/styles/globals.scss';

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


function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  return (
    <main className={`${header.variable} ${mono.variable}`}>
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <ThemeProvider enableSystem={true} attribute="class">
          <Head>
            <title>Eduardo Chiaro</title>
            <meta name="description" content="Eduardo Chiaro - Software Developer" />
          </Head>
          <NextProgress height="5px" options={{ showSpinner: false, default: tailwindConfig.theme.colors.secondary[500] }} />
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </main>
  );
}

export default MyApp;
