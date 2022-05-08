import { BriefcaseIcon, ChipIcon, TerminalIcon, HomeIcon, TagIcon, BookmarkIcon } from "@heroicons/react/solid";
import SVG from 'react-inlinesvg'
import Link from "next/link";
import NavLink from '../NavLink';
import styles from '../../styles/Admin.Sidebar.module.scss'
import Logo from "../icons/logo";

const AdminSidebar = () => {
  const menuList = [
    {
      title: 'Categories',
      icon: <TagIcon className="hidden md:block ml-8 w-5 group-hover:text-primary-700 dark:group-hover:text-primary-600"/>,
      href: '/admin/categories',
    },
    {
      title: 'Jobs',
      icon: <BriefcaseIcon className="hidden md:block ml-8 w-5 group-hover:text-primary-700 dark:group-hover:text-primary-600"/>,
      href: '/admin/jobs',
    },
    {
      title: 'Skills',
      icon: <TerminalIcon className="hidden md:block ml-8 w-5 group-hover:text-primary-700 dark:group-hover:text-primary-600"/>,
      href: '/admin/skills',
    },
    {
      title: 'Apps',
      icon: <ChipIcon className="hidden md:block ml-8 w-5 group-hover:text-primary-700 dark:group-hover:text-primary-600"/>,
      href: '/admin/apps',
    },
    {
      title: 'Bookmarks',
      icon: <BookmarkIcon className="hidden md:block ml-8 w-5 group-hover:text-primary-700 dark:group-hover:text-primary-600"/>,
      href: '/admin/bookmarks',
    },
  ];
  return(
    <div className="col-span-2 left-0 bg-zinc-100 dark:bg-zinc-700 h-full">
      <div className="flex items-center h-14 py-2 border-b border-zinc-200 dark:border-zinc-600">
        <div className="flex-none">
          <Logo title="Eduardo Chiaro" alt="Eduardo Chiaro" className="h-7 align-middle mr-2 ml-6" />
        </div>
        <div className="flex-auto w-32 text-center font-semibold text-xl border-r border-zinc-200 dark:border-zinc-600">
          <span className="hidden lg:inline-block mr-10">Admin</span>
        </div>
      </div>
      <div className="overflow-y-auto overflow-x-hidden flex-grow h-full bg-zinc-200 dark:bg-zinc-600 shadow">
        <ul className="flex flex-col py-4 space-y-1 font-semibold tracking-wider">
          <li>
            <Link href="/">
              <a className={`${styles['sidebar-link']} group border-transparent hover:border-primary-700 dark:hover:border-primary-600`}>
                <HomeIcon className="hidden md:block ml-8 w-5 group-hover:text-primary-700 dark:group-hover:text-primary-600"/>
                <span className="ml-2 text-sm tracking-wide truncate group-hover:hunderline">Website</span>
              </a>
            </Link>
          </li>
          <li className="px-6">
            <div className="flex flex-row items-center h-8">
              <span className="w-10 border-t border-primary-700 dark:border-primary-600 border-dashed shrink"></span>
              <div className="text-sm font-light tracking-wide mx-3">Menu</div>
              <span className="w-full border-t border-primary-700 dark:border-primary-600 border-dashed shrink"></span>
            </div>
          </li>
          {menuList.map(item => (
            <li key={item.title}>
              <NavLink
                href={item.href} 
                as={ item.href }
                className={`${styles['sidebar-link']} group border-transparent hover:border-primary-700 dark:hover:border-primary-600`} 
                activeClassName={`${styles['sidebar-link']} group border-primary-700 dark:border-primary-600 `}
              >
                <a>
                  {item.icon}
                  <span className="ml-2 text-sm tracking-wide truncate group-hover:hunderline">{item.title}</span>
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