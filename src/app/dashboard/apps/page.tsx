import { Metadata } from 'next';
import Table from '@/components/dashboard/Table';
import prisma from '@/utils/prisma';
import { Prisma } from '@prisma/client';
import moment from 'moment';
import Image from 'next/image';

type AppExpanded = Prisma.AppGetPayload<{ include: { file: true } }>;

export const metadata: Metadata = {
  title: 'Admin | Eduardo Chiaro',
};

const columns = [
  {
    title: 'Image',
    key: 'image',
    sortable: false,
  },
  {
    title: 'App Name',
    key: 'app_name',
    sortable: true,
  },
  {
    title: 'Description',
    key: 'description',
    sortable: false,
  },
  {
    title: 'Created At',
    key: 'created_at',
    sortable: true,
  },
  {
    title: 'Updated At',
    key: 'updated_at',
    sortable: true,
  },
];

export default async function AdminIndex() {
  const apps = await pullApps();

  const data = apps
    ? apps.map((app: AppExpanded) => {
        return {
          image: app.file ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_CDN_URL}/${app.file.path}`}
              fill
              sizes="30vw"
              alt={app.name}
              className="bg-transparent object-contain"
              priority={false}
            />
          ) : (
            ''
          ),
          app_name: app.name,
          description: app.description,
          created_at: moment(app.createdAt).format('YYYY-MM-DD'),
          updated_at: app.updatedAt ? moment(app.updatedAt).format('YYYY-MM-DD') : '',
        };
      })
    : [];

  return (
    <div>
      <h2 className="mb-10 mt-2 text-2xl font-semibold">Apps</h2>

      <Table columns={columns} data={data} />
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
