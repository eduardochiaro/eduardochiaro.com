import React from 'react';
import {
  DocumentTextIcon,
  TerminalIcon,
  UserCircleIcon,
} from '@heroicons/react/solid';
import GitHubIcon from '../icons/github';
import NavLink from '../Navlink';

export default function Sidemenu () {
  const menuData = [
    {
      text: 'Bio',
      link: '/',
      as: '/#top',
      current: true,
      pre: <UserCircleIcon className="h-7 md:h-5 mr-2" />
    },
    {
      text: 'Skills',
      link: '/#skills',
      current: false,
      pre: <TerminalIcon className="h-7 md:h-5 mr-2" />
    },
    {
      text: 'Articles',
      link: '/#articles',
      current: false,
      pre: <DocumentTextIcon className="h-7 md:h-5 mr-2" />
    },
    {
      text: 'GitHub',
      link: '/#github',
      current: false,
      pre: <GitHubIcon className="h-7 md:h-5 mr-2" />
    }
  ];

  return (
    <div className="hidden xl:block fixed top-40 left-10">
      <div className="text-sm font-semibold mb-6">On this page</div>
      <ul className="text-primary-800 dark:text-primary-700 font-semibold tracking-wider">
      { menuData.map(function(item, i) {
        return (
          <li 
            className="my-2"
            key={`menu-link-${i}`}>
              <NavLink 
                href={item.link} 
                as={ item.as }
                className={`flex items-center text-2xl md:text-base transition hover:text-zinc-900 dark:hover:text-primary-500 hover:underline`} 
                activeClassName={`flex items-center text-2xl md:text-base transition text-accent-500`}
              >
                <a>{item.pre}{item.text}</a>
              </NavLink>
          </li>
        )
      })}
      </ul>
    </div>
  )
}