import AdminSidebar from './Sidebar';
import { useSession } from 'next-auth/react';
import {
  BriefcaseIcon,
  CpuChipIcon,
  CommandLineIcon,
  TagIcon,
  BookmarkIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';
import React, { Fragment } from 'react';

const menuList = [
  {
    title: 'Menu links',
    icon: <Bars3Icon className="w-5 group-hover:text-secondary-700 dark:group-hover:text-secondary-600" />,
    href: '/admin/menu',
    description: 'Set up primary navigation menu',
    classColor: 'bg-secondary-700'
  },
  {
    title: 'Categories',
    icon: <TagIcon className="w-5 group-hover:text-secondary-700 dark:group-hover:text-secondary-600" />,
    href: '/admin/categories',
    description: 'Manage categories used in several other sections',
    classColor: 'bg-cyan-700'
  },
  {
    title: 'Jobs',
    icon: <BriefcaseIcon className="w-5 group-hover:text-secondary-700 dark:group-hover:text-secondary-600" />,
    href: '/admin/jobs',
    description: 'Manage entries on Jobs section in Homepage',
    classColor: 'bg-emerald-700'
  },
  {
    title: 'Skills',
    icon: <CommandLineIcon className="w-5 group-hover:text-secondary-700 dark:group-hover:text-secondary-600" />,
    href: '/admin/skills',
    description: 'Manage entries on Skills section in Homepage',
    classColor: 'bg-amber-700'
  },
  {
    title: 'Apps',
    icon: <CpuChipIcon className="w-5 group-hover:text-secondary-700 dark:group-hover:text-secondary-600" />,
    href: '/admin/apps',
    description: 'Manage entries on Apps in Projects page',
    classColor: 'bg-indigo-700'
  },
  {
    title: 'Bookmarks',
    icon: <BookmarkIcon className="w-5 group-hover:text-secondary-700 dark:group-hover:text-secondary-600" />,
    href: '/admin/bookmarks',
    description: 'Manage entries for bookmarks page',
    classColor: 'bg-red-700'
  },
];

export { menuList };

const AdminWrapper = ({ children }) => {

  return (
    <div className="w-full h-full antialiased bg-primary-50 dark:bg-primary-800">
      <div className="flex flex-no-wrap">
        <AdminSidebar menuList={menuList} />
        <div className="h-full pb-4 px-6 w-full">
          <div className="flex items-center h-14 px-4 border-b border-primary-200 dark:border-primary-600">
            <div className="flex-1">
              {React.Children.map(children, (child) => {
                if (child.type === AdminWrapprerHeader) {
                  return React.cloneElement(child);
                }
              })}
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
