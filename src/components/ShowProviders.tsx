import GitHubIcon from '@/components/icons/Github';
import GoogleIcon from '@/components/icons/Google';
import { signIn } from '@/auth';

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
        <form
          key={provider}
          action={async () => {
            'use server';
            await signIn(provider, { redirectTo: '/admin' });
          }}
        >
          <button
            type="submit"
            className="bg-primary-300 text-primary-700 ring-primary-300 ring-offset-primary-100 dark:bg-primary-900 dark:text-primary-50 dark:ring-primary-700 dark:ring-offset-primary-600 mx-auto flex cursor-pointer items-center gap-4 rounded-md p-3 px-4 text-lg ring-offset-2 drop-shadow transition duration-300 ease-in-out hover:ring-2"
          >
            <LogoProvider id={provider} />
            Sign in with {provider.charAt(0).toUpperCase() + provider.slice(1)}
          </button>
        </form>
      ))}
    </div>
  );
};

export default ShowProviders;
