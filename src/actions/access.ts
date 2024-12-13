'use server';
import getUser from '@/utils/getUser';
import { redirect } from 'next/navigation';

async function signOut() {
  'use server';
  const user = await getUser();
  if (user) {
    redirect('/admin');
  }
}

export { signOut };
