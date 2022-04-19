import * as React from 'react';
import {
  TerminalIcon,
  ChipIcon,
  UserCircleIcon,
} from '@heroicons/react/solid';
import GitHubIcon from '../elements/icons/github';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
      text: 'Projects',
      link: '/#projects',
      current: false,
      pre: <ChipIcon className="h-7 md:h-5 inline mr-2 align-sub" />
    },
    {
      text: 'GitHub',
      link: '/#github',
      current: false,
      pre: <GitHubIcon className="h-7 md:h-5 inline mr-2 align-sub" />
    }
  ];
  const router = useRouter();
  return (
    <div className="hidden xl:block fixed top-28 left-10">
      <ul className="text-isabelline-700 font-semibold tracking-wider">
      { menuData.map(function(item, i) {
        return (
          <li 
            className="my-2"
            key={`menu-link-${i}`}>
            <Link
              href={ item.link } 
              as={ item.as }>
                <a 
                  className={router.asPath != item.link && router.asPath != item.as ? `text-2xl md:text-base hover:text-independence-900 dark:hover:text-isabelline-500` : `text-2xl md:text-base text-independence-900 dark:text-isabelline-500`}
                  >{item.pre}{item.text}</a>
            </Link>
          </li>
        )
      })}
      </ul>
    </div>
  )
}