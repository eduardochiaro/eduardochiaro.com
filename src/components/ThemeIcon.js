import React, { useState, useEffect, Fragment } from 'react';
import { MoonIcon, SunIcon, DesktopComputerIcon } from '@heroicons/react/solid';
import { useTheme } from "next-themes";
import { Menu, Transition } from '@headlessui/react';

export default function ThemeIcon () {
  const classColors = [
    {
      name: 'light',
      className: '',
      icon: <SunIcon className="w-5 h-5 block mr-3"  />,
    },
    {
      name: 'dark',
      className: '',
      icon: <MoonIcon className="w-5 h-5 block mr-3"  />,
    },
    {
      name: 'system',
      className: '',
      icon: <DesktopComputerIcon className="w-5 h-5 block mr-3"  />,
    }
  ];
  const [iconClass, setIconClass] = useState(classColors);
  const [inUseTheme, setInUseTheme] = useState("dark");
  const { systemTheme , theme, setTheme } = useTheme();

  useEffect(() => {
    const currentTheme = theme === "system" ? systemTheme : theme ;
    setInUseTheme(currentTheme);
    resetColors();
  }, [theme, systemTheme]);

  const setColorTheme = (themeName) => {
    setTheme(themeName);
    resetColors();
  }
  const resetColors = () => {
    const resetClassColors = classColors.map(x => {
      x.className = '';
      return x;
    });
    setIconClass(resetClassColors.map(x => {
      if (x.name === theme) {
        x.className = 'text-primary-800 dark:text-primary-700';
      } 
      return x;
    }));
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button as="span">
      { inUseTheme === "dark" ? 
        <SunIcon className="w-5 h-5 text-zinc-900 inline-block ml-4 border rounded-full bg-primary-500" />
        :
        <MoonIcon className="w-5 h-5 text-primary-500 inline-block ml-4 border rounded-full bg-zinc-900" />
      }
      </Menu.Button>
      <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="focus:outline-none whitespace-nowrap absolute right-0 mt-2 w-auto origin-top-right rounded-md bg-zinc-100 dark:bg-zinc-700 shadow-lg ring-2 ring-primary-700 ring-opacity-50">
            <div className="py-2 px-4 font-semibold divide-y divide-zinc-400">
              { iconClass.map((item, index) => (
                <Menu.Item key={index}>
                  <div className={`${item.className} py-2 pr-12 hover:underline cursor-pointer flex items-center capitalize`} role="button" onClick={() => setColorTheme(item.name)}>
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