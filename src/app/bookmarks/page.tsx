import BookmarksComponent from '@/components/frontend/Bookmarks';
import FrontendLayout from '@/components/layouts/Frontend';
import { Category, Bookmark } from '@prisma/client';

interface BookmarkType extends Bookmark{
  domain?: string,
  category: Category
};

export default async function Bookmarks() {
	const bookmarks = await getBookmarks();
  return (
    <FrontendLayout title="Bookmarks | Eduardo Chiaro">
      <BookmarksComponent data={bookmarks} />
    </FrontendLayout>
  );
}

async function getBookmarks() {
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
	return bookmarks;
}
