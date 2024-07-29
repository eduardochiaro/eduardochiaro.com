'use client';

import React, { useState, useEffect, Fragment } from 'react';
import { MoonIcon, ComputerDesktopIcon, SunIcon as SunIconSolid } from '@heroicons/react/24/solid';
import { SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import classNames from '@/utils/classNames';

const orientationClass = (orientation = 'bottom') => {
  switch (orientation) {
    case 'top':
      return 'md:left-0 md:bottom-0 md:mb-10 right-0 mt-10';
    case 'top left':
      return 'right-0 md:bottom-0 md:mb-10';
    case 'bottom':
    default:
      return 'right-0 mt-10';
  }
};

export default function ThemeIcon({ orientation, size = 'h-7' }: { orientation: string; size?: string }) {
  const [iconClass, setIconClass] = useState<{ name: string; className: string; icon: any }[]>([]);
  const [inUseTheme, setInUseTheme] = useState('dark');
  const { systemTheme, theme, setTheme } = useTheme() as { systemTheme: string; theme: string; setTheme: (theme: string) => void };

  const setColorTheme = (themeName: string) => {
    setTheme(themeName);
  };

  useEffect(() => {
    const classColors = [
      {
        name: 'light',
        className: '',
        icon: <SunIcon className="mr-2 block h-5 w-5 flex-none" />,
      },
      {
        name: 'dark',
        className: '',
        icon: <MoonIcon className="mr-2 block h-5 w-5 flex-none" />,
      },
      {
        name: 'system',
        className: '',
        icon: <ComputerDesktopIcon className="mr-2 block h-5 w-5 flex-none" />,
      },
    ];

    const resetColors = () => {
      const resetClassColors = classColors.map((x) => {
        x.className = '';
        return x;
      });
      setIconClass(
        resetClassColors.map((x) => {
          if (x.name === theme) {
            x.className = 'text-accent-500 dark:text-accent-400 underline';
          }
          return x;
        }),
      );
    };

    const currentTheme = theme === 'system' ? systemTheme : theme;
    setInUseTheme(currentTheme);
    resetColors();
  }, [theme, systemTheme]);

  return (
    <Menu as="div" className="item-center relative flex">
      <MenuButton
        id="menu-change-mode"
        title="change theme"
        data-cy="change-mode"
        className={`group rounded-full transition-all duration-300 ease-in-out ${inUseTheme === 'dark' ? 'hover:bg-primary-100' : ''}`}
      >
        {inUseTheme === 'dark' ? (
          <MoonIcon className={`${size} cursor-pointer rounded-full text-primary-50 transition-all duration-300 group-hover:fill-primary-800`} />
        ) : (
          <>
            <SunIcon
              className={`${size} cursor-pointer rounded-full text-primary-800 transition-all duration-300 group-hover:hidden group-hover:text-accent-500`}
            />
            <SunIconSolid
              className={`${size} hidden cursor-pointer rounded-full text-primary-800 transition-all duration-300 hover:rotate-45 group-hover:block group-hover:text-accent-500`}
            />
          </>
        )}
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
        <MenuItems
          data-cy="change-mode-container"
          className={classNames(orientationClass(orientation), 'box-card absolute w-40 transform overflow-auto')}
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          {iconClass?.map((item, index) => (
            <div className="font-semibold text-primary-600 dark:text-primary-400" key={index}>
              <MenuItem>
                {({ active }) => (
                  <div
                    data-cy={`change-mode-${item.name}`}
                    className={classNames(
                      item.className,
                      'flex cursor-pointer items-center gap-2 px-4 py-2 capitalize',
                      active ? 'bg-primary-200 dark:bg-primary-900' : '',
                    )}
                    role="menuitem"
                    id={`menu-theme-${index}`}
                    onClick={() => setColorTheme(item.name)}
                  >
                    {item.icon} {item.name}
                  </div>
                )}
              </MenuItem>
            </div>
          ))}
        </MenuItems>
      </Transition>
    </Menu>
  );
}
