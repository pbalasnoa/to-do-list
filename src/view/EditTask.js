import { useContext } from "react";

import TopAppBar from "../components/TopAppBar";
import EditForm from "../components/EditForm";

import { putTask, deleteTask } from "../services/firestoreTask";
import { useHistory } from "react-router-dom";
import { useForm } from "../hooks/useForm";

import AuthContext from "../context/AuthContext";

const EditTask = (props) => {
  const history = useHistory();
  const { data, state } = props.location;
  const { user } = useContext(AuthContext);
  const { values, handleInputChange } = useForm(data);

  const handledeleteTask = async (id, collection) => {
    deleteTask(id, collection, user.id);
    history.push("/");
  };

  return (
    <div className="container">
      <TopAppBar
        id={data.id}
        state={state}
        handleDelete={handledeleteTask}
        handlePutTask={() => putTask(data.id, "task", values, user.id)}
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
