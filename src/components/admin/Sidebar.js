import {
  BriefcaseIcon,
  CpuChipIcon,
  CommandLineIcon,
  HomeIcon,
  TagIcon,
  BookmarkIcon,
  Bars3Icon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import NavLink from '@/components/NavLink';
import styles from '@/styles/Admin.Sidebar.module.scss';
import Logo from '@/components/icons/logo';
import { useState } from 'react';

const AdminSidebar = () => {
  const [openMenu, setOpenMenu] = useState(true);
  const menuList = [
    {
      title: 'Menu links',
      icon: <Bars3Icon className="w-5 group-hover:text-secondary-700 dark:group-hover:text-secondary-600" />,
      href: '/admin/menu',
    },
    {
      title: 'Categories',
      icon: <TagIcon className="w-5 group-hover:text-secondary-700 dark:group-hover:text-secondary-600" />,
      href: '/admin/categories',
    },
    {
      title: 'Jobs',
      icon: <BriefcaseIcon className="w-5 group-hover:text-secondary-700 dark:group-hover:text-secondary-600" />,
      href: '/admin/jobs',
    },
    {
      title: 'Skills',
      icon: <CommandLineIcon className="w-5 group-hover:text-secondary-700 dark:group-hover:text-secondary-600" />,
      href: '/admin/skills',
    },
    {
      title: 'Apps',
      icon: <CpuChipIcon className="w-5 group-hover:text-secondary-700 dark:group-hover:text-secondary-600" />,
      href: '/admin/apps',
    },
    {
      title: 'Bookmarks',
      icon: <BookmarkIcon className="w-5 group-hover:text-secondary-700 dark:group-hover:text-secondary-600" />,
      href: '/admin/bookmarks',
    },
  ];
  return (
    <div
      className={`transition-all ease-in-out duration-300 absolute sm:relative md:h-full flex-col justify-between hidden sm:flex min-h-screen ${
        openMenu ? styles['sidebar-open'] : styles['sidebar-closed']
      }`}
    >
      <div className="flex-grow h-full bg-primary-100 dark:bg-primary-700 p-3 relative shadow">
        <button
          type="button"
          className="absolute top-10 -right-4 cursor-pointer bg-primary-600 dark:bg-primary-300 rounded-r h-10"
          onClick={() => setOpenMenu(!openMenu)}
        >
          {openMenu ? (
            <ChevronLeftIcon className="text-primary-200 dark:text-primary-700 w-4" />
          ) : (
            <ChevronRightIcon className="text-primary-200 dark:text-primary-700 w-4" />
          )}
        </button>
        <div className="flex items-center gap-4 h-14 pb-8 mt-6 border-b border-primary-300 dark:border-primary-500">
          <Logo title="Eduardo Chiaro" alt="Eduardo Chiaro" className="text-primary-600 w-10 bg-primary-50 rounded-full p-2" />
          <div className={`text-center font-bold font-header hidden xl:inline-block ${openMenu ? '' : styles['hide-when-closed']}`}>eduardo.chiaro</div>
        </div>
        <ul className="flex flex-col py-4 space-y-1 font-semibold tracking-wider">
          <li>
            <Link href="/">
              <a
                className={`${styles['sidebar-link']} group border-transparent hover:border-secondary-700 dark:hover:border-secondary-600`}
                alt="Website"
                title="Website"
              >
                <HomeIcon className="w-5 group-hover:text-secondary-700 dark:group-hover:text-secondary-600" />
                <span className={`text-sm tracking-wide truncate group-hover:hunderline hidden xl:inline-block ${openMenu ? '' : styles['hide-when-closed']}`}>
                  Website
                </span>
              </a>
            </Link>
          </li>
          <li>
            <div className="flex flex-row items-center h-8">
              <span className="w-10 border-t border-secondary-700 dark:border-secondary-600 border-dashed shrink"></span>
              <div className={`text-sm font-light tracking-wide mx-3 ${openMenu ? '' : styles['hide-when-closed']}`}>Menu</div>
              <span className="w-full border-t border-secondary-700 dark:border-secondary-600 border-dashed shrink"></span>
            </div>
          </li>
          {menuList.map((item) => (
            <li key={item.title}>
              <NavLink
                href={item.href}
                as={item.href}
                className={`${styles['sidebar-link']} group border-transparent `}
                activeClassName={`${styles['sidebar-link']} group rounded-xl bg-primary-100 dark:bg-primary-700`}
              >
                <a className="flex items-center gap-2" alt={item.title} title={item.title}>
                  {item.icon}
                  <span
                    className={`text-sm tracking-wide truncate group-hover:hunderline hidden xl:inline-block ${openMenu ? '' : styles['hide-when-closed']}`}
                  >
                    {item.title}
                  </span>
                </a>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
