import Footer from '@/components/frontend/Footer';
import Header from '@/components/frontend/Header';
import Share from '@/components/frontend/Share';
import Link from 'next/link';
import styles from '@/styles/Stream.module.scss';
import StreamComponent from "@/components/projects/Stream";
import { Metadata } from "next";

export default async function Stream() {
  const menuLinks = await getMenuLinks();
  
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header data={menuLinks} />
      <div className={`${styles.stream} bg-fixed grow flex flex-col`}>
        <div className={'mb-auto pb-10 grow'}>
          <section className={'px-4 lg:px-0 mt-10'}>
            <div className="max-w-5xl mx-auto">
              <h1 className="font-header leading-tight tracking-wide text-3xl lg:text-4xl font-light">
                <Link href="/projects" className="hover:underline text-secondary-600 dark:text-secondary-600 font-semibold">
                  Projects
                </Link>{' '}
                / Stream
              </h1>
              <div className="mt-5">
                <StreamComponent />
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </div>
  );
}

async function getMenuLinks() {
	return prisma.menuLink.findMany({
    where: {
      deletedAt: null,
    },
    orderBy: {
      order: 'asc',
    },
  });
}

export const metadata: Metadata = {
  title: 'Projects > Stream | Eduardo Chiaro',
}