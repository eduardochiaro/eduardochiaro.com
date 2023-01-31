import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { forwardRef } from 'react';

const Textarea = forwardRef(({ name = '', label = '', value = '', onChange = () => {}, maxLength = 191, required = false, rows = 5, invalid = false }, ref) => {
  const isInvalid = invalid && value.length <= 0 && value.length > maxLength;
  return (
    <>
      <label htmlFor={`${name}-form`} className="input-label flex items-center">
        <span className="grow">
          {label} {required && <span className="text-secondary-700">*</span>}
        </span>
        {isInvalid && <ExclamationTriangleIcon className="h-4 w-4 text-red-400" />}
      </label>
      <textarea
        ref={ref}
        name={name}
        id={`${name}-form`}
        className={`${isInvalid ? 'ring-2 ring-red-500' : ''} mt-1 input-field py-1.5 px-2 focus:outline-none`}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        required={required}
        rows={rows}
      />
    </>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
