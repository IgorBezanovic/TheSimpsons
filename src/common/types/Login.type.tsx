export type UserDTO = {
  username: string;
  password: string;
};

export type DecodedUser = {
  iat: number;
  sub: number;
  user: string;
};
