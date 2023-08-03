'use client';
import { useEffect } from 'react';
import * as ga from '../utils/ga';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

export interface ContextProps {
  children: React.ReactNode;
}

export default function GAProvider({ children }: ContextProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}` + (searchParams.toString() ? `?${searchParams}` : '');
    ga.pageview(url as unknown as URL);
  }, [pathname, searchParams]);
  return (
    <>
      {children}
      <Script id="ga-script" async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
      <Script id="ga-starter"
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
  );
}
