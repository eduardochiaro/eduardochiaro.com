'use client';

import { Checkbox } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function Table({ columns, data }: { columns: any[]; data: any[] }) {
  const [tableColumns, setTableColumns] = useState(columns.map((x) => ({ ...x, sortDirection: 0, checked: false })));

  const [tableData, setTableData] = useState(data);

  const [countChecked, setCountChecked] = useState(0);

  const directions = ['asc', 'desc'];

  const sortColumn = (key: string) => {
    //get current direction from tableData
    const currentDirection = findCurrentDirection(key);
    //get new direction
    console.log(currentDirection);
    const newDirection = currentDirection === 0 ? 1 : 1 - currentDirection;
    console.log(newDirection);

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

  const findCurrentDirection = (key: string) => {
    const currentDirection = tableColumns.find((x) => x.key === key)?.sortDirection;
    return currentDirection;
  };

  const checkRow = (index: number) => {
    const table = tableData.map((x, i) => (i === index ? { ...x, checked: !x.checked } : x));
    setTableData(table);
    setCountChecked(table.filter((x) => x.checked).length);
  };

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-sm text-primary-500 dark:text-primary-400 rtl:text-right">
        <thead className="bg-primary-200 text-xs uppercase text-primary-700 dark:bg-primary-700 dark:text-primary-400">
          <tr>
            <th></th>
            {tableColumns.map((column, index) => (
              <th key={index} scope="col" className="px-6 py-3">
                <div className="flex items-center gap-2">
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
            <th scope="col" className="px-6 py-3 text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr
              key={index}
              className="border-b bg-primary-50 last:border-0 hover:bg-primary-50 dark:border-primary-700 dark:bg-primary-800 dark:hover:bg-primary-600"
            >
              <td className="px-6 py-4">
                <Checkbox
                  checked={row.checked || false}
                  onChange={() => checkRow(index)}
                  className="bg-white group flex size-4 items-center justify-center rounded border bg-primary-200 data-[checked]:bg-primary-200"
                >
                  <div className="size-3 rounded-sm bg-primary-700 opacity-0 group-data-[checked]:opacity-100"></div>
                </Checkbox>
              </td>
              {tableColumns.map((column, index) => (
                <td key={index} className="relative px-6 py-4">
                  {row[column.key]}
                </td>
              ))}
              <td className="px-6 py-4 text-right">
                <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {countChecked > 0 && (
        <div className="absolute bottom-5 left-0 right-0 mx-auto flex justify-center">
          <div className="flex min-w-96 items-center justify-between rounded-lg bg-primary-100 p-4 text-sm text-primary-700 shadow-md dark:bg-primary-700 dark:text-primary-400 sm:rounded-lg">
            <span>Number of row selected: {countChecked}</span>
            <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
              Delete
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
