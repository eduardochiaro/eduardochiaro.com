import Footer from '@/components/frontend/Footer';
import Header from '@/components/frontend/Header';
import ResumeComponent from '@/components/frontend/Resume';
import getMenuLinks from '@/utils/getMenuLinks';
import prisma from '@/utils/prisma';
import { Metadata } from 'next';
import styles from '@/styles/Resume.module.scss';

export default async function Resume() {
  const resume = await getResume();
  const menuLinks = await getMenuLinks();

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header data={menuLinks} />
      <div className={`${styles.resume} bg-fixed grow flex flex-col`}>
        <div className={'mb-auto pb-10 grow'}>
          <ResumeComponent data={resume} />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Resume | Eduardo Chiaro',
};

async function getResume() {
  return prisma.resume.findMany({
    orderBy: {
      startDate: 'desc',
    },
    include: {
      tags: true,
      projects: true,
    },
  });
}
