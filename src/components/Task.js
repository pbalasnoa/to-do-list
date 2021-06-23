import "../styles/components/Task.css";

import { Link } from "react-router-dom";

const Task = ({ tasks, hanldeTaskCompleted, isCompleted }) => {
  console.log(isCompleted);
  return (
    <>
      {tasks.map((task) => (
        <div key={task.id} className="task-container">
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
          <Link to={{ pathname: `/edit/${task.id}`, data: task }}>
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
