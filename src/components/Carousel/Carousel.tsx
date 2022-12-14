import { productType } from "common/types/Product.type";
import ProductCard from "components/ProductCard";
import styles from "./styles.module.css";

export const Carousel = ({productFromCategory = []} : {productFromCategory: [productType] | []}) => {

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.carouselBody}>
        {productFromCategory && productFromCategory.map((product) => (
          <div key={`${product.id}_${product.title}`}  className={styles.cardWrapper}>
            <ProductCard props={product}/>
          </div>
          ))}
      </div>
    </div>
  );
};

export default Carousel;
