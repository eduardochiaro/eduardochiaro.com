import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from '../../../utils/prisma';

export default NextAuth({
  secret: process.env.SECRET,
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
    // ...add more providers here
  ],
  session: {
    strategy: "jwt",
    maxAge: 5 * 60 * 60 // 30 days
  },
  pages: {
    signIn: '/auth/signin',
  }, 
  callbacks: {
    async signIn({ account, profile }) {
      if (account && profile.email) {
        const userData = await prisma.userAccess.findFirst({
          where: {
            email: profile.email
          }
        })
        return userData && userData.role == 'ADMIN';
      }
      return false // Do different verification for other providers that don't have `email_verified`
    },
    redirect({ url, baseUrl   }) {
      return new URL('/admin', baseUrl).toString()
    }
  }
})