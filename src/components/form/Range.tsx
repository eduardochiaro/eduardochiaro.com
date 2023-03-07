import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { forwardRef, ChangeEvent } from 'react';

interface Props {
  name?: string;
  label?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => any;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  invalid?: boolean;
  accept?: string;
}

export type Ref = HTMLInputElement;

const Range = forwardRef<Ref, Props>(
  ({ name = '', label = '', value = '', onChange = () => {}, min = 0, max = 100, step = 1, required = false, invalid = false, accept }, ref) => {
    const isInvalid = invalid && value.length <= 0;
    return (
      <>
        <label htmlFor={`${name}-form`} className="input-label flex items-center">
          <span className="grow">
            {label} {required && <span className="text-secondary-600">*</span>}
          </span>
          {isInvalid && <ExclamationTriangleIcon className="h-4 w-4 text-red-400" />}
        </label>
        <input
          ref={ref}
          type="range"
          name={name}
          min={min}
          max={max}
          step={step}
          value={value}
          id={`${name}-form`}
          className={`${isInvalid ? 'ring-2 ring-red-500' : ''} mt-4 range-field`}
          onChange={onChange}
          required={required}
          accept={accept}
        />
      </>
    );
  },
);

Range.displayName = 'Range';

export default Range;
