import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const getUserCart = async () => {
  const response = await axios.get(`${base_url}user/cart`, config);
  const obj = {
    cartTotal: response.data.cartTotal,
    products: response.data.products.map((product) => ({
      price: product.price,
      id: product.id._id,
      image: product.image,
      total: product.total,
      count: product.count,
    })),
  };
  return obj;
};

const cartService = {
  getUserCart,
};

export default cartService;
