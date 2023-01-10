import { Button } from '@mui/material';
import { CartItem } from 'common/types/CartItem.type';
import Quantity from 'components/Quantity';
import CartContext from 'context/cart/cart.context';
import WishlistContext from 'context/wishlist/wishlist.context';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';

const AddToCart = (props: any) => {
  const [quantity, setQuantity] = useState<number>(1);

  const cartCtx = useContext(CartContext);
  const wishlistCtx = useContext(WishlistContext);

  const { t } = useTranslation();

  const addToCart = () => {
    const cartItem: CartItem = {
      product: props.product,
      quantity: quantity
    };
    cartCtx.addToCart(cartItem);
    wishlistCtx.removeFromWishlist(cartItem.product.id);
  };

  const onQuantityChange = (q: number) => {
    setQuantity(q);
  };

  return (
    <div className={styles.addToCart}>
      <Quantity onQuantityChange={onQuantityChange}></Quantity>
      <Button variant='contained' onClick={addToCart}>
        {t('addToCart')}
      </Button>
    </div>
  );
};

export default AddToCart;
