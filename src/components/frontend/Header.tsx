'use client';

import React, { Fragment } from 'react';
import { RssIcon, MenuIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import ThemeIcon from '@/components/ThemeIcon';
import NavLink from '@/components/NavLink';
import Link from 'next/link';
import classNames from '@/utils/classNames';
import type { MenuLink } from '@prisma/client';
import WireContainer from './WireContainer';
import Logo from '../icons/Logo';
import SiteLogo from './SiteLogo';

export default function Header({ data }: { data: MenuLink[] }) {
  const pathname = usePathname();

  const menuData = data
    ? data.map((menuLink: MenuLink) => {
        return { text: <span>{menuLink.name}</span>, link: menuLink.url, current: false, onlyMobile: menuLink.onlyMobile, active: menuLink.active };
      })
    : [];

  return (
    <header>
      <nav className="relative flex w-full items-center justify-between gap-6 p-5">
        <Menu as="div" className="inline-block md:hidden">
          <MenuButton id="menu-short" title="open menu" className="flex items-center hover:cursor-pointer md:hidden">
            <MenuIcon className={'hover:text-primary-900 dark:hover:text-primary-100 w-7 transition'} />
          </MenuButton>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-300"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <MenuItems className="divide-primary-400/50 bg-primary-100 shadow-primary-600 dark:bg-primary-800 dark:shadow-primary-900 absolute top-full left-0 z-20 w-full max-w-lg divide-y shadow-2xl focus:outline-none">
              {menuData
                .filter((x: any) => x.active)
                .map((item: any, i: number) => {
                  return (
                    <div key={`menu-link-${i}`} className="text-secondary-700 dark:text-secondary-600 px-1 py-1 font-semibold">
                      <MenuItem>
                        {({ active }) => (
                          <Link
                            href={item.link}
                            className={classNames(
                              'flex w-full items-center px-2 py-2',
                              pathname == item.link ? '' : 'text-primary-900 dark:text-primary-100',
                              active ? 'bg-primary-300 dark:bg-primary-500' : '',
                            )}
                          >
                            {item.text}
                          </Link>
                        )}
                      </MenuItem>
                    </div>
                  );
                })}
              <div className="text-secondary-700 dark:text-secondary-600 px-1 py-1 font-semibold">
                <MenuItem>
                  <Link href="https://blog.eduardochiaro.com" className={'text-primary-900 dark:text-primary-100 flex w-full items-center !gap-1 px-2 py-2'}>
                    <span>
                      <span className="text-accent-600 dark:text-accent-500">.</span>dev
                    </span>
                    <RssIcon className={'text-accent-600 dark:text-accent-500 h-4'} aria-hidden="true" />
                  </Link>
                </MenuItem>
              </div>
            </MenuItems>
          </Transition>
        </Menu>

        <Link href="/" className="font-header flex items-center p-1 px-2 text-3xl font-normal">
          <SiteLogo />
        </Link>
        <div className="flex items-center gap-4 md:gap-10">
          <div className="hidden items-center md:flex">
            <ul className="mx-auto items-center gap-2 font-semibold tracking-wider md:flex md:gap-8">
              {menuData
                .filter((x: any) => !x.onlyMobile && x.active)
                .map((item: any, i: number) => {
                  return (
                    <li key={`menu-link-${i}`}>
                      <NavLink
                        href={item.link}
                        className={'hover:text-secondary-700 dark:hover:text-secondary-500 block text-2xl md:inline-block md:text-sm'}
                        activeClassName={'block md:inline-block text-2xl md:text-sm active-url'}
                        type="main"
                      >
                        {item.text}
                      </NavLink>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="border-primary-200 dark:border-primary-700 hidden border-l pl-6 tracking-wider md:block">
            <Link
              href="https://blog.eduardochiaro.com"
              className="flex items-center gap-1 pr-6 text-sm font-medium whitespace-nowrap transition hover:underline md:pr-0"
            >
              <span>
                <span className="text-accent-600 dark:text-accent-500">.</span>dev
              </span>
              <RssIcon className={'text-accent-600 dark:text-accent-500 h-4'} aria-hidden="true" />
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
