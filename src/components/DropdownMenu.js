import { useContext } from "react";

import TaskContext from "../context/TaskContext";

const DropdownMenu = (props) => {
  const { open, setOpen, items, classes } = props;
  // console.log("props del menu", props);
  // console.log("desde dropd", items);
  // const { dataTaskCompleted } = useContext(TaskContext);

  return (
    <div
      className={``}
      onClick={() => {
        setOpen(false);
      }}
    >
      <div className={`dropdown ${classes}`}>
        {items.map((item) => (
          <div
            className="menu-item --pointer"
            onClick={() => item[`${item.nameItem}`]()}
            key={item.nameItem}
          >
            <p className="text--400 --margin-left">{item.nameItem}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
