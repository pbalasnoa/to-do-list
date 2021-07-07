import { useForm } from "../hooks/useForm";
import { Link, useHistory } from "react-router-dom";

import Input from "../components/Input";
import "../styles/components/SignUp.css";

import { createUser } from "../services/auth";

const initialValues = {
  nickName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const history = useHistory();
  const { values, setValues, handleInputChange } = useForm(initialValues);

  const signUp = (e) => {
    e.preventDefault();
    if (values.password !== values.confirmPassword)
      return console.log("Las contraseñas no coinciden");
    createUser(values.email, values.password);
    setValues(initialValues);
    history.push("/");
  };

  return (
    <div className="container">
      <span className="material-icons">
        <Link to="/opening" className="--blue">
          arrow_back
        </Link>
      </span>
      <div className="opening-container">
        <div>
          <h1 className="title-signUp">Hola!</h1>
          <p>Crea una nueva cuenta</p>
        </div>
        <form onSubmit={signUp} className="form-signUp">
          <div className="margin">
            <Input
              type="text"
              classes="input input-outline"
              name="nickName"
              value={values.nickName}
              message="Nombre de usuario"
              handleChange={handleInputChange}
            />
          </div>
          <div className="margin">
            <Input
              type="text"
              classes="input input-outline"
              name="email"
              value={values.email}
              message="Correo electrónico"
              handleChange={handleInputChange}
            />
          </div>
          <div className="margin">
            <Input
              type="password"
              classes="input input-outline"
              name="password"
              value={values.password}
              message="Contraseña"
              handleChange={handleInputChange}
            />
          </div>
          <div className="margin">
            <Input
              type="password"
              classes="input input-outline"
              name="confirmPassword"
              value={values.confirmPassword}
              message="Confirmar contraseña"
              handleChange={handleInputChange}
            />
          </div>
          <div className="margin flex">
            <button className="button button-regular" type="submit">
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
