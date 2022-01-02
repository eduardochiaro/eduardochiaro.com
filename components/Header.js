import * as React from 'react';
import {
  RssIcon
} from '@heroicons/react/outline'

import SVG from 'react-inlinesvg'
import styles from '../styles/Header.module.scss'

export default function Header () {
  const menuData = [
    {
      text: 'Home',
      link: '#root',
      current: true 
    },
    {
      text: 'Skills',
      link: '#skills-anchor',
      current: false 
    },
    {
      text: 'Apps',
      link: '#apps-anchor',
      current: false 
    },
    {
      text: 'GitHub',
      link: '#github-anchor',
      current: false 
    }
  ]
  return (
    <header id="root" className={`${styles.header} z-40`}>
      <nav className="w-100 pt-6 md:px-12 md:px-auto pb-1">
        <div className="md:h-16 h-28 px-3 mx-auto flex items-center justify-between flex-wrap md:flex-nowrap">
          <div className="text-gray-500 md:order-1">
            <SVG 
              title="" 
              alt="" 
              className={`w-auto mainLogo md:pl-0 pl-6`}
              width={65}
              src={'/images/logo-n.svg'} />
          </div>
          <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
            <ul className="flex font-semibold justify-between">
              { menuData.map(function(item, i) {
                return (
                  <li 
                      key={`menu-link-${i}`} 
                      className={`px-6 md:py-2 text-base hover:text-gray-900 ${item.current ? 'text-gray-900' : ''}`}>
                    <a 
                      href={ item.link } 
                      aria-current={item.current ? 'page' : undefined}>
                      { item.text }
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="order-2 md:order-3">
            <a href="#" className=" md:pr-0 pr-6 whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
              <RssIcon className={`h-6 w-6 inline-block text-terra-cotta-900`} aria-hidden="true"  /> .dev
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}