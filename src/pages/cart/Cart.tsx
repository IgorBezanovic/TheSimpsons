import { Grid } from "@mui/material";
import CartItem from "components/CartItem";
import CartTotal from "components/CartTotal";
import { AppLayout } from "components/Layouts";
import CartContext from "context/cart/cart.context";
import { useContext } from "react";

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const cartItems = cartCtx.cart?.products.length;

  return (
    <AppLayout>
      {cartItems !== 0 ? (
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            {cartCtx.cart?.products.map((product) => (
              <CartItem key={product.product.id} cartItem={product}></CartItem>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <CartTotal></CartTotal>
          </Grid>
        </Grid>
      ) : (
        <h1>Your cart is empty</h1>
      )}
    </AppLayout>
  );
};

export default Cart;
