import "../styles/components/Task.css";

const Task = ({ dataTask }) => {
  return (
    <div className="task-container">
      <div>
        <span className="material-icons icon --gray">
          radio_button_unchecked
        </span>
      </div>
      <div className="task-content">
        <p className="task-title">{dataTask.task}</p>
        <p className="task-subtitle">{dataTask.details}</p>
      </div>
    </div>
  );
};

export default Task;
