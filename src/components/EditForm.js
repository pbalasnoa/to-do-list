import "../styles/components/EditForm.css";
import { useRef } from "react";
import Textarea from "./Textarea";

const EditForm = ({ values, handleInputChange }) => {
  const Ref = useRef(null);
  return (
    <>
      <p className="label">My List 1</p>
      <Textarea
        classes="modal-input"
        name="task"
        value={values.task}
        message="Ingresa un tìtulo"
        inputRef={Ref}
        handleChange={handleInputChange}
      />

      <div className="input-icon">
        <span className="material-icons icon --gray">sort</span>
        <Textarea
          classes="modal-input --small"
          name="details"
          value={values.details}
          message="Agregar detalles"
          inputRef={Ref}
          handleChange={handleInputChange}
        />
      </div>
      <button
        className="button button--active --bottom"
        // onClick={() => console.log("hola")}
      >
        Marcar como completada
      </button>
    </>
  );
};

export default EditForm;
