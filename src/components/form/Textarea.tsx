import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { forwardRef, DetailedHTMLProps, InputHTMLAttributes } from 'react';

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
          className={`${isInvalid && '!border-red-400'} mt-1 input-field py-1.5 px-2 focus:outline-none`}
          value={value}
          rows={rows}
          {...props}
        />
        {isInvalid && (
          <p className="text-xs flex items-center gap-1 mt-1 text-red-400">
            <ExclamationTriangleIcon className="h-4" /> this field is required
          </p>
        )}
      </>
    );
  },
);

Textarea.displayName = 'Textarea';

export default Textarea;
