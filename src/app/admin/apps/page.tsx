import moment from 'moment';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { Metadata } from 'next';
import authOptions from '@/config/nextAuth';
import AdminPage from '@/components/admin/Page';
import prisma from '@/utils/prisma';

export const metadata: Metadata = {
  title: 'Admin > Apps | Eduardo Chiaro',
};

export default async function AdminAppsIndex() {
  const session = await getServerSession(authOptions);
  const apps = await getApps();

  const format = {
    id: null,
    name: '',
    description: '',
    image: '',
    url: '',
  };

  const columns = ['name', 'description', 'github_url'];

  const newData: any[] = [];
  apps?.map((item: any) => {
    const obj = { ...item, original: item };
    obj.updated = moment(item.updatedAt || item.createdAt).fromNow();
    obj.image_d = (
      <Image
        src={`${process.env.NEXT_PUBLIC_CDN_URL}/${item.image}`}
        fill
        sizes="33vw"
        alt={item.name}
        title={item.name}
        className="bg-transparent object-cover"
        priority={false}
      />
    );
    newData.push(obj);
  });

  const title = 'Apps';
  const single = 'app';

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
    {
      classNames: 'col-span-4',
      label: 'Image',
      name: 'image',
      type: 'file',
      required: true,
      requiredCondition: ['id', null],
      accept: 'image/*',
    },
    {
      classNames: 'col-span-2',
      type: 'imagePreview',
      name: 'imagePreview',
    },
    {
      classNames: 'col-span-6',
      label: 'GitHub URL',
      name: 'url',
      type: 'text',
      placeholder: 'https://github.com',
      value: 'url',
      required: true,
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
    return <AdminPage title={title} single={single} columns={columns} data={newData} format={format} inputList={inputList} apiURL="/api/portfolio/apps" />;
  }
  return null;
}

async function getApps() {
  return prisma.app.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}
