import AdminSidebar from './Sidebar';
import Image from 'next/future/image';
import { useSession, signOut } from 'next-auth/react'
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import ThemeIcon from '@/components/ThemeIcon';
import React from 'react';

const AdminWrapper = ({ children, header = '' }) => {
  const { data: session } = useSession();

  return (
    <div className="w-full h-full antialiased bg-zinc-50 dark:bg-zinc-800">
      <div className="flex flex-no-wrap">
        <AdminSidebar/>
        <div className="h-full py-4 px-6 w-full">
          <div className="flex items-center h-14 px-4 border-b border-zinc-200 dark:border-zinc-600">
            <div className="flex-1">
            {React.Children.map(children, child => {
              if (child.type === AdminWrapprerHeader) {
                return React.cloneElement(child);
              }
            })}
            </div>
            <div className="flex items-center justify-end">
              <div className="h-7 w-7 inline-block mr-5 align-middle relative rounded-full border border-zinc-800 dark:border-zinc-400">
                <Image
                  src={session.user.image}
                  className="rounded-full"
                  width={200}
                  height={200}
                  alt={`Logged as ${session.user.name}`}
                  title={`Logged as ${session.user.name}`}
                />
              </div>
              <div className="inline-block mr-4">
                <a onClick={() => signOut()} title="logout" className="cursor-pointer focus:outline-none">
                  <ArrowLeftCircleIcon className="inline-flex h-5" />
                </a>
              </div>
              <ThemeIcon />
            </div>
          </div>
          <div className="pt-4 pb-10 px-4">
            {React.Children.map(children, child => {
              if (child.type !== AdminWrapprerHeader) {
                return React.cloneElement(child);
              }
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
const AdminWrapprerHeader = ({ children }) => children;

AdminWrapper.Header = AdminWrapprerHeader;

export default AdminWrapper;