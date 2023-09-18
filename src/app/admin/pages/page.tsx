import moment from 'moment';
import { getServerSession } from 'next-auth';
import { Metadata } from 'next';
import authOptions from '@/config/nextAuth';
import AdminViewer from '@/components/admin/Viewer';
import prisma from '@/utils/prisma';

export const metadata: Metadata = {
  title: 'Admin > Pages | Eduardo Chiaro',
};

const DEFAULT_INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [],
};

export default async function AdminPagesIndex() {
  const session = await getServerSession(authOptions);
  const pages = await getPages();

  const format = {
    id: null,
    title: '',
    description: '',
    slug: '',
    blocks: JSON.stringify(DEFAULT_INITIAL_DATA),
    content: '',
    plaintext: '',
    published: false,
  };

  const columns = ['title', 'description'];

  const newData: any[] = [];
  pages?.map((item: any) => {
    const obj = { ...item, original: item };
    obj.updated = moment(item.updatedAt || item.createdAt).fromNow();
    obj.name = item.title;
    obj.description = item.slug;
    obj.original.blocks = !obj.original.blocks ? format.blocks : obj.original.blocks;
    newData.push(obj);
  });

  const title = 'Pages';
  const single = 'page';

  const inputList: any = [
    {
      classNames: 'col-span-6 md:col-span-4',
      label: 'Title',
      name: 'title',
      type: 'text',
      placeholder: 'Page title',
      value: 'title',
      required: true,
    },
    {
      classNames: 'col-span-6 md:col-span-2',
      label: 'Page URL',
      name: 'slug',
      type: 'text',
      placeholder: '',
      value: 'slug',
      required: true,
      subText: 'https://eduardochiaro.com/page/{slug}',
    },
    {
      classNames: 'col-span-6',
      label: 'Description',
      name: 'description',
      type: 'textarea',
      value: 'description',
      rows: 3,
      required: false,
    },
    {
      classNames: 'col-span-6',
      label: 'Content',
      name: 'blocks_tmp',
      type: 'blockEditor',
      placeholder: '',
      value: 'blocks',
    },
  ];

  if (session) {
    return <AdminViewer title={title} single={single} columns={columns} data={newData} format={format} inputList={inputList} apiURL="/api/admin/pages" />;
  }
  return null;
}

async function getPages() {
  return prisma.page.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}
