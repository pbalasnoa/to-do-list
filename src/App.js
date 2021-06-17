import Header from "./components/Header";
import Modal from "./components/Modal";
import BottomAppBar from "./components/BottomAppBar";

import useModal from "./hooks/useModal";
import { useForm } from "./hooks/useForm";
import { db } from "./services/firebase";

const initialValues = {
  task: "",
};

function App() {
  const { values, setValues, handleInputChange } = useForm(initialValues);
  const [isOpenModal, setIsOpenModal, openModal, closeModal] = useModal(false);

  const handleSaveTask = async (e) => {
    e.preventDefault();
    console.log("desde app", values);
    await db.collection("task").doc().set(values);
    setValues(initialValues);
    setIsOpenModal(false);
  };

  return (
    <div className="container">
      <Header />

      <Modal
        isOpen={isOpenModal}
        closeModal={closeModal}
        values={values}
        handleInputChange={handleInputChange}
        handleSaveTask={handleSaveTask}
      />
      <BottomAppBar openModal={openModal} />
    </div>
  );
}

export default App;
