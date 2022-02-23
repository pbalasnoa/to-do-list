import { Link } from "react-router-dom";

import Input from "../components/Input";
import Loader from "../components/Loader";

import { useForm } from "../hooks/useForm";
import useWindowDimensions from "../hooks/useWindowDimensions";

import { createUser } from "../api/services/auth";
import { useState } from "react";

const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

const ERROR_MESSAGES = {
  "auth/invalid-email": {
    isError: true,
    message: "El correo ingresado no es válido",
  },
  "auth/email-already-in-use": {
    isError: true,
    message: "El correo ingresado ya lo tiene otro usuario",
  },
  "auth/weak-password": {
    isError: true,
    message: "La contraseña debe tener al menos 6 caracteres",
  },
};

const SignUp = () => {
  const { width: breakpointWidth } = useWindowDimensions();
  const { values, setValues, handleInputChange } = useForm(initialValues);
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

  const handleSignUp = (e) => {
    e.preventDefault();
    if (
      values.email === "" ||
      values.password === "" ||
      values.password === ""
    ) {
      errorReset();
      setError({ isError: true, message: "Debe llenar todos los campos" });
      return;
    }

    if (values.password !== values.confirmPassword) {
      errorReset();
      setError({ isError: true, message: "Las contraseñas no coinciden" });
      return;
    }

    createUser(values.email, values.password, ({ success, errorCode }) => {
      if (success === "ok") setIsLoading(true);

      if (errorCode) {
        errorReset();
        const errorMessage = ERROR_MESSAGES[errorCode];
        setError(errorMessage);
      }
    });

    setValues({ ...values, password: "", confirmPassword: "" });
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
            <h1 className="my-1">Hola!</h1>
            <p>Crea una nueva cuenta</p>
          </div>
          {error.isError && <p className="mt-1 --red_500">{error.message}</p>}
          <form onSubmit={handleSignUp} className="align-left-column-box">
            <div className="w-1 mt-1_25">
              <Input
                type="text"
                classes="input--border-bottom user"
                name="email"
                value={values.email}
                message="Correo electrónico"
                handleChange={handleInputChange}
              />
            </div>
            <div className="w-1 mt-1_25">
              <Input
                type="password"
                classes="input--border-bottom user"
                name="password"
                value={values.password}
                message="Contraseña"
                handleChange={handleInputChange}
              />
            </div>
            <div className="w-1 mt-1_25">
              <Input
                type="password"
                classes="input--border-bottom user"
                name="confirmPassword"
                value={values.confirmPassword}
                message="Confirmar contraseña"
                handleChange={handleInputChange}
              />
            </div>

            <button className="button button--contained mt-2" type="submit">
              Registrarse
            </button>

            <p className="w-1 mt-2 --center-text">
              ¿Ya tienes una cuenta?
              <Link to="/login" className="font-regular --blue_500 pl-0_25">
                Iniciar sesión
              </Link>
            </p>
          </form>
        </section>
      </div>
    </div>
  );
};

export default SignUp;
