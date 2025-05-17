import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Card from '@/components/frontend/Card';
import { Input } from '@/components/form';
import { updateCategory } from '@/actions/categories';

export const metadata: Metadata = {
  title: 'Admin > Categories | Eduardo Chiaro',
};

export default async function DashboardCategoryEdit({ params }: { params: { slug: string } }) {
  const id = (await params).slug;
  const category = await pullSingleCategory(id);
  if (!category) {
    redirect('/dashboard/categories');
  }

  async function saveData(formData: FormData) {
    'use server';

    const rawFormData = {
      name: formData.get('name'),
    };
    updateCategory(id, rawFormData);
    redirect('/dashboard/categories');
  }
  return (
    <div className="p-6">
      <Card type="small" className="mb-10 flex justify-between gap-10">
        <h2 className="flex items-center text-2xl font-semibold">Category Edit</h2>
      </Card>
      <Card className="mx-auto max-w-3xl">
        <form action={saveData} className="flex flex-col gap-4">
          <div>
            <Input type="text" name="name" label="Position" value={category.name} required />
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

const pullSingleCategory = async (id: string) => {
  return prisma.category.findUnique({
    where: {
      id: parseInt(id),
    },
  });
};
