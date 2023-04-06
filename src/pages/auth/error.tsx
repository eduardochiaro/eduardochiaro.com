import * as React from 'react';
import { useRouter } from 'next/router';
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

export default function SignIn() {
  const router = useRouter();
  const { error } = router.query as { error: string };
  const errorContent = getError(error);

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <div className="absolute top-4 right-4">
        <ThemeIcon orientation="bottom" />
      </div>
      <div className="w-full px-10 py-8 mx-auto">
        <div className="max-w-sm mx-auto space-y-6">
          <div className="box-card px-4 py-6 text-center">
            <Logo title="Eduardo Chiaro" alt="Eduardo Chiaro" className={'w-20 h-20 mx-auto'} />
            <h1 className="font-header my-6 text-3xl">{errorContent.title}</h1>
            <p className="mb-10">{errorContent.content}</p>
            {errorContent.showButton && (
              <Link
                className="flex items-center gap-3 mx-auto bg-primary-300 dark:bg-primary-800 text-primary-700 dark:text-primary-50 drop-shadow p-3 px-4 rounded text-xl transition duration-200 ease-in-out hover:ring-2 ring-offset-2 ring-primary-300 dark:ring-primary-700 ring-offset-primary-100 dark:ring-offset-primary-600"
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
