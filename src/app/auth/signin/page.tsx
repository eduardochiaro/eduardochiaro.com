import GitHubIcon from '@/components/icons/Github';
import { redirect } from 'next/navigation';
import ThemeIcon from '@/components/ThemeIcon';
import Logo from '@/components/icons/Logo';
import getUser from '@/utils/getUser';
import ShowProviders from '@/components/ShowProviders';

export default async function SignIn({ searchParams }: { searchParams: any }) {
  const user = await getUser();
  if (user) {
    redirect('/admin');
  }
  return (
    <div>
      <div className="relative flex min-h-screen items-center justify-center">
        <div className="absolute right-4 top-4">
          <ThemeIcon orientation="bottom" />
        </div>
        <div className="mx-auto w-full px-10 py-8">
          <div className="mx-auto max-w-sm space-y-6">
            <div className="box-card px-4 py-6 text-center">
              <Logo title="Eduardo Chiaro" alt="Eduardo Chiaro" className={'logo mx-auto my-4 h-24'} />
              <h1 className="my-6 font-header text-3xl">Not signed in</h1>
              <ShowProviders />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
