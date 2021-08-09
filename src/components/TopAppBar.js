import { Link } from "react-router-dom";

const TopAppBar = ({ id, state, handleDelete, handlePutTask }) => {
  return (
    <div className="align-spaceBetween-box p-1">
      {state.isCompleted ? (
        <span>
          <Link to="/" className="material-icons icon --gray_500">
            arrow_back
          </Link>
        </span>
      ) : (
        <span onClick={() => handlePutTask(id)}>
          <Link to="/" className="material-icons icon --gray_500">
            arrow_back
          </Link>
        </span>
      )}

      <span
        className="material-icons icon --gray_500"
        onClick={() => {
          state.isCompleted
            ? handleDelete(id, "taskCompleted")
            : handleDelete(id, "task");
        }}
      >
        delete
      </span>
    </div>
  );
};

export default TopAppBar;
