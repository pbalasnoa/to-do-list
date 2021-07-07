import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Redirect, Route } from "react-router";

const GuardRoute = (props) => {
  const { isLoggedIn } = useContext(AuthContext);
  const { type, ...rest } = props;

  if (type === "private" && !isLoggedIn) {
    return <Redirect to="/opening" />;
  } else if (type === "public" && isLoggedIn) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} />;
};

export default GuardRoute;
