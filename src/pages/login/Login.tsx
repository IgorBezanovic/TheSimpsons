import React, { useState } from "react";
import Headline from "components/Headline";
import Input from "components/InputField";
import Footer from "components/Footer";
import Button from "@mui/material/Button";
import styles from "./styles.module.css";
import services from "../../services/auth.services";
import BaseHttpService from "../../services/base-http.service";
import jwt_decode from "jwt-decode";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { lightBlue, red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { decodedUser, userDTO } from "common/types/Login.type";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [loginUserDTO, setLoginUserDTO] = useState<userDTO>({
    username: "",
    password: "",
  });

  const apiClient = BaseHttpService();
  const navigate = useNavigate();

  const handleLogin = async (event: any) => {
    event.preventDefault();

    if (!loginUserDTO.username)
      return [console.log("Username is empty"), setIsError(true)];
    if (!loginUserDTO.password)
      return [console.log("Password is empty"), setIsError(true)];

    try {
      const response = await services.loginUser(loginUserDTO);
      apiClient.saveToken(response.data.token);
      const decoded: decodedUser = jwt_decode(response.data.token);
      decoded && localStorage.setItem("username", decoded.user);

      setLoginUserDTO({
        username: "",
        password: "",
      });

      navigate("/");
    } catch (error) {
      toast.error("Bad credentials", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        theme: "light",
      });
    }
  };

  const handlePasswordVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleUserData = (name: string, value: string) => {
    setLoginUserDTO({ ...loginUserDTO, [name]: value });
  };

  return (
    <div className={styles.loadingWrapper}>
      <Headline title="Login" />
      <ToastContainer />
      <div className={styles.displayWrapper}>
        <Input
          label="Username"
          type="text"
          error={!loginUserDTO.username && isError}
          onChange={(e: any) => handleUserData("username", e.target.value)}
          value={loginUserDTO.username}
        />
        <div className={styles.passwordWrapper}>
          <Input
            label="Password"
            type={isVisible ? "text" : "password"}
            error={!loginUserDTO.password && isError}
            onChange={(e: any) => handleUserData("password", e.target.value)}
            value={loginUserDTO.password}
          />
          <div className={styles.visibilityWrapper}>
            {isVisible ? (
              <VisibilityIcon
                onClick={handlePasswordVisibility}
                className={styles.visibilityIcon}
                style={{ color: red[900] }}
              />
            ) : (
              <VisibilityOffIcon
                onClick={handlePasswordVisibility}
                className={styles.visibilityIcon}
                style={{ color: lightBlue[900] }}
              />
            )}
          </div>
        </div>
        <Button variant="outlined" onClick={handleLogin}>
          Submit
        </Button>
        <p className={styles.userData}>
          User for testing purposes: <br />
          <em>
            <strong>username: </strong>johnd
            <br />
            <strong>password: </strong>m38rmF$
          </em>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
