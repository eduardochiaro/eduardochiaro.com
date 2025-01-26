import * as React from 'react';
import Logo from '@/components/icons/Logo';
import ThemeIcon from '@/components/ThemeIcon';
import Link from 'next/link';
import WireContainer from '@/components/frontend/WireContainer';
import Card from '@/components/frontend/Card';

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

export default async function Error(props: { searchParams: Promise<any> }) {
  const searchParams = await props.searchParams;
  const { error } = searchParams;
  const errorContent = getError(error);

  return (
    <div className="relative flex min-h-screen items-center justify-center">
      <div className="absolute top-4 right-4">
        <WireContainer>
          <ThemeIcon orientation="bottom" />
        </WireContainer>
      </div>
      <WireContainer type="large" className="mx-auto">
        <Card className={'text-center'}>
          <Logo title="Eduardo Chiaro" alt="Eduardo Chiaro" className={'mx-auto h-20 w-20'} />
          <h1 className="font-header my-6 text-3xl">{errorContent.title}</h1>
          <p className="mb-10">{errorContent.content}</p>
          {errorContent.showButton && (
            <Link
              className="bg-primary-300 text-primary-700 ring-primary-300 ring-offset-primary-100 dark:bg-primary-900 dark:text-primary-50 dark:ring-primary-700 dark:ring-offset-primary-600 mx-auto cursor-pointer gap-4 rounded-md p-3 px-4 text-lg ring-offset-2 drop-shadow transition duration-300 ease-in-out hover:ring-2"
              prefetch={false}
              href={'/access/signin'}
            >
              Sign in
            </Link>
          )}
        </Card>
      </WireContainer>
    </div>
  );
}
