import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Card from '@/components/frontend/Card';
import { Input, Tags, Textarea } from '@/components/form';
import { addResume } from '@/actions/resume';

export const metadata: Metadata = {
  title: 'Admin > Resume | Eduardo Chiaro',
};

export default async function DashboardResumeNew() {
  async function saveData(formData: FormData) {
    'use server';
    let file = formData.get('file') as File;

    const rawFormData = {
      name: formData.get('name'),
      company: formData.get('company'),
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate'),
      location: formData.get('location'),
      description: formData.get('description'),
      tags: formData.get('tags'),
      file: file.size > 0 ? file : null,
    };
    addResume(rawFormData);
    redirect('/dashboard/resume');
  }
  return (
    <div className="p-6">
      <Card type="small" className="mb-10 flex justify-between gap-10">
        <h2 className="flex items-center text-2xl font-semibold">Resume Role New</h2>
      </Card>
      <Card className="mx-auto max-w-3xl">
        <form action={saveData} className="flex flex-col gap-4">
          <div>
            <Input type="text" name="name" label="Position" value="" required />
          </div>
          <div className="flex items-start gap-4">
            <div className="grow">
              <Input type="date" name="startDate" label="Start Date" value="" required />
            </div>
            <div className="grow">
              <Input type="date" name="endDate" label="End Date" value="" />
            </div>
          </div>
          <div>
            <Input type="text" name="company" label="Company" value="" required />
          </div>
          <div className="flex items-start gap-4">
            <div className="grow">
              <Input type="file" name="file" label="Company Logo" value="" accept=".svg" />
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="grow">
              <Input type="text" name="location" label="Location" value="" required />
            </div>
          </div>
          <div>
            <Textarea name="description" label="Description" value="" />
          </div>
          <div>
            <Tags name="tags" label="Tags" originalValue={[]} />
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
