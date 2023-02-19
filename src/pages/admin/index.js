import { useSession } from 'next-auth/react';
import AdminWrapper, { menuList } from '@/components/admin/Wrapper';
import Link from 'next/link';

const AdminIndex = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <AdminWrapper>
        <div className="h-full py-8 px-6 grow min-h-screen">
          <h1 className="text-2xl flex items-center gap-2 pb-4 border-b border-primary-200 dark:border-primary-600">Dashboard</h1>
          {menuList.map((item) => (
            <>
              <h3
                className="mt-8
             text-2xl"
              >
                {item.title}
              </h3>
              <div className="mx-auto mt-10 grid grid-cols-2 xl:grid-cols-3 gap-12">
                {item.links.map((link) => (
                  <Link key={link.title} href={link.href} className={'flex items-center gap-4'}>
                    <div className={`${link.classColor} p-3 rounded-full h-fit text-primary-50`}>{link.icon}</div>
                    <div className="hover:text-secondary-600">
                      <span className={'text-lg'}>{link.title}</span>
                      <p className="opacity-50 text-sm ">{link.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ))}
        </div>
      </AdminWrapper>
    );
  }
  return null;
};

export default AdminIndex;
