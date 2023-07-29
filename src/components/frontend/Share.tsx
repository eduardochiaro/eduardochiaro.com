'use client';

import * as React from 'react';
import ThreadsIcon from '@/components/icons/Threads';
import LinkedInIcon from '@/components/icons/Linkedin';
import GitHubIcon from '@/components/icons/Github';
import Link from 'next/link';

export default function Share() {
  return (
    <section id="share" className="px-4 lg:px-0 mt-8 md:mt-10 ">
      <div className="max-w-5xl mx-auto flex gap-8">
        <span className="grow" />
        <Link href="https://github.com/eduardochiaro" className="flex-none w-30" title="GitHub">
          <GitHubIcon
            className={
              'inline-block h-6 transition-colors ease-out duration-300 fill-primary-900 dark:fill-primary-100 hover:fill-secondary-600 dark:hover:fill-secondary-600'
            }
          />
        </Link>
        <Link href="https://linkedin.com/in/eduardochiaro" className="flex-none w-30" title="LinkedIn">
          <LinkedInIcon
            className={
              'inline-block h-6 transition-colors ease-out duration-300 fill-primary-900 dark:fill-primary-100 hover:fill-secondary-600 dark:hover:fill-secondary-600'
            }
          />
        </Link>

        <Link href="https://threads.net/eduardochiaro" className="flex-none w-30" title="Threads">
          <ThreadsIcon
            className={
              'inline-block h-6 transition-colors ease-out duration-300 fill-primary-900 dark:fill-primary-100 hover:fill-secondary-600 dark:hover:fill-secondary-600'
            }
          />
        </Link>
      </div>
    </section>
  );
}
