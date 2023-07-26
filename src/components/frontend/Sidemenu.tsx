"use client";

import * as React from 'react';
import Link from 'next/link';

export default function Sidemenu({ menuData }: { menuData: { text: string; link: string; pre?: JSX.Element }[] }) {
  return (
    <div className="grow relative">
      <div className="fixed hidden xl:block text-sm font-semibold tracking-wider">
        <div className="mb-6 mt-10 ml-4">Quick nav</div>
        <ul className="ml-4">
          {menuData.map(function (item, i) {
            return (
              <li key={`menu-link-${i}`} className="my-2">
                <Link href={item.link} className="flex items-center gap-2 transition hover:text-secondary-600">
                  {item.pre}
                  {item.text}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
