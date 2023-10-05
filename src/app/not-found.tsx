import ThemeIcon from '@/components/ThemeIcon';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function Custom404() {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="absolute right-4 top-4">
        <ThemeIcon orientation="bottom" />
      </div>
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48">
        <div className="max-auto w-full justify-center text-center lg:p-10">
          <div className="mx-auto w-full justify-center">
            <p className="font-mono text-5xl tracking-tight lg:text-9xl">404</p>
            <p className="mx-auto mt-4 max-w-xl font-mono text-lg tracking-tight">Please check the URL in the address bar and try again.</p>
          </div>
          <div className="mt-10 flex justify-center gap-3">
            <Link href="/" className="button flex items-center gap-2 !text-xl">
              <ArrowLeftIcon className="h-6" />
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
