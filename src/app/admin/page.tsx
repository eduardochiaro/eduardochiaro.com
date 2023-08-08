import BackendLayout, { menuList } from '@/components/layouts/Backend';
import Link from 'next/link';
import * as React from 'react';
import getFirstName from '@/utils/getFirstName';
import authOptions from '@/config/nextAuth';
import { getServerSession } from 'next-auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin | Eduardo Chiaro',
};

export default async function AdminIndex() {
  const session = await getServerSession(authOptions);
  if (session) {
    return (
      <BackendLayout isPageOpen={false}>
        <div className="h-full py-8 px-6 grow min-h-screen">
          <h1 className="text-3xl font-semibold flex items-center gap-2 pb-4">
            Welcome back{session.user ? ', ' + getFirstName(session.user.name as string) : ''}
          </h1>
          {menuList.map((item, i) => (
            <React.Fragment key={i}>
              <h3
                className="mt-8
             text-2xl"
              >
                {item.title}
              </h3>
              <div className="mx-auto mt-4 flex flex-wrap gap-6 md:gap-12">
                {item.links.map((link, key) => (
                  <Link
                    key={key}
                    href={link.href}
                    className={`w-full md:w-72 md:h-52 flex md:flex-col items-start gap-2 group drop-shadow rounded-lg transition duration-300 hover:scale-110 ${link.classColor} text-primary-50 p-4`}
                  >
                    <link.icon className={'w-10 md:w-12'} />
                    <div className="md:flex-1 "></div>
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
}
