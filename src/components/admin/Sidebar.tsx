'use client';

import { Fragment, useEffect, useState } from 'react';
import NavLink from '@/components/NavLink';
import styles from '@/styles/Admin.Sidebar.module.css';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import ThemeIcon from '../ThemeIcon';
import Image from 'next/image';
import classNames from '@/utils/classNames';
import Logo from '../icons/Logo';
import { menuList } from '@/utils/menuList';
import Link from 'next/link';
import { signOutAction } from '@/actions/access';
import useStaleSWR from '@/utils/staleSWR';
import { CircleArrowLeftIcon, HouseIcon, MenuIcon, ScanEyeIcon } from 'lucide-react';

const SidebarDivider = ({ title, openMenu }: { title: string; openMenu: boolean }) => (
  <li>
    <div className="flex h-8 flex-row items-center">
      <span className={`dashed-border-t w-10 shrink ${openMenu ? '' : 'hidden'}`}></span>
      <div className={`mx-3 text-sm font-light tracking-wide ${openMenu ? '' : styles['hide-when-closed']}`}>{title}</div>
      <span className={'dashed-border-t w-full shrink'}></span>
    </div>
  </li>
);

const AdminSidebar = ({ isPageOpen }: { isPageOpen: boolean }) => {
  const [openMenu, setOpenMenu] = useState(true);
  useEffect(() => {
    setOpenMenu(!isPageOpen);
  }, [isPageOpen]);

  const { data: user } = useStaleSWR('/api/me');

  const signOut = () => {
    signOutAction();
  };

  return (
    <div className={`relative z-40 flex-none sm:relative md:h-screen ${openMenu ? styles['sidebar-open'] : styles['sidebar-closed']}`}>
      <div className="bg-primary-200 dark:bg-primary-600 flex justify-between md:fixed md:min-h-screen md:flex-col">
        <div className="relative grow px-3 md:p-3">
          <Link href="/admin" className={`flex h-14 items-center gap-4 px-2 md:my-3 ${styles['sidebar-logo']}`}>
            <div className={`${openMenu ? '' : 'md:mx-auto'}`}>
              <Logo title="Eduardo Chiaro" className={'logo size-8'} />
            </div>
            <span className={`font-header text-xl font-semibold ${!openMenu ? 'md:hidden' : 'block'}`}>Admin</span>
          </Link>
          <button onClick={() => setOpenMenu(!openMenu)} className="absolute top-1 right-1 hidden md:block">
            <MenuIcon className="w-5 stroke-[3px]" />
          </button>
          <ul className="hidden grow flex-col space-y-1 font-semibold tracking-wider md:flex">
            <li>
              <NavLink
                type="sub"
                href="/admin"
                as="/admin"
                className={`${styles['sidebar-link']} group border-transparent`}
                activeClassName={`${styles['sidebar-link']} group bg-primary-50 dark:bg-primary-800 rounded-md flex items-center gap-2`}
              >
                <span className="flex items-center gap-2" title="Dashboard">
                  <HouseIcon className="group-hover:text-secondary-600 dark:group-hover:text-secondary-600 w-5" />
                  <span className={`group-hover:hunderline hidden truncate text-sm tracking-wide xl:block ${openMenu ? '' : styles['hide-when-closed']}`}>
                    Dashboard
                  </span>
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                type="sub"
                href="/admin/preview"
                as="/admin/preview"
                className={`${styles['sidebar-link']} group border-transparent`}
                activeClassName={`${styles['sidebar-link']} group bg-primary-50 dark:bg-primary-800 rounded-md`}
              >
                <span className="flex items-center gap-2" title="preview">
                  <ScanEyeIcon className="group-hover:text-secondary-600 dark:group-hover:text-secondary-600 w-5" />
                  <span className={`group-hover:hunderline hidden truncate text-sm tracking-wide xl:block ${openMenu ? '' : styles['hide-when-closed']}`}>
                    Preview
                  </span>
                </span>
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
                      className={`${styles['sidebar-link']} group border-transparent`}
                      activeClassName={`${styles['sidebar-link']} group bg-primary-50 dark:bg-primary-800 rounded-md`}
                    >
                      <span className="flex items-center gap-2" title={link.title}>
                        <link.icon className="group-hover:text-secondary-600 dark:group-hover:text-secondary-600 w-5" />
                        <span className={`group-hover:hunderline hidden truncate text-sm tracking-wide xl:block ${openMenu ? '' : styles['hide-when-closed']}`}>
                          {link.title}
                        </span>
                      </span>
                    </NavLink>
                  </li>
                ))}
              </Fragment>
            ))}
          </ul>
        </div>
        <div
          className={`md:bg-primary-300 dark:md:bg-primary-500 flex items-center justify-between gap-6 px-3 md:p-6 ${openMenu ? 'flex-row' : 'md:flex-col'}`}
        >
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
                className="divide-primary-200 bg-primary-100 ring-primary-900 ring-opacity-10 dark:divide-primary-500 dark:bg-primary-700 absolute right-0 z-10 mt-10 w-36 transform divide-y rounded-md shadow-lg ring-1 focus:outline-none md:bottom-0 md:left-0 md:mb-10"
                aria-orientation="vertical"
                aria-labelledby="user-button"
              >
                <div className="py-1 font-semibold">
                  <MenuItem>
                    {({ active }) => (
                      <div
                        onClick={() => signOut()}
                        title="logout"
                        className={classNames('flex cursor-pointer items-center gap-2 px-4 py-2', active ? 'bg-primary-300 dark:bg-primary-500' : '')}
                        role="menuitem"
                        id={'user-logout'}
                      >
                        <CircleArrowLeftIcon className="inline-flex h-4" />
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
    </div>
  );
};

export default AdminSidebar;
