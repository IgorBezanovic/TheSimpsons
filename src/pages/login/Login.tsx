import React, { useState } from "react";
import Headline from "components/Headline";
import Input from "components/InputField";
import Footer from "components/Footer";
import Button from "@mui/material/Button";
import styles from "./styles.module.css";
import services from "../../services/auth.services";
import BaseHttpService from "../../services/base-http.service";
import jwt_decode from "jwt-decode";

type userDTO = {
  username: string;
  password: string;
};

type decodedUser = {
  iat: number;
  sub: number;
  user: string;
};

const Login = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [loginUserDTO, setLoginUserDTO] = useState<userDTO>({
    username: "johnd",
    password: "m38rmF$",
  });

  const apiClient = BaseHttpService();

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
      decoded && localStorage.setItem('username', decoded.user);

      setLoginUserDTO({
        username: "",
        password: "",
      });
    } catch (error) {
      if (typeof error === "string") {
        console.error(error.toUpperCase());
      } else if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return (
    <div className={styles.loadingWrapper}>
      <Headline title="Login" />
      <div className={styles.displayWrapper}>
        <Input
          label="Username"
          error={!loginUserDTO.username && isError}
          onChange={(e: any) =>
            setLoginUserDTO({ ...loginUserDTO, username: e.target.value })
          }
        />
        <Input
          label="Password"
          error={!loginUserDTO.password && isError}
          onChange={(e: any) =>
            setLoginUserDTO({ ...loginUserDTO, password: e.target.value })
          }
        />
        <Button variant="outlined" onClick={handleLogin}>
          Submit
        </Button>
        <p>
          User for testing purposes: <br />
          <em>
            username:'johnd',
            <br />
            password:'m38rmF$',
          </em>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
