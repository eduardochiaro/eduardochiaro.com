import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { forwardRef, ReactNode, DetailedHTMLProps, InputHTMLAttributes } from 'react';

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
  const isInvalid = invalid && !value;
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
        className={`${isInvalid && '!border-red-400'} input-field mt-1 px-2 py-1.5 focus:outline-none ${className}`}
        value={value}
        {...props}
      >
        {children}
      </select>
      {isInvalid && (
        <p className="mt-1 flex items-center gap-1 text-xs text-red-400">
          <ExclamationTriangleIcon className="h-4" /> this field is required
        </p>
      )}
    </>
  );
});

Select.displayName = 'Select';

export default Select;
