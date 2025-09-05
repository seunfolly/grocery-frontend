import { useEffect, useRef, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Routes, Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";

import Homepage from "./pages/homepage";
import Store from "./pages/store";
import UserDashBoard from "./pages/user-dashboard/index";
import AdminDashboard from "./pages/admin-dashboard";
import ProductDescription from "./pages/product-description";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Cart from "./pages/cart";
import NotFound from "./pages/NotFound";

import "@fortawesome/fontawesome-free/css/all.css";
import { Box } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { userCart, logout } from "./features/auth/authSlice";
import { getUserCart } from "./features/cart/cartSlice";

function PrivateRoute({ children, authorizedRoles }) {
  const user = useSelector((state) => state.auth.user);
  const isAuthorized = user && authorizedRoles.includes(user?.role);
  return isAuthorized ? <>{children}</> : <Navigate to="/login" />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  authorizedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (user && cart.products) {
      dispatch(userCart({ cart: cart.products }));
    }
  }, [dispatch, cart, user]);

  useEffect(() => {
    if (user) dispatch(getUserCart());
  }, [dispatch, user]);

  useEffect(() => {
    let logoutTimer;
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.expirationTime) {
        const remainingTime =
          new Date(userData.expirationTime).getTime() - new Date().getTime();

        if (remainingTime <= 0) {
          dispatch(logout());
        } else {
          logoutTimer = setTimeout(() => dispatch(logout()), remainingTime);
        }
      }
    }

    return () => clearTimeout(logoutTimer);
  }, [dispatch, user]);

  return isLoading ? (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src="https://bazaar.ui-lib.com/assets/images/bazaar-black-sm.svg"
        style={{ animation: "scaleAnimation 2s infinite" }}
        alt="Loading..."
      />
    </Box>
  ) : (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Routes>
        <Route path="/" element={<Homepage />} />
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

        <Route path="*" element={<NotFound />} />
      </Routes>
    </LocalizationProvider>
  );
}

export default App;
