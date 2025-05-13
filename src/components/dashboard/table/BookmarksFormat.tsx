'use client';

import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import ActionColumn from './ActionColumn';

export const columns = [
  {
    title: 'Title',
    key: 'name',
    classNames: '',
    sortable: false,
  },
  {
    title: 'Category',
    key: 'category',
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

const formatData = (bookmark: any) => {
  return {
    id: bookmark.id,
    category: bookmark.category.name,
    name: bookmark.name,
    url: bookmark.url.length > 40 ? `${bookmark.url.substring(0, 40)}...` : bookmark.url,
    created_at: moment(bookmark.createdAt).fromNow(),
    updated_at: bookmark.updatedAt ? moment(bookmark.updatedAt).fromNow() : '',
  };
};

type MappedData = {
  id: string;
  category: string;
  name: string;
  url: string;
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
            <ActionColumn editUrl={`/dashboard/bookmarks/${mappedData.id}/edit`} deleteUrl={`/dashboard/bookmarks/${mappedData.id}/delete`} />
          ) : (
            mappedData[column.key as keyof MappedData]
          )}
        </td>
      ))}
    </tr>
  );
}
