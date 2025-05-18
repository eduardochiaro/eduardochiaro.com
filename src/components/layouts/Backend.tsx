import AdminSidebar from '@/components/admin/Sidebar';
import { BriefcaseIcon, CpuChipIcon, CommandLineIcon, TagIcon, BookmarkIcon, Bars3Icon, HashtagIcon } from '@heroicons/react/24/solid';
import React, { ReactElement } from 'react';

const menuList = [
  {
    title: 'Portfolio',
    links: [
      {
        title: 'Skills',
        icon: CommandLineIcon,
        href: '/admin/skills',
        description: 'Manage entries on Skills section in Homepage',
        classColor: 'bg-amber-700',
      },
      {
        title: 'Apps',
        icon: CpuChipIcon,
        href: '/admin/apps',
        description: 'Manage entries on Apps in Projects page',
        classColor: 'bg-indigo-700',
      },
      {
        title: 'Bookmarks',
        icon: BookmarkIcon,
        href: '/admin/bookmarks',
        description: 'Manage entries for bookmarks page',
        classColor: 'bg-red-700',
      },
      {
        title: 'Resume',
        icon: BriefcaseIcon,
        href: '/admin/resume',
        description: 'Manage entries on Resume section in Homepage',
        classColor: 'bg-emerald-700',
      },
    ],
  },
  {
    title: 'System',
    links: [
      {
        title: 'Menu links',
        icon: Bars3Icon,
        href: '/admin/menu',
        description: 'Set up primary navigation menu',
        classColor: 'bg-secondary-600',
      },
      {
        title: 'Categories',
        icon: TagIcon,
        href: '/admin/categories',
        description: 'Manage categories used in several other sections',
        classColor: 'bg-cyan-700',
      },
      {
        title: 'Tags',
        icon: HashtagIcon,
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
    <div className="h-full w-full bg-primary-100 antialiased dark:bg-primary-800">
      <div className="flex w-full flex-grow">
        <AdminSidebar isPageOpen={isPageOpen} />
        {children}
      </div>
    </div>
  );
};

export default BackendLayout;
