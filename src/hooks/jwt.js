import { jwtDecode } from "jwt-decode";

export const decodedToken = (token) => {
  if (!token) {
    return null;
  }
  return jwtDecode(token);
};
