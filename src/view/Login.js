import { Link } from "react-router-dom";

import Input from "../components/Input";
import Loader from "../components/Loader";

import { useForm } from "../hooks/useForm";
import useWindowDimensions from "../hooks/useWindowDimensions";

import { login, loginGoogle } from "../api/services/auth";
import { useState } from "react";

const INITIALVALUES = {
  email: "",
  password: "",
};

const ERROR_MESSAGES = {
  "auth/invalid-email": {
    isError: true,
    message: "El correo ingresado no es válido",
  },
  "auth/wrong-password": {
    isError: true,
    message: "La contraseña es incorrecta",
  },
  "auth/user-not-found": {
    isError: true,
    message: "Verifique el correo ingresado",
  },
};

const Login = () => {
  const { width: breakpointWidth } = useWindowDimensions();
  const { values, setValues, handleInputChange } = useForm(INITIALVALUES);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  const errorReset = () => {
    setTimeout(() => {
      setError({ isError: false, message: "" });
    }, 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (values.email === "" || values.password === "") {
      errorReset();
      setError({ isError: true, message: "Debe llenar todos los campos" });
      return;
    }

    login(values.email, values.password, ({ success, errorCode }) => {
      if (success === "ok") setIsLoading(true);

      if (errorCode) {
        errorReset();
        const errorMessage = ERROR_MESSAGES[errorCode];
        setError(errorMessage);
      }
    });

    setValues({ ...values, password: "" });
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    loginGoogle();
  };

  return (
    <div className="container">
      {isLoading && <Loader />}
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
            {error.isError && <p className="mt-1 --red_500">{error.message}</p>}
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

            <button
              className="button button--regular mt-2"
              onClick={handleGoogleLogin}
            >
              Inciar sesión con Google
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
