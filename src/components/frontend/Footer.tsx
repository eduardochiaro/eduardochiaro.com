import moment from 'moment';
import * as React from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Logo from '@/components/icons/Logo';

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
        <div className="flex-wrap lg:flex-nowrap flex text-sm md:text-base">
          <div className="hidden grow md:flex"></div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <span className="grow text-right">© Copyright {moment().year()}</span>
              <Logo className="h-6 text-secondary-500 dark:text-secondary-700" />
              <span className="grow">Eduardo Chiaro</span>
            </div>
          </div>
          <div className="hidden grow md:flex justify-end align-center items-center gap-4">
            <LoginButton isLoggedIn={session && session.user ? true : false} />
          </div>
        </div>
      </div>
    </footer>
  );
}
