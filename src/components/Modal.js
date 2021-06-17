import ReactDOM from "react-dom";
import { useRef, useEffect } from "react";
import "../styles/components/Modal.css";

const Modal = (props) => {
  const { isOpen, closeModal, values, handleInputChange, handleSaveTask } =
    props;
  const handleClickModal = (e) => e.stopPropagation();
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  return ReactDOM.createPortal(
    <section className={`modal ${isOpen && "is--open"}`} onClick={closeModal}>
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
          />
        </div>
        <div className="modal-options-container">
          <div>
            <span className="material-icons icon">sort</span>
            <span className="material-icons icon">event_available</span>
          </div>
          <div>
            <button
              // className={`button ${
              //   changeInput ? "button--active" : "button--disable"
              // } `}
              className="button button--active"
              onClick={handleSaveTask}
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
