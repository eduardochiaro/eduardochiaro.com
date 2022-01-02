import * as React from 'react';
import { ChevronUpIcon } from '@heroicons/react/outline';
export default function Top () {
  return (
    <div className="sticky bottom-2 right-5 text-right hidden md:block">
      <a href="#root" className="text-terra-cotta-900 z-50">top <ChevronUpIcon className="inline mr-2 w-4"/></a>
    </div>
  );
}