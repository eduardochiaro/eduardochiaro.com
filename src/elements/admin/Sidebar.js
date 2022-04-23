import { BriefcaseIcon, ChipIcon, TerminalIcon, HomeIcon } from "@heroicons/react/solid"
import SVG from 'react-inlinesvg'
import Link from "next/link";
import styles from '../../styles/Admin.Sidebar.module.scss'

const AdminSidebar = () => {
  return(
    <div className="col-span-2 left-0 bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-600 h-full">
      <div className="flex items-center justify-center h-14 border-b ">
        <div>
          <div className="inline-block mr-2 align-middle">
            <SVG 
                title="" 
                alt="" 
                className={`mainLogo`}
                width={50}
                src={'/images/logo-n.svg'} />
          </div>
          <div className="h-full hidden lg:inline-block">
            Admin
          </div>
        </div>
      </div>
      <div className="overflow-y-auto overflow-x-hidden flex-grow">
        <ul className="flex flex-col py-4 space-y-1">
          <li>
            <Link href="/">
              <a className={`${`${styles['sidebar-link']} text-isabelline-800 dark:text-isabelline-700 hover:text-independence-900 dark:hover:text-isabelline-500`} text-isabelline-700 hover:text-independence-900 dark:hover:text-isabelline-500`}>
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
            <Link href="/admin/jobs">
              <a className={`${styles['sidebar-link']} text-isabelline-800 dark:text-isabelline-700 hover:text-independence-900 dark:hover:text-isabelline-500`}>
                <BriefcaseIcon className="inline-flex justify-center items-center ml-4 w-5"/>
                <span className="ml-2 text-sm tracking-wide truncate">Jobs</span>
                {/*
                <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-terra-cotta-600 bg-terra-cotta-100 rounded-full">New</span>
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
        </ul>
      </div>
    </div>
  );
}

export default AdminSidebar;