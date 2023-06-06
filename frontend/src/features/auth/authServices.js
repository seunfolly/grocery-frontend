import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const signup = async (user) => {
  const response = await axios.post(`${base_url}user/register`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const login = async (user) => {
  const response = await axios.post(`${base_url}user/login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const userCart = async (cart) => {
  // console.log(cart)
  const response = await axios.post(`${base_url}user/cart`, { cart }, config);
  return response.data;
};

const authService = {
  login,
  signup,
  userCart,
};

export default authService;
