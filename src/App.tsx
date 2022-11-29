import { Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/cart/CartProvider";
// this is example provider
import { CounterProvider } from "./context/counter/CounterProvider";
import {
  HomePage,
  ExamplePage,
  NotFoundPage,
  CartPage,
  LoginPage,
  ProfilePage,
} from "pages";
import { isLoggedIn } from "context/user";

function App() {
  const ProtectedRoute = ({
    user,
    children,
  }: {
    user: string;
    children: any;
  }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  return (
    <CounterProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/example"
            element={
              <ProtectedRoute user={isLoggedIn}>
                <ExamplePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute user={isLoggedIn}>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute user={isLoggedIn}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </CartProvider>
    </CounterProvider>
  );
}

export default App;
