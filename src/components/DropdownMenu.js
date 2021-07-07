import { useContext } from "react";
import "../styles/components/DropdownMenu.css";

import TaskContext from "../context/TaskContext";

const DropdownMenu = (props) => {
  const { optionOne, deleteAllTaskCompleted } = props;
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
    <div className="dropdown">
      <DropdownItem deleteAllTaskCompleted={deleteAllTaskCompleted}>
        {optionOne}
      </DropdownItem>
    </div>
  );
};

export default DropdownMenu;
