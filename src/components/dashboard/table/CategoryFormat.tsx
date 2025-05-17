'use client';

import moment from 'moment';
import React from 'react';
import ActionColumn, { TableRowProps } from './ActionColumn';

export const columns = [
  {
    title: 'Name',
    key: 'name',
    classNames: '',
    sortable: true,
    sortKey: 'name',
    searchable: true,
  },
  {
    title: 'Type',
    key: 'type',
    classNames: '',
    sortable: true,
    sortKey: 'type',
  },
  {
    title: 'Used in',
    key: 'bookmarks',
    classNames: '',
    sortable: true,
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

const formatData = (category: any) => {
  return {
    id: category.id,
    name: category.name,
    type: category.type,
    bookmarks: category.bookmarks.length == 1 ? category.bookmarks.length + ' bookmark' : category.bookmarks.length + ' bookmarks',
    created_at: moment(category.createdAt).fromNow(),
    updated_at: category.updatedAt ? moment(category.updatedAt).fromNow() : '',
  };
};

type MappedData = {
  id: number;
  name: string;
  type: string;
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
            <ActionColumn editUrl={`/dashboard/categories/${mappedData.id}/edit`} deleteUrl={`/dashboard/categories/${mappedData.id}/delete`} />
          ) : (
            mappedData[column.key as keyof MappedData]
          )}
        </td>
      ))}
    </tr>
  );
}
