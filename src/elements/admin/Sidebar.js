import { LogoutIcon, BriefcaseIcon, ChipIcon, TerminalIcon, HomeIcon } from "@heroicons/react/solid"
import { useSession, signIn, signOut } from "next-auth/react"
import SVG from 'react-inlinesvg'
import Link from "next/link";
import styles from '../../styles/Admin.Sidebar.module.scss'

const AdminSidebar = () => {
  const { data: session } = useSession();
  return(
    <div className="col-span-2 eft-0 bg-gray-50 h-full border-r">
      <div className="flex items-center justify-center h-14 border-b bg-green-sheen-100">
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
              <a className={styles['sidebar-link']}>
                <HomeIcon className="inline-flex justify-center items-center ml-4 w-5"/>
                <span className="ml-2 text-sm tracking-wide truncate">Website</span>
              </a>
            </Link>
          </li>
          <li className="px-5">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-500">Menu</div>
            </div>
          </li>
          <li>
            <Link href="/admin/jobs">
              <a className={styles['sidebar-link']}>
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
              <a className={styles['sidebar-link']}>
                <TerminalIcon className="inline-flex justify-center items-center ml-4 w-5"/>
                <span className="ml-2 text-sm tracking-wide truncate">Skills</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/admin/apps">
              <a className={styles['sidebar-link']}>
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