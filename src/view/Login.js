import { Link, useHistory } from "react-router-dom";
import Input from "../components/Input";

import { useForm } from "../hooks/useForm";
import { login } from "../services/auth";

import "../styles/components/SignUp.css";
// import moduleName from '../hooks/useFocus

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const history = useHistory();
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
      <span className="material-icons">
        <Link to="/opening" className="--blue">
          arrow_back
        </Link>
      </span>
      <div className="opening-container">
        <h1 className="title-signUp">Bienvenido!</h1>
        <p>Inicia sesión para continuar</p>
        <form onSubmit={handleLogin} className="form-signUp">
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

          <div className="margin flex">
            <button className="button button-regular" type="submit">
              Inciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
