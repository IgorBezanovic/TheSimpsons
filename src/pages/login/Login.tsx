import React, { useState } from 'react'
import Headline from 'components/Headline';
import Input from 'components/InputField';
import Footer from "components/Footer";
import Button from '@mui/material/Button';
import styles from "./styles.module.css";
import services from "../../services/product.services";
import TwitterIcon from '@mui/icons-material/Twitter';

type userDTO = {
  username: string, 
  password: string
}

const Login = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [loginUserDTO, setLoginUserDTO] = useState<userDTO>({
    username: '', 
    password: '',
  });

  const handleLogin = async (event: any) => {
    event.preventDefault();

    // if(!loginUserDTO.username) return [console.log('Username is empty'), setIsError(true)]
    // if(!loginUserDTO.password) return [console.log('Password is empty'), setIsError(true)]

    try {
      console.log('uslismo')
      const response = await services.loginUser({
        username: "mor_2314",
        password: "83r5^_"
      })
      console.log(await services.loginUser({
        username: "mor_2314",
        password: "83r5^_"

      }))
      console.log(loginUserDTO)
      console.log('---', response.token);
      setLoginUserDTO({
        username: '', 
        password: '',
      })
    } catch (error) {
      if (typeof error === "string") {
        console.error(error.toUpperCase());
      } else if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  return (
    <div className={styles.loadingWrapper}>
      <Headline title='Login' />
      <div className={styles.displayWrapper}>
        <TwitterIcon color="action" />
          <Input 
            label="Username" 
            error={!loginUserDTO.username && isError}
            onChange={(e: any) => setLoginUserDTO({...loginUserDTO,
              username: e.target.value
            })}
            />
          <Input
            label="Password" 
            error={!loginUserDTO.password && isError}
            onChange={(e: any) => setLoginUserDTO({...loginUserDTO,
              password: e.target.value
            })}
            />
          <Button variant="outlined" onClick={handleLogin}>Submit</Button>
      </div>
      <Footer />
    </div>
  )
}

export default Login