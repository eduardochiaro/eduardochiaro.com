import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { forwardRef, DetailedHTMLProps, InputHTMLAttributes } from 'react';

export type FormInputProps = {
  id?: string;
  name: string;
  label: string;
  value: string;
  className?: string;
  invalid?: boolean;
  min?: number;
  max?: number;
  step?: number;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export type Ref = HTMLInputElement;

const Range = forwardRef<Ref, FormInputProps>(
  ({ id = '', name = '', label = '', value = '', min = 0, max = 100, step = 1, invalid = false, className = '', ...props }, ref) => {
    const isInvalid = invalid && value.length <= 0;
    const rows = [];
    for (let i = min; i <= max; i += 10) {
      rows.push(
        <li className="flex justify-center relative" key={i}>
          <span className="absolute">{i}</span>
        </li>,
      );
    }
    return (
      <>
        <label htmlFor={id ? id : `${name}-form`} className="input-label flex items-center">
          <span className="grow">
            {label} {props.required && <span className="text-secondary-600">*</span>} (current: {value}%)
          </span>
        </label>
        <input
          ref={ref}
          type="range"
          name={name}
          min={min}
          max={max}
          step={step}
          value={value}
          id={id ? id : `${name}-form`}
          className={`${isInvalid && '!border-red-400'} mt-4 range-field ${className}`}
          {...props}
        />
        {isInvalid && (
          <p className="text-xs flex items-center gap-1 mt-1 text-red-400">
            <ExclamationTriangleIcon className="h-4" /> this field is required
          </p>
        )}
        <ul className="flex justify-between text-xs w-full px-2">{rows}</ul>
      </>
    );
  },
);

Range.displayName = 'Range';

export default Range;
