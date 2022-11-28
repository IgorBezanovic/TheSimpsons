import BaseHttpService from './base-http.service'

const apiClient =  BaseHttpService();

const loginUser = async (loginUserDTO: object) => {
    return await apiClient.post(`auth/login`, loginUserDTO);
}

const authServices = {
    loginUser,
}
export default authServices;