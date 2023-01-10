import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, IconButton } from '@mui/material';
import { CartItem } from 'common/types/CartItem.type';
import { Product } from 'common/types/Product.type';
import CartContext from 'context/cart/cart.context';
import WishlistContext from 'context/wishlist/wishlist.context';
import { LocalizedPrice } from 'languages/LocalizedPrice';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const WishlistItem = ({ item }: { item: Product }) => {
  const wishlistCtx = useContext(WishlistContext);
  const cartCtx = useContext(CartContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const addToCartRemoveFromWishlist = () => {
    wishlistCtx.removeFromWishlist(item.id);

    const cartItem: CartItem = {
      product: item,
      quantity: 1
    };
    cartCtx.addToCart(cartItem);
  };

  const navigateToProduct = (productId: number) => {
    wishlistCtx.close();
    navigate(`product/${productId}`);
  };

  return (
    <Grid container className={styles.item}>
      <Grid item xs={3}>
        <img
          src={item.image}
          alt='wishlistItem'
          className={styles.image}
          onClick={() => navigateToProduct(item.id)}
        ></img>
      </Grid>
      <Grid item xs={8}>
        <div>
          <h5
            className={styles.details}
            onClick={() => navigateToProduct(item.id)}
          >
            {item.title}
          </h5>
          <p className={styles.details}>
            <LocalizedPrice price={item.price}></LocalizedPrice>
          </p>
          <p className={styles.addToCart} onClick={addToCartRemoveFromWishlist}>
            {t('addToCart')}
          </p>
        </div>
      </Grid>
      <Grid item xs={1}>
        <IconButton
          aria-label='delete'
          onClick={() => wishlistCtx.removeFromWishlist(item.id)}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default WishlistItem;
