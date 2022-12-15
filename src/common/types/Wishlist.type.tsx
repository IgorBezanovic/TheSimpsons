import { productType } from "./Product.type";

export type Wishlist = {
  id: number;
  userId: number;
  products: productType[];
};
