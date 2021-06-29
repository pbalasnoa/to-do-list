import { useRef } from "react";
import {
  hanldeTaskCompleted,
  handleTaskincomplete,
} from "../services/firestoreTask";
import Textarea from "./Textarea";

import { useHistory } from "react-router-dom";
import useWindowDimensions from "../hooks/useWindowDimensions";

const EditForm = ({ values, state, handleInputChange }) => {
  const { width } = useWindowDimensions();
  const history = useHistory();
  const RefTitle = useRef(null);
  const RefDetails = useRef(null);

  const TaskCompleted = () => {
    hanldeTaskCompleted(values);
    history.push("/");
  };

  const TaskIcompleted = () => {
    handleTaskincomplete(values);
    history.push("/");
  };

  return (
    <>
      <Textarea
        classes={`input input-title-edit ${
          state.isCompleted ? "task-title--text-decoration" : ""
        }`}
        disabled={state.isCompleted}
        name="task"
        value={values.task}
        message="Ingresa un tìtulo"
        inputRef={RefTitle}
        handleChange={handleInputChange}
      />

      <div className="input-icon">
        <span className="material-icons icon --gray">sort</span>
        <Textarea
          classes="input input-detail-edit"
          disabled={state.isCompleted}
          name="details"
          value={values.details}
          message="Agregar detalles"
          inputRef={RefDetails}
          handleChange={handleInputChange}
        />
      </div>
      <div className={`${width < 600 ? "--bottom" : "--button-right"}`}>
        {state.isCompleted ? (
          <button
            className="button button--active  --pointer"
            onClick={TaskIcompleted}
          >
            Marcar como no completada
          </button>
        ) : (
          <button
            className="button button--active --pointer"
            onClick={TaskCompleted}
          >
            Marcar como completada
          </button>
        )}
      </div>
    </>
  );
};

export default EditForm;
