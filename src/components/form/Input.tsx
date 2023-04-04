import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import moment from 'moment';
import { forwardRef, DetailedHTMLProps, InputHTMLAttributes } from 'react';

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
    const isInvalid =
      type == 'file' ? invalid && ref != null && typeof ref !== 'function' && ref.current && ref.current.value == '' : invalid && value.length <= 0;

    value = type == 'date' && value && value != '' ? moment(value).format('YYYY-MM-DD') : value;
    return (
      <>
        <label htmlFor={id ? id : `${name}-form`} className="input-label flex items-center">
          <span className="grow">
            {label} {props.required && <span className="text-secondary-600">*</span>}
          </span>
          {isInvalid && <ExclamationTriangleIcon className="h-4 w-4 text-red-400" />}
        </label>

        <input
          ref={ref}
          type={type}
          name={name}
          placeholder={placeholder}
          id={id ? id : `${name}-form`}
          autoComplete="off"
          data-lpignore="true"
          data-form-type="other"
          className={`${isInvalid ? 'ring-2 ring-red-500' : ''} mt-1 input-field py-1.5 px-2 focus:outline-none ${className}`}
          value={value || ''}
          {...props}
        />
      </>
    );
  },
);

Input.displayName = 'Input';

export default Input;
