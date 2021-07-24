import { Link, useHistory } from "react-router-dom";

import Input from "../components/Input";

import { useForm } from "../hooks/useForm";
import useWindowDimensions from "../hooks/useWindowDimensions";

import { createUser } from "../services/auth";

const initialValues = {
  nickName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const history = useHistory();
  const { width: breakpointWidth } = useWindowDimensions();
  const { values, setValues, handleInputChange } = useForm(initialValues);

  const handleSignUp = (e) => {
    e.preventDefault();
    if (values.password !== values.confirmPassword)
      return console.log("Las contraseñas no coinciden");
    createUser(values.email, values.password);
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
            <h1 className="my-1">Hola!</h1>
            <p>Crea una nueva cuenta</p>
          </div>
          <form onSubmit={handleSignUp} className="align-left-column-box">
            <div className="w-1 mt-1_25">
              <Input
                type="text"
                classes="input--border-bottom"
                name="nickName"
                value={values.nickName}
                message="Nombre de usuario"
                handleChange={handleInputChange}
              />
            </div>
            <div className="w-1 mt-1_25">
              <Input
                type="text"
                classes="input--border-bottom"
                name="email"
                value={values.email}
                message="Correo electrónico"
                handleChange={handleInputChange}
              />
            </div>
            <div className="w-1 mt-1_25">
              <Input
                type="password"
                classes="input--border-bottom"
                name="password"
                value={values.password}
                message="Contraseña"
                handleChange={handleInputChange}
              />
            </div>
            <div className="w-1 mt-1_25">
              <Input
                type="password"
                classes="input--border-bottom"
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
