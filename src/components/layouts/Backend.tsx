import Head from 'next/head';
import AdminSidebar from '../admin/Sidebar';
import { BriefcaseIcon, CpuChipIcon, CommandLineIcon, TagIcon, BookmarkIcon, Bars3Icon, HashtagIcon } from '@heroicons/react/24/solid';
import React, { ReactElement } from 'react';

const classForIcon = 'w-5 group-hover:text-secondary-600 dark:group-hover:text-secondary-600';

const menuList = [
  {
    title: 'Portfolio',
    links: [
      {
        title: 'Skills',
        icon: <CommandLineIcon className={classForIcon} />,
        href: '/admin/skills',
        description: 'Manage entries on Skills section in Homepage',
        classColor: 'bg-amber-700',
      },
      {
        title: 'Apps',
        icon: <CpuChipIcon className={classForIcon} />,
        href: '/admin/apps',
        description: 'Manage entries on Apps in Projects page',
        classColor: 'bg-indigo-700',
      },
      {
        title: 'Bookmarks',
        icon: <BookmarkIcon className={classForIcon} />,
        href: '/admin/bookmarks',
        description: 'Manage entries for bookmarks page',
        classColor: 'bg-red-700',
      },
      {
        title: 'Resume',
        icon: <BriefcaseIcon className={classForIcon} />,
        href: '/admin/resume',
        description: 'Manage entries on Resume section in Homepage',
        classColor: 'bg-emerald-700',
      },
    ],
  },
  {
    title: 'Sytem',
    links: [
      {
        title: 'Menu links',
        icon: <Bars3Icon className={classForIcon} />,
        href: '/admin/menu',
        description: 'Set up primary navigation menu',
        classColor: 'bg-secondary-600',
      },
      {
        title: 'Categories',
        icon: <TagIcon className={classForIcon} />,
        href: '/admin/categories',
        description: 'Manage categories used in several other sections',
        classColor: 'bg-cyan-700',
      },
      {
        title: 'Tags',
        icon: <HashtagIcon className={classForIcon} />,
        href: '/admin/tags',
        description: 'Manage tags used in resume',
        classColor: 'bg-accent-700',
      },
    ],
  },
];

export { menuList };

const BackendLayout = ({ children, isPageOpen }: { children: ReactElement | ReactElement[]; isPageOpen: boolean }) => {
  return (
    <div className="w-full h-full antialiased bg-primary-100 dark:bg-primary-800">
      <Head>
        <title>Eduardo Chiaro | Admin</title>
      </Head>
      <div className="flex flex-no-wrap">
        <AdminSidebar menuList={menuList} isPageOpen={isPageOpen} />
        {children}
      </div>
    </div>
  );
};

export default BackendLayout;
