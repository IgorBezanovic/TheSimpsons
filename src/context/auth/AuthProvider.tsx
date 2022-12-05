import { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./AuthReducer";
import authServices from "services/auth.services";

export interface IUser {
  id: number;
  email: string;
  username: string;
  name: string;
}

export interface AuthState {
  token: null | string;
  isLogged: boolean;
  user: null | IUser;
}

export type AuthContextProps = {
  authState: AuthState;
  login: (username:string, password:string) => void;
  logout: () => void;
  loadUser: (token:string) => void;
};

const INITIAL_STATE: AuthState = {
  token: localStorage.getItem('token') || null,
  isLogged: false,
  user: null,
 
};
interface props {
  children: JSX.Element;
}

export const AuthProvider = ({ children }: props) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

 
  const login = async (username:string, password:string) => {
    const userDTO = { username, password }

    const result = await authServices.loginUser(userDTO);

    if(result) {
        localStorage.setItem('token', result.data.token)
    }

    dispatch({
      type: 'Login',
      payload: result.data.token
    })
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    dispatch({
      type:'Logout',
      payload:null
    })
  };

  const loadUser = async(token: string) => {

    // decode token and get user ID

    // make new request https://fakestoreapi.com/users/{userId}

    // update state user
   
  }


  return (
    <AuthContext.Provider
      value={{
        authState: state,
        login,
        logout,
        loadUser
      
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
