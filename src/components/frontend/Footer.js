import moment from 'moment';
import * as React from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import Logo from '../icons/logo';
import Link from 'next/link';

function LoginButton(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return (
      <>
      <Link
        href="/admin"
        >
        <a className="relative text-sm mr-4 hover:underline">
          Admin
        </a>
        </Link>
        <button className="relative text-sm hover:underline" onClick={() => signOut()}>
          Sign out
        </button>
      </>
    );
  }
  return (
    <button className="relative text-sm" onClick={() => signIn(null, { callbackUrl: '/admin' })}>
      Sign in
    </button>
  );
}

export default function Footer () {
  const { data: session } = useSession();
  return (
    <footer id="footer" className="mt-10 pb-4">
      <div className="container mx-auto text-center py-4">
        <div className="flex-wrap md:flex-nowrap flex text-sm md:text-base">
          <div className="hidden md:block flex-none w-60 text-sm"></div>
          <div className="flex-1 text-center">
            <span>© Copyright {moment().year()}</span>
            <Logo title="Eduardo Chiaro" alt="Eduardo Chiaro" className={`inline w-auto h-7 mx-3 `} />
            <span>Eduardo Chiaro</span>
          </div>
          <div className="flex-none w-full text-right align-baseline md:w-60 mt-5 md:mt-0 items-center">
            <LoginButton isLoggedIn={session} />
          </div>
        </div>
      </div>
    </footer>
  );
}