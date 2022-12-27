import { productType } from "common/types/Product.type";
import ProductCard from "components/ProductCard";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.css";

export const Carousel = ({productFromCategory = []} : {productFromCategory: [productType] | []}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.carouselBody}>
        {productFromCategory && productFromCategory.map((product) => (
          <div key={`${product.id}_${product.title}`}  className={styles.cardWrapper}>
            <ProductCard props={product} t={t}/>
          </div>
          ))}
      </div>
    </div>
  );
};

export default Carousel;
