import { useEffect, useRef, useMemo } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/homepage";
import Store from "./pages/store";
import UserDashBoard from "./pages/user-dashboard/index";
import AdminDashboard from "./pages/admin-dashboard";
import ProductDescription from "./pages/product-description";
import "@fortawesome/fontawesome-free/css/all.css";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Cart from "./pages/cart";
import { useDispatch, useSelector } from "react-redux";
import { userCart, logout, resetState } from "./features/auth/authSlice";
import { getUserCart } from "./features/cart/cartSlice";

function PrivateRoute({ children, authorizedRoles }) {
  const user = useSelector((state) => state.auth.user);
  const isAuthorized = user && authorizedRoles.includes(user?.role);
  return isAuthorized ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  // const cartState = localStorage.getItem('cartState');
  // console.log(user)
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (user && cart.products && cart.products.length > 0) {
      const data = {
        cart: cart.products,
      };
      dispatch(userCart(data));
    }
  }, [dispatch, cart]);

  useEffect(() => {
    if (user) {
      dispatch(getUserCart());
    }
  }, [user]);

  const getUserfromLocalStorage = localStorage.getItem("user");
  useEffect(() => {
    let logoutTimer;

    if (getUserfromLocalStorage) {
      const userData = JSON.parse(getUserfromLocalStorage);
      if (user && userData.expirationTime) {
        const remainingTime =
          new Date(userData.expirationTime).getTime() - new Date().getTime();

        if (remainingTime <= 0) {
          dispatch(logout());
        } else {
          logoutTimer = setTimeout(() => {
            return dispatch(logout());
          }, remainingTime);
        }
      }
    } else {
      clearTimeout(logoutTimer);
    }
  }, [dispatch, getUserfromLocalStorage, user]);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/store" element={<Store />} />
          <Route path="/product/:id" element={<ProductDescription />} />

          <Route
            path="/admin/*"
            element={
              <PrivateRoute authorizedRoles={["admin"]}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/*"
            element={
              <PrivateRoute authorizedRoles={["admin", "user"]}>
                <UserDashBoard />
              </PrivateRoute>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/cart"
            element={
              <PrivateRoute authorizedRoles={["admin", "user"]}>
                <Cart />
              </PrivateRoute>
            }
          />
        </Routes>
      </LocalizationProvider>
    </>
  );
}

export default App;
