import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Card from '@/components/frontend/Card';
import { Input, Textarea } from '@/components/form';
import { addApp } from '@/actions/apps';

export const metadata: Metadata = {
  title: 'Admin > Apps | Eduardo Chiaro',
};

export default async function DashboardAppsNew() {
  async function saveData(formData: FormData) {
    'use server';

    const rawFormData = {
      name: formData.get('name'),
      description: formData.get('description'),
      url: formData.get('url'),
      file: formData.get('file') as File,
    };
    addApp(rawFormData);
    redirect('/dashboard/apps');
  }

  return (
    <div className="p-6">
      <Card type="small" className="mb-10 flex justify-between gap-10">
        <h2 className="flex items-center text-2xl font-semibold">Apps New</h2>
      </Card>
      <Card className="mx-auto max-w-3xl">
        <form action={saveData} className="flex flex-col gap-4">
          <div>
            <Input type="text" name="name" label="Name" value="" required />
          </div>
          <div>
            <Textarea name="description" label="Description" value="" required />
          </div>
          <div>
            <Input name="url" type="url" label="URL" value="" required />
          </div>
          <div className="flex items-start gap-4">
            <div className="grow">
              <Input type="file" name="file" label="File" value="" required />
            </div>
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
