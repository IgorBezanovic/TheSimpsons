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

const getProductFromGroup = async (category: string) => {
  return await apiClient.get(`products/category/${category}`);
};

const productServices = {
  getAllProducts,
  getProductById,
  getProductGroups,
  getProductFromGroup,
};
export default productServices;
