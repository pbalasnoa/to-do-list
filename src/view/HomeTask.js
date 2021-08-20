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

import { postTask, deleteTask } from "../api/services/firestoreTask";

const initialValues = {
  task: "",
  details: "",
};

function HomeTask() {
  const { dataTask, dataTaskCompleted } = useContext(TaskContext);
  const { user } = useContext(AuthContext);
  const { width: breakpointWidth } = useWindowDimensions();
  const { values, setValues, handleInputChange } = useForm(initialValues);
  const [isOpenModal, setIsOpenModal, openModal, closeModal] = useModal(false);
  const [isOpenModalOptions, , openModalOptions, closeModalOptions] =
    useModal(false);
  const [showTaskIncompleted, setShowTaskIncompleted] = useModal(false);

  const handleSaveTask = async (e, date) => {
    e.preventDefault();
    await postTask(values, user.id, date);
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
    <div className={`container ${breakpointWidth > 600 && "grid"}`}>
      <div>
        <Header />
        {breakpointWidth > 599 && (
          <ToolsTask deleteTask={deleteTask} openModal={openModal} />
        )}
      </div>

      {dataTask && <Task tasks={dataTask} />}

      {dataTaskCompleted.length > 0 && (
        <section className={`${breakpointWidth > 600 ? "" : "mb-4"}`}>
          <hr />
          <div
            className="p-1 align-spaceBetween-box icon"
            onClick={handleShowTaskIncompleted}
          >
            <h4 className="normal-text">
              Completadas {`(${dataTaskCompleted.length})`}
            </h4>
            {showTaskIncompleted ? (
              <span className={"material-icons icon"}>expand_more</span>
            ) : (
              <span className={"material-icons icon"}>expand_less</span>
            )}
          </div>
          <Task
            tasks={dataTaskCompleted}
            showTaskIncompleted={showTaskIncompleted}
          />
        </section>
      )}

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
      {breakpointWidth < 600 && (
        <BottomAppBar
          openModal={openModal}
          openModalOptions={openModalOptions}
        />
      )}
    </div>
  );
}

export default HomeTask;
