'use server';
import { signOut } from '@/auth';

async function signOutAction() {
  'use server';
  await signOut();
}

export { signOutAction };
