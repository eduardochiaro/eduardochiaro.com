'use client';

import moment from 'moment';
import React from 'react';
import ActionColumn from './ActionColumn';
import SVG from '@/utils/svg';
import classNames from '@/utils/classNames';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Card from '@/components/frontend/Card';

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
    title: 'Projects',
    key: 'projects',
    classNames: 'w-10',
    sortable: false,
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
    projects: job.projects.length,
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
  const [useProjects, setUseProjects] = React.useState(false);
  return (
    <>
      <tr className={trClasses}>
        {useCheckboxes && <td className={tdClasses}>{checkbox}</td>}

        {columns.map((column, index) => (
          <td key={index} className="relative px-6 py-4">
            {column.key === 'actions' ? (
              <ActionColumn editUrl={`/dashboard/resume/${mappedData.id}/edit`} deleteUrl={`/dashboard/resume/${mappedData.id}/delete`} />
            ) : column.key === 'projects' ? (
              <div className="flex items-center gap-2">
                <span className="text-primary-500 dark:text-primary-400">{mappedData[column.key as keyof MappedData]}</span>
                <ChevronDown
                  className={classNames('text-primary-500 dark:text-primary-400 h-4 w-4', useProjects ? 'hidden' : '')}
                  onClick={() => setUseProjects(!useProjects)}
                />
                <ChevronUp
                  className={classNames('text-primary-500 dark:text-primary-400 h-4 w-4', useProjects ? '' : 'hidden')}
                  onClick={() => setUseProjects(!useProjects)}
                />
              </div>
            ) : (
              mappedData[column.key as keyof MappedData]
            )}
          </td>
        ))}
      </tr>
      <tr className={classNames('bg-primary-50 dark:bg-primary-800', trClasses, useProjects ? '' : 'hidden')}>
        <td className="relative px-6 py-4" colSpan={columns.length - 1}>
          {rowData.projects.map((project: any) => (
            <Card type="small" padding="p-0" className="float-left mr-4 flex flex-col items-center gap-2 overflow-hidden" key={project.id}>
              <SVG
                title={project.name}
                className={'fill-primary-700 dark:fill-primary-200 mt-2 inline-block px-4'}
                src={`${process.env.NEXT_PUBLIC_CDN_URL}/${project.file.path}`}
                height={20}
              />
              <span className="px-4 text-xs">{project.name}</span>
              <Link
                prefetch={false}
                href={`/dashboard/resume/projects/${project.id}/delete`}
                className="bg-primary-100 dark:bg-primary-700 w-full px-4 py-2 text-center text-xs text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                Delete
              </Link>
            </Card>
          ))}
        </td>
        <td colSpan={columns.length} className="text-center">
          <Link
            prefetch={false}
            href={`/dashboard/resume/projects/${mappedData.id}/new`}
            className="text-primary-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Add Project
          </Link>
        </td>
      </tr>
    </>
  );
}
