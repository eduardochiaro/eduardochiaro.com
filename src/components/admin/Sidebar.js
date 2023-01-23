import { HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import NavLink from '@/components/NavLink';
import styles from '@/styles/Admin.Sidebar.module.scss';
import Logo from '@/components/icons/logo';
import { Fragment, useState } from 'react';
import { ArrowLeftCircleIcon, Bars3BottomRightIcon } from '@heroicons/react/24/solid';
import { Menu, Transition } from '@headlessui/react';
import { useSession, signOut } from 'next-auth/react';
import ThemeIcon from '../ThemeIcon';
import Image from 'next/image';
import classNames from '@/utils/classNames';

const AdminSidebar = ({ menuList, isPageOpen }) => {
  const { data: session } = useSession();
  const [openMenu, setOpenMenu] = useState(true);
  return (
    <div
      className={`transition-all ease-in-out relative duration-300 sm:relative md:h-full ${
        openMenu && !isPageOpen ? styles['sidebar-open'] : styles['sidebar-closed']
      }`}
    >
      <div className="flex flex-col justify-between min-h-screen bg-primary-200 dark:bg-primary-700">
        <div className="grow p-3 pr-0 relative">
          <div className="flex items-center gap-4 h-14 my-3 border-b border-primary-300 dark:border-primary-500 px-3 mr-3">
            <Logo title="Eduardo Chiaro" alt="Eduardo Chiaro" className="h-6 text-secondary-700" />
            <div className={`grow font-bold font-header hidden xl:block ${openMenu && !isPageOpen ? '' : styles['hide-when-closed']}`}>Eduardo Chiaro</div>
          </div>
          <button onClick={() => setOpenMenu(!openMenu)} className="absolute top-4 right-4">
            <Bars3BottomRightIcon className="w-5" />
          </button>
          <ul className="grow flex flex-col py-4 space-y-1 font-semibold tracking-wider">
            <li>
              <Link
                href="/"
                className={`${styles['sidebar-link']} group border-transparent hover:border-secondary-700 dark:hover:border-secondary-600`}
                alt="Website"
                title="Website"
              >
                <HomeIcon className="w-5 group-hover:text-secondary-700 dark:group-hover:text-secondary-600" />
                <span
                  className={`text-sm tracking-wide truncate group-hover:hunderline hidden xl:block ${
                    openMenu && !isPageOpen ? '' : styles['hide-when-closed']
                  }`}
                >
                  Website
                </span>
              </Link>
            </li>
            <li>
              <div className="flex flex-row items-center h-8 mr-3">
                <span className="w-10 border-t border-secondary-700 dark:border-secondary-600 border-dashed shrink"></span>
                <div className={`text-sm font-light tracking-wide mx-3 ${openMenu && !isPageOpen ? '' : styles['hide-when-closed']}`}>Menu</div>
                <span className="w-full border-t border-secondary-700 dark:border-secondary-600 border-dashed shrink"></span>
              </div>
            </li>
            {menuList.map((item) => (
              <li key={item.title}>
                <NavLink
                  href={item.href}
                  as={item.href}
                  className={`${styles['sidebar-link']} group border-transparent `}
                  activeClassName={`${styles['sidebar-link']} group text-secondary-700 dark:text-secondary-600 bg-primary-100 dark:bg-primary-800 rounded-l-lg`}
                >
                  <a className="flex items-center gap-2" alt={item.title} title={item.title}>
                    {item.icon}
                    <span
                      className={`text-sm tracking-wide truncate group-hover:hunderline hidden xl:block ${
                        openMenu && !isPageOpen ? '' : styles['hide-when-closed']
                      }`}
                    >
                      {item.title}
                    </span>
                  </a>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 border-t border-primary-300 dark:border-primary-600 flex items-center justify-between">
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
                data-cy="user-settings-container"
                className="transform absolute left-0 bottom-0 mb-10 z-10 w-56 rounded-md shadow-lg ring-1 ring-primary-900 ring-opacity-10 focus:outline-none bg-primary-100 dark:bg-primary-700 divide-y divide-primary-200 dark:divide-primary-600"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-button"
                tabIndex="-1"
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
                        tabIndex="-1"
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
