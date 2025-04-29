import getUser from '@/utils/getUser';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/dashboard/Sidebar';
import MenuIcon from '@/components/icons/Menu';

export default async function AdminIndex({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  if (!user) {
    redirect('/auth/signin');
  }

  if (user) {
    return (
      <>
        <button
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          className="text-primary-500 hover:bg-primary-100 focus:ring-primary-200 dark:text-primary-400 dark:hover:bg-primary-700 dark:focus:ring-primary-600 ms-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm focus:ring-2 focus:outline-none sm:hidden"
        >
          <span className="sr-only">Open sidebar</span>
          <MenuIcon className="fill-primary-50 size-6" />
        </button>

        <aside
          id="default-sidebar"
          className="fixed top-0 left-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0"
          aria-label="Sidebar"
        >
          <Sidebar user={user} />
        </aside>

        <div className="bg-primary-200 dark:bg-primary-900 relative h-screen overflow-auto p-4 sm:ml-64">{children}</div>
      </>
    );
  }
  return null;
}
