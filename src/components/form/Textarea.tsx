import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { forwardRef, DetailedHTMLProps, InputHTMLAttributes } from 'react';

export type FormInputProps = {
  id?: string;
  name: string;
  label: string;
  value?: string;
  className?: string;
  invalid?: boolean;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

export type Ref = HTMLTextAreaElement;

const Textarea = forwardRef<Ref, FormInputProps>(({ id = '', name = '', label = '', value = '', maxLength = 191, invalid = false, ...props }, ref) => {
  const isInvalid = invalid && value.length <= 0 && value.length > maxLength;
  return (
    <>
      <label htmlFor={id ? id : `${name}-form`} className="input-label flex items-center">
        <span className="grow">
          {label} {props.required && <span className="text-secondary-600">*</span>}
        </span>
        {isInvalid && <ExclamationTriangleIcon className="h-4 w-4 text-red-400" />}
      </label>
      <textarea
        ref={ref}
        name={name}
        maxLength={maxLength}
        id={id ? id : `${name}-form`}
        className={`${isInvalid ? 'ring-2 ring-red-500' : ''} mt-1 input-field py-1.5 px-2 focus:outline-none`}
        value={value}
        {...props}
      />
    </>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
