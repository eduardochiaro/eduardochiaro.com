import { Metadata } from 'next';
import Table from '@/components/dashboard/Table';
import prisma from '@/utils/prisma';
import { Prisma } from '@prisma/client';
import moment from 'moment';
import Image from 'next/image';
import Link from "next/link";

type AppExpanded = Prisma.AppGetPayload<{ include: { file: true } }>;

export const metadata: Metadata = {
  title: 'Admin | Eduardo Chiaro',
};

const columns = [
  {
    title: 'Image',
    key: 'image',
    classNames: '',
    sortable: false,
  },
  {
    title: 'App Name',
    key: 'app_name',
    classNames: '',
    sortable: true,
  },
  {
    title: 'Description',
    key: 'description',
    classNames: '',
    sortable: false,
  },
  {
    title: 'Created At',
    key: 'created_at',
    classNames: '',
    sortable: true,
  },
  {
    title: 'Updated At',
    key: 'updated_at',
    classNames: '',
    sortable: true,
  },
  {
    title: 'Actions',
    key: 'actions',
    classNames: 'text-right',
    sortable: false,
  }
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
          created_at: moment(app.createdAt).fromNow(),
          updated_at: app.updatedAt ? moment(app.updatedAt).fromNow() : '',
          actions: [
            {
              label: 'Edit',
              href: `/dashboard/apps/${app.id}`,
              classNames: 'text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300',
            }
          ],
          actions_l: (
            <div className="flex items-center gap-2 justify-end">
              <Link prefetch={false} href={`/dashboard/apps/${app.id}`} className="text-primary-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                Edit
              </Link>
              |
              <button className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">Delete</button>
            </div>
          ),
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
