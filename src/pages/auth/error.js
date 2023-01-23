import * as React from 'react';
import { useRouter } from 'next/router';
import Logo from '@/components/icons/logo';
import ThemeIcon from '@/components/ThemeIcon';
import Link from "next/link";

const getError = (error) => {
  switch(error) {
    case 'AccessDenied':
      return {
        title: 'Access Denied',
        content: 'You do not have permission to sign in.',
        showButton: true
      }
    case 'Configuration':
      return {
        title: 'Server error',
        content: 'There is a problem with the server configuration. Check the server logs for more information.',
        showButton: false
      }
    case 'Verification':
      return {
        title: 'Unable to sign in',
        content: 'The sign in link is no longer valid. It may have been used already or it may have expired.',
        showButton: true
      }
    default:
    case 'Default':
      return {
        title: 'Error',
        content: '',
        showButton: false
      }
  }
}

export default function SignIn({ providers }) {
  const router = useRouter();
  const { error } = router.query;
  const errorContent = getError(error);

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
              <h1 className="font-header my-6 text-3xl">{errorContent.title}</h1>
              <p className="mb-10">{errorContent.content}</p>
              {errorContent.showButton &&
                <Link
                  className="mx-auto bg-primary-500 dark:bg-primary-800 text-primary-200 dark:text-primary-50 drop-shadow p-3 px-4 rounded text-xl transition duration-200 ease-in-out hover:ring-2 ring-offset-2 ring-primary-500"
                  href={'/api/auth/signin'}
                >
                  Sign in
                </Link>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  return {
    props: { basePath: process.env.NEXTAUTH_URL },
  };
}
