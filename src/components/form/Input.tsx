'use client';

import { TriangleAlertIcon } from 'lucide-react';
import moment from 'moment';
import { forwardRef, DetailedHTMLProps, InputHTMLAttributes, useState } from 'react';

export type FormInputProps = {
  id?: string;
  name: string;
  label: string;
  value: string;
  type?: string;
  className?: string;
  invalid?: boolean;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export type Ref = HTMLInputElement;

const Input = forwardRef<Ref, FormInputProps>(
  ({ id, type = 'text', name = '', label = '', value = '', placeholder = '', invalid = false, className, ...props }, ref) => {
    const [newValue, setNewValue] = useState(value);
    const isInvalid =
      type == 'file' ? invalid && ref != null && typeof ref !== 'function' && ref.current && ref.current.value == '' : invalid && newValue.length <= 0;

    value = type == 'date' && value && value != '' ? moment(value).format('YYYY-MM-DD') : value;
    return (
      <>
        <label htmlFor={id ? id : `${name}-form`} className="input-label flex items-center">
          <span className="grow">
            {label} {props.required && <span className="text-secondary-600">*</span>}
          </span>
        </label>

        <input
          ref={ref}
          type={type}
          name={name}
          placeholder={placeholder || type == 'url' ? 'https://' : ''}
          id={id ? id : `${name}-form`}
          autoComplete="off"
          data-lpignore="true"
          data-form-type="other"
          className={`${isInvalid && '!border-red-400'} input-field mt-1 px-2 py-1.5 focus:outline-none ${className}`}
          value={newValue}
          onChange={(e) => {
            setNewValue(e.target.value);
          }}
          {...props}
        />
        {isInvalid && (
          <p className="mt-1 flex items-center gap-1 text-xs text-red-400">
            <TriangleAlertIcon className="size-3" /> this field is required
          </p>
        )}
      </>
    );
  },
);

Input.displayName = 'Input';

export default Input;
