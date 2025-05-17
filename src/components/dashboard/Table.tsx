'use client';

import { Checkbox } from '@headlessui/react';
import { Check, ChevronDownIcon, ChevronUpIcon, Search, XIcon } from 'lucide-react';
import React, { useState, Fragment, useEffect } from 'react';
import classNames from '@/utils/classNames';
import Card from '../frontend/Card';

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
  sortKey?: string;
};

export default function Table({ columns, data, useCheckboxes = false, tableRow }: Props) {
  const [tableColumns, setTableColumns] = useState(columns.map((x) => ({ ...x, sortDirection: 0, checked: false })));
  const [tableData, setTableData] = useState(data);
  const [countChecked, setCountChecked] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [originalData] = useState([...data]); // Keep a copy of original data

  const sortColumn = (key: string) => {
    //get current direction from tableData
    const currentDirection = tableColumns.find((x) => x.key === key)?.sortDirection || 0;
    //get new direction
    const newDirection = currentDirection === 0 ? 1 : 1 - currentDirection;

    //create a sorted copy of the data
    const sortedData = [...tableData].sort((a, b) => {
      if (a[key] > b[key]) {
        return newDirection === 0 ? 1 : -1;
      }
      if (a[key] < b[key]) {
        return newDirection === 0 ? -1 : 1;
      }
      return 0;
    });

    //update tableData
    setTableData(sortedData);
    //update tableColumns
    setTableColumns(tableColumns.map((x) => (x.key === key ? { ...x, sortDirection: newDirection } : x)));
  };

  const checkRow = (index: number) => {
    const table = tableData.map((x, i) => (i === index ? { ...x, checked: !x.checked } : x));
    setTableData(table);
    setCountChecked(table.filter((x) => x.checked).length);
  };

  // Filter data based on search query
  useEffect(() => {
    if (!searchQuery) {
      setTableData(originalData);
      return;
    }

    const searchableColumns = tableColumns.filter((column) => column.searchable);

    const filteredData = originalData.filter((row) => {
      return searchableColumns.some((column) => {
        const value = row[column.key];
        if (value == null) return false;

        const stringValue = String(value).toLowerCase();
        return stringValue.includes(searchQuery.toLowerCase());
      });
    });

    setTableData(filteredData);

    // Reset checked count when filtering
    setCountChecked(filteredData.filter((x) => x.checked).length);
  }, [searchQuery, originalData, tableColumns]);

  return (
    <>
      {/* Search Box - Outside card, right-aligned */}
      <div className="mb-4 flex justify-end">
        <div className="w-1/3">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
              <Search className="text-primary-500 dark:text-primary-400 size-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-primary-50 border-primary-300 text-primary-900 dark:bg-primary-700 dark:border-primary-600 dark:text-primary-100 block w-full rounded-lg border p-2 ps-10 text-sm"
              placeholder="Search table..."
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-primary-500 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 absolute inset-y-0 end-0 flex items-center pe-3"
                aria-label="Clear search"
              >
                <XIcon className="size-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <Card type="medium" className="mb-10 overflow-x-auto" padding="p-0">
        <table className="text-primary-500 dark:text-primary-400 dark:divide-primary-700 min-w-full divide-y divide-gray-200 text-left text-sm rtl:text-right">
          <thead className="bg-primary-100 dark:bg-primary-700 text-primary-500 dark:text-primary-300 uppercase">
            <tr>
              {useCheckboxes && <th className="w-8"></th>}
              {tableColumns.map((column, index) => (
                <th key={index} scope="col" className={classNames('px-6 py-3 text-xs font-medium tracking-wider', column.classNames)}>
                  <div className="inline-flex items-center gap-2">
                    {column.title}
                    {column.sortable && (
                      <button
                        onClick={() => sortColumn(column.sortKey || column.key)}
                        className="text-primary-500 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                      >
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
                      className="group bg-primary-200 data-[checked]:bg-primary-200 border-primary-400 dark:border-primary-700 inline-flex size-4 items-center justify-center rounded-sm border"
                    >
                      <Check strokeWidth={5} className="text-primary-800 size-3 opacity-0 group-data-[checked]:opacity-100" />
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
              <strong>{countChecked} selected</strong>
              <a href="#" className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                Delete
              </a>
            </div>
          </div>
        )}
      </Card>
    </>
  );
}
