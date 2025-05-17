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
  },
  {
    title: 'Name',
    key: 'name',
    classNames: '',
    sortable: false,
  },
  {
    title: 'URL',
    key: 'url',
    classNames: '',
    sortable: false,
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
    url: (
      <a href={menu.url || ''} target="_blank" rel="noopener noreferrer" className="block max-w-xs truncate hover:underline">
        {menu.url}
      </a>
    ),
    onlyMobile: menu.onlyMobile ? 'Yes' : 'No',
    status: (
      <span
        className={`rounded px-3 py-1 text-xs font-semibold ${menu.active ? 'border border-green-700 bg-green-800 text-green-100' : 'border border-gray-200 bg-gray-100 text-gray-600'}`}
      >
        {menu.active ? 'Active' : 'Inactive'}
      </span>
    ),
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
          ) : (
            mappedData[column.key as keyof MappedData]
          )}
        </td>
      ))}
    </tr>
  );
}
