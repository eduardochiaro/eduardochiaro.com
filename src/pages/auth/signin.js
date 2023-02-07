import * as React from 'react';
import { getProviders, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import GitHub from '@/components/icons/github';
import Google from '@/components/icons/google';
import ThemeIcon from '@/components/ThemeIcon';
import HeaderLogo from "@/components/icons/headerLogo";

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
            <div className="box-card px-4 py-6 text-center">
              <HeaderLogo title="Eduardo Chiaro" alt="Eduardo Chiaro" className={'h-12 my-10 mx-auto logo'} />
              <h1 className="font-header my-6 text-3xl">Not signed in</h1>
              {Object.values(providers).map((provider) => (
                <div key={provider.name} className="py-4">
                  <button
                    className="flex items-center gap-3 mx-auto bg-primary-300 dark:bg-primary-800 text-primary-700 dark:text-primary-50 drop-shadow p-3 px-4 rounded text-xl transition duration-200 ease-in-out hover:ring-2 ring-offset-2 ring-primary-300 dark:ring-primary-700 ring-offset-primary-100 dark:ring-offset-primary-600"
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
