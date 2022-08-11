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
    <header className={`${styles.header} bg-zinc-100/80 dark:bg-zinc-700/75 border-b border-zinc-200 dark:border-zinc-600 backdrop-blur`}>
      <nav className="w-full">
        <div className="px-4 md:px-8 flex items-center h-14">
          <div className="flex-none flex gap-4 font-header text-2xl">
            <Menu as="div" className="relative inline-block md:hidden">
              <Menu.Button title="open menu" className="inline-block md:hidden hover:cursor-pointer">
                <MenuIcon className={`w-7 inline-block border-2 rounded border-primary-700 transition text-primary-700 dark:text-primary-600 hover:text-zinc-900 dark:hover:text-zinc-100`}/>
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
            <Link
              href="/"
              >
              <a className="flex items-center gap-2 md:gap-3">
                <Logo 
                  title="Eduardo Chiaro" 
                  alt="Eduardo Chiaro" 
                  className={`w-auto h-5 md:h-7`} />
                <div className="text-xl md:text-2xl font-semibold tracking-wide">
                  Eduardo Chiaro
                </div>
              </a>
            </Link>
          </div>
          <span className="flex-1"></span>
          <div className="hidden md:flex items-center">
            <ul className="md:flex font-semibold tracking-wider mx-auto">
              { menuData.filter(x => !x.onlyMobile).map(function(item, i) {
                return (
                  <li key={`menu-link-${i}`}>
                    <NavLink 
                      href={item.link}
                      className={`${styles.menuUrl} hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline opacity-60 hover:opacity-100`}
                      activeClassName={`${styles.menuUrl} overlay-color`}
                      type="main"
                      >
                      <a>{item.text}</a>
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="hidden md:inline-block ml-12 mr-6 tracking-wider">
            <Link
              href="https://blog.eduardochiaro.com"
              >
              <a className="md:pr-0 pr-6 whitespace-nowrap text-base font-medium transition hover:underline flex items-center">
                <RssIcon className={`h-5 text-accent-500 mr-1`} aria-hidden="true" />.dev
              </a>
            </Link>
          </div>
          <ThemeIcon />
        </div>
      </nav>
    </header>
  );
}