import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Card from '@/components/frontend/Card';
import { Input, Tags, Textarea } from '@/components/form';
import { updateResume } from '@/actions/resume';
import moment from 'moment';
import Image from 'next/image';
import SVG from '@/utils/svg';

export const metadata: Metadata = {
  title: 'Admin > Resume | Eduardo Chiaro',
};

export default async function DashboardResumeEdit({ params }: { params: { slug: string } }) {
  const id = (await params).slug;
  const resume = await pullSingleResume(id);
  if (!resume) {
    redirect('/dashboard/resume');
  }

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
    updateResume(params.slug, rawFormData);
    redirect('/dashboard/resume');
  }
  return (
    <div className="p-6">
      <Card type="small" className="mb-10 flex justify-between gap-10">
        <h2 className="flex items-center text-2xl font-semibold">Resume Role Edit</h2>
      </Card>
      <Card className="mx-auto max-w-3xl">
        <form action={saveData} className="flex flex-col gap-4">
          <div>
            <Input type="text" name="name" label="Position" value={resume.name} required />
          </div>
          <div className="flex items-start gap-4">
            <div className="grow">
              <Input type="date" name="startDate" label="Start Date" value={resume.startDate ? moment(resume.startDate).format('YYYY-MM-DD') : ''} required />
            </div>
            <div className="grow">
              <Input type="date" name="endDate" label="End Date" value={resume.endDate ? moment(resume.endDate).format('YYYY-MM-DD') : ''} />
            </div>
          </div>
          <div>
            <Input type="text" name="company" label="Company" value={resume.company || ''} required />
          </div>
          <div className="flex items-start gap-4">
            <div className="grow">
              <Input type="file" name="file" label="Company Logo" value="" accept=".svg" />
            </div>
            <div className="w-1/4">
              {resume.file?.path && (
                <>
                  <h3 className="input-label">Current File</h3>
                  <SVG
                    title={resume.company}
                    className={'fill-primary-700 dark:fill-primary-200 inline-block'}
                    src={`${process.env.NEXT_PUBLIC_CDN_URL}/${resume.file.path}`}
                    height={40}
                  />
                </>
              )}
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="grow">
              <Input type="text" name="location" label="Location" value={resume.location || ''} required />
            </div>
          </div>
          <div>
            <Textarea name="description" label="Description" value={resume.description || ''} />
          </div>
          <div>
            <Tags name="tags" label="Tags (comma separated)" originalValue={resume.tags} />
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

const pullSingleResume = async (id: string) => {
  return prisma.resume.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      file: true,
      tags: true,
    },
  });
};
