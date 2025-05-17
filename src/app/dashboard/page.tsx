import Card from '@/components/frontend/Card';
import { menuList } from '@/utils/menuList';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Admin | Eduardo Chiaro',
};

export default async function DashboardIndex() {
  //replace url 'admin' to `dashboard`
  const newMenu = menuList.map((item) => {
    const links = item.links.map((link) => {
      link.href = link.href.replace('/admin', '/dashboard');
      return link;
    });
    return { ...item, links };
  });

  return (
    <div className="p-6">
      <Card>
        <h2 className="text-2xl font-semibold">Dashboard</h2>
      </Card>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {newMenu.map((item, i) => (
          <div key={i}>
            <h2 className="font-header mb-4 text-xl font-semibold">{item.title}</h2>
            <Card type="medium" className="flex flex-col gap-4">
              {item.links.map((link, key) => (
                <Link
                  key={key}
                  href={link.href}
                  prefetch={false}
                  className="text-primary-700 hover:text-primary-900 dark:text-primary-300 dark:hover:text-primary-100 flex items-center gap-2"
                >
                  <link.icon className="text-primary-500 group-hover:text-accent-500 dark:text-primary-400 h-5 w-5 transition duration-75 dark:group-hover:text-white" />
                  {link.title}
                </Link>
              ))}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
