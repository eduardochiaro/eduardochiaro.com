import * as React from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Top() {
  const router = useRouter();
  return (
    <div className="sticky bottom-2 right-5 text-righthidden md:block">
      <Link href="#top">
        <a className="text-accent-500 z-50 absolute bottom-2 right-2 shadow bg-white rounded-sm px-2 w-auto">
          top <ChevronUpIcon className="inline w-4" />
        </a>
      </Link>
    </div>
  );
}
