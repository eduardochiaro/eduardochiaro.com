'use client';

import { menuList } from '@/utils/menuList';
import { Fragment } from 'react';
import Link from 'next/link';
import Logo from '@/components/icons/Logo';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { ArrowLeftCircleIcon } from 'lucide-react';
import Image from 'next/image';
import { signOut } from '@/actions/access';
import classNames from '@/utils/classNames';
import ThemeIcon from '@/components/ThemeIcon';

const SidebarDivider = ({ title }: { title: string }) => (
  <div className="mt-4 flex h-8 flex-row items-center">
    <span className={'dashed-border-t w-10 shrink'}></span>
    <div className={'text-primary-700 dark:text-primary-400 mx-3 text-xs font-semibold uppercase'}>{title}</div>
    <span className={'dashed-border-t w-full shrink'}></span>
  </div>
);

export default function Sidebar({ user }: { user: any }) {
  //replace url 'admin' to `dashboard`
  const newMenu = menuList.map((item) => {
    const links = item.links.map((link) => {
      link.href = link.href.replace('/admin', '/dashboard');
      return link;
    });
    return { ...item, links };
  });

  return (
    <div className="bg-primary-50 dark:bg-primary-800 flex h-full flex-col shadow">
      <div className="relative grow px-3 py-4">
        <Link href="/dashboard" className={'flex h-14 items-center gap-4 px-2 md:my-3'}>
          <Logo title="Eduardo Chiaro" className={'logo size-8'} />
          <span className={'font-header text-primary-700 dark:text-primary-400 text-xl font-semibold'}>Dashboard</span>
        </Link>
        {newMenu.map((item, i) => (
          <Fragment key={i}>
            <SidebarDivider title={item.title} />
            <ul className="space-y-2 font-medium">
              {item.links.map((link, key) => (
                <li key={key}>
                  <a
                    href={link.href}
                    className="group text-primary-900 hover:bg-primary-100 dark:text-primary-400 dark:hover:bg-primary-700 flex items-center rounded-lg p-2 dark:text-white"
                  >
                    <link.icon className="text-primary-500 group-hover:text-accent-500 dark:text-primary-400 h-5 w-5 transition duration-75 dark:group-hover:text-white" />
                    <span className="ms-3">{link.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Fragment>
        ))}
      </div>
      <div className={'md:bg-primary-100 dark:md:bg-primary-700 flex flex-row items-center justify-between gap-6 px-3 md:p-6'}>
        <Menu as="div" className="item-center relative flex">
          <MenuButton id="admin-menu-short" className="ring-primary-300 dark:ring-primary-500 h-7 w-7 rounded-full ring-2">
            {user && user.image && (
              <Image
                src={user.image as string}
                className="z-40 rounded-full"
                width={200}
                height={200}
                alt={`Logged as ${user.name}`}
                title={`Logged as ${user.name}`}
              />
            )}
            {user && !user.image && (
              <div className="bg-accent-200 dark:bg-accent-500 flex h-7 w-7 items-center justify-center rounded-full">
                <span className="text-primary-900 dark:text-primary-100 text-sm font-semibold">{user?.name?.charAt(0)}</span>
              </div>
            )}
          </MenuButton>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-300"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <MenuItems
              data-cy="user-settings-container"
              className="divide-primary-200 bg-primary-100 ring-primary-900 ring-opacity-10 dark:divide-primary-500 dark:bg-primary-700 absolute right-0 z-10 mt-10 w-36 transform divide-y rounded-md ring-1 shadow-lg focus:outline-none md:bottom-0 md:left-0 md:mb-10"
              aria-orientation="vertical"
              aria-labelledby="user-button"
            >
              <div className="py-1 font-semibold">
                <MenuItem>
                  {({ focus }) => (
                    <div
                      onClick={() => signOut()}
                      title="logout"
                      className={classNames('flex cursor-pointer items-center gap-2 px-4 py-2', focus ? 'bg-primary-300 dark:bg-primary-500' : '')}
                      role="menuitem"
                      id={'user-logout'}
                    >
                      <ArrowLeftCircleIcon className="inline-flex h-4" />
                      <span>Logout</span>
                    </div>
                  )}
                </MenuItem>
              </div>
            </MenuItems>
          </Transition>
        </Menu>
        <ThemeIcon orientation="top" />
      </div>
    </div>
  );
}
