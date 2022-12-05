import { decodedUser, userDTO } from "common/types/Login.type";
import { createContext, useState } from "react";
import authService from "services/auth.services";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext({
  isLoggedIn: false,
  id: 0,
  onLogin: (userData: userDTO) => {},
  onLogout: () => {},
});

export const AuthContextProvider = (props: any) => {
  const navigate = useNavigate();

  const decodedToken = () => {
    const token = localStorage.getItem("accessToken") ?? "";

    try {
      const decoded = jwtDecode<decodedUser>(token);
      const id = decoded.sub;
      const username = decoded.user;

      return { id, username };
    } catch (error) {
      return { id: 0, username: "" };
    }
  };

  const isTokenValid = () => {
    const { id, username } = decodedToken();

    return Boolean(id && username);
  };

  const getIdFromToken = () => {
    const { id } = decodedToken();

    return id;
  };

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isTokenValid);
  const [id] = useState<number>(getIdFromToken);

  const loginHandler = async (userData: userDTO) => {
    try {
      const result = await authService.loginUser(userData);
      localStorage.setItem("accessToken", result.token);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      toast.error("Bad credentials", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        theme: "light",
      });
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        id: id,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
