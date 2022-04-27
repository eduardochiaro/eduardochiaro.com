import React, { useState, useEffect } from 'react';
import {
  RssIcon,
  AdjustmentsIcon,
  HomeIcon,
  MenuIcon,
  SunIcon,
  MoonIcon,
  BookmarkIcon
} from '@heroicons/react/solid'
import SVG from 'react-inlinesvg';
import styles from '../../styles/Header.module.scss'
import Link from 'next/link';
import { useTheme } from "next-themes";
import { useRouter } from 'next/router';

export default function Header () {
  const [menuOpen, setMenuOpen] = useState(false);
  const [inUseTheme, setInUseTheme] = useState("dark");
  const { systemTheme , theme, setTheme } = useTheme();

  const openMenu = () => {
    setMenuOpen(!menuOpen);
  }

  useEffect(() => {
    const currentTheme = theme === "system" ? systemTheme : theme ;
    setInUseTheme(currentTheme);
  }, [theme, systemTheme])

  const menuData = [
    {
      text: 'Home',
      link: '/',
      current: true,
      pre: <HomeIcon className="h-7 md:h-5 inline mr-2 md:mr-1 align-sub" />
    },
    {
      text: 'Bookmarks',
      link: '/bookmarks',
      current: false,
      pre: <BookmarkIcon className="h-7 md:h-5 inline mr-2 md:mr-1 align-sub" />
    },
    {
      text: 'Projects',
      link: '/projects',
      current: false,
      pre: <AdjustmentsIcon className="h-7 md:h-5 inline mr-2 md:mr-1 align-sub" />
    }
  ]
  const router = useRouter();
  return (
    <header className={`${styles.header} sticky top-0 z-40 h-14 bg-zinc-100 dark:bg-zinc-700 border-b border-zinc-200 dark:border-zinc-600`}>
      <nav className="w-100 px-auto">
        <div className="h-8 pt-1 md:pt-6 px-3 mx-auto flex items-center justify-between flex-wrap md:flex-nowrap">
          <div className="flex-initial">
            <SVG 
              title="" 
              alt="" 
              className={`w-auto mainLogo md:pl-0 pl-6`}
              width={65}
              src={'/images/logo-n.svg'} />
          </div>
          <div className={`text-primary-800 dark:text-primary-700 w-full md:w-auto ${menuOpen ? 'block drop-shadow-lg mr-4 border border-zinc-400 rounded ml-auto w-fit' : 'hidden drop-shadow-none'} md:contents absolute md:relative top-16 right-1 bg-primary-500 z-50`}>
            <ul className="md:flex font-semibold tracking-wider md:justify-between">
              { menuData.map(function(item, i) {
                return (
                  <li 
                    key={`menu-link-${i}`}>
                    <Link 
                      href={ item.link }>
                      <a 
                        className={router.route != item.link ? `${styles.menuUrl} hover:text-zinc-900 dark:hover:text-primary-500` : `${styles.menuUrl} text-zinc-900 dark:text-primary-500`}
                          onClick={openMenu}>{item.pre}{item.text}</a>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="order-last">
            <a href="https://blog.eduardochiaro.com" className="md:pr-0 pr-6 whitespace-nowrap text-base font-medium transition text-primary-800 dark:text-primary-700 hover:text-zinc-900 dark:hover:text-primary-500">
              <RssIcon className={`h-6 w-6 inline-block text-accent-500`} aria-hidden="true"  /> .dev
            </a>
            { inUseTheme === "dark" ? 
              <SunIcon className="w-5 h-5 text-zinc-900 inline-block mx-4 border rounded-full bg-primary-500 " role="button" onClick={() => setTheme('light')} />
              :
              <MoonIcon className="w-5 h-5 text-primary-500 inline-block mx-4 border rounded-full bg-zinc-900" role="button" onClick={() => setTheme('dark')} />
            }
            <a href="#" className="inline-block md:hidden" onClick={openMenu}>
              <MenuIcon className={`w-6 inline-block border-2 rounded border-primary-700 transition text-primary-800 dark:text-primary-700 hover:text-zinc-900 dark:hover:text-primary-500`}/>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}