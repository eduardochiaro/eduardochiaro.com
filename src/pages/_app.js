import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes";
import NextProgress from "next-progress";
import '../styles/globals.scss'
import Head from "next/head";

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
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#6c6651" />
          <meta name="msapplication-TileColor" content="#6c6651" />
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp