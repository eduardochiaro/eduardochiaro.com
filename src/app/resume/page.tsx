import Footer from '@/components/frontend/Footer';
import Header from '@/components/frontend/Header';
import ResumeComponent from '@/components/frontend/Resume';
import getMenuLinks from '@/utils/getMenuLinks';
import prisma from '@/utils/prisma';
import { Metadata } from 'next';
import styles from '@/styles/Resume.module.scss';
import { cache } from 'react';
import WireContainer from '@/components/WireContainer';

export default async function Resume() {
  const resume = await getResume();
  const menuLinks = await getMenuLinks();

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Header data={menuLinks} />
      <WireContainer type="large" className="mx-auto">
        <div className="min-w-96 max-w-screen-lg rounded-xl bg-primary-50 p-6 font-mono shadow-lg dark:bg-primary-950">
          <ResumeComponent data={resume} />
        </div>
			</WireContainer>
        <Footer />
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Resume | Eduardo Chiaro',
};

const getResume = cache(async () => {
  return prisma.resume.findMany({
    orderBy: {
      startDate: 'desc',
    },
    include: {
      tags: true,
      projects: {
        include: {
          file: true,
        },
      },
      file: true,
    },
  });
});
