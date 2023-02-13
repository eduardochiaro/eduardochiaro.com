import moment from 'moment';
import * as React from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Logo from '../icons/logo';

function LoginButton(props) {
  const isLoggedIn = props.isLoggedIn;
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
  }
}

export default function Footer() {
  const { data: session } = useSession();
  return (
    <footer id="footer" className="mt-10 pb-4">
      <div className="container mx-auto py-4">
        <div className="flex-wrap lg:flex-nowrap flex text-sm md:text-base">
          <div className="hidden grow md:flex"></div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <span className="grow text-right">© Copyright {moment().year()}</span>
              <Logo className="h-6 text-accent-600 dark:text-accent-500" />
              <span className="grow">Eduardo Chiaro</span>
            </div>
          </div>
          <div className="hidden grow md:flex justify-end align-center items-center gap-4">
            <LoginButton isLoggedIn={session} />
          </div>
        </div>
      </div>
    </footer>
  );
}
