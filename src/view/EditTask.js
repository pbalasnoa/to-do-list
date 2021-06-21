import TopAppBar from "../components/TopAppBar";
import EditForm from "../components/EditForm";

import { db } from "../services/firebase";
import { useHistory } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import usePutTask from "../hooks/usePutTask";

const EditTask = (props) => {
  const history = useHistory();
  const { data } = props.location;
  const { values, handleInputChange } = useForm(data);
  const { handlePutTask } = usePutTask();

  const deleteTask = async (id) => {
    await db.collection("task").doc(id).delete();
    history.push("/");
  };

  const putTask = () => {
    handlePutTask(data.id, "task", values);
  };

  return (
    <div className="container">
      <TopAppBar
        id={data.id}
        handleDelete={deleteTask}
        handlePutTask={putTask}
      />
      <EditForm values={values} handleInputChange={handleInputChange} />
    </div>
  );
};

export default EditTask;
