/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const decodedToken = (token: string) => {
  try {
    return jwtDecode(token);
  } catch (error: any) {
    Cookies.remove("teeru_accessToken");
    localStorage.removeItem("persist:teeru");
    return null; // Return null instead of crashing the app
  }
};
