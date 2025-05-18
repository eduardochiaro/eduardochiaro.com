'use client';

import moment from 'moment';
import Image from 'next/image';
import React from 'react';
import ActionColumn, { TableRowProps } from './ActionColumn';

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
    sortKey: 'name',
    searchable: true,
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

export function TableRow({ trClasses, tdClasses, rowData, useCheckboxes, checkbox }: TableRowProps) {
  const mappedData = formatData(rowData);
  return (
    <tr className={trClasses}>
      {useCheckboxes && <td className={tdClasses}>{checkbox}</td>}
      {columns.map((column, index) => (
        <td key={index} className="relative px-6 py-4">
          {column.key === 'actions' ? (
            <ActionColumn editUrl={`/dashboard/apps/${mappedData.id}/edit`} deleteUrl={`/dashboard/apps/${mappedData.id}/delete`} />
          ) : (
            mappedData[column.key as keyof MappedData]
          )}
        </td>
      ))}
    </tr>
  );
}
