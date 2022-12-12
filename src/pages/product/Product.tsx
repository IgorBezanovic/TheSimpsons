import { productType } from "common/types/Product.type";
import AddToCart from "components/AddToCart";
import { AppLayout } from "components/Layouts";
import Rating from "components/Rating";
import LoadingContext from "context/loading/loading.context";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import productServices from "services/product.services";
import styles from "./styles.module.css";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<productType>();
  const loadingCtx = useContext(LoadingContext);

  const loadProductByIdHandler = async () => {
    try {
      if (id) {
        loadingCtx.show();
        const res = await productServices.getProductById(id);
        const product = res.data;
        setProduct(product);
        loadingCtx.hide();
      }
    } catch (error) {
      loadingCtx.hide();
      toast.error("Product does not exist");
    }
  };

  useEffect(() => {
    loadProductByIdHandler();
    // eslint-disable-next-line
  }, []);

  return (
    <AppLayout>
      {product ? (
        <div className={styles.product}>
          <img
            src={product.image}
            alt="product"
            className={styles.productImage}
          />
          <div>
            <h2>{product.title}</h2>
            <Rating rating={product.rating.rate}></Rating>
            <p>${product.price}</p>
            <p>{product.description}</p>
            <AddToCart product={product}></AddToCart>
            <p>Category: {product.category}</p>
          </div>
        </div>
      ) : (
        <p>Loading, please wait...</p>
      )}
    </AppLayout>
  );
};

export default Product;
