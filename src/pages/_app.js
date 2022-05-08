import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes";
import NextProgress from "next-progress";
import '../styles/globals.scss'
import Head from "next/head";
import tailwind from '../../tailwind.config';

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <NextProgress delay={300} options={{ showSpinner: false }} />
      <ThemeProvider enableSystem={true} attribute="class">
        <Head>
          <title>Eduardo Chiaro</title>
          <meta name="description" content="Eduardo Chiaro - Software Developer" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color={tailwind.theme.colors.primary[800]} />
          <meta name="msapplication-TileColor" content={tailwind.theme.colors.primary[200]} />
          <meta name="theme-color" content={tailwind.theme.colors.zinc[100]} media="(prefers-color-scheme: light)" key="dark-system" />
          <meta name="theme-color" content={tailwind.theme.colors.zinc[700]} media="(prefers-color-scheme: dark)" key="light-system"  />
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp