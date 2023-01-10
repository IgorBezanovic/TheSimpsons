import { DecodedUser, UserDTO } from 'common/types/Login.type';
import { User } from 'common/types/User.type';
import jwtDecode from 'jwt-decode';
import { createContext, useState } from 'react';
import authService from 'services/auth.services';

const UserContext = createContext<{
  isLoggedIn: boolean;
  userId: number;
  user: User | undefined;
  onLogin: (userData: UserDTO) => Promise<void>;
  onLogout: () => void;
  onProfileEnter: (userData: User) => void;
}>({
  isLoggedIn: false,
  userId: 0,
  user: undefined,
  onLogin: async (userData: UserDTO) => {},
  onLogout: () => {},
  onProfileEnter: (userData: User) => {}
});

const decodedToken = () => {
  const token = localStorage.getItem('accessToken') ?? '';

  try {
    const decoded = jwtDecode<DecodedUser>(token);
    const id = decoded.sub;
    const username = decoded.user;

    return { id, username };
  } catch (error) {
    return { id: 0, username: '' };
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

export const UserContextProvider = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isTokenValid);
  const [userId, setUserId] = useState<number>(getIdFromToken);
  const [user, setUser] = useState<User | undefined>(undefined);

  const onLogin = async (userData: UserDTO) => {
    const result = await authService.loginUser(userData);
    localStorage.setItem('accessToken', result.token);
    setIsLoggedIn(true);
    setUserId(getIdFromToken());
  };

  const onLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    setUserId(0);
    setUser(undefined);
  };

  const onProfileEnter = (userData: User) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        userId,
        user,
        onLogin,
        onLogout,
        onProfileEnter
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
