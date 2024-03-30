import getUser from '@/utils/getUser';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  if (!user) {
    redirect('/auth/signin');
  }

  return <>{children}</>;
}
