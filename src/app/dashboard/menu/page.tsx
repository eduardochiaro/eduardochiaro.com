import { Metadata } from 'next';
import Table from '@/components/dashboard/Table';
import { columns, TableRow } from '@/components/dashboard/table/MenuFormat';
import Card from '@/components/frontend/Card';
import Link from 'next/link';
import Button from '@/components/dashboard/Button';
import getMenuLinks from '@/utils/getMenuLinks';

export const metadata: Metadata = {
  title: 'Admin > Menu links | Eduardo Chiaro',
};

export default async function DashboardMenuLinksIndex() {
  const apps = await getMenuLinks();

  return (
    <div className="p-6">
      <Card type="small" className="mb-10 flex justify-between gap-10">
        <h2 className="text-2xl font-semibold">Menu Links</h2>
        <Link href={'/dashboard/menu/new'} prefetch={false}>
          <Button className="text-sm">Add Link</Button>
        </Link>
      </Card>
      <Table columns={columns} data={apps} tableRow={TableRow} />
    </div>
  );
}
