import React from 'react';
import {
  DocumentTextIcon,
  TerminalIcon,
  UserCircleIcon,
} from '@heroicons/react/solid';
import GitHubIcon from '../icons/github';
import NavLink from '../NavLink';

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
    <div className="hidden xl:block fixed top-40 left-10 text-sm font-semibold tracking-wider">
      <div className="mb-6">On this page</div>
      <ul className="">
      { menuData.map(function(item, i) {
        return (
          <li 
            className="my-2"
            key={`menu-link-${i}`}>
              <NavLink 
                href={item.link} 
                as={ item.as }
                className={`flex items-center transition hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline opacity-60 hover:opacity-100`}
                activeClassName={`flex items-center transition text-primary-700 dark:text-primary-600`}
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