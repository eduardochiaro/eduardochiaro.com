import * as React from 'react';
import { getProviders, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';
import Header from '@/components/frontend/Header';

export default function SignIn({ providers, basePath }) {
  const router = useRouter();
  //const baseUrl = router.basePath;

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center min-h-screen -mt-14">
        <div className="w-full max-w-lg px-10 py-8 mx-auto">
          <div className="max-w-md mx-auto space-y-6">
            <div className="bg-zinc-200 dark:bg-zinc-700 rounded-lg shadow-xl px-4 py-6 text-center">
              <h1 className="font-header mt-6 text-3xl">Not signed in</h1>
              {Object.values(providers).map((provider) => (
                <div key={provider.name} className="mt-8">
                  <button
                    className="flex items-center mx-auto bg-zinc-800 text-zinc-50 p-3 px-4 rounded-lg text-xl transition duration-200 ease-in-out hover:ring-2 ring-offset-2 ring-zinc-800 mb-4"
                    onClick={() =>
                      signIn(provider.id, {
                        callbackUrl: router.query.callbackUrl,
                      })
                    }
                  >
                    Sign in with {provider.name}
                    <ArrowRightCircleIcon className="h-5 ml-2" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers, basePath: process.env.NEXTAUTH_URL },
  };
}
