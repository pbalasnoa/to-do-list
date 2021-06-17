import { useState } from "react";

const useModal = ({ initialValue }) => {
  const [isOpenModal, setIsOpenModal] = useState(initialValue);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  return [isOpenModal, setIsOpenModal, openModal, closeModal];
};

export default useModal;
