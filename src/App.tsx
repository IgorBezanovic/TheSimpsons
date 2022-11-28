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
} from "pages";

function App() {
  const user: string = localStorage.getItem("accessToken")
    ? localStorage.getItem("accessToken")!
    : "";

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
              <ProtectedRoute user={user}>
                <ExamplePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute user={user}>
                <CartPage />
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
