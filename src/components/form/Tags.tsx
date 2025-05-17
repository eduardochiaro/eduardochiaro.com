'use client';

import { TriangleAlertIcon, CircleXIcon, X, XIcon } from 'lucide-react';
import { forwardRef, DetailedHTMLProps, InputHTMLAttributes, Fragment, useRef, useState, useEffect } from 'react';
import { Menu, MenuItem, MenuItems } from '@headlessui/react';
import pluck from '@/utils/pluck';
import { set } from 'cypress/types/lodash';

export type FormInputProps = {
  id?: string;
  name: string;
  label: string;
  originalValue: any[];
  type?: string;
  className?: string;
  invalid?: boolean;
  handleChange?: any;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export type Ref = HTMLInputElement;

const Tags = forwardRef<Ref, FormInputProps>(
  ({ id = '', type = 'text', name = '', label = '', originalValue = [], placeholder = '', invalid = false, className, ...props }, ref) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [openMenu, setOpenMenu] = useState(false);
    const inputSearchRef = useRef<null | HTMLInputElement>(null);
    const [newValue, setNewValue] = useState(originalValue);

    useEffect(() => {
      const delayDebounceFn = setTimeout(async () => {
        if (searchTerm.length >= 3) {
          const res = await fetch(`/api/tags?text=${searchTerm}`);
          const tagSearch = await res.json();
          const currentTags = pluck(originalValue, 'id');
          const tags = tagSearch.results.length > 0 ? tagSearch.results.filter((x: any) => !currentTags.includes(x.id)) : [];
          setOpenMenu(true);
          if (tags.length > 0) {
            setSearchResults(tags);
          }
        }
      }, 500);
      resetSearch();
      return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, originalValue]);

    const addTag = (tag: any) => {
      resetSearch();
      if (inputSearchRef.current) {
        inputSearchRef.current.value = '';
      }

      originalValue.push({ ...tag, new: true });
      setNewValue(originalValue);
    };

    const removeTag = (key: number) => {
      // remove tags from resume using index key
      resetSearch();
      const tag = originalValue[key];
      if (tag.new) {
        originalValue.splice(key, 1);
      } else {
        tag.deleted = true;
        originalValue[key] = tag;
      }
      setNewValue(originalValue);
    };

    const resetSearch = () => {
      setOpenMenu(false);
      setSearchResults([]);
    };

    const isInvalid =
      type == 'file' ? invalid && ref != null && typeof ref !== 'function' && ref.current && ref.current.value == '' : invalid && originalValue.length <= 0;
    return (
      <>
        <label htmlFor={id ? id : `${name}-form`} className="input-label flex items-center">
          <span className="grow">
            {label} {props.required && <span className="text-secondary-600">*</span>} ({originalValue.length})
          </span>
        </label>
        <input type="hidden" name={name} value={JSON.stringify(newValue)} />
        <div className={`${isInvalid && '!border-red-400'} input-field relative mt-1 flex flex-wrap items-center gap-2 p-2`}>
          {originalValue?.map((tag, key) => (
            <Fragment key={`tag-${key}`}>
              {!tag.deleted && (
                <span
                  className={`text-primary-100 divide-primary-500 flex items-center gap-1 divide-x rounded-sm px-2 py-1 text-xs ${tag.new ? 'bg-emerald-700' : 'bg-accent-800'}`}
                >
                  <span className="pr-2">{tag.name}</span>
                  <XIcon className="solid size-3 cursor-pointer" onClick={() => removeTag(key)} />
                </span>
              )}
            </Fragment>
          ))}
          <Menu as="div" className="relative inline-block grow text-left">
            <input
              ref={inputSearchRef}
              type="text"
              autoComplete="off"
              className="w-full min-w-fit border-0 bg-transparent py-0 focus:ring-0"
              placeholder="add new tag..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {openMenu && (
              <MenuItems static className="box-card divide-primary-300 dark:divide-primary-500 absolute top-8 left-0 w-56 divide-y">
                {searchResults.map((tag: any, key: number) => (
                  <div className="px-1 py-1" key={key}>
                    <MenuItem>
                      {({ focus }) => (
                        <button className={`flex w-full p-2 ${focus && 'bg-blue-500'}`} onClick={() => addTag(tag)}>
                          {tag.name}
                        </button>
                      )}
                    </MenuItem>
                  </div>
                ))}
                {searchResults.length == 0 && (
                  <>
                    <div className="px-1 py-5">
                      <p className="text-center opacity-70">No results found</p>
                    </div>
                    <div className="p-3 text-center">
                      <button type="button" className="button" onClick={() => addTag({ name: searchTerm, id: null })}>
                        Add &quot;<strong>{searchTerm}</strong>&quot; as new tag
                      </button>
                    </div>
                  </>
                )}
              </MenuItems>
            )}
          </Menu>
          {isInvalid && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-400">
              <TriangleAlertIcon className="size-3" /> this field is required
            </p>
          )}
        </div>
      </>
    );
  },
);

Tags.displayName = 'Tags';

export default Tags;
