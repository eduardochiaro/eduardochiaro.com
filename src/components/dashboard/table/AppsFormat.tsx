'use client';

import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const columns = [
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
  },
];

const formatData = (app: any) => {
  return {
    id: app.id,
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
  };
};

type MappedData = {
  id: string;
  image: string;
  app_name: string;
  description: string;
  created_at: string;
  updated_at: string;
};

type Props = {
  trClasses: string;
  tdClasses: string;
  rowData: any;
  useCheckboxes: boolean;
  checkbox: React.ReactElement;
};

export function TableRow({ trClasses, tdClasses, rowData, useCheckboxes, checkbox }: Props) {
  const mappedData = formatData(rowData);
  return (
    <tr className={trClasses}>
      {useCheckboxes && <td className={tdClasses}>{checkbox}</td>}
      {columns.map((column, index) => (
        <td key={index} className="relative px-6 py-4">
          {column.key === 'actions' ? (
            <div className="flex items-center justify-end gap-2">
              <Link
                prefetch={false}
                href={`/dashboard/apps/${mappedData.id}`}
                className="text-primary-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Edit
              </Link>
              |<button className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">Delete</button>
            </div>
          ) : column.key === 'image' ? (
            mappedData[column.key as keyof MappedData]
          ) : (
            mappedData[column.key as keyof MappedData]
          )}
        </td>
      ))}
    </tr>
  );
}
