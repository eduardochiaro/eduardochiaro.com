'use client';

import moment from 'moment';
import * as React from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Logo from '@/components/icons/Logo';
import LinkedInIcon from '@/components/icons/Linkedin';
import GitHubIcon from '@/components/icons/Github';
import Copyright from '@/components/icons/Copyright';

function LoginButton(props: { isLoggedIn: boolean }) {
  const { isLoggedIn } = props;
  if (isLoggedIn) {
    return (
      <>
        <Link href="/admin" className="relative text-sm hover:underline">
          Admin
        </Link>
        <button className="relative text-sm hover:underline" onClick={() => signOut()}>
          Sign out
        </button>
      </>
    );
  } else {
    return <></>;
  }
}

export default function Footer() {
  const { data: session } = useSession();
  return (
    <footer id="footer" className="mt-10 pb-4">
      <div className="mx-auto max-w-5xl py-4">
        <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-3">
          <div className="flex items-center justify-center gap-2 md:justify-start">
            <Link href="/">
              <Logo className="logo h-8" />
            </Link>
            <LoginButton isLoggedIn={!!session} />
          </div>

          <div className="flex items-center justify-center gap-2 text-sm">
            <Copyright className="w-4" /> Copyright {moment().year()}
          </div>

          <div className="flex justify-center gap-4 md:justify-end">
            <Link
              href="https://linkedin.com/in/eduardochiaro"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-center focus:outline-none focus:ring-2 focus:ring-secondary-600 focus:ring-offset-2 focus:ring-offset-primary-50 dark:focus:ring-offset-primary-900"
              title="LinkedIn"
            >
              <LinkedInIcon className={'h-4 transition-colors duration-300 ease-out hover:text-secondary-600'} />
            </Link>

            <Link
              href="https://github.com/eduardochiaro"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-center focus:outline-none focus:ring-2 focus:ring-secondary-600 focus:ring-offset-2 focus:ring-offset-primary-50 dark:focus:ring-offset-primary-900"
              title="GitHub"
            >
              <GitHubIcon className={'h-4 transition-colors duration-300 ease-out hover:text-secondary-600'} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
