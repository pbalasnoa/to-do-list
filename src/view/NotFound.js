import notFound from "../assets/img/notFound.svg";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container  pt-1">
      <img src={notFound} alt="Error 404, página no encontrada" />
      <div className="button button--contained button--link align-center-box mt-2">
        <Link to="/signUp" className="--white">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
