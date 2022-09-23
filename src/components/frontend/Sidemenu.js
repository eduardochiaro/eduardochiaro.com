import * as React from 'react';
import NavLink from '@/components/NavLink';

export default function Sidemenu({ menuData }) {
  return (
    <div className="hidden xl:block fixed top-40 left-10 text-sm font-semibold tracking-wider">
      <div className="mb-6">On this page</div>
      <ul>
        {menuData.map(function (item, i) {
          return (
            <li className="my-2" key={`menu-link-${i}`}>
              <NavLink
                href={item.link}
                as={item.as}
                className={'flex items-center gap-2 transition hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline opacity-60 hover:opacity-100'}
                activeClassName={'flex items-center gap-2 transition text-primary-700 dark:text-primary-600'}
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
  );
}
