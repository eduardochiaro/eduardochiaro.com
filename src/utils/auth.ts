import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '@/utils/prisma';

const { GITHUB_ID = '', GITHUB_SECRET = '', GOOGLE_CLIENT_ID = '', GOOGLE_CLIENT_SECRET = '', NEXTAUTH_SECRET = '' } = process.env;

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 5 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account && profile && profile.email) {
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
    redirect({ url, baseUrl }) {
      return new URL('/admin', baseUrl).toString();
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
});
