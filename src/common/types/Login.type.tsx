export type userDTO = {
  username: string;
  password: string;
};

export type decodedUser = {
  iat: number;
  sub: number;
  user: string;
};
