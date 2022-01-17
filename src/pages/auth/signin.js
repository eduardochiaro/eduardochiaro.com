import React, { useEffect } from 'react'
import { getProviders, signIn } from "next-auth/react"
import { useRouter } from 'next/router'

export default function SignIn({ providers }) {
  const router = useRouter();
  
  return (
    <div className="container mx-auto">
      {Object.values(providers).map((provider) => (
        <div key={provider.name} className="mt-8">
          <button className="text-white bg-gray-600 border border-gray-900 rounded px-8 py-2" onClick={() => signIn(provider.id, {
              callbackUrl: router.query.callbackUrl,
            })}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}