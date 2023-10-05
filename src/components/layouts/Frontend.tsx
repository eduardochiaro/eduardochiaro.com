import * as React from 'react';
import Header from '@/components/frontend/Header';
import Footer from '@/components/frontend/Footer';
import classNames from '@/utils/classNames';
import getMenuLinks from '@/utils/getMenuLinks';

export default async function FrontendLayout({ children, className }: { children: React.ReactNode; className?: string }) {
  const menuLinks = await getMenuLinks();

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Header data={menuLinks} />
      <div className={classNames('grow', className)}>{children}</div>
      <Footer />
    </div>
  );
}
