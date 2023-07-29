import moment from 'moment';
import { getServerSession } from 'next-auth';
import { Metadata } from 'next';
import authOptions from '@/config/nextAuth';
import AdminPage from '@/components/admin/Page';
import prisma from '@/utils/prisma';

export const metadata: Metadata = {
  title: 'Admin > Categories | Eduardo Chiaro',
};

export default async function AdminCategoriesIndex() {
  const session = await getServerSession(authOptions);
  const categories = await getCategories();
  const types = ['BOOKMARK', 'JOB'];

  const format = {
    id: null,
    name: '',
    type: '',
  };

  const columns = ['name', 'type'];

  const newData: any[] = [];
  categories?.map((item: any) => {
    const obj = { ...item, original: item };
    obj.updated = moment(item.updatedAt || item.createdAt).fromNow();
    obj.category_d = item.type;
    obj.description = `used in ${item._count.bookmarks} bookmark(s)`;
    newData.push(obj);
  });

  const title = 'Categories';
  const single = 'category';

  const inputList = [
    {
      classNames: 'col-span-4',
      label: 'Name',
      name: 'name',
      type: 'text',
      placeholder: 'Name',
      value: 'name',
      required: true,
    },
    {
      classNames: 'col-span-2',
      label: 'Type',
      name: 'type',
      type: 'select',
      value: 'type',
      required: true,
      selectOptions: types.map((type) => ({ id: type, name: type })),
    },
  ];

  const sortType = [
    {
      id: 'id',
      name: 'ID',
    },
    {
      id: 'name',
      name: 'Name',
    },
    {
      id: 'type',
      name: 'Type',
    },
    {
      id: 'updatedAt',
      name: 'Update date',
    },
  ];

  if (session) {
    return <AdminPage title={title} single={single} columns={columns} data={newData} format={format} inputList={inputList} sortList={sortType} apiURL="/api/admin/categories" />;
  }
  return null;
}

async function getCategories() {
  return prisma.category.findMany({
    where: {
      deletedAt: null,
    },  
    include: {
      _count: {
        select: { bookmarks: true },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}