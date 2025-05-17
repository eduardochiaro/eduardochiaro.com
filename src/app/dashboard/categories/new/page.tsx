import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Card from '@/components/frontend/Card';
import { Input } from '@/components/form';
import { addCategory } from '@/actions/categories';

export const metadata: Metadata = {
  title: 'Admin > Categories | Eduardo Chiaro',
};

export default async function DashboardCategoryNew() {
  async function saveData(formData: FormData) {
    'use server';

    const rawFormData = {
      name: formData.get('name'),
      type: 'BOOKMARK',
    };
    addCategory(rawFormData);
    redirect('/dashboard/categories');
  }
  return (
    <div className="p-6">
      <Card type="small" className="mb-10 flex justify-between gap-10">
        <h2 className="flex items-center text-2xl font-semibold">Category New</h2>
      </Card>
      <Card className="mx-auto max-w-3xl">
        <form action={saveData} className="flex flex-col gap-4">
          <div>
            <Input type="text" name="name" label="Name" value="" required />
          </div>
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="bg-accent-600 hover:bg-accent-700 focus:ring-primary-500 rounded-md px-4 py-2 font-medium text-white shadow-sm transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              Save
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
