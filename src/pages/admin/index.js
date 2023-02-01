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
        <div className="h-full py-8 px-6 grow min-h-screen">
          <h1 className="text-2xl flex items-center gap-2 pb-4 border-b border-primary-200 dark:border-primary-600">
            Dashboard
          </h1>
          <div className="mx-auto mt-10 grid grid-cols-2 xl:grid-cols-3 gap-12">
            {menuList.map((item) => (
              <Link key={item.title} href={item.href} className={'flex items-center gap-4'}>
                <div className={`${item.classColor} p-2 rounded-full h-fit text-primary-50`}>{item.icon}</div>
                <div className="hover:text-secondary-600">
                  <span className={'text-lg'}>{item.title}</span>
                  <p className="opacity-50 text-sm ">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </AdminWrapper>
    );
  }
  return null;
};

export default AdminIndex;
