/* eslint-disable react-hooks/exhaustive-deps */
import { Chip } from '@mui/material';
import { Product as ProductType } from 'common/types/Product.type';
import AddToCart from 'components/AddToCart';
import AddToWishlist from 'components/AddToWishlist';
import Carousel from 'components/Carousel';
import { AppLayout } from 'components/Layouts';
import Rating from 'components/Rating';
import CartContext from 'context/cart/cart.context';
import LoadingContext from 'context/loading/loading.context';
import { LocalizedPrice } from 'languages/LocalizedPrice';
import { Fragment, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import productServices from 'services/product.services';
import styles from './styles.module.css';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType>();
  const [productFromCategory, setProductFromCategory] = useState<
    [ProductType] | []
  >([]);
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const loadingCtx = useContext(LoadingContext);
  const cartCtx = useContext(CartContext);

  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    updateIsInCart();
  }, [cartCtx.cart.products]);

  const loadProductByIdHandler = async () => {
    try {
      if (id) {
        loadingCtx.show();
        const res = await productServices.getProductById(id);

        if (!res.data) {
          loadingCtx.hide();
          toast.error(t('productDoesNotExist'));
          navigate('/');
        }

        setProduct(res.data);

        const category = await productServices.getProductFromGroup(
          res.data.category
        );
        setProductFromCategory(category.data);
        loadingCtx.hide();
      }
    } catch (error) {
      loadingCtx.hide();
      toast.error(t('productDoesNotExist'));
      navigate('/');
    }
  };

  const updateIsInCart = () => {
    if (id) {
      const product = cartCtx.cart.products.find(p => p.product.id === +id);

      if (product) {
        setIsInCart(true);
      } else {
        setIsInCart(false);
      }
    }
  };

  useEffect(() => {
    loadProductByIdHandler();
  }, [id]);

  return (
    <AppLayout>
      {product && (
        <Fragment>
          <div className={styles.product}>
            <img
              src={product.image}
              alt='product'
              className={styles.productImage}
            />
            <div className={styles.description}>
              <h2>{product.title}</h2>
              <Rating rating={product.rating.rate}></Rating>
              <h4 className={styles.productPrice}>
                <LocalizedPrice price={product.price}></LocalizedPrice>
              </h4>
              <div className={styles.productCategoryWrapper}>
                <p>{t('category')}:</p>
                <Chip
                  label={t(product.category)}
                  variant='outlined'
                  style={{ marginLeft: '10px' }}
                />
              </div>
              <p className={styles.marginBottom30}>{product.description}</p>
              <div className={styles.addTo}>
                <AddToCart product={product}></AddToCart>
                {isInCart ? (
                  ''
                ) : (
                  <AddToWishlist product={product}></AddToWishlist>
                )}
              </div>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <hr className={styles.fancyLine}></hr>
          </div>
          <Chip
            label={t('itemsFromTheSameCategory')}
            variant='outlined'
            style={{ margin: '0 0 20px 20px' }}
          />
          <Carousel productFromCategory={productFromCategory} />
        </Fragment>
      )}
    </AppLayout>
  );
};

export default Product;
