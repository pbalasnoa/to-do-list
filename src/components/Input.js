const Input = (props) => {
  const {
    type,
    classes,
    disabled,
    name,
    value,
    message,
    inputRef,
    handleChange,
  } = props;
  return (
    <div className="input-box">
      <input
        type={type}
        className={classes}
        disabled={disabled}
        name={name}
        value={value}
        ref={inputRef}
        onChange={handleChange}
        autoComplete="off"
        placeholder=" "
      />
      <label className="input--label">{message}</label>
    </div>
  );
};

export default Input;
