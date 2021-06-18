import { useEffect, useState } from "react";
import Header from "./components/Header";
import Task from "./components/Task";
import Modal from "./components/Modal";
import BottomAppBar from "./components/BottomAppBar";

import useModal from "./hooks/useModal";
import { useForm } from "./hooks/useForm";
import { db } from "./services/firebase";

const initialValues = {
  task: "",
  details: "",
};

function App() {
  const [dataTask, setDataTask] = useState(null);
  const { values, setValues, handleInputChange } = useForm(initialValues);
  const [isOpenModal, setIsOpenModal, openModal, closeModal] = useModal(false);

  const handleSaveTask = async (e) => {
    e.preventDefault();
    console.log("desde app", values);
    await db.collection("task").doc().set(values);
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
        <Task key={task.id} dataTask={task} />
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

export default App;
