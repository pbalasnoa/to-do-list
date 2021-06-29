import "../styles/components/Task.css";

import { Link } from "react-router-dom";

const Task = (props) => {
  const { tasks, hanldeTaskCompleted, isCompleted, showTaskIncompleted } =
    props;

  return (
    <>
      {tasks.map((task) => (
        <div
          key={task.id}
          className={` ${
            showTaskIncompleted ? "--hide" : "task-container --hover"
          }`}
        >
          <div>
            {isCompleted ? (
              <span className="material-icons icon --blue">done</span>
            ) : (
              <span
                className="material-icons icon --gray --pointer"
                onClick={() => hanldeTaskCompleted(task)}
              >
                radio_button_unchecked
              </span>
            )}
          </div>
          <Link
            style={{ width: "100%" }}
            to={{
              pathname: `/edit/${task.id}`,
              data: task,
              state: { isCompleted: isCompleted },
            }}
          >
            <div className="task-content">
              <p
                className={`task-title ${
                  isCompleted && "task-title--text-decoration"
                }`}
              >
                {task.task}
              </p>
              {task.details && <p className="task-subtitle">{task.details}</p>}
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default Task;
