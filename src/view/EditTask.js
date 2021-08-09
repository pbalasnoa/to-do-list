import { useContext } from "react";

import TopAppBar from "../components/TopAppBar";
import EditForm from "../components/EditForm";

import { putTask, deleteTask, toggleTask } from "../services/firestoreTask";
import { useHistory } from "react-router-dom";
import { useForm } from "../hooks/useForm";

import AuthContext from "../context/AuthContext";
import TaskContext from "../context/TaskContext";

const EditTask = (props) => {
  const history = useHistory();
  const { data, state } = props.location;
  const { id, ...restData } = data;
  const { user } = useContext(AuthContext);
  const { dataTask } = useContext(TaskContext);
  const { values, handleInputChange } = useForm(restData);

  const handledeleteTask = async (id, collection) => {
    deleteTask(id, collection, user.id);
    history.push("/");
  };

  const TaskIncompleted = (id, collection, values) => {
    toggleTask(id, collection, values, user.id);
    history.push("/");
  };

  const TaskCompleted = (id, collection, values) => {
    toggleTask(id, collection, values, user.id);
    history.push("/");
  };

  const updateTask = (id) => {
    const getTask = dataTask.filter((task) => task.id === id);
    let formatDate;
    if (getTask[0].hasOwnProperty("date")) {
      formatDate = new Date(getTask[0].date.seconds * 1000);
      putTask(data.id, "task", values, user.id, formatDate);
    } else if (values.date && getTask[0].hasOwnProperty("date") === false) {
      putTask(data.id, "task", getTask[0], user.id);
    } else {
      putTask(data.id, "task", values, user.id);
    }
  };

  return (
    <div className="container grid">
      <div>
        <TopAppBar
          id={data.id}
          state={state}
          handleDelete={handledeleteTask}
          handlePutTask={updateTask}
        />
        <h1
          className={`pl-1 normal-text --blue_500 ${
            state.isCompleted && "--gray_500"
          }`}
        >
          My List 1
        </h1>
      </div>

      <EditForm
        id={data.id}
        values={values}
        state={state}
        handleInputChange={handleInputChange}
        TaskIncompleted={TaskIncompleted}
        TaskCompleted={TaskCompleted}
      />
    </div>
  );
};

export default EditTask;
