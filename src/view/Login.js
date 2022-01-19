import { Link } from "react-router-dom";

import Input from "../components/Input";
import Loader from "../components/Loader";

import { useForm } from "../hooks/useForm";
import useWindowDimensions from "../hooks/useWindowDimensions";

import { login, loginGoogle } from "../api/services/auth";
import { useState } from "react";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const { width: breakpointWidth } = useWindowDimensions();
  const { values, setValues, handleInputChange } = useForm(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (values.email === "" || values.password === "") {
      setErrorMessage("Debe llenar todos los campos");
    } else {
      login(values.email, values.password, (res) => {
        if (res.success === "ok") setIsLoading(true);

        if (res.errorCode === "auth/invalid-email")
          setErrorMessage("El correo ingresado no es válido");

        if (res.errorCode === "auth/wrong-password")
          setErrorMessage("La contraseña es incorrecta");
      });
    }
    setValues({ ...values, password: "" });
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    loginGoogle(({ success }) => {
      // console.log("desde login", success);
    });
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
            {errorMessage && <p className="mt-1 --red_500">{errorMessage}</p>}
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
