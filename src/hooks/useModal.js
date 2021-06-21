import { useState } from "react";

const useModal = ({ initialValue }) => {
  const [isOpen, setIsOpen] = useState(initialValue);

  const show = () => setIsOpen(true);
  const hide = () => setIsOpen(false);

  return [isOpen, setIsOpen, show, hide];
};

export default useModal;
