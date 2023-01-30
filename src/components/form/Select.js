import React from 'react';
import { forwardRef } from "react";

const Select = forwardRef(({ children, name='' , label = '', onChange = () => {}, required = false, value = '', invalid = false}, ref) => {
  return (
    <>
      <label htmlFor={`${name}-form`} className="input-label">
        {label} {required && <span className="text-secondary-700">*</span>}
      </label>
      <select
        ref={ref}
        name={name}
        id={`${name}-form`}
        className={`${invalid && !value ? 'ring-2 ring-red-500' : ''} mt-1 input-field py-1.5 px-2 focus:outline-none`}
        value={value}
        onChange={onChange}
        required={required}
        >
        {React.Children.map(children, (child) => {
          return React.cloneElement(child);
        })}
      </select>
    </>
  )
});

export default Select;