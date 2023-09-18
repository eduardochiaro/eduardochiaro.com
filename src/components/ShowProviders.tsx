'use client';

import GitHub from '@/components/icons/Github';
import Google from '@/components/icons/Google';
import { getProviders, signIn } from 'next-auth/react';

const LogoProvider = ({ id }: { id: string }) => {
  switch (id) {
    case 'github':
      return <GitHub className="w-6" />;
    case 'google':
      return <Google className="w-6" />;
    default:
      return <></>;
  }
};

const ShowProviders = async function ShowProviders() {
  const providers = await getProviders();
  return (
    <div className="flex flex-col gap-4">
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name} className="py-4">
            <button
              onClick={() => signIn(provider.id)}
              className="mx-auto flex items-center gap-3 rounded bg-primary-300 p-3 px-4 text-xl text-primary-700 ring-primary-300 ring-offset-2 ring-offset-primary-100 drop-shadow transition duration-300 ease-in-out hover:ring-2 dark:bg-primary-800 dark:text-primary-50 dark:ring-primary-700 dark:ring-offset-primary-600"
            >
              <LogoProvider id={provider.id} />
              Sign in with {provider.name}
            </button>
          </div>
        ))}
    </div>
  );
};

export default ShowProviders as unknown as () => JSX.Element;
