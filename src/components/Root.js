import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Root = ({ children }) => {
  const { authReady } = useContext(AuthContext);

  if (!authReady) {
    return <div>Loading...</div>;
  }

  return children;
};

export default Root;
