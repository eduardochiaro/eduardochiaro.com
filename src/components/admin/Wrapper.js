import AdminSidebar from './Sidebar';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid';
import ThemeIcon from '@/components/ThemeIcon';
import React from 'react';

const AdminWrapper = ({ children }) => {
  const { data: session } = useSession();

  return (
    <div className="w-full h-full antialiased bg-primary-50 dark:bg-primary-800">
      <div className="flex flex-no-wrap">
        <AdminSidebar />
        <div className="h-full py-4 px-6 w-full">
          <div className="flex items-center h-14 px-4 border-b border-primary-200 dark:border-primary-600">
            <div className="flex-1">
              {React.Children.map(children, (child) => {
                if (child.type === AdminWrapprerHeader) {
                  return React.cloneElement(child);
                }
              })}
            </div>
            <div className="flex items-center justify-end">
              <div className="h-7 w-7 inline-block align-middle relative rounded-full border-2 border-primary-800 dark:border-primary-400">
                <Image
                  src={session.user.image}
                  className="rounded-full z-40"
                  width={200}
                  height={200}
                  alt={`Logged as ${session.user.name}`}
                  title={`Logged as ${session.user.name}`}
                />
              </div>
              <div className="inline-block z-50 mr-4 ml-2 mt-2">
                <a onClick={() => signOut()} title="logout" className="cursor-pointer focus:outline-none text-xs flex items-center gap-1">
                  <span>Logout</span>
                  <ArrowLeftCircleIcon className="inline-flex h-4" />
                </a>
              </div>
              <ThemeIcon />
            </div>
          </div>
          <div className="pt-4 pb-10 px-4">
            {React.Children.map(children, (child) => {
              if (child.type !== AdminWrapprerHeader) {
                return React.cloneElement(child);
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
const AdminWrapprerHeader = ({ children }) => children;

AdminWrapper.Header = AdminWrapprerHeader;

export default AdminWrapper;
