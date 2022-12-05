import React, { useContext, useState } from "react";
import Headline from "components/Headline";
import Input from "components/InputField";
import Footer from "components/Footer";
import Button from "@mui/material/Button";
import styles from "./styles.module.css";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { lightBlue, red } from "@mui/material/colors";
import { userDTO } from "common/types/Login.type";
import AuthContext from "context/user/auth.context";
import LoadingContext from "context/loading/loading.context";

const Login = () => {
  const authCtx = useContext(AuthContext);
  const loadingCtx = useContext(LoadingContext);

  const [isError, setIsError] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [loginUserDTO, setLoginUserDTO] = useState<userDTO>({
    username: "",
    password: "",
  });

  const handleLogin = async (event: any) => {
    event.preventDefault();

    if (!loginUserDTO.username)
      return [console.log("Username is empty"), setIsError(true)];
    if (!loginUserDTO.password)
      return [console.log("Password is empty"), setIsError(true)];

    loadingCtx.show();
    await authCtx.onLogin(loginUserDTO);
    loadingCtx.hide();
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
