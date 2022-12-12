import { Cart } from "common/types/Cart.type";
import { CartItem } from "common/types/CartItem.type";
import { createContext, useEffect, useState } from "react";

const EMPTY_CART: Cart = {
  id: 1,
  userId: 1,
  products: [],
};

const CartContext = createContext<{
  cart: Cart;
  totalUniqueItems: number;
  totalPrice: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
  updateItemQuantity: (itemId: number, quantity: number) => void;
}>({
  cart: EMPTY_CART,
  totalUniqueItems: 0,
  totalPrice: 0,
  addToCart: (item: CartItem) => {},
  removeFromCart: (itemId: number) => {},
  updateItemQuantity: (itemId: number, quantity: number) => {},
});

export const CartContextProvider = (props: any) => {
  const [cart, setCart] = useState<Cart>(EMPTY_CART);
  const [totalUniqueItems, setTotalUniqueItems] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    initialCart();
    calcTotalPrice();
    calcTotalUniqueItems();
  }, []);

  const initialCart = () => {
    setCart(() => {
      const lsCart = localStorage.getItem("cart");

      if (lsCart) {
        const cart: Cart = JSON.parse(lsCart);
        if (
          Boolean(cart.id) &&
          Boolean(cart.userId) &&
          Boolean(cart.products)
        ) {
          return cart;
        } else {
          return EMPTY_CART;
        }
      } else {
        return EMPTY_CART;
      }
    });
  };

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const lsCart = localStorage.getItem("cart");

      if (lsCart) {
        const cart: Cart = JSON.parse(lsCart);

        if (cart.products.length === 0) {
          cart.products.push(item);
        } else {
          const product = cart.products.find(
            (p) => p.product.id === item.product.id
          );

          if (product) {
            product.quantity = product.quantity + item.quantity;
          } else {
            cart.products.push(item);
          }
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        calcTotalUniqueItems();

        return cart;
      } else {
        prevCart?.products.push(item);
        localStorage.setItem("cart", JSON.stringify(prevCart));

        calcTotalUniqueItems();

        return prevCart;
      }
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart((prevCart) => {
      const lsCart = localStorage.getItem("cart");

      if (lsCart) {
        const cart: Cart = JSON.parse(lsCart);

        const index = cart.products.findIndex((p) => p.product.id === itemId);

        cart.products.splice(index, 1);

        localStorage.setItem("cart", JSON.stringify(cart));
        calcTotalUniqueItems();
        calcTotalPrice();

        return cart;
      } else {
        localStorage.setItem("cart", JSON.stringify(prevCart));
        calcTotalUniqueItems();
        calcTotalPrice();

        return prevCart;
      }
    });
  };

  const updateItemQuantity = (itemId: number, quantity: number) => {
    setCart((prevCart) => {
      const lsCart = localStorage.getItem("cart");

      if (lsCart) {
        const cart: Cart = JSON.parse(lsCart);

        const product = cart.products.find((p) => p.product.id === itemId);

        if (product) {
          product.quantity = quantity;
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        calcTotalPrice();

        return cart;
      } else {
        localStorage.setItem("cart", JSON.stringify(prevCart));

        calcTotalPrice();

        return prevCart;
      }
    });
  };

  const calcTotalPrice = () => {
    const lsCart = localStorage.getItem("cart");

    if (lsCart) {
      const cart: Cart = JSON.parse(lsCart);

      const total = cart.products.reduce((acc, curr) => {
        return (acc += curr.product.price * curr.quantity);
      }, 0);

      setTotalPrice(total);
    }
  };

  const calcTotalUniqueItems = () => {
    const lsCart = localStorage.getItem("cart");

    if (lsCart) {
      const cart: Cart = JSON.parse(lsCart);

      setTotalUniqueItems(cart.products.length);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalUniqueItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateItemQuantity,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
