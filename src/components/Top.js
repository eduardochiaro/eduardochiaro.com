import * as React from 'react';
import { ChevronUpIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Top () {
  const router = useRouter();
  return (
    <div className="sticky bottom-2 right-5 text-righthidden md:block">
       <Link
        href="#root">
          <a className="text-terra-cotta-500 z-50 absolute bottom-2 right-0 drop-shadow-sm">top <ChevronUpIcon className="inline mr-2 w-4"/></a>
        </Link>
    </div>
  );
}