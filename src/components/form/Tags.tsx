import { ExclamationTriangleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { forwardRef, DetailedHTMLProps, InputHTMLAttributes, Fragment, useRef, useState, useEffect } from 'react';
import { Menu } from '@headlessui/react';
import pluck from '@/utils/pluck';

export type FormInputProps = {
  id?: string;
  name: string;
  label: string;
  value: any[];
  type?: string;
  className?: string;
  invalid?: boolean;
  handleChange?: any;
  updateItem: (e: any) => void;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export type Ref = HTMLInputElement;

const Tags = forwardRef<Ref, FormInputProps>(
  ({ id = '', type = 'text', name = '', label = '', value = [], placeholder = '', invalid = false, updateItem, className, ...props }, ref) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [openMenu, setOpenMenu] = useState(false);
    const inputSearchRef = useRef<null | HTMLInputElement>(null);

    useEffect(() => {
      const delayDebounceFn = setTimeout(async () => {
        if (searchTerm.length >= 3) {
          const res = await fetch(`/api/admin/tags/search?text=${searchTerm}`);
          const tagSearch = await res.json();
          const currentTags = pluck(value, 'id');
          const tags = tagSearch.results.length > 0 ? tagSearch.results.filter((x: any) => !currentTags.includes(x.id)) : [];
          setOpenMenu(true);
          if (tags.length > 0) {
            setSearchResults(tags);
          }
        }
      }, 500);
      resetSearch();
      return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, value]);

    const addTag = (tag: any) => {
      resetSearch();
      if (inputSearchRef.current) {
        inputSearchRef.current.value = '';
      }

      value.push({ ...tag, new: true });
      updateItem(value);
    };

    const removeTag = (key: number) => {
      // remove tags from resume using index key
      resetSearch();
      const tag = value[key];
      if (tag.new) {
        value.splice(key, 1);
      } else {
        tag.deleted = true;
        value[key] = tag;
      }

      updateItem(value);
      //setResume({ ...resume });
    };

    const resetSearch = () => {
      setOpenMenu(false);
      setSearchResults([]);
    };

    const isInvalid =
      type == 'file' ? invalid && ref != null && typeof ref !== 'function' && ref.current && ref.current.value == '' : invalid && value.length <= 0;
    return (
      <>
        <label htmlFor={id ? id : `${name}-form`} className="input-label flex items-center">
          <span className="grow">
            {label} {props.required && <span className="text-secondary-600">*</span>} ({value.length})
          </span>
        </label>

        <div className={`${isInvalid && '!border-red-400' } input-field flex flex-wrap items-center gap-2 p-2 relative mt-1`}>
          {value?.map((tag, key) => (
            <Fragment key={`tag-${key}`}>
              {!tag.deleted && (
                <span className="relative group">
                  <span className={`text-xs rounded px-2 py-1 text-primary-100 ${tag.new ? 'bg-emerald-700' : 'bg-secondary-800'}`}>{tag.name}</span>
                  <XCircleIcon
                    className="hidden group-hover:block h-4 w-4 absolute -top-2 -right-2 text-primary-100 cursor-pointer"
                    onClick={() => removeTag(key)}
                  />
                </span>
              )}
            </Fragment>
          ))}
          <Menu as="div" className="relative grow inline-block text-left">
            <input
              ref={inputSearchRef}
              type="text"
              autoComplete="off"
              className="w-full bg-transparent border-0 py-0 focus:ring-0 min-w-fit"
              placeholder="add new tag..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {openMenu && (
              <Menu.Items static className="absolute left-0 top-8 w-56 divide-y divide-primary-300 dark:divide-primary-500 box-card">
                {searchResults.map((tag: any, key: number) => (
                  <div className="px-1 py-1" key={key}>
                    <Menu.Item>
                      {({ active }) => (
                        <button className={`flex w-full p-2 ${active && 'bg-blue-500'}`} onClick={() => addTag(tag)}>
                          {tag.name}
                        </button>
                      )}
                    </Menu.Item>
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
              </Menu.Items>
            )}
          </Menu>
          {isInvalid && 
            <p className="text-xs flex items-center gap-1 mt-1 text-red-400">
              <ExclamationTriangleIcon className="h-4" /> this field is required
            </p>
          }
        </div>
      </>
    );
  },
);

Tags.displayName = 'Tags';

export default Tags;
