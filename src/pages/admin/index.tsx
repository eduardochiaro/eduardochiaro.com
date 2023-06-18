import { useSession } from 'next-auth/react';
import BackendLayout, { menuList } from '@/components/layouts/Backend';
import Link from 'next/link';
import * as React from 'react';
import getFirstName from '../../utils/getFirstName';

const AdminIndex = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <BackendLayout isPageOpen={false}>
        <div className="h-full py-8 px-6 grow min-h-screen">
          <h1 className="text-3xl font-semibold flex items-center gap-2 pb-4">Welcome back{ session.user ? ', ' + getFirstName(session.user.name as string) : ''}</h1>
          {menuList.map((item, i) => (
            <React.Fragment key={i}>
              <h3
                className="mt-8
             text-2xl"
              >
                {item.title}
              </h3>
              <div className="mx-auto mt-4 flex flex-wrap gap-12">
                {item.links.map((link, key) => (
                  <Link key={key} href={link.href} className={`w-72 h-52 flex flex-col group drop-shadow rounded-lg transition duration-300 hover:scale-110 ${link.classColor} text-primary-50 p-4`}>
                    <link.icon className={`w-12 h-12`}/>
                    <div className="flex-1 "></div>
                    <div className="">
                      <span className={'text-lg'}>{link.title}</span>
                      <p className="opacity-50 text-sm ">{link.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </React.Fragment>
          ))}
        </div>
      </BackendLayout>
    );
  }
  return null;
};

export default AdminIndex;
