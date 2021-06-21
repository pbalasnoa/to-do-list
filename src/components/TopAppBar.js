import "../styles/components/TopAppBar.css";
import { Link } from "react-router-dom";

const TopAppBar = ({ id, handleDelete, handlePutTask }) => {
  return (
    <>
      <div className="top-bar">
        <span className="material-icons --gray" onClick={handlePutTask}>
          <Link to="/">arrow_back</Link>
        </span>
        <span
          className="material-icons --gray --pointer"
          onClick={() => handleDelete(id)}
        >
          delete
        </span>
      </div>
    </>
  );
};

export default TopAppBar;
