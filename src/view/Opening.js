import toDoList from "../assets/img/To_do_list.svg";

import { Link } from "react-router-dom";

const Opening = () => {
  return (
    <div className="container">
      <div className="item">
        <aside className="mt-2_5 mb-1">
          <img
            src={toDoList}
            className="sm-w-08"
            alt="Mujer completando tareas de su to do list"
          />
        </aside>
        <article className="mt-1_25">
          <h1>AppTask</h1>
          <p className="py-1 --center-text">
            Toma el control de todo lo que tienes que hacer.
          </p>
          <div className="row-box mt-1_25 sm-block-box">
            <Link to="/login" className="mb-1">
              <p className="button button--contained button--full sm-w-0">
                Iniciar sesión
              </p>
            </Link>
            <Link to="signUp" className="mb-1">
              <p className="button button--regular button--full sm-w-0">
                Registrarse ahora
              </p>
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Opening;
