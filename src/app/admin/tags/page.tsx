import moment from 'moment';
import { getServerSession } from 'next-auth';
import { Metadata } from 'next';
import authOptions from '@/config/nextAuth';
import AdminPage from '@/components/admin/Page';
import prisma from '@/utils/prisma';

export const metadata: Metadata = {
  title: 'Admin > Tags | Eduardo Chiaro',
};

export default async function AdminTagsIndex() {
  const session = await getServerSession(authOptions);
  const tags = await getTags();

  const format = {
    id: null,
    url: '',
    name: '',
    categoryId: 0,
    description: '',
  };

  const columns = ['name'];

  const newData: any[] = [];
  tags?.map((item: any) => {
    const obj = { ...item, original: item };
    obj.updated = moment(item.updatedAt || item.createdAt).fromNow();
    obj.description = `used in ${item.jobs?.length} job(s)`;
    newData.push(obj);
  });

  const title = 'Tags';
  const single = 'tag';

  const inputList = [
    {
      classNames: 'col-span-6',
      label: 'Name',
      name: 'name',
      type: 'text',
      placeholder: 'Name',
      value: 'name',
      required: true,
    },
  ];

  if (session) {
    return <AdminPage title={title} single={single} columns={columns} data={newData} format={format} inputList={inputList} apiURL="/api/admin/tags" />;
  }
  return null;
}

async function getTags() {
  return prisma.resumeTag.findMany({
    orderBy: {
      name: 'asc',
    },
    include: {
      jobs: true,
    },
  });
}