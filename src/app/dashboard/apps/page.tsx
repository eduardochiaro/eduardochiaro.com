import { Metadata } from 'next';
import Table from '@/components/dashboard/Table';
import prisma from '@/utils/prisma';
import { columns, TableRow } from '@/components/dashboard/table/AppsFormat';
import Card from '@/components/frontend/Card';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Admin > Apps | Eduardo Chiaro',
};

export default async function DashboardAppsIndex() {
  const apps = await pullApps();

  return (
    <div>
      <Card type="small" className="mb-10 flex justify-between gap-10">
        <h2 className="text-2xl font-semibold">Apps</h2>
        <Link href={'/dashboard/apps/new'} prefetch={false} className="text-primary-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
          Add App
        </Link>
      </Card>
      <Table columns={columns} data={apps} tableRow={TableRow} useCheckboxes />
    </div>
  );
}

const pullApps = async () => {
  return prisma.app.findMany({
    include: {
      file: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};
