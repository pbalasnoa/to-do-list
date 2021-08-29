import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Loader from "./Loader";

const Root = ({ children }) => {
  const { authReady } = useContext(AuthContext);

  if (!authReady) {
    return <Loader />;
  }

  return children;
};

export default Root;
