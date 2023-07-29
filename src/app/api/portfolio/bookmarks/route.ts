import { NextRequest, NextResponse } from 'next/server';
import type { Bookmark } from '@prisma/client';

interface BookmarkType extends Bookmark {
  domain?: string;
}

type Data = {
  results: BookmarkType[];
};

export async function GET(request: NextRequest, response: NextResponse) {
  const bookmarks: BookmarkType[] = await prisma.bookmark.findMany({
    where: {
      deletedAt: null,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  bookmarks.map((bookmark) => {
    const myURL = new URL(bookmark.url);
    bookmark.domain = myURL.hostname;
    return bookmark;
  });
  if (bookmarks) {
    return NextResponse.json({ results: bookmarks });
  }
  return new Response(null, {
    status: 400,
  });
}
