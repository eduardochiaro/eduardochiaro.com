import { forwardRef } from "react";

const Textarea = forwardRef(({ name='' , label = '', value = '', onChange = () => {}, maxLength = 191, required = false, rows = 5, invalid = false}, ref) => {
  return (
    <>
      <label htmlFor={`${name}-form`} className="input-label">
        {label} ({value.length}/{maxLength}) {required && <span className="text-secondary-700">*</span>}
      </label>
      <textarea
        ref={ref}
        name={name}
        id={`${name}-form`}
        className={`${invalid && (value.length <= 0 && value.length > maxLength)? 'ring-2 ring-red-500' : ''} mt-1 input-field py-1.5 px-2 focus:outline-none`}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        required={required}
        rows={rows}
        />
    </>
  )
});

export default Textarea;
