'use client';

import moment from 'moment';
import * as React from 'react';
import Link from 'next/link';
import Logo from '@/components/icons/Logo';
import LinkedInIcon from '@/components/icons/Linkedin';
import GitHubIcon from '@/components/icons/Github';
import Copyright from '@/components/icons/Copyright';
import WireContainer from '../WireContainer';

export default function Footer() {
  return (
    <footer id="footer" className="mt-10 pb-4">
      <div className="mx-auto max-w-screen-lg py-4">
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center justify-center gap-2 font-mono text-sm text-primary-500 md:justify-start">
            <Logo className="logo size-4" /> {moment().year()}
          </div>
          <div className="flex justify-center gap-4 md:justify-end">
            <WireContainer>
              <Link
                href="https://linkedin.com/in/eduardochiaro"
                className="inline-flex size-8 items-center justify-center rounded-full text-center focus:outline-none focus:ring-2 focus:ring-secondary-600 focus:ring-offset-2 focus:ring-offset-primary-50 dark:focus:ring-offset-primary-900"
                title="LinkedIn"
              >
                <LinkedInIcon className={'size-6 transition-colors duration-300 ease-out hover:text-secondary-600'} />
              </Link>
            </WireContainer>
            <WireContainer>
              <Link
                href="https://github.com/eduardochiaro"
                className="inline-flex size-8 items-center justify-center rounded-full text-center focus:outline-none focus:ring-2 focus:ring-secondary-600 focus:ring-offset-2 focus:ring-offset-primary-50 dark:focus:ring-offset-primary-900"
                title="GitHub"
              >
                <GitHubIcon className={'size-6 transition-colors duration-300 ease-out hover:text-secondary-600'} />
              </Link>
            </WireContainer>
          </div>
        </div>
      </div>
    </footer>
  );
}
