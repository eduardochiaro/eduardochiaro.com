export default function input({ type = 'text', name='' , label = '', value = '', onChange = () => {}, maxLength = 191, required = false, ref = null}) {
  return (
    <>
      <label htmlFor={`${name}-form`} className="input-label">
        {label} {required && <span className="text-secondary-700">*</span>}
      </label>
      <input
        ref={ref}
        type={type}
        name={name}
        id={`${name}-form`}
        autoComplete="off"
        data-lpignore="true"
        data-form-type="other"
        className="mt-1 input-field py-1.5 px-2 focus:outline-none" 
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        required={required}
        />
    </>
  )
}