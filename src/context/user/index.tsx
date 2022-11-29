import { decodedUser } from "common/types/Login.type";
import jwt_decode from "jwt-decode";

export const isLoggedIn: string = localStorage.getItem("accessToken") ?? "";
export const userId = () => {
  const decodedUser: decodedUser = jwt_decode(isLoggedIn);
  const userId = decodedUser.sub;

  return userId;
};
