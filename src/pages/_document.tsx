import Document, { Html, Head, Main, NextScript } from 'next/document';
import tailwind from '../../tailwind.config';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" style={{ scrollBehavior: 'smooth' }}>
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color={tailwind.theme.colors.secondary[800]} />
          <meta name="msapplication-TileColor" content={tailwind.theme.colors.secondary[200]} />
          <meta name="theme-color" content={tailwind.theme.colors.primary[50]} media="(prefers-color-scheme: light)" key="dark-system" />
          <meta name="theme-color" content={tailwind.theme.colors.primary[700]} media="(prefers-color-scheme: dark)" key="light-system" />
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body className="transition duration-300 ease-in-out">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
