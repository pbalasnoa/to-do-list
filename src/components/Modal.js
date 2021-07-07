import ReactDOM from "react-dom";
import "../styles/components/Modal.css";

import Textarea from "./Textarea";
import useModal from "../hooks/useModal";
import { useFocusListen } from "../hooks/useFocus";
import useWindowDimensions from "../hooks/useWindowDimensions";

const Modal = (props) => {
  const { isOpenModal, closeModal, values, handleInputChange, handleSaveTask } =
    props;
  const [showInputDetails, , showDetails, closeDetails] = useModal(false);
  const textareaRef = useFocusListen(showInputDetails);
  const inputRef = useFocusListen(isOpenModal);
  const { width } = useWindowDimensions();
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
      <div
        className={`modal-content modal-task__new-task ${
          width > 600 && "center"
        }`}
        onClick={handleClickModal}
      >
        <div>
          <Textarea
            classes="input"
            name="task"
            value={values.task}
            message="Nueva tarea"
            inputRef={inputRef}
            handleChange={handleInputChange}
          />
          {showInputDetails && (
            <Textarea
              type="text"
              classes="input label"
              name="details"
              value={values.details}
              message="Agregar detalles"
              inputRef={textareaRef}
              handleChange={handleInputChange}
              autoComplete="off"
            />
          )}
        </div>
        <div className="modal-task__options">
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
                values.task.length || values.details.length
                  ? "button--active"
                  : "button--disable"
              } `}
              disabled={!values.task.length}
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
