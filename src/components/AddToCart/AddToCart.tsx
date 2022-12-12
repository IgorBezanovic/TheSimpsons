import { Button } from "@mui/material";
import styles from "./styles.module.css";
import Quantity from "components/Quantity";
import { useContext, useState } from "react";
import CartContext from "context/cart/cart.context";
import { CartItem } from "common/types/CartItem.type";

const AddToCart = (props: any) => {
  const [quantity, setQuantity] = useState<number>(1);

  const cartCtx = useContext(CartContext);

  const addToCart = () => {
    const cartItem: CartItem = {
      product: props.product,
      quantity: quantity,
    };
    cartCtx.addToCart(cartItem);
  };

  const onQuantityChange = (q: number) => {
    setQuantity(q);
  };

  return (
    <div className={styles.addToCart}>
      <Quantity onQuantityChange={onQuantityChange}></Quantity>
      <Button variant="contained" onClick={addToCart}>
        Add to cart
      </Button>
    </div>
  );
};

export default AddToCart;
