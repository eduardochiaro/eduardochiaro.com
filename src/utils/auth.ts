import { Lucia } from 'lucia';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import prisma from '@/utils/prisma';
import { webcrypto } from 'node:crypto';
import { GitHub } from 'arctic';
import { Session, User } from '@prisma/client';

globalThis.crypto = webcrypto as Crypto;

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    // this sets cookies with super long expiration
    // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
    expires: false,
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes: any) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      githubId: attributes.github_id,
      username: attributes.username,
    };
  },
});

interface DatabaseUserAttributes {
  github_id: number;
  username: string;
}

export interface SessionData {
  user: User | null;
  session: Session | null;
}

// IMPORTANT!
declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

export const github = new GitHub(process.env.GITHUB_ID!, process.env.GITHUB_SECRET!);
