import getUser from '@/utils/getUser';
import Sidebar from '@/components/dashboard/Sidebar';

export default async function AdminIndex({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  if (user) {
    return (
      <>
        <button
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          className="ms-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm text-primary-500 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:text-primary-400 dark:hover:bg-primary-700 dark:focus:ring-primary-600 sm:hidden"
        >
          <span className="sr-only">Open sidebar</span>
          <svg className="h-6 w-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>

        <aside
          id="default-sidebar"
          className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0"
          aria-label="Sidebar"
        >
          <Sidebar user={user} />
        </aside>

        <div className="relative h-screen p-4 sm:ml-64">{children}</div>
      </>
    );
  }
  return null;
}
