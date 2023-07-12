import { useState } from "react";
import axios from "axios";
import {
  Box,
  Stack,
  Grid,
  IconButton,
  Button,
  Typography,
  Rating,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import { base_url } from "../../utils/baseUrl";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  addToCart,
  decreaseQuantity,
} from "../../features/cart/cartSlice";
import makeToast from "../../utils/toaster";

const ProductCard = ({
  images,
  name,
  regularPrice,
  salePrice,
  description,
  _id,
  totalstar,
}) => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.cart);
  const product = products.find((product) => product.id === _id);
  const auth = useSelector((state) => state.auth);
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
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWZjYjY0N2E0NjAwZmY3ODdkMzVlYSIsImlhdCI6MTY4NTkwMTgyMywiZXhwIjoxNjg1OTg4MjIzfQ.PKKRF6IAhg5h60BNswWjoEfc5eioGvBQoAzB9i8OP7M`,
        },
      })
      .then((response) => {
        // makeToast("success", "Product Added to WishList");
        setToggle(!toggle);
      })
      .catch((error) => {
        makeToast("error", "You must be logged. Sign in");
      });
  };
  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: "white",
        borderRadius: "8px",
        paddingY: 2,
        paddingX: 3,
        position: "relative",
      }}
    >
      <IconButton
        onClick={() => addToWishList()}
        sx={{
          position: "absolute",
          top: "15px",
          right: "15px",
          color: toggle ? "#D23F57" : "rgba(0, 0, 0, 0.54)",
        }}
      >
        {toggle ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>

      <Grid container alignItems="center">
        <Grid item sm={3}>
          <Link to={`/product/${_id}`} style={{ textDecoration: "none" }}>
            <Box width="195px" height="195px">
              <img src={images[0].url} alt={name} style={{ width: "100%" }} />
            </Box>
          </Link>
        </Grid>
        <Grid item sm={9}>
          <Stack spacing={1.1}>
            <Link to={`/product/${_id}`} style={{ textDecoration: "none" }}>
              <Typography variant="body2" color="#373F50">
                {name}
              </Typography>
            </Link>

            {/* <Rating value={totalstar || 0} readOnly />
             */}
            <Link to={`/product/${_id}`} style={{ textDecoration: "none" }}>
              <Typography variant="subtitle2" color="text.secondary" mt={1}>
                {description}
              </Typography>
            </Link>

            <Stack spacing={1} direction="row" mt={1} alignItems="center">
              <Typography color="primary.main" variant="subtitle1">
                {`₦ ${salePrice ? salePrice : regularPrice}`}
              </Typography>
              <Typography color="text.secondary" variant="subtitle1">
                <del>{salePrice ? `₦  ${regularPrice}` : ""}</del>
              </Typography>
              {product?.count > 0 ? (
                <Stack alignItems="center" direction="row" spacing={2}>
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

                  <Typography>{product?.count}</Typography>

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
              ) : (
                <Button
                  onClick={() => handleAddToCart()}
                  sx={{
                    textTransform: "none",
                    bgcolor: "primary.main",
                    color: "white",
                    fontSize: "14px",
                    paddingX: "20px",
                    fontWeight: 500,
                    paddingY: "8px",
                    alignSelf: "start",
                    borderRadius: "50px",
                    gap: 1,

                    "&:hover": {
                      backgroundColor: "#E3364E",
                    },
                  }}
                >
                  <ShoppingCartOutlinedIcon
                    sx={{
                      fontSize: "20px",
                    }}
                  />
                  <Typography variant="subtitle1"> Add To Cart</Typography>{" "}
                </Button>
              )}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProductCard;
