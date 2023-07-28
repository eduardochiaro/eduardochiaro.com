import { getToken } from 'next-auth/jwt';
import { NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

const { NEXTAUTH_URL = '' } = process.env;

export default async function middleware(request: NextRequestWithAuth) {
  const response = NextResponse.next();
  const { pathname, search, origin, basePath } = request.nextUrl;

  const signInPage = '/auth/signin';

	const token = await getToken({
		req: request,
		secret: process.env.NEXTAUTH_SECRET,
	});

  if (request.nextUrl.pathname.startsWith('/api')) {
		if (['POST', 'DELETE', 'PUT', 'PATCH'].includes(request.method)) {
			if (!token) {
				return new Response('Unauthorized', {
					status: 401,
				});
			}
		}
		response.headers.append('X-Response-ID', nanoid());
    response.headers.append('Access-Control-Allow-Origin', NEXTAUTH_URL);
    response.headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
    response.headers.append(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    return response;
  } 
  if (request.nextUrl.pathname.startsWith('/admin')) {
		if (!token) {
			const signInUrl = new URL(`${basePath}${signInPage}`, origin);
			signInUrl.searchParams.append('callbackUrl', `${basePath}${pathname}${search}`);
			return NextResponse.redirect(signInUrl);
		}
	}
  //...
  return response;
}
