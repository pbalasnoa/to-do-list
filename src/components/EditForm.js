import { useContext, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";
import TaskContext from "../context/TaskContext";

import Textarea from "./Textarea";

import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import format from "date-fns/format";

import { putTaskDate, deleteDateTask } from "../api/services/firestoreTask";

registerLocale("es", es);

const EditForm = ({
  id,
  values,
  state,
  handleInputChange,
  TaskIncompleted,
  TaskCompleted,
}) => {
  const { user } = useContext(AuthContext);
  const { dataTask } = useContext(TaskContext);
  const RefTitle = useRef(null);
  const RefDetails = useRef(null);
  const [showDate, setShowDate] = useState(false);
  const [datePickerValue, setDatePickerValue] = useState(new Date());
  const RefDate = useRef(null);
  let formattedDate = format(datePickerValue, "eee., dd 'de' MMMM", {
    locale: es,
  });

  const openDatePicker = (date) => {
    date.stopPropagation();
    setShowDate(true);
    RefDate.current.setOpen(true);
  };

  const handleChangeDate = (e) => {
    setDatePickerValue(e);
    putTaskDate(id, "task", user.id, e);
  };

  const clear = (e) => {
    e.stopPropagation();
    setShowDate(false);
    deleteDateTask(id, "task", user.id);
  };

  const getTask = (id) => dataTask.filter((task) => task.id === id);

  return (
    <>
      <div className="grid-2row">
        <div className="p-1">
          <Textarea
            classes={`w-1 mb-1 font-regular h2 ${
              state.isCompleted && "--text-decoration --gray_text"
            }`}
            disabled={state.isCompleted}
            name="task"
            value={values.task}
            message="Ingresa un título"
            inputRef={RefTitle}
            handleChange={handleInputChange}
          />
          <div className="align-left-box mb-1">
            <span
              className={`material-icons icon pr-1 --cursor-default ${
                state.isCompleted ? "--gray_300" : "--gray_500"
              } `}
            >
              sort
            </span>
            <Textarea
              classes={`w-1  ${
                state.isCompleted ? "--gray_300" : "--gray_text"
              }`}
              disabled={state.isCompleted}
              name="details"
              value={values.details}
              message="Agregar detalles"
              inputRef={RefDetails}
              handleChange={handleInputChange}
            />
          </div>
          <button
            className="align-left-box button--disabled"
            onClick={openDatePicker}
            disabled={state.isCompleted}
          >
            <span
              className={`material-icons icon pr-1 --cursor-default ${
                state.isCompleted ? "--gray_300" : "--gray_500"
              } `}
            >
              event_available
            </span>
            {showDate ? (
              <p
                className={`date-text align-center-box ${
                  state.isCompleted
                    ? "--gray_300 date-text__disable"
                    : "--gray_text"
                } small`}
              >
                {formattedDate}
                <span
                  className={`material-icons icon pl-0_25  ${
                    state.isCompleted ? "--gray_300" : "--gray_500"
                  } `}
                  onClick={clear}
                >
                  clear
                </span>
              </p>
            ) : state.isCompleted ? (
              <p
                className={`${
                  state.isCompleted ? "--gray_300" : "--gray_text"
                }`}
              >
                Agregar fecha
              </p>
            ) : getTask(id)[0].hasOwnProperty("date") ? (
              <div
                className={`date-text align-center-box ${getTask(
                  id
                )[0].hasOwnProperty("date")} && "--hide" `}
              >
                <p
                  className={`${
                    state.isCompleted
                      ? "--gray_300 date-text__disable"
                      : "--gray_text"
                  } small`}
                >
                  {format(
                    getTask(id)[0].date.seconds * 1000,
                    "eee., dd 'de' MMMM",
                    {
                      locale: es,
                    }
                  )}
                </p>
                <span
                  className={`material-icons icon pl-0_25 ${
                    state.isCompleted ? "--gray_300" : "--gray_500"
                  } `}
                  onClick={clear}
                >
                  clear
                </span>
              </div>
            ) : (
              <p className="--gray_300">Agregar fecha</p>
            )}
          </button>
        </div>
        <hr />

        <div className="align-right-box">
          {state.isCompleted ? (
            <button
              className="button button--only-letter"
              onClick={() => TaskIncompleted(id, "task", values)}
            >
              Marcar como no completada
            </button>
          ) : (
            <button
              className="button button--only-letter"
              onClick={() => TaskCompleted(id, "taskCompleted", values)}
            >
              Marcar como completada
            </button>
          )}
        </div>
      </div>
      <DatePicker
        selected={datePickerValue}
        onChange={handleChangeDate}
        isClearable
        ref={RefDate}
        shouldCloseOnSelect={false}
        locale="es"
        withPortal
      />
    </>
  );
};

export default EditForm;
