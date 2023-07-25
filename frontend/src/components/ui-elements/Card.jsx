import { useState } from "react";
import axios from "axios";
import {
  Typography,
  Box,
  Stack,
  Tooltip,
  Button,
  IconButton,
  Rating,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQuantity } from "../../features/cart/cartSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import BlockIcon from "@mui/icons-material/Block";
import { base_url } from "../../utils/baseUrl";
import makeToast from "../../utils/toaster";
import { Link, useNavigate } from "react-router-dom";

const ICard = ({
  images,
  name,
  description,
  regularPrice,
  salePrice,
  stock,
  totalstar,
  _id,
}) => {
  const [toggle, setToggle] = useState(false);
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.cart);
  const product = products.find((product) => product.id === _id);
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: _id,
        image: images[0]?.url,
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
        makeToast("error", "You must be logged. Sign in");
      });
  };
  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: "#fff",
        height: "100%",
        margin: "auto",
        display: "flex",
        overflow: "hidden",
        borderRadius: "8px",
        position: "relative",
        flexDirection: "column",
        paddingBottom: 3,
      }}
    >
      <Link to={`/product/${_id}`} style={{ textDecoration: "none" }}>
        <img src={images[0]?.url} className="card-image" />
        {/* {images[0].url} */}
      </Link>

      <Link to={`/product/${_id}`} style={{ textDecoration: "none" }}>
        <Box px={2}>
          <Typography variant="body2" color="#373F50" textAlign="center">
            {name}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            textAlign="center"
            mt={1}
          >
            {description.length > 100
              ? `${description.substring(0, 85)}...`
              : description}
          </Typography>
        </Box>
      </Link>

      {stock > 0 ? (
        <Box
          mt={2}
          sx={{
            alignSelf: "center",
          }}
        >
          {product?.count > 0 ? (
            <Stack direction="row" spacing={2} alignItems="center">
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
        </Box>
      ) : (
        <Box
          mt={2}
          sx={{
            alignSelf: "center",
          }}
        >
          <Button
            disabled={true}
            sx={{
              textTransform: "none",
              bgcolor: "#0000001f",
              // color: "rgba(0, 0, 0, 0.26) !important",
              fontSize: "14px",
              paddingX: "20px",
              fontWeight: 500,
              paddingY: "8px",
              alignSelf: "start",
              borderRadius: "50px",
              gap: 1,
              cursor: "not-allowed",
            }}
          >
            <BlockIcon
              sx={{
                fontSize: "20px",
              }}
            />
            <Typography variant="subtitle1"> BACK SOON</Typography>{" "}
          </Button>
        </Box>
      )}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        px={2}
        mt={2}
      >
        <Stack spacing={0.2} direction="row">
          <Typography
            color="text.secondary"
            variant="subtitle2"
            fontSize="13px"
          >
            <del>{salePrice ? `₦${regularPrice.toLocaleString()}` : ""}</del>
          </Typography>
          <Typography color="primary.main" variant="subtitle1" fontSize="13px">
            {`₦${(salePrice ? salePrice : regularPrice).toLocaleString()}`}
          </Typography>
        </Stack>

        <Tooltip title={toggle ? "Remove from wishlist" : "Add to wishlist"}>
          <span>
            <IconButton
              onClick={() => addToWishList()}
              sx={{
                color: toggle ? "#D23F57" : "#00000042",
              }}
            >
              <FavoriteIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
      </Stack>
    </Paper>
  );
};

export default ICard;
