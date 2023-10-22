const Input = ({
  type,
  name,
  label,
  placeholder,
  value,
  onChange,
  autoFocus,
  error,
  additionalInfo,
  disabled,
  className,
}) => {
  return (
    <>
      <label className="lbl" htmlFor={name}>
        {label}
      </label>
      <input
        disabled={disabled}
        type={type || "text"}
        name={name}
        placeholder={placeholder || ""}
        id={name}
        className={`${className} form-control`}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
      {additionalInfo && <small>{additionalInfo}</small>}
    </>
  );
};

export default Input;
