import { AppWindowMac, BookmarkCheckIcon, FileUserIcon, HashIcon, LibraryBigIcon, MenuIcon, SquareTerminalIcon, TagsIcon } from 'lucide-react';
import { text } from 'stream/consumers';

const menuList = [
  {
    title: 'Portfolio',
    links: [
      {
        title: 'Skills',
        icon: SquareTerminalIcon,
        href: '/admin/skills',
        description: 'Manage entries on Skills section in Homepage',
        classColor: 'bg-amber-700',
        textColor: 'text-amber-700',
      },
      {
        title: 'Apps',
        icon: AppWindowMac,
        href: '/admin/apps',
        description: 'Manage entries on Apps in Projects page',
        classColor: 'bg-indigo-700',
        textColor: 'text-indigo-700',
      },
      {
        title: 'Bookmarks',
        icon: BookmarkCheckIcon,
        href: '/admin/bookmarks',
        description: 'Manage entries for bookmarks page',
        classColor: 'bg-red-700',
        textColor: 'text-red-700',
      },
      {
        title: 'Resume',
        icon: FileUserIcon,
        href: '/admin/resume',
        description: 'Manage entries on Resume section in Homepage',
        classColor: 'bg-emerald-700',
        textColor: 'text-emerald-700',
      },
      {
        title: 'Books',
        icon: LibraryBigIcon,
        href: '/admin/books',
        description: 'Manage entries on Books page',
        classColor: 'bg-cyan-700',
        textColor: 'text-cyan-700',
      },
    ],
  },
  {
    title: 'System',
    links: [
      {
        title: 'Menu links',
        icon: MenuIcon,
        href: '/admin/menu',
        description: 'Set up primary navigation menu',
        classColor: 'bg-secondary-600',
        textColor: 'text-secondary-600',
      },
      {
        title: 'Categories',
        icon: TagsIcon,
        href: '/admin/categories',
        description: 'Manage categories used in several other sections',
        classColor: 'bg-cyan-700',
        textColor: 'text-cyan-700',
      },
      {
        title: 'Tags',
        icon: HashIcon,
        href: '/admin/tags',
        description: 'Manage tags used in resume',
        classColor: 'bg-accent-700',
        textColor: 'text-accent-700',
      },
    ],
  },
];

export { menuList };
