import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const AuthRoute = (props) => {
  const token = useSelector((s) => s.common.token);
  return token ? <Route {...props} /> : <Redirect to="/login" />;
};

export default AuthRoute;
