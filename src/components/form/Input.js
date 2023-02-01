import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { forwardRef } from 'react';

const Input = forwardRef(({ type = 'text', name = '', label = '', value = '', onChange = () => {}, maxLength = 191, required = false, invalid }, ref) => {
  const isInvalid = type == 'file' ? invalid && ref.current.value == '' : invalid && value.length <= 0;
  return (
    <>
      <label htmlFor={`${name}-form`} className="input-label flex items-center">
        <span className="grow">
          {label} {required && <span className="text-secondary-600">*</span>}
        </span>
        {isInvalid && <ExclamationTriangleIcon className="h-4 w-4 text-red-400" />}
      </label>
      {type == 'file' ? (
        <input
          ref={ref}
          type={type}
          name={name}
          id={`${name}-form`}
          className={`${isInvalid ? 'ring-2 ring-red-500' : ''} mt-1 input-field py-1.5 px-2 focus:outline-none`}
          onChange={onChange}
          required={required}
        />
      ) : (
        <input
          ref={ref}
          type={type}
          name={name}
          id={`${name}-form`}
          autoComplete="off"
          data-lpignore="true"
          data-form-type="other"
          className={`${isInvalid ? 'ring-2 ring-red-500' : ''} mt-1 input-field py-1.5 px-2 focus:outline-none`}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          required={required}
        />
      )}
    </>
  );
});

Input.displayName = 'Input';

export default Input;
