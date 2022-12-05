import { createContext } from "react";
import { AuthContextProps } from './AuthProvider'

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps );