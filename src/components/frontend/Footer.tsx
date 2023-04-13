import moment from 'moment';
import * as React from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Logo from '@/components/icons/Logo';
import TwitterIcon from '@/components/icons/Twitter';
import LinkedInIcon from '@/components/icons/Linkedin';
import GitHubIcon from '@/components/icons/Github';

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
      <div className="max-w-5xl mx-auto py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-5">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Logo className="h-8 logo" />
            </Link>
            <LoginButton isLoggedIn={!!session} />
          </div>
    
          <div className="text-center text-sm">
          © Copyright {moment().year()}
          </div>

          <div className="md:text-right space-x-2">
            <Link href="https://linkedin.com/in/eduardochiaro" className="inline-flex justify-center items-center w-8 h-8 text-center rounded-full focus:outline-none focus:ring-2 focus:ring-secondary-600 focus:ring-offset-2 focus:ring-offset-primary-50 dark:focus:ring-offset-primary-900" title="LinkedIn">
              <LinkedInIcon
                className={
                  'inline-block h-4 transition-colors ease-out duration-300 fill-primary-900 dark:fill-primary-100 hover:fill-secondary-600 dark:hover:fill-secondary-600'
                }
              />
            </Link>
            <Link href="https://twitter.com/eduardochiaro" className="inline-flex justify-center items-center w-8 h-8 text-center rounded-full focus:outline-none focus:ring-2 focus:ring-secondary-600 focus:ring-offset-2 focus:ring-offset-primary-50 dark:focus:ring-offset-primary-900" title="Twitter">
              <TwitterIcon
                className={
                  'inline-block h-4 transition-colors ease-out duration-300 fill-primary-900 dark:fill-primary-100 hover:fill-secondary-600 dark:hover:fill-secondary-600'
                }
              />
            </Link>
            <Link href="https://github.com/eduardochiaro" className="inline-flex justify-center items-center w-8 h-8 text-center rounded-full focus:outline-none focus:ring-2 focus:ring-secondary-600 focus:ring-offset-2 focus:ring-offset-primary-50 dark:focus:ring-offset-primary-900" title="GitHub">
              <GitHubIcon
                className={
                  'inline-block h-4 transition-colors ease-out duration-300 fill-primary-900 dark:fill-primary-100 hover:fill-secondary-600 dark:hover:fill-secondary-600'
                }
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
