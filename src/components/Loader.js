import "../styles/Loader.css";
import ReactDOM from "react-dom";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className="wrapper">
      <p className="animated-sub-text">cargando...</p>
      <h2 data-text="[ ] == ![ ] //true" className="animated-text">
        [ ] == ![ ] //true
      </h2>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;
