import ReactDOM from "react-dom";
import "../styles/components/Modal.css";

import useModal from "../hooks/useModal";
import Textarea from "./Textarea";
import { useFocusListen } from "../hooks/useFocus";

const Modal = (props) => {
  const { isOpenModal, closeModal, values, handleInputChange, handleSaveTask } =
    props;
  const [showInputDetails, setIsOpenModal, showDetails, closeDetails] =
    useModal(false);
  const textareaRef = useFocusListen(showInputDetails);
  const inputRef = useFocusListen(isOpenModal);
  const handleClickModal = (e) => e.stopPropagation();

  const handleCloseModal = () => {
    closeModal();
    closeDetails();
  };

  return ReactDOM.createPortal(
    <section
      className={`modal ${isOpenModal && "is--open"}`}
      onClick={handleCloseModal}
    >
      <div className="modal-container" onClick={handleClickModal}>
        <div>
          <Textarea
            classes="modal-input"
            name="task"
            value={values.task}
            message="Nueva tarea"
            inputRef={inputRef}
            handleChange={handleInputChange}
          />
          {showInputDetails && (
            <Textarea
              type="text"
              classes="modal-input --small"
              name="details"
              value={values.details}
              message="Agregar detalles"
              inputRef={textareaRef}
              handleChange={handleInputChange}
              autoComplete="off"
            />
          )}
        </div>
        <div className="modal-options-container">
          <div>
            <span
              className="material-icons icon"
              onClick={showDetails}
              onTouchStart={showDetails}
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
