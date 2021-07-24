import { Link } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import { useContext } from "react";

const Task = (props) => {
  const { user } = useContext(AuthContext);
  const { tasks, hanldeTaskCompleted, isCompleted, showTaskIncompleted } =
    props;

  return (
    <div className="align-left-column-box">
      {tasks?.map((task) => (
        <article
          key={task.id}
          className={`w-1 align-center-box  p-1 shadow-effect ${
            showTaskIncompleted ? "--hide" : ""
          }`}
        >
          {isCompleted ? (
            <span className="material-icons icon --blue_500 pr-1">done</span>
          ) : (
            <span
              className="material-icons icon --gray_500 pr-1"
              onClick={() => hanldeTaskCompleted(task, user.id)}
            >
              radio_button_unchecked
            </span>
          )}

          <Link
            className="w-1 align-left-column-box"
            to={{
              pathname: `/edit/${task.id}`,
              data: task,
              state: { isCompleted: isCompleted },
            }}
          >
            <p className={` ${isCompleted && "--text-decoration"} `}>
              {task.task}
            </p>
            {task.details && (
              <small className={` ${isCompleted && "--gray_500"} `}>
                {task.details}
              </small>
            )}
          </Link>
        </article>
      ))}
    </div>
  );
};

export default Task;
