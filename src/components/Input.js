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
    <input
      type={type}
      className={classes}
      disabled={disabled}
      name={name}
      value={value}
      placeholder={message}
      ref={inputRef}
      onChange={handleChange}
      autoComplete="off"
    />
  );
};

export default Input;
