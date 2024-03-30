'use server';
import getUser from '@/utils/getUser';
import { lucia } from '@/utils/auth';

async function signOut() {
  'use server';
  const user = await getUser();
  if (user) {
    await lucia.invalidateUserSessions(user.id as unknown as string);
  }
}

export { signOut };
