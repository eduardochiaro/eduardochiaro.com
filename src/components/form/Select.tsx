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
        {isInvalid && <ExclamationTriangleIcon className="h-4 w-4 text-red-400" />}
      </label>
      <select
        ref={ref}
        name={name}
        id={`${name}-form`}
        className={`${isInvalid ? 'ring-2 ring-red-500' : ''} mt-1 input-field py-1.5 px-2 focus:outline-none ${className}`}
        value={value}
        {...props}
      >
        {children}
      </select>
    </>
  );
});

Select.displayName = 'Select';

export default Select;
