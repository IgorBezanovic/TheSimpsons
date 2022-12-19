import { Grid, IconButton } from "@mui/material";
import { productType } from "common/types/Product.type";
import styles from "./styles.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import WishlistContext from "context/wishlist/wishlist.context";
import CartContext from "context/cart/cart.context";
import { CartItem } from "common/types/CartItem.type";
import { useTranslation } from "react-i18next";

const WishlistItem = ({ item }: { item: productType }) => {
  const wishlistCtx = useContext(WishlistContext);
  const cartCtx = useContext(CartContext);
  const { t } = useTranslation();

  const addToCartRemoveFromWishlist = () => {
    wishlistCtx.removeFromWishlist(item.id);

    const cartItem: CartItem = {
      product: item,
      quantity: 1,
    };
    cartCtx.addToCart(cartItem);
  };

  return (
    <Grid container className={styles.item}>
      <Grid item xs={3}>
        <img src={item.image} alt="wishlistItem" className={styles.image}></img>
      </Grid>
      <Grid item xs={8}>
        <div>
          <h5 className={styles.details}>{item.title}</h5>
          <p className={styles.details}>${item.price}</p>
          <p className={styles.addToCart} onClick={addToCartRemoveFromWishlist}>
            {t("addToCart")}
          </p>
        </div>
      </Grid>
      <Grid item xs={1}>
        <IconButton
          aria-label="delete"
          onClick={() => wishlistCtx.removeFromWishlist(item.id)}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default WishlistItem;
