'use client';

import { TriangleAlertIcon } from 'lucide-react';
import { forwardRef, DetailedHTMLProps, InputHTMLAttributes, useState } from 'react';

export type FormInputProps = {
  id?: string;
  name: string;
  label: string;
  value: string;
  className?: string;
  invalid?: boolean;
  rows?: number;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

export type Ref = HTMLTextAreaElement;

const Textarea = forwardRef<Ref, FormInputProps>(
  ({ id = '', name = '', label = '', value = '', maxLength = 191, invalid = false, rows = 5, ...props }, ref) => {
    const [newValue, setNewValue] = useState(value);
    const isInvalid = invalid && value.length <= 0 && value.length > maxLength;
    return (
      <>
        <label htmlFor={id ? id : `${name}-form`} className="input-label flex items-center">
          <span className="grow">
            {label} {props.required && <span className="text-secondary-600">*</span>}
          </span>
        </label>
        <textarea
          ref={ref}
          name={name}
          maxLength={maxLength}
          id={id ? id : `${name}-form`}
          className={`${isInvalid && '!border-red-400'} input-field mt-1 px-2 py-1.5 focus:outline-none`}
          value={newValue}
          onChange={(e) => {
            setNewValue(e.target.value);
          }}
          rows={rows}
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

Textarea.displayName = 'Textarea';

export default Textarea;
