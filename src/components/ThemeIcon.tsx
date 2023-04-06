import React, { useState, useEffect, Fragment } from 'react';
import { MoonIcon, ComputerDesktopIcon, SunIcon as SunIconSolid } from '@heroicons/react/24/solid';
import { SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';
import { Menu, Transition } from '@headlessui/react';
import classNames from '@/utils/classNames';

export default function ThemeIcon({ orientation, size = 'h-7' }: { orientation: string; size?: string }) {
  const [iconClass, setIconClass] = useState<{ name: string; className: string; icon: any }[]>([]);
  const [inUseTheme, setInUseTheme] = useState('dark');
  const { systemTheme, theme, setTheme } = useTheme() as { systemTheme: string; theme: string; setTheme: (theme: string) => void };

  const setColorTheme = (themeName: string) => {
    setTheme(themeName);
  };

  const orientationClass = (orientation = 'bottom') => {
    switch (orientation) {
      case 'top':
        return 'left-0 bottom-0 mb-10';
      case 'bottom':
      default:
        return 'right-0 mt-10';
    }
  };

  useEffect(() => {
    const classColors = [
      {
        name: 'light',
        className: '',
        icon: <SunIcon className="flex-none w-5 h-5 block mr-2" />,
      },
      {
        name: 'dark',
        className: '',
        icon: <MoonIcon className="flex-none w-5 h-5 block mr-2" />,
      },
      {
        name: 'system',
        className: '',
        icon: <ComputerDesktopIcon className="flex-none w-5 h-5 block mr-2" />,
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
        className={`rounded-full transition-all duration-300 group ease-in-out ${inUseTheme === 'dark' ? 'hover:bg-primary-100' : ''}`}
      >
        {inUseTheme === 'dark' ? (
          <MoonIcon className={`${size} text-primary-50 cursor-pointer rounded-full group-hover:fill-primary-800 transition-all duration-300`} />
        ) : (
          <>
            <SunIcon
              className={`${size} text-primary-800 cursor-pointer rounded-full group-hover:text-accent-500 transition-all duration-300 group-hover:hidden`}
            />
            <SunIconSolid
              className={`${size} text-primary-800 cursor-pointer rounded-full group-hover:text-accent-500 transition-all duration-300 hidden group-hover:block`}
            />
          </>
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
          className={`${orientationClass(orientation)} transform absolute w-56 box-card divide-y divide-primary-200 dark:divide-primary-700`}
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          {iconClass?.map((item, index) => (
            <div className="py-1 font-semibold" key={index}>
              <Menu.Item>
                {({ active }) => (
                  <div
                    data-cy={`change-mode-${item.name}`}
                    className={classNames(
                      `${item.className} py-2 px-4 cursor-pointer flex items-center gap-2 capitalize`,
                      active ? 'bg-primary-200 dark:bg-primary-500' : '',
                    )}
                    role="menuitem"
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
