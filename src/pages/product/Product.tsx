import CartContext from "context/cart/cart.context";
import { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { productType } from "common/types/Product.type";
import { AppLayout } from "components/Layouts";
import AddToCart from "components/AddToCart";
import Rating from "components/Rating";
import Carousel from "components/Carousel";
import LoadingContext from "context/loading/loading.context";
import productServices from "services/product.services";
import styles from "./styles.module.css";
import { Chip } from "@mui/material";
import AddToWishlist from "components/AddToWishlist";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<productType>();
  const [productFromCategory, setProductFromCategory] = useState<
    [productType] | []
  >([]);
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const loadingCtx = useContext(LoadingContext);
  const cartCtx = useContext(CartContext);

  useEffect(() => {
    updateIsInCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartCtx.cart.products]);

  const loadProductByIdHandler = async () => {
    try {
      if (id) {
        loadingCtx.show();
        const res = await productServices.getProductById(id);
        setProduct(res.data);

        const category = await productServices.getProductFromGroup(
          res.data.category
        );
        setProductFromCategory(category.data);
        loadingCtx.hide();
      }
    } catch (error) {
      loadingCtx.hide();
      toast.error("Product does not exist");
    }
  };

  const updateIsInCart = () => {
    if (id) {
      const product = cartCtx.cart.products.find((p) => p.product.id === +id);

      if (product) {
        setIsInCart(true);
      } else {
        setIsInCart(false);
      }
    }
  };

  useEffect(() => {
    loadProductByIdHandler();
    // eslint-disable-next-line
  }, []);

  return (
    <AppLayout>
      {product ? (
        <Fragment>
          <div className={styles.product}>
            <img
              src={product.image}
              alt="product"
              className={styles.productImage}
            />
            <div className={styles.description}>
              <h2>{product.title}</h2>
              <Rating rating={product.rating.rate}></Rating>
              <h4 className={styles.productPrice}>${product.price}</h4>
              <div className={styles.productCategoryWrapper}>
                <p>Category:</p>
                <Chip
                  label={product.category}
                  variant="outlined"
                  style={{ marginLeft: "10px" }}
                />
              </div>
              <p className={styles.marginBottom30}>{product.description}</p>
              <div className={styles.addTo}>
                <AddToCart product={product}></AddToCart>
                {isInCart ? (
                  ""
                ) : (
                  <AddToWishlist product={product}></AddToWishlist>
                )}
              </div>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <hr className={styles.fancyLine}></hr>
          </div>
          <Chip
            label="Items from same category:"
            variant="outlined"
            style={{ margin: "0 0 20px 20px" }}
          />
          <Carousel productFromCategory={productFromCategory} />
        </Fragment>
      ) : (
        <p>Loading, please wait...</p>
      )}
    </AppLayout>
  );
};

export default Product;
