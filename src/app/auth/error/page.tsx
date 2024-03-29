import * as React from 'react';
import Logo from '@/components/icons/Logo';
import ThemeIcon from '@/components/ThemeIcon';
import Link from 'next/link';

const getError = (error: string) => {
  switch (error) {
    case 'AccessDenied':
      return {
        title: 'Access Denied',
        content: 'You do not have permission to sign in.',
        showButton: true,
      };
    case 'Configuration':
      return {
        title: 'Server error',
        content: 'There is a problem with the server configuration. Check the server logs for more information.',
        showButton: false,
      };
    case 'Verification':
      return {
        title: 'Unable to sign in',
        content: 'The sign in link is no longer valid. It may have been used already or it may have expired.',
        showButton: true,
      };
    default:
    case 'Default':
      return {
        title: 'Error',
        content: '',
        showButton: false,
      };
  }
};

export default async function Error({ searchParams }: { searchParams: any }) {
  const { error } = searchParams;
  const errorContent = getError(error);

  return (
    <div className="relative flex min-h-screen items-center justify-center">
      <div className="absolute right-4 top-4">
        <ThemeIcon orientation="bottom" />
      </div>
      <div className="mx-auto w-full px-10 py-8">
        <div className="mx-auto max-w-sm space-y-6">
          <div className="box-card px-4 py-6 text-center">
            <Logo title="Eduardo Chiaro" alt="Eduardo Chiaro" className={'mx-auto h-20 w-20'} />
            <h1 className="my-6 font-header text-3xl">{errorContent.title}</h1>
            <p className="mb-10">{errorContent.content}</p>
            {errorContent.showButton && (
              <Link
                className="mx-auto inline-flex items-center gap-3 rounded bg-primary-300 p-3 px-4 text-xl text-primary-700 ring-primary-300 ring-offset-2 ring-offset-primary-100 drop-shadow transition duration-300 ease-in-out hover:ring-2 dark:bg-primary-800 dark:text-primary-50 dark:ring-primary-700 dark:ring-offset-primary-600"
                href={'/api/auth/signin'}
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
