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
        <div className="h-full min-h-screen grow px-6 py-8">
          <h1 className="flex items-center gap-2 pb-4 text-3xl font-semibold">
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
      </BackendLayout>
    );
  }
  return null;
}
