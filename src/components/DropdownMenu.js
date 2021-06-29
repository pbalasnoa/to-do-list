import "../styles/components/DropdownMenu.css";

const DropdownMenu = (props) => {
  const { open, optionOne, taskCompleted, deleteAllTaskCompleted } = props;
  function DropdownItem({ children }) {
    return (
      <div
        className="menu-item --pointer"
        onClick={() => deleteAllTaskCompleted(taskCompleted)}
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
