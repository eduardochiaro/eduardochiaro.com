import Link from 'next/link';
import RapidReadingComponent from '@/components/projects/RapidReading';
import FrontendLayout from '@/components/layouts/Frontend';
import { Metadata } from 'next';

export default function RapidReading() {
  return (
    <FrontendLayout>
      <section className={'mt-10 px-4 lg:px-0'}>
        <div className="mx-auto max-w-5xl">
          <h1 className="font-header text-3xl leading-tight font-light tracking-wide lg:text-4xl">
            <Link href="/projects" className="text-secondary-600 dark:text-secondary-600 font-semibold hover:underline">
              Projects
            </Link>{' '}
            / Lab / Rapid Reading
          </h1>
          <div className="mt-5 h-2/3 grow">
            <RapidReadingComponent />
          </div>
        </div>
      </section>
    </FrontendLayout>
  );
}

export const metadata: Metadata = {
  title: 'Projects > Rapid Reading | Eduardo Chiaro',
};
