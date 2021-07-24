import ReactDOM from "react-dom";

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
  const { width: breakpointWidth } = useWindowDimensions();
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
        className={`modal-content ${
          breakpointWidth < 600 && "modal-task__new-task"
        }`}
        onClick={handleClickModal}
      >
        <section>
          <Textarea
            classes="input w-1 mb-1"
            name="task"
            value={values.task}
            message="Nueva tarea"
            inputRef={inputRef}
            handleChange={handleInputChange}
          />
          {showInputDetails && (
            <Textarea
              classes="input w-1 input--text-small"
              name="details"
              value={values.details}
              message="Agregar detalles"
              inputRef={textareaRef}
              handleChange={handleInputChange}
            />
          )}
        </section>
        <div className="align-spaceBetween-box">
          <div className="align-left-box w-1 py-0_7">
            <span
              className="material-icons icon pr-1 --blue_500"
              onClick={showDetails}
              onTouchStart={showDetails}
            >
              sort
            </span>
            <span className="material-icons icon --blue_500">
              event_available
            </span>
          </div>

          <button
            className=" button button--only-letter"
            // disabled={!values.task.length}
            onClick={handleSaveTask}
          >
            Guardar
          </button>
        </div>
      </div>
    </section>,
    document.getElementById("modal")
  );
};

export default Modal;
