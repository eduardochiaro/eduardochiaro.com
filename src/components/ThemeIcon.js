import React, { useState, useEffect, Fragment } from 'react';
import { MoonIcon, SunIcon, DesktopComputerIcon } from '@heroicons/react/solid';
import { useTheme } from "next-themes";
import { Menu, Transition } from '@headlessui/react';

export default function ThemeIcon () {
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
      icon: <DesktopComputerIcon className="w-5 h-5 block mr-2"  />,
    }
  ];
  const [iconClass, setIconClass] = useState(classColors);
  const [inUseTheme, setInUseTheme] = useState("dark");
  const { systemTheme , theme, setTheme } = useTheme();

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
        x.className = 'text-accent-500';
      } 
      return x;
    }));
  }

  useEffect(() => {
    const currentTheme = theme === "system" ? systemTheme : theme ;
    setInUseTheme(currentTheme);
    resetColors();
  }, [theme, systemTheme]);

  return (
    <Menu as="div" className="relative">
      <Menu.Button as="span">
      { inUseTheme === "dark" ? 
        <SunIcon className="w-5 h-5 text-zinc-900 inline-block ml-4 border rounded-full bg-zinc-100" />
        :
        <MoonIcon className="w-5 h-5 text-zinc-100 inline-block ml-4 border rounded-full bg-zinc-900" />
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
          <Menu.Items className="transform focus:outline-none z-50 whitespace-nowrap absolute right-0 mt-2 w-auto origin-top-right rounded-md bg-zinc-100 dark:bg-zinc-700 shadow-lg ring-2 ring-primary-700 ring-opacity-50">
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