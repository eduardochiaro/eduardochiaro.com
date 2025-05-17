'use client';

import React from 'react';
import ActionColumn, { TableRowProps } from './ActionColumn';
import { LinkIcon } from 'lucide-react';

export const columns = [
  {
    title: 'Order',
    key: 'order',
    classNames: 'w-4',
    sortable: true,
    sortKey: 'order',
  },
  {
    title: 'Name',
    key: 'name',
    classNames: '',
    sortable: false,
    searchable: true,
  },
  {
    title: 'URL',
    key: 'url',
    classNames: '',
    sortable: false,
    searchable: true,
  },
  {
    title: 'Mobile Only',
    key: 'onlyMobile',
    classNames: 'w-32 whitespace-nowrap',
    sortable: false,
  },
  {
    title: 'Status',
    key: 'status',
    classNames: '',
    sortable: true,
    sortKey: 'active',
  },
  {
    title: 'Actions',
    key: 'actions',
    classNames: 'text-right',
    sortable: false,
  },
];

const formatData = (menu: any) => {
  return {
    id: menu.id,
    order: menu.order,
    name: (
      <div className="flex items-center gap-2">
        <LinkIcon className="size-4" />
        {menu.name}
      </div>
    ),
    url: menu.url,
    onlyMobile: menu.onlyMobile ? 'Yes' : 'No',
    status: menu.active ? 'Active' : 'Inactive',
  };
};

type MappedData = {
  id: string;
  order: string;
  name: string;
  url: string;
  status: string;
};

export function TableRow({ trClasses, tdClasses, rowData, useCheckboxes, checkbox }: TableRowProps) {
  const mappedData = formatData(rowData);
  return (
    <tr className={trClasses}>
      {useCheckboxes && <td className={tdClasses}>{checkbox}</td>}
      {columns.map((column, index) => (
        <td key={index} className="relative px-6 py-4">
          {column.key === 'actions' ? (
            <ActionColumn editUrl={`/dashboard/menu/${mappedData.id}/edit`} deleteUrl={`/dashboard/menu/${mappedData.id}/delete`} />
          ) : column.key === 'url' ? (
            <a
              href={mappedData[column.key as keyof MappedData] || ''}
              target="_blank"
              rel="noopener noreferrer"
              className="block max-w-xs truncate hover:underline"
            >
              {mappedData[column.key as keyof MappedData]}
            </a>
          ) : column.key === 'status' ? (
            <span
              className={`rounded px-3 py-1 text-xs font-semibold ${mappedData[column.key as keyof MappedData] === 'Active' ? 'border border-green-700 bg-green-800 text-green-100' : 'border border-gray-200 bg-gray-100 text-gray-600'}`}
            >
              {mappedData[column.key as keyof MappedData]}
            </span>
          ) : (
            mappedData[column.key as keyof MappedData]
          )}
        </td>
      ))}
    </tr>
  );
}
