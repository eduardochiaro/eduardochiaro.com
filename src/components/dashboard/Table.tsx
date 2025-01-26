'use client';

import { Checkbox } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import React, { useState, Fragment } from 'react';
import classNames from '@/utils/classNames';

type Props = {
  columns: Column[];
  data: any[];
  useCheckboxes?: boolean;
  tableRow: React.ComponentType<any>;
};

type Column = {
  title: string;
  key: string;
  classNames: string;
  sortable: boolean;
  searchable?: boolean;
};

export default function Table({ columns, data, useCheckboxes = false, tableRow }: Props) {
  const [tableColumns, setTableColumns] = useState(columns.map((x) => ({ ...x, sortDirection: 0, checked: false })));

  const [tableData, setTableData] = useState(data);

  const [countChecked, setCountChecked] = useState(0);

  const sortColumn = (key: string) => {
    //get current direction from tableData
    const currentDirection = tableColumns.find((x) => x.key === key)?.sortDirection || 0;
    //get new direction
    const newDirection = currentDirection === 0 ? 1 : 1 - currentDirection;

    //sort data
    data.sort((a, b) => {
      if (a[key] > b[key]) {
        return newDirection === 0 ? 1 : -1;
      }
      if (a[key] < b[key]) {
        return newDirection === 0 ? -1 : 1;
      }
      return 0;
    });
    //update tableData
    setTableData(data);
    //update tableColumns
    setTableColumns(tableColumns.map((x) => (x.key === key ? { ...x, sortDirection: newDirection } : x)));
  };

  const checkRow = (index: number) => {
    const table = tableData.map((x, i) => (i === index ? { ...x, checked: !x.checked } : x));
    setTableData(table);
    setCountChecked(table.filter((x) => x.checked).length);
  };

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="text-primary-500 dark:text-primary-400 w-full text-left text-sm rtl:text-right">
        <thead className="bg-primary-200 text-primary-700 dark:bg-primary-700 dark:text-primary-400 text-xs uppercase">
          <tr>
            {useCheckboxes && <th className="w-8"></th>}
            {tableColumns.map((column, index) => (
              <th key={index} scope="col" className={classNames('px-6 py-3', column.classNames)}>
                <div className="inline-flex items-center gap-2">
                  {column.title}
                  {column.sortable && (
                    <button onClick={() => sortColumn(column.key)}>
                      {column.sortDirection === 0 && <ChevronDownIcon className="h-4 w-4" />}
                      {column.sortDirection === 1 && <ChevronUpIcon className="h-4 w-4" />}
                    </button>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <Fragment key={index}>
              {React.createElement(tableRow, {
                trClasses: 'border-b bg-primary-50 last:border-0 hover:bg-primary-50 dark:border-primary-700 dark:bg-primary-800 dark:hover:bg-primary-600',
                tdClasses: 'relative px-6 py-4',
                useCheckboxes,
                checkbox: (
                  <Checkbox
                    checked={row.checked || false}
                    onChange={() => checkRow(index)}
                    className="group bg-primary-200 data-[checked]:bg-primary-200 inline-flex size-4 items-center justify-center rounded-sm border bg-white"
                  >
                    <div className="bg-primary-700 size-3 rounded-xs opacity-0 group-data-[checked]:opacity-100"></div>
                  </Checkbox>
                ),
                rowData: row,
              })}
            </Fragment>
          ))}
        </tbody>
      </table>
      {countChecked > 0 && (
        <div className="absolute right-0 bottom-5 left-0 mx-auto flex justify-center">
          <div className="bg-primary-100 text-primary-700 dark:bg-primary-700 dark:text-primary-400 flex min-w-96 items-center justify-between rounded-lg p-4 text-sm shadow-md sm:rounded-lg">
            <span>Number of rows selected: {countChecked}</span>
            <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
              Delete
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
