import {
  HomeIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import NavLink from '@/components/NavLink';
import styles from '@/styles/Admin.Sidebar.module.scss';
import Logo from '@/components/icons/logo';
import { useState } from 'react';
import { Bars3CenterLeftIcon } from '@heroicons/react/24/solid';

const AdminSidebar = ({ menuList }) => {
  const [openMenu, setOpenMenu] = useState(true);
  return (
    <div
      className={`transition-all ease-in-out duration-300 absolute sm:relative md:h-full flex-col justify-between hidden sm:flex min-h-screen ${
        openMenu ? styles['sidebar-open'] : styles['sidebar-closed']
      }`}
    >
      <div className="flex-grow h-full bg-primary-100 dark:bg-primary-700 p-3 relative shadow">
        <div className="flex items-center gap-4 h-14 pb-8 mt-6 border-b border-primary-300 dark:border-primary-500 px-3">
          <Logo title="Eduardo Chiaro" alt="Eduardo Chiaro" className="h-5 text-secondary-700" />
          <div className={`grow font-bold font-header hidden xl:block ${openMenu ? '' : styles['hide-when-closed']}`}>Eduardo Chiaro</div>
          <button
          onClick={() => setOpenMenu(!openMenu)}>
            <Bars3CenterLeftIcon className="w-5" />
          </button>
        </div>
        <ul className="flex flex-col py-4 space-y-1 font-semibold tracking-wider">
          <li>
            <Link
              href="/"
              className={`${styles['sidebar-link']} group border-transparent hover:border-secondary-700 dark:hover:border-secondary-600`}
              alt="Website"
              title="Website"
            >
              <HomeIcon className="w-5 group-hover:text-secondary-700 dark:group-hover:text-secondary-600" />
              <span className={`text-sm tracking-wide truncate group-hover:hunderline hidden xl:inline-block ${openMenu ? '' : styles['hide-when-closed']}`}>
                Website
              </span>
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
