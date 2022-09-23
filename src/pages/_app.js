import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes';
import NextProgress from 'next-progress';
import tailwindConfig from '../../tailwind.config';
import Head from 'next/head';
import '@/styles/globals.scss'

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <ThemeProvider enableSystem={true} attribute="class">
        <Head>
          <title>Eduardo Chiaro</title>
          <meta name="description" content="Eduardo Chiaro - Software Developer" />
        </Head>
        <NextProgress height="5px" color={tailwindConfig.theme.colors.primary[500]} options={{ showSpinner: false }} />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp