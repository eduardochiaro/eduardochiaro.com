import NextAuth from 'next-auth';
import 'next-auth/jwt';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '@/utils/prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: !!process.env.AUTH_DEBUG,
  experimental: { enableWebAuthn: true },
  theme: { logo: '/android-chrome-512x512.png' },
  adapter: PrismaAdapter(prisma),
  providers: [GithubProvider, GoogleProvider],
  basePath: '/auth',
  session: {
    strategy: 'jwt',
    maxAge: 5 * 60 * 60, // 30 days
  },
  callbacks: {
    jwt({ token, trigger, session, account }) {
      if (trigger === 'update') token.name = session.user.name;
      if (account?.provider === 'keycloak') {
        return { ...token, accessToken: account.access_token };
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) session.accessToken = token.accessToken;
      return session;
    },
    async signIn({ profile }) {
      if (profile && profile.email) {
        const userData = await prisma.user.findFirst({
          where: {
            email: profile.email,
          },
        });
        if (userData && userData.role == 'ADMIN') {
          return true;
        }
      }
      return false; // Do different verification for other providers that don't have `email_verified`
    },
    redirect({ baseUrl }) {
      return new URL('/admin', baseUrl).toString();
    },
  },
  pages: {
    signIn: '/access/signin',
    error: '/access/error',
  },
});

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
  }
}
