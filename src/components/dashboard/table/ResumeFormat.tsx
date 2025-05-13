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
    title: 'Actions',
    key: 'actions',
    classNames: 'text-right',
    sortable: false,
  },
];

const formatData = (resume: any) => {
  return {
    id: resume.id,
    company: resume.company,
    name: resume.name,
    startDate: moment(resume.startDate).format('MMMM YYYY'),
    endDate: resume.endDate ? moment(resume.endDate).format('MMMM YYYY') : 'Present',
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
