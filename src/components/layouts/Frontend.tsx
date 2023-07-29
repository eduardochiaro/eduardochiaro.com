import * as React from 'react';
import Header from '@/components/frontend/Header';
import Footer from '@/components/frontend/Footer';
import classNames from '@/utils/classNames';
import prisma from '@/utils/prisma';

export default async function FrontendLayout({ children, className }: { children: React.ReactNode; className?: string }) {
  const menuLinks = await getMenuLinks();

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header data={menuLinks} />
      <div className={classNames('grow', className)}>{children}</div>
      <Footer />
    </div>
  );
}

async function getMenuLinks() {
  return prisma.menuLink.findMany({
    orderBy: {
      order: 'asc',
    },
  });
}
