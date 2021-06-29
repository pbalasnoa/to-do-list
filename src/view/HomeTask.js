import { useEffect, useState } from "react";
import Header from "../components/Header";
import ToolsTask from "../components/ToolsTask";
import Task from "../components/Task";
import Modal from "../components/Modal";
import ModalOptions from "../components/ModalOptions";
import BottomAppBar from "../components/BottomAppBar";

import useModal from "../hooks/useModal";
import { useForm } from "../hooks/useForm";
import useWindowDimensions from "../hooks/useWindowDimensions";

import {
  watchTask,
  postTask,
  hanldeTaskCompleted,
  deleteTask,
} from "../services/firestoreTask";

const initialValues = {
  task: "",
  details: "",
};

function HomeTask() {
  console.log("dimensiones ", useWindowDimensions());
  const { width } = useWindowDimensions();
  const [dataTask, setDataTask] = useState(null);
  const [taskCompleted, setTaskCompleted] = useState([]);
  const { values, setValues, handleInputChange } = useForm(initialValues);
  const [isOpenModal, setIsOpenModal, openModal, closeModal] = useModal(false);
  const [
    isOpenModalOptions,
    setIsOpenModalOptions,
    openModalOptions,
    closeModalOptions,
  ] = useModal(false);
  const [showTaskIncompleted, setShowTaskIncompleted] = useModal(false);

  const handleSaveTask = (e) => {
    e.preventDefault();
    postTask("task", values);
    setValues(initialValues);
    setIsOpenModal(false);
  };

  const handleCloseModal = () => {
    closeModal();
    setValues(initialValues);
  };

  const handleShowTaskIncompleted = () => {
    setShowTaskIncompleted(!showTaskIncompleted);
  };

  useEffect(() => {
    watchTask((task) => {
      setDataTask(task);
    }, "task");
    watchTask((taskCompleted) => {
      setTaskCompleted(taskCompleted);
    }, "taskCompleted");
  }, []);

  return (
    <div className="container">
      <Header />
      {width > 599 && (
        <ToolsTask
          deleteTask={deleteTask}
          taskCompleted={taskCompleted}
          openModal={openModal}
        />
      )}

      {dataTask && (
        <Task tasks={dataTask} hanldeTaskCompleted={hanldeTaskCompleted} />
      )}

      {taskCompleted.length ? (
        <div className={`${width > 600 && "--bottom-center"}`}>
          <div className="divider"></div>
          <div className="container-task-completed">
            <h4 className="task-completed-title">
              Completadas {`(${taskCompleted.length})`}
            </h4>
            {showTaskIncompleted ? (
              <span
                className={"material-icons --gray --pointer"}
                onClick={handleShowTaskIncompleted}
              >
                expand_more
              </span>
            ) : (
              <span
                className={"material-icons --gray --pointer"}
                onClick={handleShowTaskIncompleted}
              >
                expand_less
              </span>
            )}
          </div>
          <Task
            tasks={taskCompleted}
            isCompleted={true}
            showTaskIncompleted={showTaskIncompleted}
          />
        </div>
      ) : null}
      <Modal
        isOpenModal={isOpenModal}
        closeModal={handleCloseModal}
        values={values}
        handleInputChange={handleInputChange}
        handleSaveTask={handleSaveTask}
      />
      <ModalOptions
        isOpenModal={isOpenModalOptions}
        closeModal={closeModalOptions}
        taskCompleted={taskCompleted}
        deleteTask={deleteTask}
      />
      {width < 600 && (
        <BottomAppBar
          openModal={openModal}
          openModalOptions={openModalOptions}
        />
      )}
    </div>
  );
}

export default HomeTask;
