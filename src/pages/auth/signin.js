import * as React from 'react';
import { getProviders, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Logo from '@/components/icons/logo';
import GitHub from '@/components/icons/github';
import Google from '@/components/icons/google';
import ThemeIcon from '@/components/ThemeIcon';

const LogoProvider = ({ id }) => {
  switch (id) {
    case 'github':
      return <GitHub className="w-5" />;
    case 'google':
      return <Google className="w-5" />;
  }
};

export default function SignIn({ providers }) {
  const router = useRouter();
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen relative">
        <div className="absolute top-4 right-4">
          <ThemeIcon />
        </div>
        <div className="w-full px-10 py-8 mx-auto">
          <div className="max-w-sm mx-auto space-y-6">
            <div className="bg-primary-100 dark:bg-primary-700 rounded drop-shadow px-4 py-6 text-center">
              <Logo title="Eduardo Chiaro" alt="Eduardo Chiaro" className={'w-20 h-20 mx-auto'} />
              <h1 className="font-header my-6 text-3xl">Not signed in</h1>
              {Object.values(providers).map((provider) => (
                <div key={provider.name} className="py-4">
                  <button
                    className="flex items-center gap-3 mx-auto bg-primary-500 dark:bg-primary-800 text-primary-200 dark:text-primary-50 drop-shadow p-3 px-4 rounded text-xl transition duration-200 ease-in-out hover:ring-2 ring-offset-2 ring-primary-500"
                    onClick={() =>
                      signIn(provider.id, {
                        callbackUrl: router.query.callbackUrl,
                      })
                    }
                  >
                    <LogoProvider id={provider.id} />
                    Sign in with {provider.name}
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
