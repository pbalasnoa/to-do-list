import "../styles/components/Task.css";

const Task = ({ dataTask }) => {
  return (
    <>
      <div className="task-content">
        <p className="task-title">{dataTask.task}</p>
        {dataTask.details && (
          <p className="task-subtitle">{dataTask.details}</p>
        )}
      </div>
    </>
  );
};

export default Task;
