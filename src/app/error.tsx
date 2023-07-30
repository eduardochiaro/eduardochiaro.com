'use client';

import ThemeIcon from '@/components/ThemeIcon';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function Custom404() {
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="absolute top-4 right-4">
        <ThemeIcon orientation="bottom" />
      </div>
      <div className="px-4 py-16 mx-auto text-center lg:px-8 lg:py-48 max-w-7xl sm:px-6 sm:py-24">
        <div className="justify-center w-full text-center lg:p-10 max-auto">
          <div className="justify-center w-full mx-auto">
            <p className="text-5xl tracking-tight lg:text-9xl font-mono">500</p>
            <p className="max-w-xl mx-auto mt-4 text-lg tracking-tight font-mono">Something went wrong!</p>
          </div>
          <div className="flex justify-center gap-3 mt-10">
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
