import Link from 'next/link';
import TerminalComponent from '@/components/projects/Terminal';
import FrontendLayout from '@/components/layouts/Frontend';

function Terminal() {
  return (
    <FrontendLayout title="Projects &gt; Terminal | Eduardo Chiaro">
      <section className={'px-4 lg:px-0 mt-10'}>
        <div className="max-w-5xl mx-auto">
          <h1 className="font-header leading-tight tracking-wide text-3xl lg:text-4xl font-light">
            <Link href="/projects" className="hover:underline text-secondary-600 dark:text-secondary-600 font-semibold">
              Projects
            </Link>{' '}
            / Terminal
          </h1>
          <div className="mt-5 h-2/3 grow">
            <TerminalComponent />
          </div>
        </div>
      </section>
    </FrontendLayout>
  );
}

export default Terminal;
