import TopAppBar from "../components/TopAppBar";
import EditForm from "../components/EditForm";

import { putTask, deleteTask } from "../services/firestoreTask";
import { useHistory } from "react-router-dom";
import { useForm } from "../hooks/useForm";

const EditTask = (props) => {
  const history = useHistory();
  const { data, state } = props.location;
  const { values, handleInputChange } = useForm(data);

  const handledeleteTask = async (id, collection) => {
    deleteTask(id, collection);
    history.push("/");
  };

  return (
    <div className="container">
      <TopAppBar
        id={data.id}
        state={state}
        handleDelete={handledeleteTask}
        handlePutTask={() => putTask(data.id, "task", values)}
      />
      <p className={`text--500 ${state.isCompleted ? "--gray" : ""}`}>
        My List 1
      </p>
      <EditForm
        values={values}
        state={state}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default EditTask;
