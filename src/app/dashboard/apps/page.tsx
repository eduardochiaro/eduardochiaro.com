import { Metadata } from 'next';
import Table from '@/components/dashboard/Table';
import { columns, TableRow } from '@/components/dashboard/table/AppsFormat';
import Card from '@/components/frontend/Card';
import Link from 'next/link';
import Button from '@/components/dashboard/Button';
import { getApps } from '@/actions/apps';

export const metadata: Metadata = {
  title: 'Admin > Apps | Eduardo Chiaro',
};

export default async function DashboardAppsIndex() {
  const apps = await getApps();

  return (
    <div className="p-6">
      <Card type="small" className="mb-10 flex justify-between gap-10">
        <h2 className="text-2xl font-semibold">Apps</h2>
        <Link href={'/dashboard/apps/new'} prefetch={false}>
          <Button className="text-sm">Add App</Button>
        </Link>
      </Card>
      <Table columns={columns} data={apps} tableRow={TableRow} useCheckboxes />
    </div>
  );
}
