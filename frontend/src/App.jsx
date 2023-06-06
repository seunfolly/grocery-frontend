import { useEffect,useRef, useMemo } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import Store from "./pages/store";
import UserDashBoard from "./pages/user-dashboard/index";
import AdminDashboard from "./pages/admin-dashboard";
import Checkout from './pages/checkout';
import ProductDescription from './pages/product-description';
import "@fortawesome/fontawesome-free/css/all.css";
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import { useDispatch,useSelector } from 'react-redux';
import {userCart}from './features/auth/authSlice';
import {getUserCart} from "./features/cart/cartSlice"



function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart); 
  // const cartState = localStorage.getItem('cartState'); 
  const isInitialMount = useRef(true);
useEffect(() => {
  if (isInitialMount.current) {
    isInitialMount.current = false;
    // dispatch(getUserCart())
    return;
  }

  dispatch(userCart(cart.products));
}, [dispatch,cart]);

  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route path="/store" element={<Store />} />
      <Route path="/product/:id" element={<ProductDescription />} />
      <Route path="/user/*" element={<UserDashBoard/>} />
      <Route path="/admin/*" element={<AdminDashboard/>} />
      <Route path="/checkout" element={<Checkout/>} />
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/reset-password' element={<ResetPassword/>}/>

    </Routes>
    </LocalizationProvider>
   
      
    </>
  );
}

export default App;
