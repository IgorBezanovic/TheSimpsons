/* eslint-disable react-hooks/exhaustive-deps */
import Container from 'components/Container';
import Footer from 'components/Footer';
import Header from 'components/Header';
import CartContext from 'context/cart/cart.context';
import WishlistContext from 'context/wishlist/wishlist.context';
import { ReactNode, useContext, useEffect } from 'react';
import styles from './styles.module.css';

interface IProps {
  children?: ReactNode;
}

const AppLayout: React.FC<IProps> = ({ children }) => {
  const cartCtx = useContext(CartContext);
  const wishlistCtx = useContext(WishlistContext);

  useEffect(() => {
    cartCtx.setInitValues();
    wishlistCtx.setInitValues();
  }, []);

  return (
    <>
      <Header />
      <main className={styles.app_layout_main}>
        <Container>{children}</Container>
      </main>
      <Footer />
    </>
  );
};

export default AppLayout;
