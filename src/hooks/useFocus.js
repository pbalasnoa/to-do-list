import { useRef, useEffect } from "react";

export const useFocusClick = () => {
  const htmlRef = useRef(null);
  const setFocus = () => htmlRef.current && htmlRef.current.focus();

  return [htmlRef, setFocus];
};

export const useFocusListen = (listen) => {
  const htmlRef = useRef(null);
  useEffect(() => {
    if (htmlRef.current) htmlRef.current.focus();
  }, [listen]);
  return htmlRef;
};
