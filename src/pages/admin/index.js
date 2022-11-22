import { ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import AdminWrapper, { menuList } from '@/components/admin/Wrapper';
import Link from 'next/link';

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
        <div class="mx-auto mt-10 grid grid-cols-3 gap-12">
          {menuList.map((item) => (
            <Link
              href={item.href}
              className={`flex gap-6`}
            >
              <div className={`${item.classColor} p-4 rounded-full`}>{item.icon}</div>
              <div className="hover:text-secondary-700">
                <span className={`text-lg`} >
                  {item.title}
                </span>
                <p className="opacity-50 text-sm ">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </AdminWrapper>
    );
  }
  return null;
};

export default AdminIndex;
