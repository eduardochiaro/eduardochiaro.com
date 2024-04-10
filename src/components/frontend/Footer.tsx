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
      <div className="mx-auto max-w-screen-xl py-4">
        <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-3">
          <div className="flex items-center justify-center gap-2 md:justify-start">
            <Link href="/">
              <Logo className="logo h-8" />
            </Link>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm">
            <Copyright className="w-4" /> Copyright {moment().year()}
          </div>

          <div className="flex justify-center gap-4 md:justify-end">

        		<WireContainer>
							<Link
								href="https://linkedin.com/in/eduardochiaro"
								className="inline-flex h-8 w-8 items-center justify-center rounded-full text-center focus:outline-none focus:ring-2 focus:ring-secondary-600 focus:ring-offset-2 focus:ring-offset-primary-50 dark:focus:ring-offset-primary-900"
								title="LinkedIn"
							>
								<LinkedInIcon className={'h-4 transition-colors duration-300 ease-out hover:text-secondary-600'} />
							</Link>
						</WireContainer>
        		<WireContainer>
							<Link
								href="https://github.com/eduardochiaro"
								className="inline-flex h-8 w-8 items-center justify-center rounded-full text-center focus:outline-none focus:ring-2 focus:ring-secondary-600 focus:ring-offset-2 focus:ring-offset-primary-50 dark:focus:ring-offset-primary-900"
								title="GitHub"
							>
								<GitHubIcon className={'h-4 transition-colors duration-300 ease-out hover:text-secondary-600'} />
							</Link>
						</WireContainer>
          </div>
        </div>
      </div>
    </footer>
  );
}
