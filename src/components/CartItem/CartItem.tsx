import styles from "./styles.module.css";
import Card from "@mui/material/Card";
import { CartItem as CartItemType } from "common/types/CartItem.type";
import Quantity from "components/Quantity";
import { Grid, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useEffect, useState } from "react";
import CartContext from "context/cart/cart.context";

const CartItem = ({ cartItem }: { cartItem: CartItemType }) => {
  const [quantity, setQuantity] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const cartCtx = useContext(CartContext);

  useEffect(() => {
    calcTotalPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  const calcTotalPrice = () => {
    const total = Math.round(cartItem.product.price * quantity * 100) / 100;
    setTotalPrice(total);
  };

  const removeItem = () => {
    cartCtx.removeFromCart(cartItem.product.id);
  };

  const onQuantityChange = (q: number) => {
    setQuantity(q);
    cartCtx.updateItemQuantity(cartItem.product.id, q);
  };

  return (
    <Card className={styles.card}>
      <Grid container spacing={2} className={styles.alignMiddle}>
        <Grid item xs={12} sm={3} md={2} lg={2}>
          <img
            className={styles.image}
            src={cartItem.product.image}
            alt="item"
          ></img>
        </Grid>
        <Grid item xs={12} sm={9} md={5} lg={5}>
          <div>
            <h5 className={styles.itemTitle}>{cartItem.product.title}</h5>
            <p className={styles.itemPrice}>${cartItem.product.price} X 1</p>
          </div>
        </Grid>
        <Grid item xs={6} sm={3} md={2} lg={2}>
          <Quantity
            initQuantity={cartItem.quantity}
            onQuantityChange={onQuantityChange}
          ></Quantity>
        </Grid>
        <Grid item xs={6} sm={8} md={2} lg={2}>
          <p>${totalPrice}</p>
        </Grid>

        <Grid item xs={1} sm={1} md={1} lg={1}>
          <IconButton aria-label="delete" onClick={removeItem}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CartItem;
