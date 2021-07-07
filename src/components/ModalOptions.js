import ReactDOM from "react-dom";
import { useContext } from "react";

import "../styles/components/Modal.css";

import TaskContext from "../context/TaskContext";
import AuthContext from "../context/AuthContext";

const ModalOptions = (props) => {
  const { isOpenModal, closeModal, deleteTask } = props;
  const { dataTaskCompleted } = useContext(TaskContext);
  const { user } = useContext(AuthContext);
  const handleClickModal = (e) => e.stopPropagation();

  const deleteAllTaskCompleted = (taskCompleted) => {
    taskCompleted.map((task) => deleteTask(task.id, "taskCompleted", user.id));
    closeModal();
  };

  return ReactDOM.createPortal(
    <section
      className={`modal ${isOpenModal && "is--open"}`}
      onClick={closeModal}
    >
      <div className="modal-content modal__options" onClick={handleClickModal}>
        <button
          className="button label --pointer"
          onClick={() => deleteAllTaskCompleted(dataTaskCompleted)}
        >
          Borrar todas las tareas completadas
        </button>
      </div>
    </section>,
    document.getElementById("modal")
  );
};

export default ModalOptions;
