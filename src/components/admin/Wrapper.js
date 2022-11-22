import AdminSidebar from './Sidebar';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid';
import {
  BriefcaseIcon,
  CpuChipIcon,
  CommandLineIcon,
  TagIcon,
  BookmarkIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';
import ThemeIcon from '@/components/ThemeIcon';
import { Menu, Transition } from '@headlessui/react';
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
  const { data: session } = useSession();

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
            <div className="flex items-center gap-4 justify-end">
              <Menu as="div" className="relative flex item-center">
                <Menu.Button className="h-7 w-7 relative rounded-full border-2 border-primary-800 dark:border-primary-400">
                  <Image
                    src={session.user.image}
                    className="rounded-full z-40"
                    width={200}
                    height={200}
                    alt={`Logged as ${session.user.name}`}
                    title={`Logged as ${session.user.name}`}
                  />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Menu.Items
                    data-cy="change-mode-container"
                    className="transform absolute right-0 z-10 mt-10 w-56 origin-bottom-right rounded-md shadow-lg ring-1 ring-primary-900 ring-opacity-10 focus:outline-none bg-primary-100 dark:bg-primary-700 divide-y divide-primary-200 dark:divide-primary-600"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                  >
                    <div className="py-1 font-semibold">
                      <Menu.Item>
                        <div onClick={() => signOut()} title="logout" className="py-2 px-4 cursor-pointer flex items-center gap-2">
                          <ArrowLeftCircleIcon className="inline-flex h-4" />
                          <span>Logout</span>
                        </div>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
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
