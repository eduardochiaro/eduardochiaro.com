import { Metadata } from 'next';
import Table from '@/components/dashboard/Table';
import { columns, TableRow } from '@/components/dashboard/table/CategoryFormat';
import Card from '@/components/frontend/Card';
import Link from 'next/link';
import Button from '@/components/dashboard/Button';
import { getCategories } from '@/actions/categories';

export const metadata: Metadata = {
  title: 'Admin > Categories | Eduardo Chiaro',
};

export default async function DashboardCategoryIndex() {
  const apps = await getCategories();

  return (
    <div className="p-6">
      <Card type="small" className="mb-10 flex justify-between gap-10">
        <h2 className="text-2xl font-semibold">Categories</h2>
        <Link href={'/dashboard/categories/new'} prefetch={false}>
          <Button className="text-sm">Add Category</Button>
        </Link>
      </Card>
      <Table columns={columns} data={apps} tableRow={TableRow} />
    </div>
  );
}
