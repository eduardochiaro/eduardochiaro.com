import * as React from 'react';
import NavLink from '@/components/NavLink';

export default function Sidemenu({ menuData }) {
  return (
    <div className="grow relative">
      <div className="fixed hidden xl:block text-sm font-semibold tracking-wider">
        <div className="mb-6 mt-10 ml-4">On this page</div>
        <ul className="ml-4">
          {menuData.map(function (item, i) {
            return (
              <li className="my-2" key={`menu-link-${i}`}>
                <NavLink
                  href={item.link}
                  as={item.as}
                  className={'flex items-center gap-2 transition hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline'}
                  activeClassName={'flex items-center gap-2 transition text-primary-800 dark:text-primary-600'}
                >
                  <a onClick={item.onClick || null}>
                    {item.pre}
                    {item.text}
                  </a>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
