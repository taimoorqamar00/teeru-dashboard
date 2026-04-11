import {
  createBrowserRouter,
  RouteObject,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

import Loading from "../ui/Loading";
import { routeGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.route";
import ProtectedRoute from "./ProtectedRoute";

//* Auth
import SignIn from "../pages/Auth/SignIn";
import ForgotPassword from "../pages/Auth/ForgetPassword";
import OtpPage from "../pages/Auth/OtpPage";
import UpdatePassword from "../pages/Auth/UpdatePassword";

import NotFound from "../ui/NotFound/NotFound";
import DashboardLayout from "../Components/Layout/DashboardLayout";
import { adminCommonPaths } from "./admin.common.route";
import { decodedToken } from "../utils/jwt";
import { IJwtPayload } from "../types";

// eslint-disable-next-line react-refresh/only-export-components
function AuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("teeru_accessToken");

    if (token) {
      const user = decodedToken(token || "") as IJwtPayload | undefined;

      if (user && user.role === "admin") {
        navigate(`/${user.role}/overview`, { replace: true });
      } else {
        navigate("/sign-in", { replace: true });
      }
    } else {
      navigate("/sign-in", { replace: true });
    }
  }, [navigate]);

  // Optionally display a loading indicator
  return <Loading />;
}

// Define routes with TypeScript types
const router: RouteObject[] = [
  {
    path: "/",
    index: true, // This applies to the exact path "/"
    element: <AuthRedirect />,
  },
  {
    path: "/overview",
    index: true, // This applies to the exact path "/"
    element: <AuthRedirect />,
  },
  {
    path: "/admin",
    index: true, // This applies to the exact path "/"
    element: <AuthRedirect />,
  },
  {
    path: "admin",
    element: (
      <ProtectedRoute role="admin">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths), // Generating child routes dynamically
  },
  {
    path: "admin",
    element: (
      <ProtectedRoute role="admin">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminCommonPaths), // Generating child routes dynamically
  },
  {
    path: "sign-in",
    element: <SignIn />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "forgot-password/otp-verify",
    element: <OtpPage />,
  },
  {
    path: "update-password",
    element: <UpdatePassword />,
  },
  {
    path: "*", // Catch-all for undefined routes
    element: <NotFound />,
  },
];

// Create the router using createBrowserRouter
const routes = createBrowserRouter(router);

export default routes;
