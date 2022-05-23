import { PencilAltIcon, PlusIcon } from '@heroicons/react/outline';
import { TrashIcon, XIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';

export default function Table ({ columns = [], data = [], format = [], editAction = () => null, deleteAction = () => null, openAction = () => null, openActionLabel = '' }) {
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const typeSearch = (e) => {
    const search = e.target.value;
    filterData(search);
  }

  const filterData = (search) => {
    setSearch(search);
    const indexToSearch = columns.filter(x => x.searchable);
    if (search.length > 0) {
      const filterData = data.filter(x => {
        let found = false;
        indexToSearch.forEach(y => {
          if (x[y.key] && x[y.key].toLowerCase().includes(search.toLowerCase())) {
            found = true;
          }
        });
        return found;
        //return x.name.toLowerCase().includes(search.toLowerCase());
      });
      setFilteredData(filterData);
    } else {
      setFilteredData(data);
    }
  }

  return (
    <>
    <div className="flex mt-8 mb-2">
      <div className="flex relative">
        <span className="inline-flex items-center px-3 text-sm bg-zinc-200 border border-r-0 border-zinc-300 rounded-l-md dark:bg-zinc-600 dark:border-zinc-600">
          Search
        </span>
        <input onChange={typeSearch} type="text" value={search} id="website-admin" className="pr-8 rounded-none rounded-r-lg bg-zinc-50 border border-zinc-300 block flex-1 min-w-0 w-full text-sm p-2 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 focus:ring-primary-500 focus:border-primary-500  dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder=""/>
        { search && <XIcon className="cursor-pointer absolute top-2 right-2 w-5" onClick={() => filterData('')} />}
      </div>
      <div className="grow text-right">
        { openAction &&
        <button className="transition bg-primary-700 dark:bg-primary-600 hover:bg-primary-800 dark:hover:bg-primary-700 text-white font-bold py-2 px-4 rounded" 
          onClick={() => openAction(format)}>
          <div className="flex items-center gap-2">
            <PlusIcon className="h-5 text-white "/> {openActionLabel}
          </div>
        </button>
        }
      </div>
    </div>
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
              { filteredData.length > 0 ? 
                filteredData.map((item) => (
                  <tr key={item.id}>
                    <td><span className="hidden">{item.id}</span></td>
                    { columns.map((column, index) => (
                      <td  key={index} className={column.classNameTd}>
                        {item[column.key]}
                      </td>
                    ))}
                    <td className="w-44 text-right font-medium">
                      <a href="#" className="text-primary-800 dark:text-zinc-100 hover:underline" onClick={() => editAction(item)}>
                        <PencilAltIcon className="inline-flex align-text-bottom h-4 mr-1"/>Edit
                      </a>
                      <a href="#" className="text-primary-800 dark:text-zinc-100 hover:underline ml-4" onClick={() => deleteAction(item)}>
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
    </>
  )
}