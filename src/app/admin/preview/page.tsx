import { getServerSession } from 'next-auth';
import { Metadata } from 'next';
import authOptions from '@/config/nextAuth';
import BackendLayout from '@/components/layouts/Backend';

export const metadata: Metadata = {
  title: 'Admin > Preview | Eduardo Chiaro',
};

export default async function AdminMenuIndex() {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <BackendLayout isPageOpen={false}>
        <iframe className="h-screen w-full" src="/" allowTransparency={true}></iframe>
      </BackendLayout>
    );
  }
  return null;
}
