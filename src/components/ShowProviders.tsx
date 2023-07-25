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
            <button onClick={() => signIn(provider.id)} className="flex items-center gap-3 mx-auto bg-primary-300 dark:bg-primary-800 text-primary-700 dark:text-primary-50 drop-shadow p-3 px-4 rounded text-xl transition duration-300 ease-in-out hover:ring-2 ring-offset-2 ring-primary-300 dark:ring-primary-700 ring-offset-primary-100 dark:ring-offset-primary-600">
              <LogoProvider id={provider.id} />
              Sign in with {provider.name}
            </button>
          </div>
        ))}
    </div>
  );
};

export default ShowProviders as unknown as () => JSX.Element;
