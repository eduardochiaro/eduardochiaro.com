import BackendLayout from '@/components/layouts/Backend';
import Link from 'next/link';
import * as React from 'react';
import getFirstName from '@/utils/getFirstName';
import { Metadata } from 'next';
import getUser from '@/utils/getUser';
import { menuList } from '@/utils/menuList';

export const metadata: Metadata = {
  title: 'Admin | Eduardo Chiaro',
};

export default async function AdminIndex() {
  const user = await getUser();
  if (user) {
    return (
      <BackendLayout isPageOpen={false}>
        <div className="h-full grow">
          <div className="h-screen overflow-auto px-6 py-8">
            <h1 className="flex items-center gap-2 pb-4 text-3xl font-semibold">Welcome back{user ? ', ' + getFirstName(user.name as string) : ''}</h1>
            {menuList.map((item, i) => (
              <React.Fragment key={i}>
                <h3
                  className="mt-8
             text-2xl"
                >
                  {item.title}
                </h3>
                <div className="mt-4 grid w-fit grid-cols-5 gap-6 md:grid-cols-3">
                  {item.links.map((link, key) => (
                    <Link
                      key={key}
                      href={link.href}
                      className={`group flex w-full items-start gap-2 rounded-lg drop-shadow transition duration-300 hover:scale-110 md:h-52 md:w-72 md:flex-col ${link.classColor} p-4 text-primary-50`}
                    >
                      <link.icon className={'w-10 md:w-12'} />
                      <div className="md:flex-1 "></div>
                      <div className="">
                        <span className={'text-lg'}>{link.title}</span>
                        <p className="text-sm opacity-50 ">{link.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </BackendLayout>
    );
  }
  return null;
}
