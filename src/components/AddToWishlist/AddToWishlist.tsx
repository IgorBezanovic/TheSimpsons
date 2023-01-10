/* eslint-disable react-hooks/exhaustive-deps */
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { IconButton, Tooltip } from '@mui/material';
import { Product } from 'common/types/Product.type';
import { Wishlist } from 'common/types/Wishlist.type';
import WishlistContext from 'context/wishlist/wishlist.context';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const AddToWishlist = ({ product }: { product: Product }) => {
  const [wishlisted, setWishlisted] = useState<boolean>(false);
  const wishlistCtx = useContext(WishlistContext);

  const { t } = useTranslation();

  useEffect(() => {
    isInLs();
  }, [wishlistCtx.wishlist.products]);

  const isInLs = () => {
    const lsWishlist = localStorage.getItem('wishlist');

    if (lsWishlist) {
      const wishlist: Wishlist = JSON.parse(lsWishlist);

      if (
        Boolean(wishlist.id) &&
        Boolean(wishlist.userId) &&
        Boolean(wishlist.products)
      ) {
        const prod = wishlist.products.find(p => p.id === product.id);

        setWishlisted(Boolean(prod));
      }
    }
  };

  const addToWishlist = () => {
    setWishlisted(true);
    wishlistCtx.addToWishlist(product);
  };

  const removeFromWishlist = () => {
    setWishlisted(false);
    wishlistCtx.removeFromWishlist(product.id);
  };

  return wishlisted ? (
    <IconButton aria-label='removeFromWishlist' onClick={removeFromWishlist}>
      <Tooltip title={t('removeFromWishlist')}>
        <HeartBrokenIcon />
      </Tooltip>
    </IconButton>
  ) : (
    <IconButton aria-label='addToWishlist' onClick={addToWishlist}>
      <Tooltip title={t('addToWishlist')}>
        <FavoriteIcon />
      </Tooltip>
    </IconButton>
  );
};

export default AddToWishlist;
