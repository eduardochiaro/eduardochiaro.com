import { BriefcaseIcon, ChipIcon, TerminalIcon, HomeIcon, TagIcon, BookmarkIcon } from "@heroicons/react/solid";
import SVG from 'react-inlinesvg'
import Link from "next/link";
import styles from '../../styles/Admin.Sidebar.module.scss'

const AdminSidebar = () => {
  return(
    <div className="col-span-2 left-0 bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-600 h-full">
      <div className="flex h-14 border-b ">
        <SVG 
            title="" 
            alt="" 
            className={`mainLogo flex-none mt-2 h-10 md:h-12 mr-2 ml-4`}
            width={50}
            src={'/images/logo-n.svg'} />
        <div className="flex-auto w-32 text-right font-semibold text-xl">
          <span className="hidden lg:inline-block mt-4">Admin</span>
        </div>
      </div>
      <div className="overflow-y-auto overflow-x-hidden flex-grow">
        <ul className="flex flex-col py-4 space-y-1 font-semibold tracking-wider">
          <li>
            <Link href="/">
              <a className={`${styles['sidebar-link']} text-isabelline-800 dark:text-isabelline-700 hover:text-independence-900 dark:hover:text-isabelline-500`}>
                <HomeIcon className="inline-flex justify-center items-center ml-4 w-5"/>
                <span className="ml-2 text-sm tracking-wide truncate">Website</span>
              </a>
            </Link>
          </li>
          <li className="px-5">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-isabelline-800 dark:text-isabelline-700">Menu</div>
            </div>
          </li>
          <li>
            <Link href="/admin/categories">
              <a className={`${styles['sidebar-link']} text-isabelline-800 dark:text-isabelline-700 hover:text-independence-900 dark:hover:text-isabelline-500`}>
                <TagIcon className="inline-flex justify-center items-center ml-4 w-5"/>
                <span className="ml-2 text-sm tracking-wide truncate">Categories</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/admin/jobs">
              <a className={`${styles['sidebar-link']} text-isabelline-800 dark:text-isabelline-700 hover:text-independence-900 dark:hover:text-isabelline-500`}>
                <BriefcaseIcon className="inline-flex justify-center items-center ml-4 w-5"/>
                <span className="ml-2 text-sm tracking-wide truncate">Jobs</span>
                {/*
                <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-isabelline-600 bg-terra-cotta-100 rounded-full">New</span>
                */}
              </a>
            </Link>
          </li>
          <li>
            <Link href="/admin/skills">
              <a className={`${styles['sidebar-link']} text-isabelline-800 dark:text-isabelline-700 hover:text-independence-900 dark:hover:text-isabelline-500`}>
                <TerminalIcon className="inline-flex justify-center items-center ml-4 w-5"/>
                <span className="ml-2 text-sm tracking-wide truncate">Skills</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/admin/apps">
              <a className={`${styles['sidebar-link']} text-isabelline-800 dark:text-isabelline-700 hover:text-independence-900 dark:hover:text-isabelline-500`}>
                <ChipIcon className="inline-flex justify-center items-center ml-4 w-5"/>
                <span className="ml-2 text-sm tracking-wide truncate">Apps</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/admin/bookmarks">
              <a className={`${styles['sidebar-link']} text-isabelline-800 dark:text-isabelline-700 hover:text-independence-900 dark:hover:text-isabelline-500`}>
                <BookmarkIcon className="inline-flex justify-center items-center ml-4 w-5"/>
                <span className="ml-2 text-sm tracking-wide truncate">Bookmarks</span>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdminSidebar;