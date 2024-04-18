import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthState } from "../../../store/auth";
import { ReactNode } from "react";

interface IPrivateRoute {
  children: ReactNode;
}

export const AdminPrivateRoute: React.FC<IPrivateRoute> = ({ children }) => {
  const auth = useSelector((x: { auth: AuthState }) => x.auth);
  if (auth.id && !auth.admin) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/login" />;
  }

  // authorized so return child components
  return children;
};

export const RegularPrivateRoute: React.FC<IPrivateRoute> = ({ children }) => {
  const auth = useSelector((x: { auth: AuthState }) => x.auth);
  if (auth.id) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/login" />;
  }

  // authorized so return child components
  return children;
};
