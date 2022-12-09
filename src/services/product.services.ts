import BaseHttpService from "./base-http.service";

const apiClient = BaseHttpService();

const getAllProducts = async () => {
  return await apiClient.get(`products`);
};

const getProductById = async (id: string) => {
  return await apiClient.get(`products/${id}`);
};

const getProductGroups = async () => {
  return await apiClient.get(`products/categories`);
};

const productServices = {
  getAllProducts,
  getProductById,
  getProductGroups,
};
export default productServices;
