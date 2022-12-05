import { AuthState } from "./AuthProvider";
import { IUser } from './AuthProvider';

type AuthAction =
  | { type: "Login"; payload: null }
  | { type: "Logout"; payload: null}
  | { type: 'loadUser'; payload: IUser }
 

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
    
  switch (action.type) {
    case "Login":   
      return {
        ...state,
        token: action.payload,
        isLogged: true
      };

    case "Logout":
      return {
        ...state,
        token: null,
        isLogged: false
      };

    default:
      return state;
  }
};
