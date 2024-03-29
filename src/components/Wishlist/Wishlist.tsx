import CloseIcon from '@mui/icons-material/Close';
import { Drawer, IconButton } from '@mui/material';
import WishlistItem from 'components/WishlistItem/WishlistItem';
import WishlistContext from 'context/wishlist/wishlist.context';
import { Fragment, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';

const Wishlist = () => {
  const wishlistCtx = useContext(WishlistContext);
  const noWishlistItems = wishlistCtx.wishlist.products.length;
  const { t } = useTranslation();

  const close = () => {
    wishlistCtx.close();
  };

  return (
    <Drawer
      anchor='right'
      open={wishlistCtx.isOpen}
      onClose={close}
      PaperProps={{
        sx: {
          width: {
            xs: '90%',
            sm: '50%',
            md: '40%',
            lg: '30%'
          },
          padding: '0 1em'
        }
      }}
    >
      <Fragment>
        <div className={styles.flexBetween}>
          <h5>{t('yourWishlist')}</h5>

          <IconButton
            aria-label='delete'
            className={styles.close}
            onClick={wishlistCtx.close}
          >
            <CloseIcon />
          </IconButton>
        </div>

        {noWishlistItems !== 0 ? (
          wishlistCtx.wishlist.products.map(item => (
            <WishlistItem key={item.id} item={item}></WishlistItem>
          ))
        ) : (
          <p>{t('yourWishlistIsEmpty')}</p>
        )}
      </Fragment>
    </Drawer>
  );
};

export default Wishlist;
