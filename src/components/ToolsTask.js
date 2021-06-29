import { useState } from "react";
import DropdownMenu from "./DropdownMenu";

const ToolsTask = ({ deleteTask, taskCompleted, openModal }) => {
  const [open, setOpen] = useState(false);

  const deleteAllTaskCompleted = (taskCompleted) => {
    taskCompleted.map((task) => deleteTask(task.id, "taskCompleted"));
    setOpen(false);
  };
  return (
    <div className="container-task">
      <div
        className="task-container --pointer --border-round"
        onClick={openModal}
      >
        <span className="material-icons icon --blue">add_task</span>
        <p className="task-title --blue">Añadir una tarea</p>
      </div>
      <div>
        <span
          className="material-icons icon --gray-dark --pointer"
          onClick={() => setOpen(!open)}
        >
          more_vert
        </span>
        {open && (
          <DropdownMenu
            open={open}
            optionOne="Eliminar todas las tareas completadas"
            taskCompleted={taskCompleted}
            deleteAllTaskCompleted={deleteAllTaskCompleted}
          />
        )}
      </div>
    </div>
  );
};

export default ToolsTask;
