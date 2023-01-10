import { Routes, Route, Navigate } from 'react-router-dom';
import {
  ShopPage,
  NotFoundPage,
  CartPage,
  LoginPage,
  UserPage,
  CheckoutPage,
  ProductPage
} from 'pages';
import { useContext } from 'react';
import UserContext from 'context/user/user.context';
import { CartContextProvider } from 'context/cart/cart.context';
import { WishlistContextProvider } from 'context/wishlist/wishlist.context';
import Wishlist from 'components/Wishlist';

function App() {
  const userCtx = useContext(UserContext);

  const ProtectedRoute = ({ children }: { children: any }) => {
    if (!userCtx.isLoggedIn) {
      return <Navigate to='/login' replace />;
    }

    return children;
  };

  return (
    <CartContextProvider>
      <WishlistContextProvider>
        <Routes>
          <Route path='/' element={<ShopPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <UserPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/checkout'
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
        <Wishlist></Wishlist>
      </WishlistContextProvider>
    </CartContextProvider>
  );
}

export default App;
