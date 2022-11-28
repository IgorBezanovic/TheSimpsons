import BaseHttpService from './base-http.service'

const apiClient =  BaseHttpService();

const getAll = async () => {
    return await apiClient.get(`products`);
}

const getById = async (id:number) => {
    return await apiClient.get(`products/${id}`);
}

const loginUser = async (loginUserDTO: object) => {
    return await apiClient.post(`/auth/login`, loginUserDTO);
}

const productServices = {
    getAll,
    getById,
    loginUser,
}
export default productServices;