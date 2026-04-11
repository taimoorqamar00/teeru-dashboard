import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { decodedToken } from "../utils/jwt";
import { IJwtPayload } from "../types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: string;
}

function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const token = Cookies.get("teeru_accessToken");

  if (token) {
    const user = decodedToken(token || "") as IJwtPayload;

    if (!user || user.role !== role) {
      return <Navigate to="/sign-in" replace />;
    }

    return <>{children}</>;
  } else {
    return <Navigate to="/sign-in" replace />;
  }
}

export default ProtectedRoute;
