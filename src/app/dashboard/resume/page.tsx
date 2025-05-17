import { Metadata } from 'next';
import prisma from '@/utils/prisma';
import Link from 'next/link';
import Card from '@/components/frontend/Card';
import Button from '@/components/dashboard/Button';
import Table from '@/components/dashboard/Table';
import { columns, TableRow } from '@/components/dashboard/table/ResumeFormat';
import { getResume } from '@/actions/resume';

export const metadata: Metadata = {
  title: 'Admin > Resume | Eduardo Chiaro',
};

export default async function ResumeAdminPage() {
  const resumeEntries = await getResume();

  return (
    <div className="p-6">
      <Card type="small" className="mb-10 flex justify-between gap-10">
        <h2 className="text-2xl font-semibold">Resume</h2>
        <Link href={'/dashboard/resume/new'} prefetch={false}>
          <Button className="text-sm">Add Role</Button>
        </Link>
      </Card>
      <Table columns={columns} data={resumeEntries} tableRow={TableRow} useCheckboxes={false} />
    </div>
  );
}
