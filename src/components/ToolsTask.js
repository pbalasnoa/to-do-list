import { useContext, useState } from "react";
import DropdownMenu from "./DropdownMenu";

import AuthContext from "../context/AuthContext";
import TaskContext from "../context/TaskContext";

const ToolsTask = ({ deleteTask, openModal }) => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { dataTaskCompleted, orderByTask, setOrderByTask } =
    useContext(TaskContext);

  const deleteAllTaskCompleted = (taskCompleted) => {
    taskCompleted.map((task) => deleteTask(task.id, user.id));
    setOpen(false);
  };

  return (
    <div className="relative py-1 align-spaceBetween-box">
      <div
        className="align-left-box w-1 py-0_3 shadow-effect shadow-effect--radius"
        onClick={openModal}
      >
        <span className="material-icons icon px-1 --blue_500">add_task</span>
        <p className="font-regular --blue_500">Añadir una tarea</p>
      </div>

      <div className=" relative align-center-box pr-1">
        <span className="material-icons icon" onClick={() => setOpen(!open)}>
          more_vert
        </span>
      </div>
      {open && (
        <DropdownMenu
          open={open}
          setOpen={setOpen}
          classes="dropdown-toolsTask"
          items={[
            {
              nameItem:
                orderByTask.orderBy === "createdAt"
                  ? "Ordenar por fecha"
                  : "Ordenar por mi orden",
              "Ordenar por fecha": () =>
                setOrderByTask({ isOrder: true, orderBy: "date" }),
              "Ordenar por mi orden": () =>
                setOrderByTask({ isOrder: true, orderBy: "createdAt" }),
              icon: "delete",
            },
            {
              nameItem: "Eliminar todas las tareas completadas",
              "Eliminar todas las tareas completadas": () =>
                deleteAllTaskCompleted(dataTaskCompleted),
              icon: "delete",
            },
          ]}
        />
      )}
    </div>
  );
};

export default ToolsTask;
