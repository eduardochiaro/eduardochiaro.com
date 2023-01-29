export default function input({ name='' , label = '', value = '', onChange = () => {}, maxLength = 191, required = false, rows = 5, ref = null}) {
  return (
    <>
      <label htmlFor={`${name}-form`} className="input-label">
        {label} ({value.length}/{maxLength}) {required && <span className="text-secondary-700">*</span>}
      </label>
      <textarea
        ref={ref}
        name={name}
        id={`${name}-form`}
        className="mt-1 input-field py-1.5 px-2 focus:outline-none" 
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        required={required}
        rows={rows}
        />
    </>
  )
}