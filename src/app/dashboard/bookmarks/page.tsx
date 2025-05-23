import { Metadata } from 'next';
import Button from '@/components/dashboard/Button';
import Link from 'next/link';
import Card from '@/components/frontend/Card';
import Table from '@/components/dashboard/Table';
import { columns, TableRow } from '@/components/dashboard/table/BookmarksFormat';
import { getBookmarks } from '@/actions/bookmarks';

export const metadata: Metadata = {
  title: 'Admin > Bookmarks | Eduardo Chiaro',
};

export default async function BookmarksDashboard() {
  const bookmarks = await getBookmarks();

  return (
    <div className="p-6">
      <Card type="small" className="mb-10 flex justify-between gap-10">
        <h2 className="text-2xl font-semibold">Bookmarks</h2>
        <Link href={'/dashboard/bookmarks/url'} prefetch={false}>
          <Button className="text-sm">Add Bookmark</Button>
        </Link>
      </Card>
      <Table columns={columns} data={bookmarks} tableRow={TableRow} useCheckboxes={false} />
    </div>
  );
}
