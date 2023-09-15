'use client';

import React, { Fragment } from 'react';
import { RssIcon, Bars3BottomLeftIcon } from '@heroicons/react/24/solid';
import { usePathname } from 'next/navigation';
import { Menu, Transition } from '@headlessui/react';
import ThemeIcon from '@/components/ThemeIcon';
import NavLink from '@/components/NavLink';
import Link from 'next/link';
import styles from '@/styles/Header.module.scss';
import classNames from '@/utils/classNames';
import type { MenuLink } from '@prisma/client';
import { FireIcon } from '@heroicons/react/20/solid';

export default function Header({ data }: { data: MenuLink[] }) {
  const pathname = usePathname();

  const menuData = data
    ? data.map((menuLink: MenuLink) => {
        return { text: <>{menuLink.name}</>, link: menuLink.url, current: false, onlyMobile: menuLink.onlyMobile, active: menuLink.active };
      })
    : [];

  return (
    <header className={`${styles.header} bg-primary-50/95 dark:bg-primary-800/95 border-b border-primary-200/50 dark:border-primary-700/50`}>
      <nav className="max-w-5xl mx-auto relative">
        <div className="px-4 md:px-0 py-3 flex items-center gap-6">
          <Menu as="div" className="inline-block md:hidden">
            <Menu.Button id="menu-short" title="open menu" className="flex items-center md:hidden hover:cursor-pointer">
              <Bars3BottomLeftIcon className={'w-7 transition hover:text-primary-900 dark:hover:text-primary-100'} />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-300"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Menu.Items className="focus:outline-none absolute left-0 top-full w-full max-w-lg bg-primary-100 dark:bg-primary-800 shadow-2xl shadow-primary-600 dark:shadow-primary-900 divide-y divide-primary-400/50">
                {menuData
                  .filter((x: any) => x.active)
                  .map((item: any, i: number) => {
                    return (
                      <div key={`menu-link-${i}`} className="px-1 py-1 font-semibold text-secondary-700 dark:text-secondary-600">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href={item.link}
                              className={classNames(
                                styles.menuUrlMobile,
                                pathname == item.link ? '' : 'text-primary-900 dark:text-primary-100',
                                active ? 'bg-primary-300 dark:bg-primary-500' : '',
                              )}
                            >
                              {item.text}
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                    );
                  })}
                <div className="px-1 py-1 font-semibold text-secondary-700 dark:text-secondary-600">
                  <Menu.Item>
                    <Link href="https://blog.eduardochiaro.com" className={`${styles.menuUrlMobile} text-primary-900 dark:text-primary-100 !gap-1`}>
                      <span>
                        <span className="text-accent-600 dark:text-accent-500">.</span>dev
                      </span>
                      <RssIcon className={'h-4 text-accent-600 dark:text-accent-500'} aria-hidden="true" />
                    </Link>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <span className="grow text-center md:text-left">
            <Link href="/" className="flex items-end gap-2 group md:-ml-10">
              <FireIcon className=" hidden md:block h-8 group-hover:text-accent-600 dark:group-hover:text-accent-500 transition-all ease-out duration-300 opacity-0 group-hover:opacity-100 group-hover:animate-pulse" />
              <span className={'text-3xl font-header font-normal'}>
                eduardo<span className="font-semibold overlay-color">chiaro</span>
              </span>
            </Link>
          </span>
          <div className="hidden md:flex items-center">
            <ul className="md:flex font-semibold tracking-wider mx-auto">
              {menuData
                .filter((x: any) => !x.onlyMobile && x.active)
                .map((item: any, i: number) => {
                  return (
                    <li key={`menu-link-${i}`}>
                      <NavLink
                        href={item.link}
                        className={`${styles.menuUrl} hover:text-secondary-700 dark:hover:text-secondary-500`}
                        activeClassName={`${styles.menuUrl} active-url`}
                        type="main"
                      >
                        <a>{item.text}</a>
                      </NavLink>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="hidden md:block tracking-wider pl-6 border-l border-primary-200 dark:border-primary-700">
            <Link
              href="https://blog.eduardochiaro.com"
              className="md:pr-0 pr-6 whitespace-nowrap text-sm font-medium transition hover:underline flex items-center gap-1"
            >
              <span>
                <span className="text-accent-600 dark:text-accent-500">.</span>dev
              </span>
              <RssIcon className={'h-4 text-accent-600 dark:text-accent-500'} aria-hidden="true" />
            </Link>
          </div>
          <ThemeIcon orientation="right" size="h-6" />
        </div>
      </nav>
    </header>
  );
}
