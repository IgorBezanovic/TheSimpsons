import { Routes, Route, Navigate } from "react-router-dom";
import {
  HomePage,
  NotFoundPage,
  CartPage,
  LoginPage,
  ProfilePage,
  CheckoutPage,
  ProductPage,
} from "pages";
import { useContext } from "react";
import AuthContext from "context/user/auth.context";
import { CartContextProvider } from "context/cart/cart.context";
import { WishlistContextProvider } from "context/wishlist/wishlist.context";
import Wishlist from "components/Wishlist";

function App() {
  const authCtx = useContext(AuthContext);

  const ProtectedRoute = ({
    isLoggedIn,
    children,
  }: {
    isLoggedIn: boolean;
    children: any;
  }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  return (
    <CartContextProvider>
      <WishlistContextProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isLoggedIn={authCtx.isLoggedIn}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute isLoggedIn={authCtx.isLoggedIn}>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Wishlist></Wishlist>
      </WishlistContextProvider>
    </CartContextProvider>
  );
}

export default App;
