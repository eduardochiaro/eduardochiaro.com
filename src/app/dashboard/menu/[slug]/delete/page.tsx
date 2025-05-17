import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import prisma from '@/utils/prisma';
import Link from 'next/link';
import Card from '@/components/frontend/Card';
import { ChevronRight } from 'lucide-react';
import { deleteMenuLink } from '@/actions/menu';

export const metadata: Metadata = {
  title: 'Admin > Menu Links | Eduardo Chiaro',
};

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function DeleteMenuPage({ params }: Props) {
  const id = (await params).slug;
  const menu = await pullSingleMenu(id);
  if (!menu) {
    redirect('/dashboard/menu');
  }

  // Server action for deleting the menu
  async function actionCall(formData: FormData) {
    'use server';

    const id = formData.get('id') as string;
    deleteMenuLink(id);
    redirect('/dashboard/menu');
  }

  return (
    <div className="p-6">
      <Card type="small" className="mb-10 flex justify-between gap-10">
        <h2 className="flex items-center text-2xl font-semibold">
          Menu Link Delete <ChevronRight className="mx-2" /> {menu?.name}{' '}
        </h2>
      </Card>
      {menu && (
        <Card className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-xl font-semibold text-red-700 dark:text-red-500">Warning: This action cannot be undone</h2>
          <p className="mb-4">
            You are about to delete{' '}
            <span className="font-bold underline">
              {menu?.name} ({menu?.url})
            </span>
            . All associated data will be permanently removed.
          </p>

          <form action={actionCall}>
            <input type="hidden" name="id" value={id} />

            {/* Error message will be shown if the server action returns with an error */}
            {/* This requires client components for dynamic error handling - you may need to add a separate error component */}

            <div className="mt-6 flex justify-end gap-4">
              <Link href={'/dashboard/menus'} className="rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300">
                No, go back
              </Link>
              <button type="submit" className="cursor-pointer rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700">
                Yes, Delete Link!
              </button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}

const pullSingleMenu = async (id: string) => {
  return prisma.menuLink.findUnique({
    where: {
      id: parseInt(id),
    },
  });
};
