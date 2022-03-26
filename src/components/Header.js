import * as React from 'react';
import {
  RssIcon,
  TerminalIcon,
  AdjustmentsIcon,
  ChipIcon,
  HomeIcon,
  MenuIcon
} from '@heroicons/react/solid'
import GitHubIcon from '../elements/icons/github';
import SVG from 'react-inlinesvg'
import styles from '../styles/Header.module.scss'
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header () {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const openMenu = () => {
    setMenuOpen(!menuOpen);
  }
  const menuData = [
    {
      text: 'Home',
      link: '/',
      as: '/#top',
      current: true,
      pre: <HomeIcon className="h-7 md:h-5 inline mr-2 md:mr-1 align-sub" />
    },
    {
      text: 'Skills',
      link: '/#skills',
      current: false,
      pre: <TerminalIcon className="h-7 md:h-5 inline mr-2 md:mr-1 align-sub" />
    },
    {
      text: 'Apps',
      link: '/#apps',
      current: false,
      pre: <ChipIcon className="h-7 md:h-5 inline mr-2 md:mr-1 align-sub" />
    },
    {
      text: 'GitHub',
      link: '/#github',
      current: false,
      pre: <GitHubIcon className="h-7 md:h-5 inline mr-2 md:mr-1 align-sub" />
    },
    /*
    {
      text: 'Lab',
      link: '/lab',
      as: '/lab#root',
      current: false,
      pre: <AdjustmentsIcon className="h-7 md:h-5 inline mr-2 md:mr-1 align-sub" />
    }
    */
  ]
  const router = useRouter();
  return (
    <header className={`${styles.header} sticky top-0 z-40 h-24`}>
      <nav className="w-100 md:px-12 md:px-auto">
        <div className="md:h-16 pt-4 md:pt-6 px-3 mx-auto flex items-center justify-between flex-wrap md:flex-nowrap">
          <div className="flex-initial text-gray-500">
            <SVG 
              title="" 
              alt="" 
              className={`w-auto mainLogo md:pl-0 pl-6`}
              width={65}
              src={'/images/logo-n.svg'} />
          </div>
          <div className={`text-gray-500 w-full md:w-auto ${menuOpen ? 'block drop-shadow-lg mr-4 border border-independence-400 rounded ml-auto w-fit' : 'hidden drop-shadow-none'} md:contents absolute md:relative top-16 right-1 bg-isabelline-500 z-50`}>
            <ul className="md:flex font-semibold md:justify-between">
              { menuData.map(function(item, i) {
                return (
                  <li 
                    key={`menu-link-${i}`}>
                    <Link 
                      href={ item.link } 
                      as={ item.as }>
                        <a 
                          className={router.asPath != item.link && router.asPath != item.as ? `${styles.menuUrl}` : `${styles.menuUrl} text-gray-900`}
                           onClick={openMenu}>{item.pre}{item.text}</a>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="order-last">
            <a href="https://blog.eduardochiaro.com" className="md:pr-0 pr-6 whitespace-nowrap text-base font-medium transition text-gray-500 hover:text-gray-900">
              <RssIcon className={`h-6 w-6 inline-block text-terra-cotta-500`} aria-hidden="true"  /> .dev
            </a>
            <a href="#" className="inline-block md:hidden" onClick={openMenu}>
              <MenuIcon className={`w-8 inline-block border-2 rounded border-gray-500 transition text-gray-500 hover:text-gray-900`}/>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}