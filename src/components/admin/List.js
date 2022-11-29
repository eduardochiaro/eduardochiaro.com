import { PencilSquareIcon, PlusIcon } from '@heroicons/react/24/outline';
import { EllipsisVerticalIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Popover, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';

export default function List({
  columns = [],
  data = [],
  format = [],
  editAction = () => null,
  deleteAction = () => null,
  openAction = () => null,
  openActionLabel = '',
}) {
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const typeSearch = (e) => {
    const search = e.target.value;
    filterData(search);
  };

  const filterData = (search) => {
    setSearch(search);
    const indexToSearch = columns.filter((x) => x.searchable);
    if (search.length > 0) {
      const filterData = data.filter((x) => {
        let found = false;
        indexToSearch.forEach((y) => {
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
  };

  return (
    <>
      <div className="flex mt-8 mb-2">
        <div className="flex relative">
          <label
            htmlFor="website-admin-search"
            className="inline-flex items-center px-3 text-sm bg-primary-200 border border-r-0 border-primary-300 rounded-l-md dark:bg-primary-600 dark:border-primary-600"
          >
            Search
          </label>
          <input
            onChange={typeSearch}
            type="text"
            value={search}
            id="website-admin-search"
            className="pr-8 rounded-none rounded-r-lg bg-primary-50 border border-primary-300 block flex-1 min-w-0 w-full text-sm p-2 dark:bg-primary-700 dark:border-primary-600 dark:placeholder-primary-400 focus:ring-secondary-500 focus:border-secondary-500  dark:focus:ring-secondary-500 dark:focus:border-secondary-500"
            placeholder=""
          />
          {search && <XMarkIcon className="cursor-pointer absolute top-2 right-2 w-5" onClick={() => filterData('')} />}
        </div>
        <div className="grow text-right">
          {openAction && (
            <button
              className="font-bold p-2"
              onClick={() => openAction(format)}
              title= {openActionLabel}
            >
              <PlusIcon className="h-5 text-primary-50" />
            </button>
          )}
        </div>
      </div>
      <div 
        className="flex flex-col gap-4 mt-10"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex="-1">
        {filteredData.length > 0 ? 
          filteredData.map((item) => (
            <div 
              key={item.id} 
              className="flex items-center gap-4 cursor-pointer hover:bg-primary"
              onClick={() => editAction(item)}
              role="menuitem"
              tabIndex="-1">
              <div className="w-16 h-16 hidden xl:block relative">
                {item.image_d}
              </div>
              <div className="grow">
                <h4 className="text-lg">{item.name}</h4>
                <p className="text-sm w-48 opacity-50 truncate">{item.description}</p>
              </div>
              
            </div>
          )) : ""
        }
      </div>
    </>
  );
}
