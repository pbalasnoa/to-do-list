import "../styles/components/Opening.css";
import toDoList from "../assets/img/To_do_list.svg";

import { Link } from "react-router-dom";

const Opening = () => {
  return (
    <div className="opening-container">
      <div>
        <img
          src={toDoList}
          width="80%"
          className="img-container"
          alt="Mujer completando tareas de su to do list"
        />
      </div>
      <div>
        <h1 className="header__title title">Hola!!!</h1>
        <p className="text label text--400">
          Toma el control de todo lo que tienes que hacer.
        </p>
        <div className="button-container">
          <Link to="/login" className="button button-regular">
            Iniciar sesión
          </Link>
        </div>
        <div className="button-container">
          <Link to="signUp" className="button button-outline">
            Regístrate ahora
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Opening;
