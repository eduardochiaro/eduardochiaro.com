import React, { Fragment } from 'react';
import {
  RssIcon,
  MenuIcon,
} from '@heroicons/react/solid'
import SVG from 'react-inlinesvg';
import styles from '../../styles/Header.module.scss'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, Transition } from '@headlessui/react';
import ThemeIcon from '../ThemeIcon';

export default function Header () {
  const menuData = [
    {
      text: 'Home',
      link: '/',
      current: true
    },
    {
      text: 'Bookmarks',
      link: '/bookmarks',
      current: false
    },
    {
      text: 'Projects',
      link: '/projects',
      current: false
    }
  ]
  const router = useRouter();
  return (
    <header className={`${styles.header} sticky drop-shadow top-0 z-40 h-14 bg-zinc-100 dark:bg-zinc-700 border-b border-zinc-200 dark:border-zinc-600`}>
      <nav className="w-100 px-auto">
        <div className="md:pt-2 px-4 md:px-8 grid grid-cols-2 md:grid-cols-3">
          <div>
            <Menu as="div" className="relative">
              <Menu.Button as="a" className="inline-block md:hidden pt-4">
                <MenuIcon className={`w-6 inline-block border-2 rounded border-primary-700 transition text-primary-800 dark:text-primary-700 hover:text-zinc-900 dark:hover:text-primary-500`}/>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="focus:outline-none absolute left-0 mt-2 w-56 divide-y divide-zinc-600 rounded-md bg-zinc-100 dark:bg-zinc-700 shadow-lg ring-2 ring-primary-700 ring-opacity-50">
                  <div className="px-1 py-1 font-semibold text-primary-800 dark:text-primary-700 divide-y divide-zinc-400">
                  { menuData.map(function(item, i) {
                      return (
                      <Menu.Item key={`menu-link-${i}`}>
                        { router.route == item.link ? 
                          <a href={item.link} className={`${styles.menuUrlMobile} text-zinc-900 dark:text-primary-500 underline`}>{item.text}</a>
                          : 
                          <a href={item.link} className={`${styles.menuUrlMobile} hover:text-zinc-900 dark:hover:text-primary-500`}>{item.text}</a>
                        }
                      </Menu.Item>
                      )
                    })}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <div className={`text-primary-800 dark:text-primary-700 transition-all duration-300 ease-in-out w-full md:w-auto hidden drop-shadow-none md:contents absolute md:relative top-14 pb-2 left-1 bg-zinc-100 dark:bg-zinc-700 z-50`}>
              <ul className="md:flex font-semibold tracking-wider">
                { menuData.map(function(item, i) {
                  return (
                    <li key={`menu-link-${i}`}>
                      { router.route == item.link ? 
                        <Link href={item.link}>
                          <a className={`${styles.menuUrl} text-zinc-900 dark:text-primary-500 underline`}>{item.text}</a>
                        </Link>
                        : 
                        <Link href={item.link}>
                          <a className={`${styles.menuUrl} hover:text-zinc-900 dark:hover:text-primary-500`}>{item.text}</a>
                        </Link>
                      }
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className="hidden md:block">
            <SVG 
              title="" 
              alt="" 
              className={`w-auto h-7 mt-4 md:mt-2 md:mx-auto font-normal`}
              width={65}
              src={'/images/logo-3.svg'} />
          </div>
          <div className="flex">
            <div className="flex-1 tracking-wider py-4 md:py-2 text-right">
              <a href="https://blog.eduardochiaro.com" className="md:pr-0 pr-6 whitespace-nowrap text-base font-medium transition text-primary-800 dark:text-primary-700 hover:text-zinc-900 dark:hover:text-primary-500">
                <RssIcon className={`h-6 w-6 inline-block text-accent-500`} aria-hidden="true"  /> .dev
              </a>
              <ThemeIcon />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}