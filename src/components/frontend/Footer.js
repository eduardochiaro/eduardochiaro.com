import moment from 'moment';
import * as React from 'react';
import SVG from 'react-inlinesvg'
import { useSession, signIn, signOut } from "next-auth/react"
import { LoginIcon, LogoutIcon } from "@heroicons/react/solid"

function LoginButton(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return (
      <button className="relative text-sm mt-4" onClick={() => signOut()}>
        Sign out
        <LogoutIcon className="h-4 inline ml-2 align-sub"/>
      </button>
    );
  }
  return (
    <button className="relative text-sm mt-4" onClick={() => signIn(null, { callbackUrl: '/admin' })}>
      Sign in
      <LoginIcon className="h-4 inline ml-2 align-sub"/>
    </button>
  );
}

export default function Footer () {
  const { data: session } = useSession();
  return (
    <footer id="footer" className="footer mt-10 pb-4">
      <div className="container mx-auto text-center py-4">
        <div className="flex-wrap md:flex-nowrap flex">
          <div className="hidden md:block flex-none w-32">
          </div>
          <div className="flex-1 text-center">
            © Copyright {moment().year()}
            <SVG title="Eduardo Chiaro" alt="Eduardo Chiaro" className={`inline-block h-7 mx-3 bottomLogo font-normal`} src={`/images/logo-3.svg`} />
            Eduardo Chiaro
          </div>
          <div className="flex-none w-full text-right align-baseline md:w-32">
            <LoginButton isLoggedIn={session} />
          </div>
        </div>
      </div>
    </footer>
  );
}