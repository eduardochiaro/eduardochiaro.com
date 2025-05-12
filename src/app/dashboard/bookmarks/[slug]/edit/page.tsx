import { Metadata } from 'next';
import prisma from '@/utils/prisma';
import { redirect } from 'next/navigation';
import Card from '@/components/frontend/Card';
import { Input, Textarea, Select } from '@/components/form';
import { updateBookmark } from '@/actions/bookmarks';
import { ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admin > Bookmarks | Eduardo Chiaro',
};

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function DashboardBookmarksEdit({ params }: Props) {
  const id = (await params).slug;
  const bookmark = await pullSingleBookmark(id);
  const categories = await getCategories();
  if (!bookmark) {
    redirect('/dashboard/bookmarks');
  }

  async function saveData(formData: FormData) {
    'use server';

    const rawFormData = {
      name: formData.get('name'),
      description: formData.get('description'),
      categoryId: formData.get('categoryId'),
    };
    updateBookmark(id, rawFormData);
    redirect('/dashboard/bookmarks');
  }

  return (
    <div className="p-6">
      <Card type="small" className="mb-10 flex justify-between gap-10">
        <h2 className="flex items-center text-2xl font-semibold">
          Bookmarks Edit <ChevronRight className="mx-2" /> {bookmark?.name}{' '}
        </h2>
      </Card>
      {bookmark && (
        <Card className="mx-auto max-w-3xl">
          <form action={saveData} className="flex flex-col gap-4">
            <div>
              <Input type="url" name="url" label="URL" value={bookmark.url} required disabled />
            </div>
            <div className="flex items-center gap-2">
              <div className="grow">
                <Input type="text" name="name" label="Name" value={bookmark.name} required />
              </div>
              <div>
                <Select name="categoryId" label="Category" value={bookmark.categoryId as unknown as string} required>
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
            <div>
              <Textarea name="description" label="Description" value={bookmark.description || ''} required />
            </div>
            <div className="flex items-center justify-end">
              <button type="submit" className="button-danger">
                Save
              </button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}

async function getCategories() {
  return prisma.category.findMany({
    where: {
      type: 'BOOKMARK',
    },
  });
}

const pullSingleBookmark = async (id: string) => {
  return prisma.bookmark.findUnique({
    where: {
      id: parseInt(id),
    },
  });
};
