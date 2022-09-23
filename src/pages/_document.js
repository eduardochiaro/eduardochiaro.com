import Document, { Html, Head, Main, NextScript } from 'next/document';
import tailwind from 'tailwind.config';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color={tailwind.theme.colors.primary[800]} />
          <meta name="msapplication-TileColor" content={tailwind.theme.colors.primary[200]} />
          <meta name="theme-color" content={tailwind.theme.colors.zinc[100]} media="(prefers-color-scheme: light)" key="dark-system" />
          <meta name="theme-color" content={tailwind.theme.colors.zinc[700]} media="(prefers-color-scheme: dark)" key="light-system" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap" rel="stylesheet" />
        </Head>
        <body className="transition duration-500 ease-in-out">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
