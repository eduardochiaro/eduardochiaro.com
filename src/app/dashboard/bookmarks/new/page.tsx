import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Card from '@/components/frontend/Card';
import { Input, Select, Textarea } from '@/components/form';
import { addBookmark, fetchMetadataFromUrl } from '@/actions/bookmarks';

export const metadata: Metadata = {
  title: 'Admin > Bookmarks | Eduardo Chiaro',
};

export default async function DashboardBookmarksNew(props: { searchParams: Promise<any> }) {
  const searchParams = await props.searchParams;
  const { url } = searchParams;
  const metadata = await fetchMetadataFromUrl(url);
  const categories = await getCategories();

  const { title, description } = metadata;

  async function saveData(formData: FormData) {
    'use server';

    const rawFormData = {
      name: formData.get('name'),
      url: url,
      description: formData.get('description'),
      categoryId: formData.get('categoryId'),
    };
    addBookmark(rawFormData);
    redirect('/dashboard/bookmarks');
  }

  return (
    <div className="p-6">
      <Card type="small" className="mb-10 flex justify-between gap-10">
        <h2 className="flex items-center text-2xl font-semibold">Bookmark New</h2>
      </Card>
      <Card className="mx-auto max-w-3xl">
        <form action={saveData} className="flex flex-col gap-4">
          <div>
            <Input type="url" name="url" label="URL" value={url} required disabled />
          </div>
          <div className="flex items-center gap-2">
            <div className="grow">
              <Input type="text" name="name" label="Name" value={title} required />
            </div>
            <div>
              <Select name="categoryId" label="Category" value="" required>
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
            <Textarea name="description" label="Description" value={description} required />
          </div>
          <div className="flex items-center justify-end">
            <button type="submit" className="button-danger">
              Save
            </button>
          </div>
        </form>
      </Card>
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
