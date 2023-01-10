/* eslint-disable react-hooks/exhaustive-deps */
import { Card } from '@mui/material';
import Button from '@mui/material/Button/Button';
import CartContext from 'context/cart/cart.context';
import { LocalizedPrice } from 'languages/LocalizedPrice';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const CartTotal = () => {
  const [total, setTotal] = useState<number>(0);
  const [totalGross, setTotalGross] = useState<number>(0);
  const cartCtx = useContext(CartContext);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const shipping = 10;
  const flatRate = 20;

  useEffect(() => {
    updateTotalPrice();
    updateTotalGrossPrice();
  }, [cartCtx.totalPrice]);

  const updateTotalPrice = () => {
    const total = cartCtx.totalPrice;
    setTotal(Math.round(total * 100) / 100);
  };

  const updateTotalGrossPrice = () => {
    const total = cartCtx.totalPrice;
    setTotalGross(
      +(Math.round(total * 100) / 100 + flatRate + shipping).toFixed(2)
    );
  };

  return (
    <Card className={styles.total}>
      <div className={styles.flexBetween}>
        <h4>{t('subtotal')}</h4>
        <h4>
          <LocalizedPrice price={total}></LocalizedPrice>
        </h4>
      </div>
      <div className={styles.additions}>
        <div className={styles.flexBetween}>
          <p>{t('shipping')}</p>
          <p>
            <LocalizedPrice price={shipping}></LocalizedPrice>
          </p>
        </div>
        <div className={styles.flexBetween}>
          <p>{t('flatRate')}:</p>
          <p>
            <LocalizedPrice price={flatRate}></LocalizedPrice>
          </p>
        </div>
      </div>
      <div className={styles.flexBetween}>
        <h4>{t('total')}:</h4>
        <h4>
          <LocalizedPrice price={totalGross}></LocalizedPrice>
        </h4>
      </div>
      <Button
        variant='contained'
        className={styles.checkout}
        onClick={() => navigate('/checkout')}
      >
        {t('proceedToCheckout')}
      </Button>
    </Card>
  );
};

export default CartTotal;
