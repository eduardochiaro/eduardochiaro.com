'use client';

import SVG from '@/utils/svg';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, useState } from 'react';

type FormInputProps = {
  id?: string;
  name: string;
  label: string;
  value: any | null;
  itemList: Array<{ id: string; name: string; image?: string }>;
  className?: string;
  invalid?: boolean;
  required?: boolean;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export type Ref = HTMLInputElement;

const ListboxComponent = forwardRef<Ref, FormInputProps>(
  ({ name = '', label = '', itemList = [], value = null, invalid = false, className, ...props }, ref) => {
    const [selected, setSelected] = useState(value || itemList[0]);
    const isInvalid = invalid && !selected;

    return (
      <>
        <label htmlFor={`${name}-form`} className="input-label flex items-center">
          <span className="grow">
            {label} {props.required && <span className="text-secondary-600">*</span>}
          </span>
        </label>
        <input type="hidden" name={name} id={`${name}-form`} value={selected.id} {...props} />
        <Listbox value={selected} onChange={setSelected}>
          <ListboxButton
            className={`${isInvalid && '!border-red-400'} input-field relative mt-1 flex items-center justify-between px-4 py-1.5 text-left focus:outline-none ${className}`}
          >
            <span className="flex items-center gap-2">
              {selected.image && (
                <SVG
                  src={selected.image}
                  height={24}
                  className="fill-secondary-700 stroke-secondary-700 dark:fill-secondary-200 dark:stroke-secondary-200 size-5"
                />
              )}
              {selected.name}
            </span>

            <ChevronDownIcon className="group pointer-events-none absolute top-2.5 right-2.5 size-4" aria-hidden="true" />
          </ListboxButton>
          <ListboxOptions
            anchor="bottom"
            className="bg-primary-300 dark:bg-primary-700 w-100 rounded-xl border border-white/5 transition duration-100 ease-in focus:outline-none data-leave:data-closed:opacity-0"
          >
            {itemList.map((item) => (
              <ListboxOption
                key={item.id}
                value={item}
                className="group hover:bg-primary-200 dark:hover:bg-primary-600 flex cursor-pointer items-center gap-2 p-1"
              >
                <CheckIcon className="invisible size-5 group-data-selected:visible" />
                {item.image && (
                  <SVG
                    src={item.image}
                    height={24}
                    className="fill-secondary-700 stroke-secondary-700 dark:fill-secondary-200 dark:stroke-secondary-200 size-5"
                  />
                )}
                {item.name}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </>
    );
  },
);

ListboxComponent.displayName = 'Listbox';

export default ListboxComponent;
