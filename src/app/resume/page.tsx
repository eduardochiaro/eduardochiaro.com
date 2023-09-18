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
    <div className="flex min-h-screen flex-col justify-between">
      <Header data={menuLinks} />
      <div className={`${styles.resume} flex grow flex-col bg-fixed`}>
        <div className={'mb-auto grow pb-10'}>
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
