import { useState } from "react";
import axios from "axios";
import {
  Typography,
  Box,
  Stack,
  Button,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Rating,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQuantity } from "../../features/cart/cartSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { base_url } from "../../utils/baseUrl";
import makeToast from "../../utils/toaster";

const ICard = ({ images, name, regularPrice, salePrice, star, _id, cart }) => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.cart);
  const product = products.find((product) => product.id === _id);
  const auth = useSelector((state) => state.auth);
  const {  user } = auth;
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: _id,
        image: images[0].url,
        price: salePrice ? salePrice : regularPrice,
        name: name,
      })
    );
    makeToast("success", "Added to Cart");
  };

  const handleRemoveCart = () => {
    dispatch(decreaseQuantity(_id));
    makeToast("error", "Remove from Cart");
  };
  const addToWishList = () => {
    axios
      .put(`${base_url}product/wishlist/${_id}`, null, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((response) => {
        // makeToast("success", "Product Added to WishList");
        setToggle(!toggle);
      })
      .catch((error) => {
        makeToast("error", "Login to Add Product to WishList");
      });
  };
  return (
    <Box>
      <Card
        sx={{ borderRadius: "9px", bgcolor: "white", position: "relative" }}
      >
        <Typography
          color="white"
          bgcolor="primary.main"
          borderRadius="16px"
          px="15px"
          py="5px"
          fontSize="10px"
          position="absolute"
          top="10px"
          left="10px"
        >
          10% off
        </Typography>
        <IconButton
          onClick={() => addToWishList()}
          sx={{
            position: "absolute",
            top: "3px",

            right: "3px",
            color: toggle ? "#D23F57" : "rgba(0, 0, 0, 0.54)",
          }}
        >
          {toggle ? (
            <FavoriteIcon fontSize="10px" />
          ) : (
            <FavoriteBorderIcon fontSize="10px" />
          )}
        </IconButton>
        {/* <Link to={`/product/${_id}`} style={{ textDecoration: "none" }}> */}
        <CardMedia
          sx={{ height: 320 }}
          image={images[0] ? images[0].url : ""}
        />
        <CardContent
          sx={{
            bgcolor: "white",
            paddingTop: "10px",
          }}
        >
          <Stack direction="row" justifyContent="space-between">
            <Stack spacing={1}>
              <Typography variant="subtitle1" color="#373F50">
                {name}
              </Typography>
              {star && <Rating name="simple-controlled" value={5} readOnly />}
              <Stack spacing={1} direction="row">
                <Typography
                  color="primary.main"
                  variant="subtitle1"
                  fontSize="13px"
                >
                  {`₦ ${salePrice ? salePrice : regularPrice}`}
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="subtitle2"
                  fontSize="13px"
                >
                  <del>{salePrice ? `₦  ${regularPrice}` : ""}</del>
                </Typography>
              </Stack>
            </Stack>
            <Stack alignItems="center">
              {product?.count > 0 && (
                <Button
                  onClick={() => handleRemoveCart()}
                  variant="outlined"
                  sx={{
                    padding: "1px",
                    minWidth: 0,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <RemoveIcon />
                </Button>
              )}
              {product?.count && product?.count > 0 ? (
                <Typography>{product?.count}</Typography>
              ) : null}

              <Button
                onClick={() => handleAddToCart()}
                variant="outlined"
                sx={{
                  padding: "1px",
                  minWidth: 0,
                }}
              >
                <AddIcon />
              </Button>
            </Stack>
          </Stack>
        </CardContent>
        {/* </Link> */}
      </Card>
    </Box>
  );
};

export default ICard;
