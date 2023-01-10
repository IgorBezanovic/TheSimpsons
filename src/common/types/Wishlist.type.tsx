import { Product } from './Product.type';

export type Wishlist = {
  id: number;
  userId: number;
  products: Product[];
};
