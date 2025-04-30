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
  min?: number;
  max?: number;
  step?: number;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export type Ref = HTMLInputElement;

const Range = forwardRef<Ref, FormInputProps>(
  ({ id = '', name = '', label = '', value = '', min = 0, max = 100, step = 1, invalid = false, className = '', ...props }, ref) => {
    const [newValue, setNewValue] = useState(value);
    const isInvalid = invalid && newValue.length <= 0;
    const rows = [];
    for (let i = min; i <= max; i += 10) {
      rows.push(
        <li className="relative flex justify-center" key={i}>
          <span className="absolute">{i}</span>
        </li>,
      );
    }
    return (
      <>
        <label htmlFor={id ? id : `${name}-form`} className="input-label flex items-center">
          <span className="flex grow items-center justify-between">
            <span>
              {label} {props.required && <span className="text-secondary-600">*</span>}
            </span>
            <span className="text-xs">(current: {newValue}%)</span>
          </span>
        </label>
        <input
          ref={ref}
          type="range"
          name={name}
          min={min}
          max={max}
          step={step}
          value={newValue}
          id={id ? id : `${name}-form`}
          className={`${isInvalid && '!border-red-400'} range-field mt-1 ${className}`}
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
        <ul className="flex w-full justify-between px-2 text-xs">{rows}</ul>
      </>
    );
  },
);

Range.displayName = 'Range';

export default Range;
