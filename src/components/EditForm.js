import "../styles/components/EditForm.css";
import { useRef } from "react";
import {
  hanldeTaskCompleted,
  handleTaskincomplete,
} from "../services/firestoreTask";
import Textarea from "./Textarea";

import { useHistory } from "react-router-dom";

const EditForm = ({ values, state, handleInputChange }) => {
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
      <p className={`label ${state.isCompleted ? "--gray" : ""}`}>My List 1</p>
      <Textarea
        classes={`modal-input ${
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
          classes="modal-input --small"
          disabled={state.isCompleted}
          name="details"
          value={values.details}
          message="Agregar detalles"
          inputRef={RefDetails}
          handleChange={handleInputChange}
        />
      </div>
      {state.isCompleted ? (
        <button
          className="button button--active --bottom --pointer"
          onClick={TaskIcompleted}
        >
          Marcar como no completada
        </button>
      ) : (
        <button
          className="button button--active --bottom --pointer"
          onClick={TaskCompleted}
        >
          Marcar como completada
        </button>
      )}
    </>
  );
};

export default EditForm;
