import moment from 'moment';
import { getServerSession } from 'next-auth';
import { Metadata } from 'next';
import authOptions from '@/config/nextAuth';
import AdminPage from '@/components/admin/Page';
import prisma from '@/utils/prisma';

export const metadata: Metadata = {
  title: 'Admin > Bookmarks | Eduardo Chiaro',
};

export default async function AdminBookmarksIndex() {
  const session = await getServerSession(authOptions);
  const bookmarks = await getBookmarks();
  const categories = await getCategories();

  const format = {
    id: null,
    url: '',
    name: '',
    categoryId: 0,
    description: '',
  };

  const columns = ['name', 'url', 'category_d'];

  const newData: any[] = [];
  bookmarks?.map((item: any) => {
    const obj = { ...item, original: item };
    obj.updated = moment(item.updatedAt || item.createdAt).fromNow();
    obj.category_d = item.category ? item.category.name : 'N/A';
    newData.push(obj);
  });

  const title = 'Bookmarks';
  const single = 'bookmark';

  const inputList = [
    {
      classNames: 'col-span-5',
      label: 'URL',
      name: 'url',
      type: 'text',
      placeholder: 'https://github.com',
      value: 'url',
      required: true,
    },
    {
      classNames: 'col-span-1 flex items-end',
      type: 'fetchButton',
      value: 'url',
    },
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
      label: 'Category',
      name: 'categoryId',
      type: 'select',
      value: 'categoryId',
      required: true,
      selectOptions: categories,
    },
    {
      classNames: 'col-span-6',
      label: 'Description',
      name: 'description',
      type: 'textarea',
      value: 'description',
      required: false,
    },
  ];

  if (session) {
    return <AdminPage title={title} single={single} columns={columns} data={newData} format={format} inputList={inputList} apiURL="/api/portfolio/bookmarks" />;
  }
  return null;
}

async function getBookmarks() {
  return prisma.bookmark.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

async function getCategories() {
  return prisma.category.findMany({
    where: {
      deletedAt: null,
      type: 'BOOKMARK',
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}
