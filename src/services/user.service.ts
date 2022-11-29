import BaseHttpService from "./base-http.service";

const apiClient = BaseHttpService();

const userProfile = async (id: number) => {
  return await apiClient.get(`users/${id}`);
};

const userService = {
  userProfile,
};

export default userService;
