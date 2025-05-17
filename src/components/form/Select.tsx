'use client';

import { TriangleAlertIcon } from 'lucide-react';
import { forwardRef, ReactNode, DetailedHTMLProps, InputHTMLAttributes, useState } from 'react';

type FormInputProps = {
  children?: ReactNode;
  id?: string;
  name: string;
  label: string;
  value: string;
  className?: string;
  invalid?: boolean;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;

export type Ref = HTMLSelectElement;

const Select = forwardRef<Ref, FormInputProps>(({ children, name = '', label = '', value = '', invalid = false, className, ...props }, ref) => {
  const [newValue, setNewValue] = useState(value);
  const isInvalid = invalid && !newValue;
  return (
    <>
      <label htmlFor={`${name}-form`} className="input-label flex items-center">
        <span className="grow">
          {label} {props.required && <span className="text-secondary-600">*</span>}
        </span>
      </label>
      <select
        ref={ref}
        name={name}
        id={`${name}-form`}
        className={`${isInvalid && '!border-red-400'} input-field mt-1 appearance-none px-4 py-1.5 focus:outline-none ${className}`}
        value={newValue}
        onChange={(e) => {
          setNewValue(e.target.value);
        }}
        {...props}
      >
        {children}
      </select>
      {isInvalid && (
        <p className="mt-1 flex items-center gap-1 text-xs text-red-400">
          <TriangleAlertIcon className="size-3" /> this field is required
        </p>
      )}
    </>
  );
});

Select.displayName = 'Select';

export default Select;
