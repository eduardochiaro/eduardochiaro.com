import type { User } from '@/utils/prismaClient';
import { auth } from '@/auth';
import prisma from './prisma';

export default async function getUser(): Promise<User | null> {
  const session = await auth();
  const user = session?.user;
  if (user) {
    return prisma.user.findUnique({ where: { email: user.email as unknown as string } });
  }
  return null;
}
