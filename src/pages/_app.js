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
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp