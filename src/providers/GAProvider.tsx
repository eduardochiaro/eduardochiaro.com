'use client';
import { useEffect } from 'react';
import * as ga from '../utils/ga';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

export default function Provider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname.startsWith('/admin') || !process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS) return;
    const url = `${pathname}` + (searchParams.toString() ? `?${searchParams}` : '');
    ga.pageview(url as unknown as URL);
  }, [pathname, searchParams]);
  return (
    <>
      {pathname.startsWith('/admin') || !process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? null : (
        <>
          <Script id="ga-script" async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
          <Script
            id="ga-starter"
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
        </>
      )}
    </>
  );
}
