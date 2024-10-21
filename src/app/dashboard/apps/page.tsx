import { Metadata } from 'next';
import Table from '@/components/dashboard/Table';
import prisma from '@/utils/prisma';
import { columns, formatData, TableRow } from '@/components/dashboard/table/AppsFormat';

export const metadata: Metadata = {
  title: 'Admin > Apps | Eduardo Chiaro',
};


export default async function DashboardAppsIndex() {
  const apps = await pullApps();
  const data = apps ? formatData(apps) : [];

  return (
    <div>
      <h2 className="mb-10 mt-2 text-2xl font-semibold">Apps</h2>
      <Table columns={columns} data={data} tableRow={TableRow} useCheckboxes />
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
