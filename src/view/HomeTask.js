import { useContext } from "react";
import Header from "../components/Header";
import ToolsTask from "../components/ToolsTask";
import Task from "../components/Task";
import Modal from "../components/Modal";
import ModalOptions from "../components/ModalOptions";
import BottomAppBar from "../components/BottomAppBar";

import useModal from "../hooks/useModal";
import { useForm } from "../hooks/useForm";
import useWindowDimensions from "../hooks/useWindowDimensions";

import TaskContext from "../context/TaskContext";
import AuthContext from "../context/AuthContext";

import {
  postTask,
  hanldeTaskCompleted,
  deleteTask,
} from "../services/firestoreTask";

const initialValues = {
  task: "",
  details: "",
};

function HomeTask() {
  const { dataTask, dataTaskCompleted } = useContext(TaskContext);
  const { user } = useContext(AuthContext);
  const { width } = useWindowDimensions();
  const { values, setValues, handleInputChange } = useForm(initialValues);
  const [isOpenModal, setIsOpenModal, openModal, closeModal] = useModal(false);
  const [isOpenModalOptions, , openModalOptions, closeModalOptions] =
    useModal(false);
  const [showTaskIncompleted, setShowTaskIncompleted] = useModal(false);

  const handleSaveTask = async (e) => {
    e.preventDefault();
    await postTask("task", values, user.id);
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

  return (
    <div className="container">
      <Header />
      {width > 599 && (
        <ToolsTask deleteTask={deleteTask} openModal={openModal} />
      )}

      {dataTask && (
        <Task tasks={dataTask} hanldeTaskCompleted={hanldeTaskCompleted} />
      )}

      {dataTaskCompleted.length ? (
        <div className={`${width > 600 && "--bottom-center"}`}>
          <div className="divider"></div>
          <div className="container-task-completed">
            <h4 className="task-completed-title">
              Completadas {`(${dataTaskCompleted.length})`}
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
            tasks={dataTaskCompleted}
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
