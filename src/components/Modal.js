import ReactDOM from "react-dom";
import { useRef, useState } from "react";

import Textarea from "./Textarea";
import useModal from "../hooks/useModal";
import { useFocusListen } from "../hooks/useFocus";
import useWindowDimensions from "../hooks/useWindowDimensions";

import DatePicker, { registerLocale } from "react-datepicker";
import format from "date-fns/format";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("es", es);

const Modal = (props) => {
  const { isOpenModal, closeModal, values, handleInputChange, handleSaveTask } =
    props;
  const [showInputDetails, , showDetails, closeDetails] = useModal(false);
  const [datePickerValue, setDatePickerValue] = useState(new Date());
  const [date, setDate] = useState(null);
  const [showDate, setShowDate] = useState(false);
  const RefDate = useRef(null);
  let formattedDate = format(datePickerValue, "eee., dd 'de' MMMM 'de' yyyy", {
    locale: es,
  });
  const textareaRef = useFocusListen(showInputDetails);
  const inputRef = useFocusListen(isOpenModal);
  const { width: breakpointWidth } = useWindowDimensions();

  const handleClickModal = (e) => e.stopPropagation();

  const handleCloseModal = () => {
    closeModal();
    closeDetails();
    setShowDate(false);
    setDate(null);
  };

  const handleSave = (e, date) => {
    e.preventDefault();
    handleSaveTask(date);
    handleCloseModal();
  };

  const handleChangeDate = (e) => {
    setDatePickerValue(e);
    setDate(e);
  };

  const openDatePicker = () => {
    setShowDate(true);
    RefDate.current.setOpen(true);
  };

  const clear = (e) => {
    e.stopPropagation();
    setShowDate(false);
    setDate(null);
  };

  return ReactDOM.createPortal(
    <>
      <DatePicker
        selected={datePickerValue}
        onChange={handleChangeDate}
        isClearable
        ref={RefDate}
        shouldCloseOnSelect={false}
        locale="es"
        withPortal
      />
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
              classes="input w-1 mb-0_5"
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
            {showDate && (
              <p
                className="align-center-box date-text mt-0_5 small"
                onClick={openDatePicker}
              >
                {formattedDate}
                <span
                  className="material-icons icon pl-0_25 --gray_500"
                  onClick={clear}
                >
                  clear
                </span>
              </p>
            )}
          </section>
          <div className="align-spaceBetween-box">
            <div className="align-left-box w-1 py-0_7">
              <span
                className="material-icons icon pr-1 --blue_500"
                onClick={showDetails}
                // onTouchStart={showDetails}
              >
                sort
              </span>

              <span
                className="material-icons icon --blue_500"
                onClick={openDatePicker}
              >
                event_available
              </span>
            </div>
            <button
              className=" button button--only-letter"
              // disabled={!values.task.length}
              onClick={(e) => handleSave(e, date)}
            >
              Guardar
            </button>
          </div>
        </div>
      </section>
    </>,
    document.getElementById("modal")
  );
};

export default Modal;
