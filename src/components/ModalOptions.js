import ReactDOM from "react-dom";
import "../styles/components/Modal.css";

const ModalOptions = (props) => {
  const { isOpenModal, closeModal, taskCompleted, deleteTask } = props;
  const handleClickModal = (e) => e.stopPropagation();

  const deleteAllTaskCompleted = (taskCompleted) => {
    taskCompleted.map((task) => deleteTask(task.id, "taskCompleted"));
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
          onClick={() => deleteAllTaskCompleted(taskCompleted)}
        >
          Borrar todas las tareas completadas
        </button>
      </div>
    </section>,
    document.getElementById("modal")
  );
};

export default ModalOptions;
