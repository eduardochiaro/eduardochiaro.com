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
import WireContainer from '../WireContainer';

export default function Header({ data }: { data: MenuLink[] }) {
  const pathname = usePathname();

  const menuData = data
    ? data.map((menuLink: MenuLink) => {
        return { text: <>{menuLink.name}</>, link: menuLink.url, current: false, onlyMobile: menuLink.onlyMobile, active: menuLink.active };
      })
    : [];

  return (
    <header>
      <nav className="relative flex w-full items-center justify-between gap-6 p-5">
        <Menu as="div" className="inline-block md:hidden">
          <Menu.Button id="menu-short" title="open menu" className="flex items-center hover:cursor-pointer md:hidden">
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
            <Menu.Items className="absolute left-0 top-full w-full max-w-lg divide-y divide-primary-400/50 bg-primary-100 shadow-2xl shadow-primary-600 focus:outline-none dark:bg-primary-800 dark:shadow-primary-900">
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
                  <Link href="https://blog.eduardochiaro.com" className={`${styles.menuUrlMobile} !gap-1 text-primary-900 dark:text-primary-100`}>
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

        <WireContainer>
          <h1 className="font-header text-3xl font-normal">
            <Link href="/">
              eduardo<span className="overlay-color font-semibold">chiaro</span>
            </Link>
          </h1>
        </WireContainer>
        <div className="flex items-center gap-6">
          <div className="hidden items-center md:flex">
            <ul className="mx-auto items-center gap-6 font-semibold tracking-wider md:flex">
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
          <div className="hidden border-l border-primary-200 pl-6 tracking-wider dark:border-primary-700 md:block">
            <Link
              href="https://blog.eduardochiaro.com"
              className="flex items-center gap-1 whitespace-nowrap pr-6 text-sm font-medium transition hover:underline md:pr-0"
            >
              <span>
                <span className="text-accent-600 dark:text-accent-500">.</span>dev
              </span>
              <RssIcon className={'h-4 text-accent-600 dark:text-accent-500'} aria-hidden="true" />
            </Link>
          </div>
          <WireContainer>
            <ThemeIcon orientation="right" size="h-6" />
          </WireContainer>
        </div>
      </nav>
    </header>
  );
}
