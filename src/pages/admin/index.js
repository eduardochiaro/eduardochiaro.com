import { ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import AdminWrapper from '@/components/admin/Wrapper';

const AdminIndex = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <AdminWrapper>
        <Head>
          <title>Eduardo Chiaro | Admin</title>
        </Head>
        <AdminWrapper.Header>
          <h1 className="text-2xl flex items-center gap-2">
            <ComputerDesktopIcon className="h-6 text-secondary-700 dark:text-secondary-600" /> Dashboard
          </h1>
        </AdminWrapper.Header>
      </AdminWrapper>
    );
  }
  return null;
};

export default AdminIndex;
