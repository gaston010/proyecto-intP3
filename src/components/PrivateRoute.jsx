// PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
  const token = Cookies.get("authToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
}.isRequired;

export default PrivateRoute;
