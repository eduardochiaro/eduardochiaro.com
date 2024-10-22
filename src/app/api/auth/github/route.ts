// app/login/github/route.ts
import { generateState } from 'arctic';
import { github } from '@/utils/auth';
import { cookies } from 'next/headers';

export async function GET(): Promise<Response> {
  const state = generateState();
  const scopes = ['user:email'];
  const url = await github.createAuthorizationURL(state, scopes);

  const cookieStore = await cookies();
  cookieStore.set('github_oauth_state', state, {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax',
  });

  return Response.redirect(url);
}
