'use client';

import React, { useState, useEffect, Fragment } from 'react';
import { useTheme } from 'next-themes';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import classNames from '@/utils/classNames';
import { SunMediumIcon, SunIcon, DockIcon, MoonIcon } from 'lucide-react';

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

export default function ThemeIcon({ orientation, size = 'size-7' }: { orientation: string; size?: string }) {
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
        icon: <SunIcon className="mr-2 block size-5 flex-none" />,
      },
      {
        name: 'dark',
        className: '',
        icon: <MoonIcon className="mr-2 block size-5 flex-none" />,
      },
      {
        name: 'system',
        className: '',
        icon: <DockIcon className="mr-2 block size-5 flex-none" />,
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
          <MoonIcon className={`${size} text-primary-50 group-hover:fill-primary-800 cursor-pointer rounded-full transition-all duration-300`} />
        ) : (
          <SunMediumIcon
            className={`${size} fill-primary-800 text-primary-800 group-hover:fill-accent-500 group-hover:text-accent-500 cursor-pointer rounded-full transition-all duration-300`}
          />
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
            <div className="text-primary-600 dark:text-primary-400 font-semibold" key={index}>
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
