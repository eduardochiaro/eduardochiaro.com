'use client';
import GitHubIcon from '@/components/icons/Github';
import GoogleIcon from '@/components/icons/Google';
import { signIn } from 'next-auth/react';

const LogoProvider = ({ id }: { id: string }) => {
  switch (id) {
    case 'github':
      return <GitHubIcon className="w-6" />;
    case 'google':
      return <GoogleIcon className="w-6" />;
    default:
      return <></>;
  }
};

const ShowProviders = function ShowProviders() {
  const providers = ['github', 'google'];
  return (
    <div className="flex flex-col gap-6 py-4">
      {providers.map((provider) => (
        <button
          key={provider}
          onClick={() => signIn(provider, { redirectTo: '/admin' })}
          className="mx-auto flex items-center gap-3 rounded-md bg-primary-300 p-3 px-4 text-xl text-primary-700 ring-primary-300 ring-offset-2 ring-offset-primary-100 drop-shadow transition duration-300 ease-in-out hover:ring-2 dark:bg-primary-900 dark:text-primary-50 dark:ring-primary-700 dark:ring-offset-primary-600"
        >
          <LogoProvider id={provider} />
          Sign in with {provider}
        </button>
      ))}
    </div>
  );
};

export default ShowProviders;
