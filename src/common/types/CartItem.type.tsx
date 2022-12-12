import { productType } from "./Product.type";

export type CartItem = {
  product: productType;
  quantity: number;
};
