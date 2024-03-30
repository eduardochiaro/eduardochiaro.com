'use server';
import getUser from '@/utils/getUser';
import { lucia } from '@/utils/auth';
import { redirect } from 'next/navigation';

async function signOut() {
  'use server';
  const user = await getUser();
  if (user) {
    await lucia.invalidateUserSessions(user.id as unknown as string);

    redirect('/admin');
  }
}

export { signOut };
