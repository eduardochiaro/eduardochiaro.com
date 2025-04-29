import { Metadata } from 'next';
import prisma from '@/utils/prisma';
import { redirect } from 'next/navigation';
import Card from '@/components/frontend/Card';
import { Input, Textarea } from '@/components/form';
import { updateApp } from '@/actions/apps';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admin > Apps | Eduardo Chiaro',
};

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function DashboardAppsView({ params }: Props) {
  const id = (await params).slug;
  const app = await pullSingleApp(id);

  async function saveData(formData: FormData) {
    'use server';

    let file = formData.get('file') as File;

    const rawFormData = {
      name: formData.get('name'),
      description: formData.get('description'),
      url: formData.get('url'),
      file: file.size > 0 ? file : null,
    };
    updateApp(id, rawFormData);
    redirect('/dashboard/apps');
  }

  return (
    <div className="p-6">
      <Card type="small" className="mb-10 flex justify-between gap-10">
        <h2 className="flex items-center text-2xl font-semibold">
          Apps Delete <ChevronRight className="mx-2" /> {app?.name}{' '}
        </h2>
      </Card>
      {app && (
        <Card className="mx-auto max-w-3xl">
          <form action={saveData} className="flex flex-col gap-4">
            <div>
              <Input type="text" name="name" label="Name" value={app.name} required />
            </div>
            <div>
              <Textarea name="description" label="Description" value={app.description || ''} required />
            </div>
            <div>
              <Input name="url" type="url" label="URL" value={app.url || ''} required />
            </div>
            <div className="flex items-start gap-4">
              <div className="grow">
                <Input type="file" name="file" label="File" value="" />
              </div>
              <div className="w-1/4">
                {app.file?.path && (
                  <>
                    <h3 className="input-label">Current File</h3>
                    <div className="relative mt-4 h-20">
                      <Image
                        src={'/uploads/' + app.file?.path}
                        fill
                        sizes="33vw"
                        alt={app.name}
                        title={app.name}
                        className="fill-primary-700 dark:fill-primary-200 bg-transparent object-contain"
                        priority={false}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center justify-end">
              <button type="submit" className="button">
                Save
              </button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}

const pullSingleApp = async (id: string) => {
  return prisma.app.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      file: true,
    },
  });
};
