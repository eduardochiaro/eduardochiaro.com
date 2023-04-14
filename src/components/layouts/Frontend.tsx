import * as React from 'react';
import Head from 'next/head';
import Header from '@/components/frontend/Header';
import Footer from '@/components/frontend/Footer';
import classNames from '../../utils/classNames';

export default function FrontendLayout({ children, title = 'Eduardo Chiaro', className }: { children: React.ReactNode; title?: string; className?: string }) {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <div className={classNames('grow', className)}>{children}</div>
      <Footer />
    </div>
  );
}
