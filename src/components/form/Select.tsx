import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { forwardRef, ChangeEvent, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  name?: string;
  label?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => any;
  required?: boolean;
  invalid?: boolean;
}

export type Ref = HTMLSelectElement;

const Select = forwardRef<Ref, Props>(({ children, name = '', label = '', onChange = () => {}, required = false, value = '', invalid = false }, ref) => {
  const isInvalid = invalid && !value;
  return (
    <>
      <label htmlFor={`${name}-form`} className="input-label flex items-center">
        <span className="grow">
          {label} {required && <span className="text-secondary-600">*</span>}
        </span>
        {isInvalid && <ExclamationTriangleIcon className="h-4 w-4 text-red-400" />}
      </label>
      <select
        ref={ref}
        name={name}
        id={`${name}-form`}
        className={`${isInvalid ? 'ring-2 ring-red-500' : ''} mt-1 input-field py-1.5 px-2 focus:outline-none`}
        value={value}
        onChange={onChange}
        required={required}
      >
        {children}
      </select>
    </>
  );
});

Select.displayName = 'Select';

export default Select;