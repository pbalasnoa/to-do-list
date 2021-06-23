import "../styles/components/TopAppBar.css";
import { Link } from "react-router-dom";

const TopAppBar = ({ id, state, handleDelete, handlePutTask }) => {
  return (
    <>
      <div className="top-bar">
        {state.isCompleted ? (
          <span className="material-icons --gray">
            <Link to="/">arrow_back</Link>
          </span>
        ) : (
          <span className="material-icons --gray" onClick={handlePutTask}>
            <Link to="/">arrow_back</Link>
          </span>
        )}

        <span
          className="material-icons --gray --pointer"
          onClick={() => {
            state.isCompleted
              ? handleDelete(id, "taskCompleted")
              : handleDelete(id, "task");
          }}
        >
          delete
        </span>
      </div>
    </>
  );
};

export default TopAppBar;
