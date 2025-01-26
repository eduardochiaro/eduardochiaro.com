import Link from 'next/link';
import TerminalComponent from '@/components/projects/Terminal';
import FrontendLayout from '@/components/layouts/Frontend';
import { Metadata } from 'next';

export default function Terminal() {
  return (
    <FrontendLayout>
      <section className={'mt-10 px-4 lg:px-0'}>
        <div className="mx-auto max-w-5xl">
          <h1 className="font-header text-3xl leading-tight font-light tracking-wide lg:text-4xl">
            <Link href="/projects" className="text-secondary-600 dark:text-secondary-600 font-semibold hover:underline">
              Projects
            </Link>{' '}
            / Lab / Terminal
          </h1>
          <div className="mt-5 h-2/3 grow">
            <TerminalComponent />
          </div>
        </div>
      </section>
    </FrontendLayout>
  );
}

export const metadata: Metadata = {
  title: 'Projects > Terminal | Eduardo Chiaro',
};
