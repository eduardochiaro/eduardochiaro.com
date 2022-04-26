import { PencilAltIcon } from '@heroicons/react/outline';
import { TrashIcon } from '@heroicons/react/solid';
import React, { useState, useEffect } from 'react';

const tableLayout = ({ columns = [], data = [], editAction = () => null, deleteAction = () => null}) => {

  return (
    <div className="flex flex-col">
      <div className="-my-2 sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <table className="admin-table">
            <thead>
              <tr>
                <th scope="col"></th>
                { columns.map((column, index) => (
                  <th key={index} scope="col" className={column.className}>
                    {column.name}
                  </th>
                ))}
                <th scope="col" className="relative">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              { data.length > 0 ? 
                data.map((item) => (
                  <tr key={item.id}>
                    <td><span className="hidden">{item.id}</span></td>
                    { columns.map((column, index) => (
                      <td  key={index} className={column.classNameTd}>
                        {item[column.key]}
                      </td>
                    ))}
                    <td className="w-44 text-right font-medium">
                      <a href="#" className="text-isabelline-800 dark:text-isabelline-500 hover:underline" onClick={() => editAction(item)}>
                        <PencilAltIcon className="inline-flex align-text-bottom h-4 mr-1"/>Edit
                      </a>
                      <a href="#" className="text-isabelline-800 dark:text-isabelline-500 hover:underline ml-4" onClick={() => deleteAction(item)}>
                        <TrashIcon className="inline-flex align-text-bottom h-4 mr-1"/>Delete
                      </a>
                    </td>
                  </tr>
                )) :
                <tr><td></td><td colSpan={columns.length + 1} className="text-center">No records</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default tableLayout