import authOptions from '@/config/nextAuth';
import ShowProviders from '@/components/ShowProviders';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import ThemeIcon from '@/components/ThemeIcon';
import Logo from '@/components/icons/Logo';

export default async function SignIn({ searchParams }: { searchParams: any }) {
  const session = await getServerSession(authOptions);
  const { callbackUrl } = searchParams;
  if (session && callbackUrl) {
    redirect(callbackUrl);
  }
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen relative">
        <div className="absolute top-4 right-4">
          <ThemeIcon orientation="bottom" />
        </div>
        <div className="w-full px-10 py-8 mx-auto">
          <div className="max-w-sm mx-auto space-y-6">
            <div className="box-card px-4 py-6 text-center">
              <Logo title="Eduardo Chiaro" alt="Eduardo Chiaro" className={'h-24 my-4 mx-auto logo'} />
              <h1 className="font-header my-6 text-3xl">Not signed in</h1>
              <ShowProviders />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
