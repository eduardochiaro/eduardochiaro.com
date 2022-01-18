import moment from 'moment';
import * as React from 'react';
import SVG from 'react-inlinesvg'
import { useSession, signIn, signOut } from "next-auth/react"
import { LoginIcon, LogoutIcon } from "@heroicons/react/solid"
import styles from '../styles/Footer.module.scss'

function LoginButton(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return (
      <button className="relative w-fit h-fit px-1 text-sm border-b border-white mt-2" onClick={() => signOut()}>
        Sign out
        <LogoutIcon className="h-4 inline ml-2 align-sub"/>
      </button>
    );
  }
  return (
    <button className="relative w-fit h-fit px-1 text-sm border-b border-white mt-2" onClick={() => signIn(null, { callbackUrl: 'http://localhost:3000/admin' })}>
      Sign in
      <LoginIcon className="h-4 inline ml-2 align-sub"/>
    </button>
  );
}

export default function Footer () {
  const { data: session } = useSession();
  return (
    <footer id="footer" className="footer border-t border-independence-900 bg-independence-500">
      <div className="container mx-auto text-center text-white py-4">
        <div className="flex">
          <div className="flex-none w-32">
            
          </div>
          <div className="flex-1 text-center">
            © Copyright {moment().year()}
            <SVG title="Eduardo Chiaro" alt="Eduardo Chiaro" className={`inline-block w-16 mb-2 mx-3 bottomLogo`} src={`/images/logo-n.svg`} />
            Eduardo Chiaro
          </div>
          <div className="flex-none w-32">
            <LoginButton isLoggedIn={session} />
          </div>
        </div>
      </div>
    </footer>
  );
}