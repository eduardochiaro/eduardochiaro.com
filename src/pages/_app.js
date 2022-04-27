import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes";
import NextProgress from "next-progress";
import '../styles/globals.scss'

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <NextProgress delay={300} options={{ showSpinner: false }} />
      <ThemeProvider enableSystem={true} attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp