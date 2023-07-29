import moment from 'moment';
import { getServerSession } from 'next-auth';
import { Metadata } from 'next';
import authOptions from '@/config/nextAuth';
import AdminPage from '@/components/admin/Page';
import prisma from '@/utils/prisma';
import classNames from '@/utils/classNames';

export const metadata: Metadata = {
  title: 'Admin > Menu | Eduardo Chiaro',
};

export default async function AdminMenuIndex() {
  const session = await getServerSession(authOptions);
  const menuLinks = await getMenu();

  const format = {
    id: null,
    name: '',
    url: '',
    onlyMobile: false,
    active: true,
    order: 0,
  };

  const columns = ['name', 'url', 'status_d', 'category_d'];

  const newData: any[] = [];
  menuLinks?.map((item: any) => {
    const obj = { ...item, original: item };
    obj.status_d = obj.active ? 'show' : 'hidden';
    obj.name = (
      <div className="flex items-center gap-2">
        {obj.name}{' '}
        <span className={classNames('font-bold text-sm', obj.active ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400')}>
          [{obj.status_d}]
        </span>
      </div>
    );
    obj.description = (
      <>
        {obj.order}. [{obj.url}]
      </>
    );
    obj.category_d = !item.onlyMobile ? 'All Browsers' : 'Mobile only';
    obj.updated = moment(item.updatedAt || item.createdAt).fromNow();
    newData.push(obj);
  });

  const title = 'Menu links';
  const single = 'link';

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
      classNames: 'col-span-6',
      label: 'URL',
      name: 'url',
      type: 'text',
      placeholder: '/',
      value: 'url',
      required: true,
    },
    {
      classNames: 'col-span-3',
      label: 'Show on...',
      name: 'onlyMobile',
      type: 'select',
      value: 'onlyMobile',
      required: false,
      selectOptions: [
        {
          id: false,
          name: 'All browsers',
        },
        {
          id: true,
          name: 'Mobile only',
        },
      ],
      selectEmptyOption: true,
    },
    {
      classNames: 'col-span-2',
      label: 'Status',
      name: 'active',
      type: 'select',
      value: 'active',
      required: false,
      selectOptions: [
        {
          id: true,
          name: 'Show',
        },
        {
          id: false,
          name: 'Hidden',
        },
      ],
      selectEmptyOption: true,
    },
    {
      classNames: 'col-span-1',
      label: 'Order',
      name: 'order',
      type: 'number',
      placeholder: '0',
      value: 'order',
      required: false,
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
      id: 'status_d',
      name: 'Status',
    },
    {
      id: 'order',
      name: 'Order',
    },
    {
      id: 'updatedAt',
      name: 'Update date',
    },
  ];

  if (session) {
    return <AdminPage title={title} single={single} columns={columns} data={newData} format={format} inputList={inputList} apiURL="/api/admin/menu" />;
  }
  return null;
}

async function getMenu() {
  return prisma.menuLink.findMany({
    orderBy: {
      order: 'asc',
    },
  });
}
