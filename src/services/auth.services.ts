import BaseHttpService from "./base-http.service";

const apiClient = BaseHttpService();

const loginUser = async (loginUserDTO: object): Promise<{ token: string }> => {
  const response = await apiClient.post(`auth/login`, loginUserDTO);

  return response.data;
};

const authService = {
  loginUser,
};
export default authService;
