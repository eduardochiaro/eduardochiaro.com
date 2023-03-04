import React, { Fragment } from 'react';
import { RssIcon, Bars3BottomLeftIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import { Menu, Transition } from '@headlessui/react';
import ThemeIcon from '@/components/ThemeIcon';
import NavLink from '@/components/NavLink';
import Link from 'next/link';
import useStaleSWR from '@/utils/staleSWR';
import styles from '@/styles/Header.module.scss';
import classNames from '@/utils/classNames';
import type { MenuLink } from '@prisma/client';

export default function Header() {
  const router = useRouter();
  const { data } = useStaleSWR('/api/site/menu');

  const menuData =
    data && data.results
      ? data.results.map((menuLink: MenuLink) => {
          return { text: menuLink.name, link: menuLink.url, current: false, ...menuLink };
        })
      : [];

  if (menuData.length > 0) {
    menuData.push({
      text: (
        <>
          <RssIcon className={'h-5 text-accent-500 mr-2 inline-block'} aria-hidden="true" />
          .dev
        </>
      ),
      link: 'https://blog.eduardochiaro.com',
      current: false,
      onlyMobile: true,
    });
  }

  return (
    <header className={`${styles.header} bg-primary-50/95 dark:bg-primary-700/95 border-b border-primary-200/50 dark:border-primary-600/50`}>
      <nav className="max-w-5xl mx-auto relative">
        <div className="px-4 md:px-0 py-3 flex items-center gap-6">
          <Menu as="div" className="inline-block md:hidden">
            <Menu.Button title="open menu" className="inline-block md:hidden hover:cursor-pointer">
              <Bars3BottomLeftIcon className={'w-7 inline-block transition hover:text-primary-900 dark:hover:text-primary-100'} />
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
              <Menu.Items className="focus:outline-none absolute left-0 top-full w-full max-w-lg bg-primary-200 dark:bg-primary-600 shadow-2xl shadow-primary-600 ring-1 ring-primary-900 ring-opacity-10  divide-y divide-primary-400">
                {menuData
                  .filter((x: MenuLink) => x.active)
                  .map(function (item: { link: string; text: string }, i: number) {
                    return (
                      <div key={`menu-link-${i}`} className="px-1 py-1 font-semibold text-secondary-700 dark:text-secondary-600">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href={item.link}
                              className={classNames(
                                styles.menuUrlMobile,
                                router.route == item.link ? '' : 'text-primary-900 dark:text-primary-100',
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
                    <Link href="https://blog.eduardochiaro.com" className={`${styles.menuUrlMobile} text-primary-900 dark:text-primary-100`}>
                      <RssIcon className={'h-7 text-accent-600 dark:text-accent-500 mr-1'} aria-hidden="true" />
                      .dev
                    </Link>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <span className="grow text-center md:text-left">
            <Link href="/" className="inline-flex items-baseline gap-2">
              <span className={'text-3xl font-header font-normal hidden md:block'}>
                eduardo<span className="font-semibold overlay-color">chiaro</span>
              </span>
            </Link>
          </span>
          <div className="hidden md:flex items-center">
            <ul className="md:flex font-semibold tracking-wider mx-auto">
              {menuData
                .filter((x: MenuLink) => !x.onlyMobile && x.active)
                .map(function (item: { link: string; text: string }, i: number) {
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
          <div className="hidden md:block tracking-wider pl-6 border-l border-primary-200 dark:border-primary-600">
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
          <ThemeIcon orientation="right" size="h-5" />
        </div>
      </nav>
    </header>
  );
}