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
      pre: <UserCircleIcon className="h-7 md:h-5 inline mr-2 align-sub" />
    },
    {
      text: 'Skills',
      link: '/#skills',
      current: false,
      pre: <TerminalIcon className="h-7 md:h-5 inline mr-2 align-sub" />
    },
    {
      text: 'Articles',
      link: '/#articles',
      current: false,
      pre: <DocumentTextIcon className="h-7 md:h-5 inline mr-2 align-sub" />
    },
    {
      text: 'GitHub',
      link: '/#github',
      current: false,
      pre: <GitHubIcon className="h-7 md:h-5 inline mr-2 align-sub" />
    }
  ];

  return (
    <div className="hidden xl:block fixed top-28 left-10">
      <ul className="text-primary-800 dark:text-primary-700 font-semibold tracking-wider">
      { menuData.map(function(item, i) {
        return (
          <li 
            className="my-2"
            key={`menu-link-${i}`}>
              <NavLink 
                href={item.link} 
                as={ item.as }
                className={`text-2xl md:text-base transition hover:text-zinc-900 dark:hover:text-primary-500`} 
                activeClassName={`text-2xl md:text-base transition text-zinc-900 dark:text-primary-500 underline`}
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