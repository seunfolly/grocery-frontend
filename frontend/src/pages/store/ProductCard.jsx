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
import { Link } from "react-router-dom";
import { base_url } from "../../utils/baseUrl";
import makeToast from "../../utils/toaster";

const ProductCard = ({
  images,
  name,
  regularPrice,
  salePrice,
  star,
  cart,
  _id,
}) => {
  const [toggle, setToggle] = useState(false);
  const addToWishList = () => {
    axios
      .put(`${base_url}product/wishlist/${_id}`, null, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWZjYjY0N2E0NjAwZmY3ODdkMzVlYSIsImlhdCI6MTY4NTkwMTgyMywiZXhwIjoxNjg1OTg4MjIzfQ.PKKRF6IAhg5h60BNswWjoEfc5eioGvBQoAzB9i8OP7M`,
        },
      })
      .then((response) => {
        makeToast("success", "Product Added to WishList");
        setToggle(!toggle);
      })
      .catch((error) => {
        makeToast("error", "Something went wrong, Please try again");
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

      <Link
        to={`/product/${_id}`}
        style={{
          textDecoration: "none",
        }}
      >
        <Grid container alignItems="center">
          <Grid item sm={3}>
            <Box width="195px" height="195px">
              <img src={images[0].url} alt={name} style={{ width: "100%" }} />
            </Box>
          </Grid>
          <Grid item sm={9}>
            <Stack spacing={1.1}>
              <Typography variant="subtitle1" color="#373F50">
                {name}
              </Typography>
              <Rating name="simple-controlled" value={5} readOnly />
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
              <Button
                sx={{
                  textTransform: "none",
                  bgcolor: "primary.main",
                  color: "white",
                  fontSize: "14px",
                  paddingX: "20px",
                  fontWeight: 500,
                  paddingY: "8px",
                  alignSelf: "start",
                  "&:hover": {
                    backgroundColor: "#E3364E",
                  },
                }}
              >
                Add To Cart
              </Button>
              <Stack alignItems="center" direction="row" spacing={2}>
                <Button
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
                <Typography>3</Typography>

                <Button
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
          </Grid>
        </Grid>
      </Link>
    </Paper>
  );
};

export default ProductCard;
