import { Routes, Route, Navigate } from "react-router-dom";
import {
  HomePage,
  ExamplePage,
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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/example"
          element={
            <ProtectedRoute isLoggedIn={authCtx.isLoggedIn}>
              <ExamplePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute isLoggedIn={authCtx.isLoggedIn}>
              <CartPage />
            </ProtectedRoute>
          }
        />
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
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute isLoggedIn={authCtx.isLoggedIn}>
              <ProductPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </CartContextProvider>
  );
}

export default App;
