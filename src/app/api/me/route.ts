import { NextRequest, NextResponse } from 'next/server';
import getUser from '@/utils/getUser';

export async function GET(request: NextRequest) {
  const user = await getUser();
  if (user) {
    return NextResponse.json({ ...user });
  }
  return new Response(null, {
    status: 400,
  });
}
