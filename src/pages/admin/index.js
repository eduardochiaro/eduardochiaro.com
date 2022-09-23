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
        <div className="flex my-2">
          <h1 className="flex-auto text-4xl">
            <ComputerDesktopIcon className="inline-flex align-text-bottom h-10 text-primary-700 dark:text-primary-600" /> Dashboard
          </h1>
        </div>
      </AdminWrapper>
    );
  }
  return null;
};

export default AdminIndex;
