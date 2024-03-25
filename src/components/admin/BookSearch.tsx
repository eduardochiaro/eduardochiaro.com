'use client';

import { useReducer, useState } from 'react';
import { Input } from '../form';
import SpinnerIcon from '@/components/icons/Spinner';

export default function BookSearch() {
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const responseData = {
    numFound: 0,
    start: 0,
    offset: 0,
    results: [],
  };

  const [data, updateData] = useReducer((x: any, y: any) => {
    return { ...x, ...y };
  }, responseData);

  const handleSearch = () => {
    //fetch data from https://openlibrary.org/search.json
    setIsLoading(true);

    const response = fetch(`https://openlibrary.org/search.json?q=${search}&fields=title,author_name,cover_i&limit=100&offset=0`)
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        updateData({
          numFound: data.numFound,
          start: data.start,
          offset: data.offset,
          results: data.docs,
        });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <Input
          label="Search"
          name="search"
          type="text"
          placeholder="Search book by name or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <button className="button" onClick={handleSearch}>
          Search
        </button>
      </div>
      {isLoading && (
        <p className="mt-10 flex items-center gap-2">
          <SpinnerIcon className="h-5 animate-spin" /> Loading...
        </p>
      )}
      {!isLoading && data.numFound > 0 && (
        <div className="mt-10">
          <div className="relative flex">
            <label className="flex items-center gap-2">
              <span className="text-gray-500 text-sm font-semibold">Results:</span>
              <span className="text-gray-800 text-sm">
                {data.numFound} (show {data.numFound < 100 ? data.numFound : 100})
              </span>
            </label>
          </div>
          <div className="grid grid-cols-6 gap-4 pt-5" role="menu" aria-orientation="horizontal" aria-labelledby="menu-button">
            {data.results.map((book: any, index: number) => (
              <div key={index} className="flex w-44 flex-col">
                <p className="text-gray-500 mb-1 text-center text-sm">{book.author_name ? book.author_name[0] : 'Unknown author'}</p>
                {book.cover_i && (
                  <div
                    className="relative mx-auto h-60 w-40 rounded-l-lg border border-primary-700 bg-emerald-600 bg-cover bg-center bg-no-repeat drop-shadow-md"
                    style={{ backgroundImage: `url('https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg')`, backgroundPosition: 'top center' }}
                  >
                    <div className="absolute left-0 top-0 h-60 w-2 border-r-2 border-primary-950 bg-secondary-900 opacity-50" />
                  </div>
                )}
                {!book.cover_i && (
                  <div className="relative mx-auto flex h-60 w-40 flex-col rounded-l-lg border border-primary-700 bg-accent-600 bg-cover bg-center bg-no-repeat drop-shadow-md">
                    <div className="absolute left-0 top-0 h-60 w-2 border-r-2 border-primary-950 bg-secondary-900 opacity-50" />
                    <h3 className="mt-5 grow px-3 text-center text-base font-semibold line-clamp-5">{book.title}</h3>
                    <p className="text-gray-500 mb-2 px-3 text-center text-xs line-clamp-3">{book.author_name ? book.author_name[0] : 'Unknown author'}</p>
                  </div>
                )}
                <h3 className="mt-2 text-center text-base font-semibold">{book.title}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
