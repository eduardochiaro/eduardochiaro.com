import { Metadata } from 'next';
import Card from '@/components/frontend/Card';
import { Input } from '@/components/form';

export const metadata: Metadata = {
  title: 'Admin > Bookmarks | Eduardo Chiaro',
};

export default async function DashboardBookmarksUrl() {
  return (
    <div className="p-6">
      <Card type="small" className="mb-10 flex justify-between gap-10">
        <h2 className="flex items-center text-2xl font-semibold">Bookmark New</h2>
      </Card>
      <Card className="mx-auto max-w-3xl">
        <form method="GET" action={'/dashboard/bookmarks/new'} className="flex flex-col gap-4">
          <div>
            <Input type="url" name="url" label="URL" value="" className="text-5xl" required />
          </div>

          <div className="flex items-center justify-end">
            <button type="submit" className="button-danger">
              Fetch Metadata
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
