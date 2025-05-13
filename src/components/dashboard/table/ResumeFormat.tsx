'use client';

import moment from 'moment';
import React from 'react';
import ActionColumn from './ActionColumn';
import Image from 'next/image';
import SVG from '@/utils/svg';

export const columns = [
  {
    title: 'Title',
    key: 'name',
    classNames: '',
    sortable: false,
  },
  {
    title: 'Company',
    key: 'company',
    classNames: '',
    sortable: false,
  },
  {
    title: 'Start Date',
    key: 'startDate',
    classNames: '',
    sortable: true,
  },
  {
    title: 'End Date',
    key: 'endDate',
    classNames: '',
    sortable: true,
  },
  {
    title: 'Tags',
    key: 'tags',
    classNames: '',
    sortable: false,
  },
  {
    title: 'Actions',
    key: 'actions',
    classNames: 'text-right',
    sortable: false,
  },
];

const formatData = (job: any) => {
  return {
    id: job.id,
    company: job.file ? (
      <>
        <SVG
          title={job.company}
          className={'fill-primary-700 dark:fill-primary-200 inline-block'}
          src={`${process.env.NEXT_PUBLIC_CDN_URL}/${job.file.path}`}
          height={20}
        />
        <span className="hidden">{job.company}</span>
      </>
    ) : (
      job.company
    ),
    name: job.name,
    tags: job.tags.map((tag: any) => (
      <span key={tag.id} className="bg-secondary-800 text-primary-100 mr-2 rounded-sm px-2 py-1 text-xs">
        {tag.name}
      </span>
    )),
    startDate: moment(job.startDate).format('MMMM YYYY'),
    endDate: job.endDate ? moment(job.endDate).format('MMMM YYYY') : 'Present',
  };
};

type MappedData = {
  id: string;
  company: string;
  name: string;
  startDate: string;
  endDate: string;
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
            <ActionColumn editUrl={`/dashboard/resume/${mappedData.id}/edit`} deleteUrl={`/dashboard/resume/${mappedData.id}/delete`} />
          ) : (
            mappedData[column.key as keyof MappedData]
          )}
        </td>
      ))}
    </tr>
  );
}
