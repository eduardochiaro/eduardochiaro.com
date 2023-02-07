import { useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/router';
import { pageview } from '@/utils/ga';
import NextProgress from 'next-progress';
import tailwindConfig from '../../tailwind.config';
import Head from 'next/head';
import '@/styles/globals.scss';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
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
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <ThemeProvider enableSystem={true} attribute="class">
        <Head>
          <title>Eduardo Chiaro</title>
          <meta name="description" content="Eduardo Chiaro - Software Developer" />
        </Head>
        <NextProgress height="5px" default={tailwindConfig.theme.colors.secondary[500]} options={{ showSpinner: false }} />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
