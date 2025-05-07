'use client';

import moment from 'moment';
import Link from 'next/link';
import React from 'react';

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
            <div className="flex items-center justify-end gap-2">
              <Link
                prefetch={false}
                href={`/dashboard/bookmarks/${mappedData.id}/edit`}
                className="text-primary-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Edit
              </Link>
              |
              <Link
                prefetch={false}
                href={`/dashboard/bookmarks/${mappedData.id}/delete`}
                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                Delete
              </Link>
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
