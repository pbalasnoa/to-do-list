import { useEffect, useState } from "react";
import Header from "../components/Header";
import Task from "../components/Task";
import Modal from "../components/Modal";
import BottomAppBar from "../components/BottomAppBar";

import { Link } from "react-router-dom";
import useModal from "../hooks/useModal";
import { useForm } from "../hooks/useForm";
import usePutTask from "../hooks/usePutTask";
import { db } from "../services/firebase";

const initialValues = {
  task: "",
  details: "",
};

function HomeTask() {
  const [dataTask, setDataTask] = useState(null);
  const { values, setValues, handleInputChange } = useForm(initialValues);
  const [isOpenModal, setIsOpenModal, openModal, closeModal] = useModal(false);
  const { handlePutTask } = usePutTask();

  const handleSaveTask = (e) => {
    e.preventDefault();
    handlePutTask(null, "task", values);
    setValues(initialValues);
    setIsOpenModal(false);
  };

  const getTask = () => {
    db.collection("task").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setDataTask(docs);
    });
  };

  const handleCloseModal = () => {
    closeModal();
    setValues(initialValues);
  };

  useEffect(() => {
    getTask();
  }, []);

  return (
    <div className="container">
      <Header />
      {dataTask?.map((task) => (
        <div key={task.id} className="task-container">
          <div>
            <span
              className="material-icons icon --gray --pointer"
              // onClick={() => console.log("hola querida")}
            >
              radio_button_unchecked
            </span>
          </div>
          <div>
            <Link to={{ pathname: `/edit/${task.id}`, data: task }}>
              <Task dataTask={task} />
            </Link>
          </div>
        </div>
      ))}
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
