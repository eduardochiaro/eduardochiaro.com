import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import prisma from '@/utils/prisma';
import Link from 'next/link';
import Card from '@/components/frontend/Card';
import { ChevronRight } from 'lucide-react';
import { deleteCategory } from '@/actions/categories';

export const metadata: Metadata = {
  title: 'Admin > Categories | Eduardo Chiaro',
};

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function DeleteAppPage({ params }: Props) {
  const id = (await params).slug;
  const category = await pullSingleCategory(id);
  if (!category) {
    redirect('/dashboard/categories');
  }

  // Server action for deleting the app
  async function actionCall(formData: FormData) {
    'use server';

    const id = formData.get('id') as string;
    deleteCategory(id);
    redirect('/dashboard/categories');
  }

  return (
    <div className="p-6">
      <Card type="small" className="mb-10 flex justify-between gap-10">
        <h2 className="flex items-center text-2xl font-semibold">
          Categorys Delete <ChevronRight className="mx-2" /> {category?.name}{' '}
        </h2>
      </Card>
      {category && (
        <Card className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-xl font-semibold text-red-700 dark:text-red-500">Warning: This action cannot be undone</h2>
          <p className="mb-4">
            You are about to delete <span className="font-bold underline">{category?.name}</span>. All associated data will be permanently removed.
          </p>

          <form action={actionCall}>
            <input type="hidden" name="id" value={id} />

            <div className="mt-6 flex justify-end gap-4">
              <Link href={'/dashboard/categorys'} className="rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300">
                No, go back
              </Link>
              <button type="submit" className="cursor-pointer rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700">
                Yes, Delete Category!
              </button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}

async function pullSingleCategory(id: string) {
  return prisma.category.findUnique({
    where: {
      id: parseInt(id),
    },
  });
}
