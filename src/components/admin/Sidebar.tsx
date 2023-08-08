'use client';

import { Fragment, ReactElement, useEffect, useState } from 'react';
import NavLink from '@/components/NavLink';
import styles from '@/styles/Admin.Sidebar.module.scss';
import { ArrowLeftCircleIcon, Bars3BottomRightIcon, CodeBracketIcon, HomeIcon } from '@heroicons/react/24/solid';
import { Menu, Transition } from '@headlessui/react';
import { useSession, signOut } from 'next-auth/react';
import ThemeIcon from '../ThemeIcon';
import Image from 'next/image';
import classNames from '@/utils/classNames';
import Logo from '../icons/Logo';
import { menuList } from '@/components/layouts/Backend';
import Link from 'next/link';

const SidebarDivider = ({ title, openMenu }: { title: string; openMenu: boolean }) => (
  <li>
    <div className="flex flex-row items-center h-8">
      <span className={`w-10 dashed-border-t shrink  ${openMenu ? '' : 'hidden'}`}></span>
      <div className={`text-sm font-light tracking-wide mx-3 ${openMenu ? '' : styles['hide-when-closed']}`}>{title}</div>
      <span className={'w-full dashed-border-t shrink'}></span>
    </div>
  </li>
);

const AdminSidebar = ({ isPageOpen }: { isPageOpen: boolean }) => {
  const { data: session } = useSession();
  const [openMenu, setOpenMenu] = useState(true);
  useEffect(() => {
    setOpenMenu(!isPageOpen);
  }, [isPageOpen]);
  return (
    <div className={`relative sm:relative z-40 md:h-full ${openMenu ? styles['sidebar-open'] : styles['sidebar-closed']}`}>
      <div className="flex md:flex-col justify-between md:min-h-screen bg-primary-200 dark:bg-primary-600 md:fixed">
        <div className="grow px-3 md:p-3 relative">
          <Link href="/admin" className={`flex items-center gap-4 h-14 md:my-3 ${styles['sidebar-logo']}`}>
            <div className={`${openMenu ? '' : 'md:mx-auto'}`}>
              <Logo title="Eduardo Chiaro" className={'h-6 logo'} />
            </div>
            <span className={`text-3xl font-header font-semibold ${!openMenu ? 'md:hidden' : 'block'}`}>Admin</span>
          </Link>
          <button onClick={() => setOpenMenu(!openMenu)} className="absolute top-1 right-1 hidden md:block">
            <Bars3BottomRightIcon className="w-5" />
          </button>
          <ul className="grow hidden md:flex flex-col space-y-1 font-semibold tracking-wider ">
            <li>
              <NavLink
                type="sub"
                href="/admin"
                as="/admin"
                className={`${styles['sidebar-link']} group border-transparent `}
                activeClassName={`${styles['sidebar-link']} group bg-primary-50 dark:bg-primary-800 rounded-md`}
              >
                <a className="flex items-center gap-2" title="Dashboard">
                  <HomeIcon className="w-5 group-hover:text-secondary-600 dark:group-hover:text-secondary-600" />
                  <span className={`text-sm tracking-wide truncate group-hover:hunderline hidden xl:block ${openMenu ? '' : styles['hide-when-closed']}`}>
                    Dashboard
                  </span>
                </a>
              </NavLink>
            </li>
            <li>
              <NavLink
                type="sub"
                href="/admin/preview"
                as="/admin/preview"
                className={`${styles['sidebar-link']} group border-transparent `}
                activeClassName={`${styles['sidebar-link']} group bg-primary-50 dark:bg-primary-800 rounded-md`}
              >
                <a className="flex items-center gap-2" title="preview">
                  <CodeBracketIcon className="w-5 group-hover:text-secondary-600 dark:group-hover:text-secondary-600" />
                  <span className={`text-sm tracking-wide truncate group-hover:hunderline hidden xl:block ${openMenu ? '' : styles['hide-when-closed']}`}>
                    Preview
                  </span>
                </a>
              </NavLink>
            </li>
            {menuList.map((item, key) => (
              <Fragment key={`group-${key}`}>
                <SidebarDivider title={item.title} openMenu={openMenu} />
                {item.links.map((link, index: number) => (
                  <li key={`menu-${index}`}>
                    <NavLink
                      type="sub"
                      href={link.href}
                      as={link.href}
                      className={`${styles['sidebar-link']} group border-transparent `}
                      activeClassName={`${styles['sidebar-link']} group bg-primary-50 dark:bg-primary-800 rounded-md`}
                    >
                      <a className="flex items-center gap-2" title={link.title}>
                        <link.icon className="w-5 group-hover:text-secondary-600 dark:group-hover:text-secondary-600" />
                        <span className={`text-sm tracking-wide truncate group-hover:hunderline hidden xl:block ${openMenu ? '' : styles['hide-when-closed']}`}>
                          {link.title}
                        </span>
                      </a>
                    </NavLink>
                  </li>
                ))}
              </Fragment>
            ))}
          </ul>
        </div>
        <div
          className={`px-3 md:p-6 md:bg-primary-300 dark:md:bg-primary-500 flex items-center justify-between gap-6 ${openMenu ? 'flex-row' : 'md:flex-col'}`}
        >
          <Menu as="div" className="relative flex item-center">
            <Menu.Button id="admin-menu-short" className="h-7 w-7 rounded-full ring-2 ring-primary-300 dark:ring-primary-500">
              {session && session.user && (
                <Image
                  src={session.user.image as string}
                  className="rounded-full z-40"
                  width={200}
                  height={200}
                  alt={`Logged as ${session.user.name}`}
                  title={`Logged as ${session.user.name}`}
                />
              )}
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-300"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Menu.Items
                data-cy="user-settings-container"
                className="transform absolute md:left-0 md:bottom-0 md:mb-10 right-0 mt-10 z-10 w-36 rounded-md shadow-lg ring-1 ring-primary-900 ring-opacity-10 focus:outline-none bg-primary-100 dark:bg-primary-700 divide-y divide-primary-200 dark:divide-primary-500"
                aria-orientation="vertical"
                aria-labelledby="user-button"
              >
                <div className="py-1 font-semibold">
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        onClick={() => signOut()}
                        title="logout"
                        className={classNames('py-2 px-4 cursor-pointer flex items-center gap-2', active ? 'bg-primary-300 dark:bg-primary-500' : '')}
                        role="menuitem"
                        id={'user-logout'}
                      >
                        <ArrowLeftCircleIcon className="inline-flex h-4" />
                        <span>Logout</span>
                      </div>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <ThemeIcon orientation="top" />
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
