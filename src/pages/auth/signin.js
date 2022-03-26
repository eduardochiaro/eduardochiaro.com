import React, { useEffect } from 'react'
import { getProviders, signIn } from "next-auth/react"
import { useRouter } from 'next/router'
import SVG from 'react-inlinesvg'
import { LoginIcon } from "@heroicons/react/outline"
import Link from 'next/link'

export default function SignIn({ providers, basePath }) {
  const router = useRouter();
  //const baseUrl = router.basePath;
  
  return (
    <div className="flex items-center justify-center min-h-screen from-green-sheen-100 via-green-sheen-300 to-green-sheen-500 bg-gradient-to-br">
      <div className='w-full max-w-lg px-10 py-8 mx-auto'>
        <div className='max-w-md mx-auto space-y-6'>
          <div className="bg-white rounded-lg shadow-xl px-4 py-6 text-center">
            <div className="mx-auto w-40 text-center mb-4">
              <Link 
                href={basePath}
                >
                <a>
                  <SVG
                      title="Eduardo Chiaro" 
                      alt="" 
                      className={`w-40 mainLogo`}
                      width={65}
                      src={'/images/logo-n.svg'} />
                  </a>
                </Link>
            </div>
            <p className="font-header text-xl">Not signed in</p>
            {Object.values(providers).map((provider) => (
              <div key={provider.name} className="mt-8">
                <button className="bg-independence-800 text-white p-3 pl-4 pr-4 rounded-lg text-2xl transition duration-200 ease-in-out active:ring-2 ring-offset-2 ring-independence-600 mb-4" onClick={() => signIn(provider.id, {
                    callbackUrl: router.query.callbackUrl,
                  })}>
                  Sign in with {provider.name}
                  <LoginIcon className="h-6 inline ml-2 align-sub"/>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers, basePath: process.env.NEXTAUTH_URL },
  }
}