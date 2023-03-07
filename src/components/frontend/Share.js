import * as React from 'react';
import TwitterIcon from '@/components/icons/Twitter';
import LinkedInIcon from '@/components/icons/Linkedin';
import GitHubIcon from '@/components/icons/Github';
import Link from 'next/link';

export default function Share() {
  return (
    <section id="share" className="px-4 lg:px-0 mt-8 md:mt-10 ">
      <div className="max-w-5xl mx-auto flex gap-8">
        <span className="grow" />
        <Link href="https://github.com/eduardochiaro" className="flex-none w-30" alt="GitHub" title="GitHub">
          <GitHubIcon
            className={
              'inline-block h-6 transition-colors ease-out duration-500 fill-primary-900 dark:fill-primary-100 hover:fill-secondary-600 dark:hover:fill-secondary-600'
            }
          />
        </Link>
        <Link href="https://linkedin.com/in/eduardochiaro" className="flex-none w-30" alt="LinkedIn" title="LinkedIn">
          <LinkedInIcon
            className={
              'inline-block h-6 transition-colors ease-out duration-500 fill-primary-900 dark:fill-primary-100 hover:fill-secondary-600 dark:hover:fill-secondary-600'
            }
          />
        </Link>
        <Link href="https://twitter.com/eduardo_chiaro" className="flex-none w-30" alt="Twitter" title="Twitter">
          <TwitterIcon
            className={
              'inline-block h-6 transition-colors ease-out duration-500 fill-primary-900 dark:fill-primary-100 hover:fill-secondary-600 dark:hover:fill-secondary-600'
            }
          />
        </Link>
      </div>
    </section>
  );
}
