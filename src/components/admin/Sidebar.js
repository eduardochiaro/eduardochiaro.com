import { BriefcaseIcon, CpuChipIcon, CommandLineIcon, HomeIcon, TagIcon, BookmarkIcon, ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import NavLink from '@/components/NavLink';
import styles from '@/styles/Admin.Sidebar.module.scss'
import Logo from '@/components/icons/logo';
import { useState } from 'react';

const AdminSidebar = () => {
  const [openMenu, setOpenMenu] = useState(true);
  const menuList = [
    {
      title: 'Categories',
      icon: <TagIcon className="w-5 group-hover:text-primary-700 dark:group-hover:text-primary-600"/>,
      href: '/admin/categories',
    },
    {
      title: 'Jobs',
      icon: <BriefcaseIcon className="w-5 group-hover:text-primary-700 dark:group-hover:text-primary-600"/>,
      href: '/admin/jobs',
    },
    {
      title: 'Skills',
      icon: <CommandLineIcon className="w-5 group-hover:text-primary-700 dark:group-hover:text-primary-600"/>,
      href: '/admin/skills',
    },
    {
      title: 'Apps',
      icon: <CpuChipIcon className="w-5 group-hover:text-primary-700 dark:group-hover:text-primary-600"/>,
      href: '/admin/apps',
    },
    {
      title: 'Bookmarks',
      icon: <BookmarkIcon className="w-5 group-hover:text-primary-700 dark:group-hover:text-primary-600"/>,
      href: '/admin/bookmarks',
    },
  ];
  return(
    <div className={`transition-all ease-in-out duration-300 p-4 absolute sm:relative md:h-full flex-col justify-between hidden sm:flex min-h-screen ${openMenu ? styles['sidebar-open'] : styles['sidebar-closed']}`}>
      <div className="flex-grow h-full bg-zinc-200 dark:bg-zinc-600 rounded-xl p-6 relative shadow">
        <button type="button" className="absolute top-10 -right-4 cursor-pointer bg-zinc-600 dark:bg-zinc-300 rounded-r h-10" onClick={() => setOpenMenu(!openMenu)}>
          {openMenu ? 
            <ChevronLeftIcon className="text-zinc-200 dark:text-zinc-700 w-4"/>
            :
            <ChevronRightIcon className="text-zinc-200 dark:text-zinc-700 w-4"/>
          }
        </button>
        <div className="flex items-center gap-4 h-14 pb-8 mt-6 border-b border-zinc-300 dark:border-zinc-500">
          <Logo title="Eduardo Chiaro" alt="Eduardo Chiaro" className="text-zinc-600 w-10 bg-zinc-50 rounded-full p-2" />
          <div className={`text-center font-bold font-header border-r border-zinc-200 dark:border-zinc-600 hidden xl:inline-block ${ openMenu ? '' : styles['hide-when-closed'] }`}>
            eduardo.chiaro
          </div>
        </div>
        <ul className="flex flex-col py-4 space-y-1 font-semibold tracking-wider">
          <li>
            <Link href="/">
              <a className={`${styles['sidebar-link']} group border-transparent hover:border-primary-700 dark:hover:border-primary-600`} alt="Website" title="Website">
                <HomeIcon className="w-5 group-hover:text-primary-700 dark:group-hover:text-primary-600"/>
                <span  className={`text-sm tracking-wide truncate group-hover:hunderline hidden xl:inline-block ${ openMenu ? '' : styles['hide-when-closed'] }`}>Website</span>
              </a>
            </Link>
          </li>
          <li>
            <div className="flex flex-row items-center h-8">
              <span className="w-10 border-t border-primary-700 dark:border-primary-600 border-dashed shrink"></span>
              <div className={`text-sm font-light tracking-wide mx-3 ${ openMenu ? '' : styles['hide-when-closed'] }`}>Menu</div>
              <span className="w-full border-t border-primary-700 dark:border-primary-600 border-dashed shrink"></span>
            </div>
          </li>
          {menuList.map(item => (
            <li key={ item.title }>
              <NavLink
                href={ item.href } 
                as={ item.href }
                className={`${styles['sidebar-link']} group border-transparent `} 
                activeClassName={`${styles['sidebar-link']} group rounded-xl bg-zinc-100 dark:bg-zinc-700`}
              >
                <a 
                  className="flex items-center gap-2"
                  alt={ item.title }
                  title={ item.title }>
                  { item.icon }
                  <span className={`text-sm tracking-wide truncate group-hover:hunderline hidden xl:inline-block ${ openMenu ? '' : styles['hide-when-closed'] }`}>{item.title}</span>
                </a>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminSidebar;