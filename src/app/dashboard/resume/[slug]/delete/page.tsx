import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import prisma from '@/utils/prisma';
import Link from 'next/link';
import Card from '@/components/frontend/Card';
import { ChevronRight } from 'lucide-react';
import { deleteResume } from '@/actions/resume';

export const metadata: Metadata = {
  title: 'Admin > Resume | Eduardo Chiaro',
};

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function DeleteResumePage({ params }: Props) {
  const id = (await params).slug;
  const role = await pullSingleRole(id);
  if (!role) {
    redirect('/dashboard/resume');
  }

  // Server action for deleting the app
  async function actionCall(formData: FormData) {
    'use server';

    const id = formData.get('id') as string;
    deleteResume(id);
    redirect('/dashboard/resume');
  }

  return (
    <div className="p-6">
      <Card type="small" className="mb-10 flex justify-between gap-10">
        <h2 className="flex items-center text-2xl font-semibold">
          Resume Delete <ChevronRight className="mx-2" /> {role?.name}{' '}
        </h2>
      </Card>
      {role && (
        <Card className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-xl font-semibold text-red-700 dark:text-red-500">Warning: This action cannot be undone</h2>
          <p className="mb-4">
            You are about to delete <span className="font-bold underline">{role?.name}</span>. All associated data will be permanently removed.
          </p>

          <form action={actionCall}>
            <input type="hidden" name="id" value={id} />

            <div className="mt-6 flex justify-end gap-4">
              <Link href={'/dashboard/resume'} className="rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300">
                No, go back
              </Link>
              <button type="submit" className="cursor-pointer rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700">
                Yes, Delete Role!
              </button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}

async function pullSingleRole(id: string) {
  return prisma.resume.findUnique({
    where: {
      id: parseInt(id),
    },
  });
}
