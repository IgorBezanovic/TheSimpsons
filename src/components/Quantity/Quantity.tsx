import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import styles from "./styles.module.css";

const Quantity = (props: any) => {
  const [quantity, setQuantity] = useState<number>(props.initQuantity ?? 1);

  useEffect(() => {
    onQuantityChangeHandler(quantity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  const addOne = () => {
    setQuantity((q) => {
      return (q = q + 1);
    });
  };

  const removeOne = () => {
    setQuantity((q) => {
      return (q = q - 1);
    });
  };

  const onQuantityChangeHandler = (q: number) => {
    props.onQuantityChange(q);
  };

  return (
    <div className={styles.quantity}>
      <IconButton
        aria-label="delete"
        onClick={removeOne}
        disabled={quantity === 1}
      >
        <RemoveIcon />
      </IconButton>
      <p>{quantity}</p>
      <IconButton aria-label="delete" onClick={addOne}>
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default Quantity;
