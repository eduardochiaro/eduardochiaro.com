'use client';

import GitHubIcon from '@/components/icons/Github';

const ShowProviders = async function ShowProviders() {
  return (
    <div className="flex flex-col gap-6 py-4">
      <a
        href="/api/auth/github"
        className="mx-auto flex items-center gap-3 rounded-md bg-primary-300 p-3 px-4 text-xl text-primary-700 ring-primary-300 ring-offset-2 ring-offset-primary-100 drop-shadow transition duration-300 ease-in-out hover:ring-2 dark:bg-primary-900 dark:text-primary-50 dark:ring-primary-700 dark:ring-offset-primary-600"
      >
        <GitHubIcon className="w-6" />
        Sign in with GitHub
      </a>
    </div>
  );
};

export default ShowProviders;
