import React, { Fragment } from 'react';
import {
  RssIcon,
  MenuIcon,
} from '@heroicons/react/solid'
import styles from '../../styles/Header.module.scss'
import { useRouter } from 'next/router';
import { Menu, Transition } from '@headlessui/react';
import ThemeIcon from '../ThemeIcon';
import NavLink from '../NavLink';
import Logo from '../icons/logo';
import Link from 'next/link';

export default function Header () {
  const menuData = [
    {
      text: 'Home',
      link: '/',
      current: true,
      onlyMobile: false
    },
    {
      text: 'Bookmarks',
      link: '/bookmarks',
      current: false,
      onlyMobile: false
    },
    {
      text: 'Projects',
      link: '/projects',
      current: false,
      onlyMobile: false
    },
    {
      text: ( <><RssIcon className={`h-5 text-accent-500 mr-2 inline-block`} aria-hidden="true" />.dev</> ),
      link: 'https://blog.eduardochiaro.com',
      current: false,
      onlyMobile: true
    }
  ]
  const router = useRouter();
  return (
    <header className={`${styles.header} bg-zinc-100 dark:bg-zinc-700 border-b border-zinc-200 dark:border-zinc-600`}>
      <nav className="w-100 px-auto">
        <div className="px-4 md:px-8 grid grid-cols-3 h-14">
          <div className="flex items-center font-header text-2xl">
            <Menu as="div" className="relative">
              <Menu.Button as="a" className="inline-block md:hidden">
                <MenuIcon className={`w-6 inline-block border-2 mr-10 rounded border-primary-700 transition text-primary-700 dark:text-primary-600 hover:text-zinc-900 dark:hover:text-zinc-100`}/>
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
                <Menu.Items className="focus:outline-none absolute left-0 mt-2 w-56 divide-y divide-zinc-600 rounded-md bg-zinc-100 dark:bg-zinc-700 shadow-lg ring-2 ring-primary-700 ring-opacity-50">
                  <div className="px-1 py-1 font-semibold text-primary-700 dark:text-primary-600 divide-y divide-zinc-400">
                  { menuData.map(function(item, i) {
                      return (
                      <Menu.Item key={`menu-link-${i}`}>
                        { router.route == item.link ? 
                          <a href={item.link} className={`${styles.menuUrlMobile}`}>{item.text}</a>
                          : 
                          <a href={item.link} className={`${styles.menuUrlMobile} text-zinc-900 dark:text-zinc-100 hover:underline`}>{item.text}</a>
                        }
                      </Menu.Item>
                      )
                    })}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <Logo 
              title="Eduardo Chiaro" 
              alt="Eduardo Chiaro" 
              className={`w-auto h-7 mr-3`} />
              <div className="hidden md:inline">
                Eduardo Chiaro
              </div>
          </div>
          <div className="md:flex items-center">
            <div className={`w-full md:w-auto hidden drop-shadow-none md:contents absolute md:relative top-14 pb-2 left-1 bg-zinc-100 dark:bg-zinc-700 z-50`}>
              <ul className="md:flex font-semibold tracking-wider mx-auto items-center">
                { menuData.filter(x => !x.onlyMobile).map(function(item, i) {
                  return (
                    <li key={`menu-link-${i}`}>
                      <NavLink 
                        href={item.link}
                        className={`${styles.menuUrl} hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline opacity-60 hover:opacity-100`}
                        activeClassName={`${styles.menuUrl} text-primary-700 dark:text-primary-600`}
                        type="main"
                        >
                        <a>{item.text}</a>
                      </NavLink>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className="flex items-center text-right">
            <span className="flex-1"></span>
              <div className="hidden md:inline-block mr-8">
                <Link
                  href="https://blog.eduardochiaro.com"
                  >
                    <a className="md:pr-0 pr-6 whitespace-nowrap text-base font-medium transition hover:underline flex items-center">
                      <RssIcon className={`h-5 text-accent-500 mr-1`} aria-hidden="true"  />.dev
                    </a>
                </Link>
              </div>
            <ThemeIcon />
          </div>
        </div>
      </nav>
    </header>
  );
}