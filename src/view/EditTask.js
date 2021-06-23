import TopAppBar from "../components/TopAppBar";
import EditForm from "../components/EditForm";

import { putTask, deleteTask } from "../services/firestoreTask";
import { useHistory } from "react-router-dom";
import { useForm } from "../hooks/useForm";

const EditTask = (props) => {
  const history = useHistory();
  const { data } = props.location;
  const { values, handleInputChange } = useForm(data);

  const handledeleteTask = async (id) => {
    deleteTask(id, "task");
    history.push("/");
  };

  return (
    <div className="container">
      <TopAppBar
        id={data.id}
        handleDelete={handledeleteTask}
        handlePutTask={() => putTask(data.id, "task", values)}
      />
      <EditForm values={values} handleInputChange={handleInputChange} />
    </div>
  );
};

export default EditTask;
