import { useEffect, useState } from "react";
import Header from "../components/Header";
import Task from "../components/Task";
import Modal from "../components/Modal";
import BottomAppBar from "../components/BottomAppBar";

import useModal from "../hooks/useModal";
import { useForm } from "../hooks/useForm";

import { watchTask, postTask, deleteTask } from "../services/firestoreTask";

const initialValues = {
  task: "",
  details: "",
};

function HomeTask() {
  const [dataTask, setDataTask] = useState(null);
  const [taskCompleted, setTaskCompleted] = useState(null);
  const { values, setValues, handleInputChange } = useForm(initialValues);
  const [isOpenModal, setIsOpenModal, openModal, closeModal] = useModal(false);

  const handleSaveTask = (e) => {
    e.preventDefault();
    postTask("task", values);
    setValues(initialValues);
    setIsOpenModal(false);
  };

  const hanldeTaskCompleted = (task) => {
    postTask("taskCompleted", task);
    deleteTask(task.id, "task");
  };

  const handleCloseModal = () => {
    closeModal();
    setValues(initialValues);
  };

  useEffect(() => {
    watchTask((task) => {
      console.log("desde el watch task", task);
      setDataTask(task);
    }, "task");
    watchTask((taskCompleted) => {
      console.log("desde el watch completed", taskCompleted);
      setTaskCompleted(taskCompleted);
    }, "taskCompleted");
  }, []);

  return (
    <div className="container">
      <Header />
      {dataTask && (
        <Task tasks={dataTask} hanldeTaskCompleted={hanldeTaskCompleted} />
      )}

      {taskCompleted && (
        <>
          <div className="divider"></div>
          <div className="container-task-completed">
            <h4 className="title-completed">
              Completadas {`(${taskCompleted.length})`}
            </h4>
            <span className="material-icons icon --gray --pointer">
              expand_more
            </span>
          </div>
          <Task tasks={taskCompleted} isCompleted={true} />
        </>
      )}
      <Modal
        isOpenModal={isOpenModal}
        closeModal={handleCloseModal}
        values={values}
        handleInputChange={handleInputChange}
        handleSaveTask={handleSaveTask}
      />
      <BottomAppBar openModal={openModal} />
    </div>
  );
}

export default HomeTask;
