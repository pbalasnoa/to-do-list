import ReactDOM from "react-dom";
import { useEffect } from "react";
import "../styles/components/Modal.css";

import useModal from "../hooks/useModal";
import { useFocusListen, useFocusClick } from "../hooks/useFocus";

const MIN_TEXTAREA_HEIGHT = 24;

const Modal = (props) => {
  const { isOpenModal, closeModal, values, handleInputChange, handleSaveTask } =
    props;
  const [showInputDetails, setIsOpenModal, showDetails, closeDetails] =
    useModal(false);
  const [textareaRef, setTextareaFocus] = useFocusClick();
  const inputRef = useFocusListen(isOpenModal);
  const handleClickModal = (e) => e.stopPropagation();

  const handleCloseModal = () => {
    closeModal();
    closeDetails();
  };

  const handleShowDetails = () => {
    showDetails();
    setTextareaFocus();
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${MIN_TEXTAREA_HEIGHT}px`;
      textareaRef.current.style.height = `${Math.max(
        textareaRef.current.scrollHeight,
        MIN_TEXTAREA_HEIGHT
      )}px`;
    }
  }, [values.details]);

  return ReactDOM.createPortal(
    <section
      className={`modal ${isOpenModal && "is--open"}`}
      onClick={handleCloseModal}
    >
      <div className="modal-container" onClick={handleClickModal}>
        <div>
          <input
            type="text"
            className="modal-input"
            name="task"
            value={values.task}
            placeholder="Nueva tarea"
            ref={inputRef}
            onChange={handleInputChange}
            autoComplete="off"
          />
          {showInputDetails && (
            <textarea
              type="text"
              className="modal-input --small"
              name="details"
              value={values.details}
              placeholder="Agregar detalles"
              ref={textareaRef}
              onChange={handleInputChange}
              autoComplete="off"
            />
          )}
        </div>
        <div className="modal-options-container">
          <div>
            <span
              className="material-icons icon"
              onClick={handleShowDetails}
              onTouchStart={handleShowDetails}
            >
              sort
            </span>
            <span className="material-icons icon">event_available</span>
          </div>
          <div>
            <button
              className={`button ${
                values.task.length ? "button--active" : "button--disable"
              } `}
              onClick={handleSaveTask}
              disabled={!values.task.length}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </section>,
    document.getElementById("modal")
  );
};

export default Modal;
