'use client';

import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function Table({ columns, data }: { columns: any[]; data: any[] }) {
  const [tableColumns, setTableColumns] = useState(columns.map((x) => ({ ...x, sortDirection: 0 })));

  const [tableData, setTableData] = useState(data);

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

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-sm text-primary-500 dark:text-primary-400 rtl:text-right">
        <thead className="bg-primary-200 text-xs uppercase text-primary-700 dark:bg-primary-700 dark:text-primary-400">
          <tr>
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
              {tableColumns.map((column, index) => (
                <td key={index} className="px-6 py-4">
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
    </div>
  );
}
