import { redirect } from 'next/navigation';
import ThemeIcon from '@/components/ThemeIcon';
import Logo from '@/components/icons/Logo';
import getUser from '@/utils/getUser';
import ShowProviders from '@/components/ShowProviders';
import WireContainer from '@/components/frontend/WireContainer';
import Card from '@/components/frontend/Card';

export default async function SignIn() {
  const user = await getUser();
  if (user) {
    redirect('/admin');
  }
  return (
    <div>
      <div className="relative flex min-h-screen items-center justify-center">
        <div className="absolute top-4 right-4">
          <WireContainer>
            <ThemeIcon orientation="bottom" />
          </WireContainer>
        </div>
        <WireContainer type="large" className="mx-auto">
          <Card>
            <Logo title="Eduardo Chiaro" alt="Eduardo Chiaro" className={'logo mx-auto my-4 h-24'} />
            <h1 className="font-header my-6 text-center text-3xl">Not signed in</h1>
            <ShowProviders />
          </Card>
        </WireContainer>
      </div>
    </div>
  );
}
