import React, { useState, useEffect, Fragment } from 'react';
import { MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/solid';
import { SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';
import { Menu, Transition } from '@headlessui/react';
import classNames from '@/utils/classNames';

export default function ThemeIcon() {
  const [iconClass, setIconClass] = useState(null);
  const [inUseTheme, setInUseTheme] = useState('dark');
  const { systemTheme, theme, setTheme } = useTheme();

  const setColorTheme = (themeName) => {
    setTheme(themeName);
  };

  useEffect(() => {
    const classColors = [
      {
        name: 'light',
        className: '',
        icon: <SunIcon className="w-5 h-5 block mr-2" />,
      },
      {
        name: 'dark',
        className: '',
        icon: <MoonIcon className="w-5 h-5 block mr-2" />,
      },
      {
        name: 'system',
        className: '',
        icon: <ComputerDesktopIcon className="w-5 h-5 block mr-2" />,
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
            x.className = 'text-secondary-700 dark:text-secondary-600';
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
    <Menu as="div" className="relative flex item-center">
      <Menu.Button
        title="change theme"
        data-cy="change-mode"
        className={`rounded-full transition-all duration-300 group ease-in-out ${
          inUseTheme === 'dark' ? 'hover:bg-primary-100' : 'bg-primary-300 hover:bg-secondary-300'
        }`}
      >
        {inUseTheme === 'dark' ? (
          <MoonIcon className="w-6 text-secondary-600 cursor-pointer rounded-full group-hover:fill-primary-800 transition-all duration-300" />
        ) : (
          <SunIcon className="w-6 text-primary-800 cursor-pointer rounded-full group-hover:text-secondary-900 transition-all duration-300" />
        )}
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
        <Menu.Items
          data-cy="change-mode-container"
          className="transform absolute right-0 z-10 mt-10 w-56 origin-bottom-right rounded-md shadow-lg ring-1 ring-primary-900 ring-opacity-10 focus:outline-none bg-primary-100 dark:bg-primary-700 divide-y divide-primary-200 dark:divide-primary-600"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabindex="-1"
        >
          {iconClass?.map((item, index) => (
            <div className="py-1 font-semibold" key={index}>
              <Menu.Item>
                {({ active }) => (
                  <div
                    data-cy={`change-mode-${item.name}`}
                    className={classNames(
                      `${item.className} py-2 px-4 cursor-pointer flex items-center gap-2 capitalize`,
                      active ? 'bg-primary-300 dark:bg-primary-500' : '',
                    )}
                    role="menuitem"
                    tabindex="-1"
                    id={`menu-item-${index}`}
                    onClick={() => setColorTheme(item.name)}
                  >
                    {item.icon} {item.name}
                  </div>
                )}
              </Menu.Item>
            </div>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
