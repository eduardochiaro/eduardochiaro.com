'use client';

import classNames from '@/utils/classNames';
import { Plus as PlusIcon, X as XMarkIcon } from 'lucide-react';
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
    <div className="bg-primary-100 dark:bg-primary-800 h-screen overflow-auto py-8">
      <div className="flex items-center gap-6 px-6 text-3xl">
        <h1 className="grow font-semibold md:flex-grow-0">{title}</h1>
        <button className="button flex items-center gap-1" onClick={() => openAction(format)} title={`New ${single}`}>
          <PlusIcon className="h-5" /> add new
        </button>
      </div>
      <div className="mt-8 mb-2 flex flex-col items-start gap-4 px-6 md:flex-row md:items-center">
        <div className="relative flex">
          <label
            htmlFor="website-admin-search"
            className="border-primary-300 bg-primary-200 dark:border-primary-600 dark:bg-primary-600 inline-flex items-center rounded-l-md border border-r-0 px-3 text-sm"
          >
            Search
          </label>
          <input
            onChange={(e) => typeSearch(e)}
            type="text"
            value={search}
            id="website-admin-search"
            className="border-primary-300 bg-primary-50 focus:border-secondary-500 focus:ring-secondary-500 dark:border-primary-600 dark:bg-primary-700 dark:placeholder-primary-400 dark:focus:border-secondary-500 dark:focus:ring-secondary-500 block w-full min-w-0 grow rounded-none rounded-r-lg border p-2 pr-8 text-sm"
            placeholder=""
          />
          {search && <XMarkIcon className="absolute top-2 right-2 w-5 cursor-pointer" onClick={() => filterData('')} />}
        </div>

        <div className="grow text-right">Sort by</div>
        <div className="tabs">
          {sortList.map((item: { id: string; name: string }, key: number) => (
            <button key={`sort-${key}`} className={classNames('tab', item.id == sortByColumn && 'active')} onClick={() => sortByClick(item.id)}>
              {item.name}
            </button>
          ))}
        </div>
        <div className="text-right">Direction</div>
        <div className="tabs">
          {sortDirectionType.map((item, key) => (
            <button key={`direction-${key}`} className={classNames('tab', item.id == sortDirection && 'active')} onClick={() => sortDirectionClick(item.id)}>
              {item.name}
            </button>
          ))}
        </div>
      </div>
      <div className="border-primary-500/border:bg-primary-50 tracking-none mx-6 mt-10 mb-2 border-b px-6 py-3 text-left text-sm font-bold whitespace-nowrap uppercase opacity-50">
        Records
      </div>
      <div className="flex flex-col gap-2 px-6" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div key={`list-${item.id}`} className="border:bg-primary-50/50 group border-primary-500/50 border-b">
              <div
                className={'group flex cursor-pointer items-center gap-4 rounded-l-lg p-2 pr-8 pl-4'}
                onClick={() => editAction(item.original || item)}
                role="menuitem"
              >
                {item.image_d ? <div className="relative hidden h-14 w-16 overflow-hidden rounded-sm xl:block">{item.image_d}</div> : ''}
                <div className="flex grow flex-col gap-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="group-hover:text-secondary-600 text-lg">{item.name}</h4>
                    {item.category_d ? (
                      <div className="bg-secondary-800 text-primary-100 hidden gap-2 rounded-sm px-2 py-1 text-xs xl:block">{item.category_d}</div>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="w-48 grow truncate text-sm opacity-50">{item.description}</p>
                    <p className="hidden flex-none text-xs opacity-50 xl:block">{item.updated}</p>
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
