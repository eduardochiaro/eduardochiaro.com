import React from 'react';

export default function input({ children, name='' , label = '', onChange = () => {}, required = false, value = '', ref = null}) {
  return (
    <>
      <label htmlFor={`${name}-form`} className="input-label">
        {label} {required && <span className="text-secondary-700">*</span>}
      </label>
      <select
        ref={ref}
        name={name}
        id={`${name}-form`}
        className="mt-1 input-field py-1.5 px-2 focus:outline-none" 
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
}