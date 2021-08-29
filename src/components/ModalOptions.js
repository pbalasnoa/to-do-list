import ReactDOM from "react-dom";
import { useContext } from "react";

import TaskContext from "../context/TaskContext";
import AuthContext from "../context/AuthContext";

import useWindowDimensions from "../hooks/useWindowDimensions";

const ModalOptions = (props) => {
  const { isOpenModal, closeModal, deleteTask } = props;
  const { dataTaskCompleted } = useContext(TaskContext);
  const { user } = useContext(AuthContext);
  const { width: breakpointWidth } = useWindowDimensions();
  const handleClickModal = (e) => e.stopPropagation();

  const deleteAllTaskCompleted = (taskCompleted) => {
    taskCompleted.map((task) => deleteTask(task.id, user.id));
    closeModal();
  };

  return ReactDOM.createPortal(
    <section
      className={`modal ${isOpenModal && "is--open"}`}
      onClick={closeModal}
    >
      <div
        className={`modal-content ${
          breakpointWidth < 600 && "modal-task__new-task"
        }`}
        onClick={handleClickModal}
      >
        <button
          className="button button--only-letter"
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
