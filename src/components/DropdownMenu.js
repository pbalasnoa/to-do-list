import { useContext } from "react";

import TaskContext from "../context/TaskContext";

const DropdownMenu = (props) => {
  const { open, setOpen, optionOne, classes, deleteAllTaskCompleted } = props;
  console.log(props);
  const { dataTaskCompleted } = useContext(TaskContext);

  function DropdownItem({ children }) {
    return (
      <div
        className="menu-item --pointer"
        onClick={() => deleteAllTaskCompleted(dataTaskCompleted)}
      >
        <p className="text--400 --margin-left">{children}</p>
      </div>
    );
  }

  return (
    <div
      className={``}
      onClick={() => {
        setOpen(false);
      }}
    >
      <div className={`dropdown ${classes}`}>
        <DropdownItem deleteAllTaskCompleted={deleteAllTaskCompleted}>
          {optionOne}
        </DropdownItem>
      </div>
    </div>
  );
};

export default DropdownMenu;
