import { useEffect } from "react";

const MIN_TEXTAREA_HEIGHT = 24;

const Textarea = (props) => {
  const { classes, disabled, name, value, message, inputRef, handleChange } =
    props;

  useEffect(() => {
    // if (inputRef === null) return;
    if (inputRef.current) {
      inputRef.current.style.height = `${MIN_TEXTAREA_HEIGHT}px`;
      inputRef.current.style.height = `${Math.max(
        inputRef.current.scrollHeight,
        MIN_TEXTAREA_HEIGHT
      )}px`;
    }
  }, [value]); //eslint-disable-line

  return (
    <textarea
      type="text"
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

export default Textarea;
