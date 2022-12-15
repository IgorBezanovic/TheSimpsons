import React, { ReactNode, useContext, useEffect } from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import styles from "./styles.module.css";
import Container from "components/Container";
import CartContext from "context/cart/cart.context";
import WishlistContext from "context/wishlist/wishlist.context";
interface IProps {
  children?: ReactNode;
}

const AppLayout: React.FC<IProps> = ({ children }) => {
  const cartCtx = useContext(CartContext);
  const wishlistCtx = useContext(WishlistContext);

  useEffect(() => {
    cartCtx.setInitValues();
    wishlistCtx.setInitValues();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
