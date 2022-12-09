import { Button } from "@mui/material";
import styles from "./styles.module.css";
import Quantity from "components/Quantity";
import { useState } from "react";

const AddToCart = (props: any) => {
  const [quantity, setQuantity] = useState<number>(1);

  const onQuantityChange = (q: number) => {
    setQuantity(q);
  };

  const addToCart = () => {
    console.log(props);
    console.log(quantity);
  };

  return (
    <div className={styles.addToCart}>
      <Quantity onQuantityChange={onQuantityChange}></Quantity>
      <Button variant="contained" onClick={addToCart}>
        Add to cart
      </Button>
    </div>
  );
};

export default AddToCart;
