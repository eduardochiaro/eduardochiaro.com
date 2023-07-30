'use client';

import { PlusIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState, ChangeEvent } from 'react';

const sortDirectionType = [
  {
    id: 'asc',
    name: 'Asc',
  },
  {
    id: 'desc',
    name: 'Desc',
  },
];

function compare(key: any, order = 'asc') {
  return function innerSort(a: { [x: string]: any }, b: { [x: string]: any }) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === 'desc' ? comparison * -1 : comparison;
  };
}

type FilteredData = {
  id: string;
  name: string;
  updatedAt?: string;
  original?: any;
  image_d?: string;
  category_d?: string;
  description?: string;
  updated?: string;
}[];

export default function List({
  title,
  single,
  columns = [],
  data = [],
  format,
  sortList,
  sortDefault,
  sortDirectionDefault = 'asc',
  openAction = (e: any) => {},
  editAction = (e: any) => {},
}: {
  title?: string;
  single?: string;
  columns?: string[];
  data?: any[];
  format?: any;
  sortList: any;
  sortDefault: string;
  sortDirectionDefault?: string;
  openAction?: (e: any) => void;
  editAction?: (e: any) => void;
}) {
  const [filteredData, setFilteredData] = useState<FilteredData>([]);
  const [search, setSearch] = useState('');
  const [sortByColumn, setSortByColumn] = useState(sortDefault);
  const [sortDirection, setSortDirection] = useState(sortDirectionDefault);

  useEffect(() => {
    if (data) {
      setFilteredData(data);
    }
  }, [data]);

  const sortByClick = (sort: string) => {
    setSortByColumn(sort);
    sorting(sort, sortDirection);
  };

  const sortDirectionClick = (direction: string) => {
    setSortDirection(direction);
    sorting(sortByColumn, direction);
  };

  const sorting = (sortBy: string, sortDirection: string) => {
    const sortedData = filteredData.sort(compare(sortBy, sortDirection));
    setFilteredData(sortedData);
  };

  const typeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    filterData(search);
  };

  const filterData = (search: string) => {
    setSearch(search);
    if (search.length > 0) {
      const filterData = data.filter((x) => {
        let found = false;
        columns.forEach((key) => {
          const value = x[key] as string;
          if (value && value.toLowerCase().includes(search.toLowerCase())) {
            found = true;
          }
        });
        return found;
      });
      setFilteredData(filterData);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <div className="overflow-auto h-screen py-8 bg-primary-100 dark:bg-primary-800">
      <div className="text-3xl flex items-center gap-6 px-6">
        <h1 className="font-semibold">{title}</h1>
        <button className="button flex items-center gap-1" onClick={() => openAction(format)} title={`New ${single}`}>
          <PlusIcon className="h-5" /> add new
        </button>
      </div>
      <div className="mt-8 mb-2 px-6 flex items-center gap-4">
        <div className="flex relative">
          <label
            htmlFor="website-admin-search"
            className="inline-flex items-center px-3 text-sm bg-primary-200 border border-r-0 border-primary-300 rounded-l-md dark:bg-primary-600 dark:border-primary-600"
          >
            Search
          </label>
          <input
            onChange={(e) => typeSearch(e)}
            type="text"
            value={search}
            id="website-admin-search"
            className="pr-8 rounded-none rounded-r-lg bg-primary-50 border border-primary-300 block grow min-w-0 w-full text-sm p-2 dark:bg-primary-700 dark:border-primary-600 dark:placeholder-primary-400 focus:ring-secondary-500 focus:border-secondary-500  dark:focus:ring-secondary-500 dark:focus:border-secondary-500"
            placeholder=""
          />
          {search && <XMarkIcon className="cursor-pointer absolute top-2 right-2 w-5" onClick={() => filterData('')} />}
        </div>

        <div className="grow text-right">Sort by</div>
        <div className="flex items-center divide-x rounded overflow-hidden bg-primary-500 dark:bg-primary-50 text-primary-50 dark:text-primary-900">
          {sortList.map((item: { id: string; name: string }, key: number) => (
            <button
              key={`sort-${key}`}
              className={`text-xs font-bold px-4 py-2 flex-none hover:underline ${
                item.id == sortByColumn ? 'bg-secondary-600 dark:bg-secondary-700 text-primary-50' : ''
              }`}
              onClick={() => sortByClick(item.id)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="text-right">Direction</div>
        <div className="flex items-center divide-x rounded overflow-hidden bg-primary-500 dark:bg-primary-50 text-primary-50 dark:text-primary-900">
          {sortDirectionType.map((item, key) => (
            <button
              key={`direction-${key}`}
              className={`text-xs font-bold px-4 py-2 flex-none ${item.id == sortDirection ? 'bg-secondary-600 dark:bg-secondary-700 text-primary-50' : ''}`}
              onClick={() => sortDirectionClick(item.id)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
      <div className=" mx-6  mt-10 mb-2 border-b border-primary-500/border:bg-primary-50 px-6 py-3 font-bold text-left uppercase text-sm tracking-none whitespace-nowrap opacity-50">
        Records
      </div>
      <div className="flex flex-col gap-2 px-6" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div key={`list-${item.id}`} className="group border-b border-primary-500/50 border:bg-primary-50/50">
              <div
                className={'flex items-center gap-4 cursor-pointer group p-2 pl-4 pr-8 rounded-l-lg'}
                onClick={() => editAction(item.original || item)}
                role="menuitem"
              >
                {item.image_d ? <div className="w-16 h-14 rounded overflow-hidden hidden xl:block relative">{item.image_d}</div> : ''}
                <div className="grow flex flex-col gap-1">
                  <div className="flex justify-between items-center gap-2">
                    <h4 className="text-lg group-hover:text-secondary-600">{item.name}</h4>
                    {item.category_d ? (
                      <div className="text-xs rounded px-2 py-1 bg-secondary-800 text-primary-100 gap-2 hidden xl:block">{item.category_d}</div>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-sm w-48 grow opacity-50 truncate">{item.description}</p>
                    <p className="text-xs opacity-50 flex-none hidden xl:block">{item.updated}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-base opacity-50">...nothing here</div>
        )}
      </div>
    </div>
  );
}
