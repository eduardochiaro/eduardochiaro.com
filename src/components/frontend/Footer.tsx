'use client';

import { format as dateFormat } from '@/utils/date';
import * as React from 'react';
import Link from 'next/link';
import Logo from '@/components/icons/Logo';
import LinkedInIcon from '@/components/icons/Linkedin';
import GitHubIcon from '@/components/icons/Github';
import WireContainer from './WireContainer';
import { unstable_ViewTransition as ViewTransition } from 'react';

export default function Footer() {
  return (
    <footer id="footer" className="mt-10 pb-4">
      <div className="mx-auto max-w-screen-lg p-4">
        <div className="flex items-center justify-between gap-5">
          <ViewTransition name="footer-logo">
            <div className="text-primary-500 flex items-center justify-center gap-2 font-mono text-sm md:justify-start">
              <Logo className="logo text-primary-950 dark:text-primary-50 size-8" /> {dateFormat(new Date(), 'yyyy')}
            </div>
          </ViewTransition>
          <div className="flex justify-center gap-4 md:justify-end">
            <WireContainer>
              <Link
                href="https://linkedin.com/in/eduardochiaro"
                className="focus:ring-secondary-600 focus:ring-offset-primary-50 dark:focus:ring-offset-primary-900 inline-flex size-8 items-center justify-center rounded-full text-center focus:ring-2 focus:ring-offset-2 focus:outline-none"
                title="LinkedIn"
              >
                <LinkedInIcon className={'hover:text-secondary-600 size-6 transition-colors duration-300 ease-out'} />
              </Link>
            </WireContainer>
            <WireContainer>
              <Link
                href="https://github.com/eduardochiaro"
                className="focus:ring-secondary-600 focus:ring-offset-primary-50 dark:focus:ring-offset-primary-900 inline-flex size-8 items-center justify-center rounded-full text-center focus:ring-2 focus:ring-offset-2 focus:outline-none"
                title="GitHub"
              >
                <GitHubIcon className={'hover:text-secondary-600 size-6 transition-colors duration-300 ease-out'} />
              </Link>
            </WireContainer>
          </div>
        </div>
      </div>
    </footer>
  );
}
