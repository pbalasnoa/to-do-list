import { Link, useHistory } from "react-router-dom";

import Input from "../components/Input";

import { useForm } from "../hooks/useForm";
import useWindowDimensions from "../hooks/useWindowDimensions";

import { login } from "../services/auth";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const history = useHistory();
  const { width: breakpointWidth } = useWindowDimensions();
  const { values, setValues, handleInputChange } = useForm(initialValues);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("boton de login", values.email, values.password);
    login(values.email, values.password);
    setValues(initialValues);
    history.push("/");
  };

  return (
    <div className="container">
      <div className="item sm-align-center-box">
        {breakpointWidth < 600 && (
          <span className="align-left-column-box">
            <Link to="/opening" className="material-icons icon">
              arrow_back
            </Link>
          </span>
        )}
        <section className="item">
          <div className="align-left-column-box">
            <h1 className="my-1">Bienvenido!</h1>
            <p>Inicia sesión para continuar</p>
          </div>
          <form onSubmit={handleLogin} className="align-left-column-box">
            <div className="w-1  mt-1_25">
              <Input
                type="text"
                classes="input--border-bottom"
                name="email"
                value={values.email}
                message="Correo electrónico"
                handleChange={handleInputChange}
              />
            </div>
            <div className="w-1  mt-1_25">
              <Input
                type="password"
                classes="input--border-bottom"
                name="password"
                value={values.password}
                message="Contraseña"
                handleChange={handleInputChange}
              />
            </div>

            <button className="button button--contained mt-2" type="submit">
              Inciar sesión
            </button>

            <p className="w-1 mt-2 --center-text">
              ¿No tienes una cuenta?
              <Link to="/signUp" className="font-regular --blue_500 pl-0_25">
                Registrarse ya
              </Link>
            </p>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;
