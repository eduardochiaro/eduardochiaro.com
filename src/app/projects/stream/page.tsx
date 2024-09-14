import Footer from '@/components/frontend/Footer';
import Header from '@/components/frontend/Header';
import Link from 'next/link';
import styles from '@/styles/Stream.module.scss';
import StreamComponent from '@/components/projects/Stream';
import { Metadata } from 'next';
import getMenuLinks from '@/utils/getMenuLinks';

export default async function Stream() {
  const menuLinks = await getMenuLinks();

  return (
    <div className={`${styles.stream} flex min-h-screen flex-col justify-between`}>
      <Header data={menuLinks} />
      <div className={'flex grow flex-col bg-fixed'}>
        <div className={'mb-auto grow pb-10'}>
          <section className={'mt-10 px-4 lg:px-0'}>
            <div className="mx-auto max-w-5xl">
              <h1 className="font-header text-3xl font-light leading-tight tracking-wide lg:text-4xl">
                <Link href="/projects" className="font-semibold text-secondary-600 hover:underline dark:text-secondary-600">
                  Projects
                </Link>{' '}
                / Lab / Stream
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

export const metadata: Metadata = {
  title: 'Projects > Stream | Eduardo Chiaro',
};
