import React, { useState, useEffect, Fragment } from 'react';
import { MoonIcon, SunIcon, ComputerDesktopIcon } from '@heroicons/react/24/solid';
import { useTheme } from "next-themes";
import { Menu, Transition } from '@headlessui/react';

export default function ThemeIcon () {
  const [iconClass, setIconClass] = useState(null);
  const [inUseTheme, setInUseTheme] = useState("dark");
  const { systemTheme , theme, setTheme } = useTheme();

  const setColorTheme = (themeName) => {
    setTheme(themeName);
  }

  useEffect(() => {
    const classColors = [
      {
        name: 'light',
        className: '',
        icon: <SunIcon className="w-5 h-5 block mr-2"  />,
      },
      {
        name: 'dark',
        className: '',
        icon: <MoonIcon className="w-5 h-5 block mr-2"  />,
      },
      {
        name: 'system',
        className: '',
        icon: <ComputerDesktopIcon className="w-5 h-5 block mr-2"  />,
      }
    ];

    const resetColors = () => {
      const resetClassColors = classColors.map(x => {
        x.className = '';
        return x;
      });
      setIconClass(resetClassColors.map(x => {
        if (x.name === theme) {
          x.className = 'text-primary-700 dark:text-primary-600';
        } 
        return x;
      }));
    }

    const currentTheme = theme === "system" ? systemTheme : theme ;
    setInUseTheme(currentTheme);
    resetColors();
  }, [theme, systemTheme]);

  return (
    <Menu as="div" className="relative flex item-center">
      <Menu.Button title="change theme" data-cy="change-mode">
      { inUseTheme === "dark" ? 
        <MoonIcon className="w-5 h-5 fill-primary-600 cursor-pointer rounded-full transition-all duration-300 ease-in-out hover:bg-zinc-100 hover:fill-zinc-800" />
        :
        <SunIcon className="w-5 h-5 fill-zinc-500 cursor-pointer rounded-full transition-all duration-300 ease-in-out hover:fill-primary-600" />
      }
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
          <Menu.Items data-cy="change-mode-container" className="transform focus:outline-none z-50 top-full whitespace-nowrap absolute right-0 mt-2 w-auto origin-top-right rounded-md bg-zinc-100 dark:bg-zinc-700 shadow-lg ring-2 ring-primary-700 ring-opacity-50">
            <div className="py-2 px-4 font-semibold divide-y divide-zinc-400" >
              { iconClass?.map((item, index) => (
                <Menu.Item key={index}>
                  <div data-cy={`change-mode-${item.name}`} className={`${item.className} py-2 pr-12 hover:underline cursor-pointer flex items-center capitalize`} role="button" onClick={() => setColorTheme(item.name)}>
                  {item.icon} {item.name}
                  </div>
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
    </Menu>
  )
}