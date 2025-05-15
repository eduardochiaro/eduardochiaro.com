import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Card from '@/components/frontend/Card';
import { Input, Tags, Textarea } from '@/components/form';
import { addProject } from '@/actions/resume';

export const metadata: Metadata = {
  title: 'Admin > Resume | Eduardo Chiaro',
};

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function DashboardResumeProjectNew({ params }: Props) {
  const id = (await params).slug;
  async function saveData(formData: FormData) {
    'use server';
    let file = formData.get('file') as File;

    const rawFormData = {
      name: formData.get('name'),
      file: file.size > 0 ? file : null,
    };
    addProject(id, rawFormData);
    redirect('/dashboard/resume');
  }
  return (
    <div className="p-6">
      <Card type="small" className="mb-10 flex justify-between gap-10">
        <h2 className="flex items-center text-2xl font-semibold">Resume Project New</h2>
      </Card>
      <Card className="mx-auto max-w-3xl">
        <form action={saveData} className="flex flex-col gap-4">
          <div>
            <Input type="text" name="name" label="Project Name" value="" required />
          </div>
          <div className="flex items-start gap-4">
            <div className="grow">
              <Input type="file" name="file" label="Company Logo" value="" accept=".svg" />
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
