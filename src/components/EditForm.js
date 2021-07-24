import { useContext, useRef } from "react";
import {
  hanldeTaskCompleted,
  handleTaskincomplete,
} from "../services/firestoreTask";
import Textarea from "./Textarea";

import { useHistory } from "react-router-dom";
import useWindowDimensions from "../hooks/useWindowDimensions";

import AuthContext from "../context/AuthContext";

const EditForm = ({ values, state, handleInputChange }) => {
  const { user } = useContext(AuthContext);
  const { width } = useWindowDimensions();
  const history = useHistory();
  const RefTitle = useRef(null);
  const RefDetails = useRef(null);

  const TaskCompleted = () => {
    hanldeTaskCompleted(values, user.id);
    history.push("/");
  };

  const TaskIcompleted = () => {
    handleTaskincomplete(values, user.id);
    history.push("/");
  };

  return (
    <div className="grid-2row">
      <div className="p-1">
        <Textarea
          classes={`w-1 mb-1 font-regular h2 ${
            state.isCompleted && "--text-decoration"
          }`}
          disabled={state.isCompleted}
          name="task"
          value={values.task}
          message="Ingresa un tìtulo"
          inputRef={RefTitle}
          handleChange={handleInputChange}
        />
        <div className="align-left-box">
          <span className="material-icons icon --gray_500 pr-1">sort</span>
          <Textarea
            classes="w-1"
            disabled={state.isCompleted}
            name="details"
            value={values.details}
            message="Agregar detalles"
            inputRef={RefDetails}
            handleChange={handleInputChange}
          />
        </div>
      </div>

      <hr />
      <div className="align-right-box">
        {state.isCompleted ? (
          <button
            className="button button--only-letter"
            onClick={TaskIcompleted}
          >
            Marcar como no completada
          </button>
        ) : (
          <button
            className="button button--only-letter"
            onClick={TaskCompleted}
          >
            Marcar como completada
          </button>
        )}
      </div>
    </div>
  );
};

export default EditForm;
