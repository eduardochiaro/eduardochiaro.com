import { User } from '@prisma/client';
import { lucia } from './auth';
import { cookies } from 'next/headers';
import prisma from './prisma';

export default async function getUser(): Promise<User | null> {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) return null;
  const { user, session } = await lucia.validateSession(sessionId);
  try {
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
  } catch {
    // Next.js throws error when attempting to set cookies when rendering page
  }
  if (user) {
    return prisma.user.findUnique({ where: { id: user.id as unknown as number } });
  }
  return user;
}
