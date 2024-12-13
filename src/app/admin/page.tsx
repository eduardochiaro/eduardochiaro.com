import BackendLayout from '@/components/layouts/Backend';
import Link from 'next/link';
import * as React from 'react';
import getFirstName from '@/utils/getFirstName';
import { Metadata } from 'next';
import getUser from '@/utils/getUser';
import { menuList } from '@/utils/menuList';
import classNames from '@/utils/classNames';

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
                <h3 className="mt-8 text-2xl">{item.title}</h3>
                <div className="mt-4 flex flex-wrap gap-6">
                  {item.links.map((link, key) => (
                    <Link
                      key={key}
                      href={link.href}
                      className={`group flex w-full items-start gap-2 rounded-lg drop-shadow transition duration-300 hover:scale-110 md:h-52 md:w-72 md:flex-col ${link.classColor} p-4 text-primary-50`}
                    >
                      <div className="inline-block rounded bg-primary-50 p-1">
                        <link.icon className={classNames('size-6 text-primary-950 md:size-8', link.textColor)} />
                      </div>
                      <div className="md:flex-1"></div>
                      <div className="">
                        <span className={'text-lg'}>{link.title}</span>
                        <p className="text-sm opacity-50">{link.description}</p>
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
