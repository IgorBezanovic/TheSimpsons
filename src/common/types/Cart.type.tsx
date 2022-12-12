import { CartItem } from "./CartItem.type";

export type Cart = {
  id: number;
  userId: number;
  products: CartItem[];
};
