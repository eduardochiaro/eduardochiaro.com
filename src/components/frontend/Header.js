import React, { Fragment } from 'react';
import { RssIcon, Bars3BottomLeftIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import { Menu, Transition } from '@headlessui/react';
import ThemeIcon from '@/components/ThemeIcon';
import NavLink from '@/components/NavLink';
import HeaderLogo from '@/components/icons/headerLogo';
import Link from 'next/link';
import useStaleSWR from '@/utils/staleSWR';

import styles from '@/styles/Header.module.scss';
import classNames from '@/utils/classNames';

export default function Header() {
  const router = useRouter();
  const { data } = useStaleSWR('/api/site/menu');

  const menuData =
    data && data.results
      ? data.results.map((menuLink) => {
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
    <header className={`${styles.header} bg-primary-50/95 dark:bg-primary-700/95`}>
      <nav className="w-full relative">
        <div className="px-4 md:px-8 flex items-center h-12">
          <div className="flex-none flex gap-4 font-header text-2xl">
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
                <Menu.Items className="focus:outline-none absolute left-0 top-full w-full max-w-lg bg-primary-100 dark:bg-primary-700 shadow-2xl shadow-primary-600 ring-1 ring-primary-900 ring-opacity-10  divide-y divide-primary-400">
                  {menuData
                    .filter((x) => x.active)
                    .map(function (item, i) {
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
                      <Link
                        href="https://blog.eduardochiaro.com"
                        className={`${styles.menuUrlMobile} text-primary-900 dark:text-primary-100`}
                      >
                        <RssIcon className={'h-5 text-accent-600 dark:text-accent-500/80 mr-1'} aria-hidden="true" />
                        .dev
                      </Link>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <Link href="/" className="flex items-center gap-2 md:gap-3">
              <HeaderLogo title="Eduardo Chiaro" alt="Eduardo Chiaro" className={`w-auto h-7 md:h-10 logo `} />
            </Link>
          </div>
          <span className="flex-1"></span>
          <div className="hidden md:flex items-center">
            <ul className="md:flex font-semibold tracking-wider mx-auto">
              {menuData
                .filter((x) => !x.onlyMobile && x.active)
                .map(function (item, i) {
                  return (
                    <li key={`menu-link-${i}`}>
                      <NavLink
                        href={item.link}
                        className={`${styles.menuUrl} hover:text-primary-900 dark:hover:text-primary-100 hover:underline opacity-60 hover:opacity-100`}
                        activeClassName={`${styles.menuUrl} overlay-color`}
                        type="main"
                      >
                        <a>{item.text}</a>
                      </NavLink>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="hidden md:inline-block ml-12 mr-6 tracking-wider">
            <Link
              href="https://blog.eduardochiaro.com"
              className="md:pr-0 pr-6 whitespace-nowrap text-base font-medium transition hover:underline flex items-center"
            >
              <RssIcon className={'h-5 text-accent-600 dark:text-accent-500/80 mr-1'} aria-hidden="true" />
              .dev
            </Link>
          </div>
          <ThemeIcon />
        </div>
      </nav>
    </header>
  );
}
