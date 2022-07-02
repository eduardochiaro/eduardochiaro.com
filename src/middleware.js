import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function middleware(req) {
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const session = await getToken({ req, secret: process.env.SECRET });
    if (!session) return NextResponse.redirect(new URL('/auth/signin', req.url));
  }
  return NextResponse.next();
}