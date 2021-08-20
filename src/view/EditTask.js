import { useContext } from "react";

import TopAppBar from "../components/TopAppBar";
import EditForm from "../components/EditForm";

import {
  putTask,
  deleteTask,
  putTaskState,
} from "../api/services/firestoreTask";
import { useHistory } from "react-router-dom";
import { useForm } from "../hooks/useForm";

import AuthContext from "../context/AuthContext";
import TaskContext from "../context/TaskContext";

const EditTask = (props) => {
  const history = useHistory();
  const { data } = props.location;
  const { id, ...restData } = data;
  const { user } = useContext(AuthContext);
  const { dataTask } = useContext(TaskContext);
  const { values, handleInputChange } = useForm(restData);
  console.log("desde props", data);

  const handledeleteTask = async (id) => {
    deleteTask(id, user.id);
    history.push("/");
  };

  const TaskState = (id, isCompleted) => {
    console.log("aquí estoy");
    putTaskState(id, user.id, isCompleted);
    history.push("/");
  };

  const updateTask = (id) => {
    const getTask = dataTask.filter((task) => task.id === id);
    let formatDate;
    if (getTask[0].hasOwnProperty("date")) {
      formatDate = new Date(getTask[0].date.seconds * 1000);
      putTask(data.id, values, user.id, formatDate);
    } else if (values.date && getTask[0].hasOwnProperty("date") === false) {
      putTask(data.id, getTask[0], user.id);
    } else {
      putTask(data.id, values, user.id);
    }
  };

  return (
    <div className="container grid">
      <div>
        <TopAppBar
          id={data.id}
          state={data.isCompleted}
          handleDelete={handledeleteTask}
          handlePutTask={updateTask}
        />
        <h1
          className={`pl-1 normal-text --blue_500 ${
            data.isCompleted && "--gray_500"
          }`}
        >
          My List 1
        </h1>
      </div>

      <EditForm
        id={data.id}
        values={values}
        state={data.isCompleted}
        handleInputChange={handleInputChange}
        TaskState={TaskState}
      />
    </div>
  );
};

export default EditTask;
