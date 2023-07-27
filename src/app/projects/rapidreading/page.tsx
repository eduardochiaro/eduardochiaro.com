import Link from 'next/link';
import RapidReadingComponent from '@/components/projects/RapidReading';
import FrontendLayout from '@/components/layouts/Frontend';
import { Metadata } from "next";

export default function RapidReading() {
  return (
    <FrontendLayout>
      <section className={'px-4 lg:px-0 mt-10'}>
        <div className="max-w-5xl mx-auto">
          <h1 className="font-header leading-tight tracking-wide text-3xl lg:text-4xl font-light">
            <Link href="/projects" className="hover:underline text-secondary-600 dark:text-secondary-600 font-semibold">
              Projects
            </Link>{' '}
            / Rapid Reading
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
}