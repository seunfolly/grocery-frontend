import { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Stack, Button, Grid } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { arrivalData } from "../homepage/Carousel";
import ICard from "../../components/ui-elements/Card";
import { useSelector } from "react-redux";
import { base_url } from "../../utils/baseUrl";

const WishList = () => {
  const [products, setProducts] = useState([]);
  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  const getWishList = () => {
    axios
      .get(`${base_url}user/wishlist`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((response) => {
        setProducts(response.data.wishlist);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getWishList();
  }, [user]);
  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2} alignItems="center">
          <FavoriteIcon
            sx={{
              color: "#D23F57",
              fontSize: "30px",
            }}
          />

          <Typography variant="h5" fontSize="23px">
            My WishList
          </Typography>
        </Stack>

        <Button
          sx={{
            textTransform: "none",
            bgcolor: "#FCE9EC",
            color: "primary.main",
            fontSize: "subtitle2",
            paddingX: "40px",
            fontWeight: 600,
            paddingY: "6px",
            "&:hover": {
              backgroundColor: "rgba(210, 63, 87, 0.04)",
            },
          }}
        >
          Add All To Cart
        </Button>
      </Stack>

      <Grid
        container
        spacing={3}
        sx={{
          marginLeft: "-24px !important",
        }}
      >
        {products.map((item) => (
          <Grid item xs={4}>
            <ICard {...item} />
          </Grid>
        ))}
        <Grid></Grid>
      </Grid>
    </Stack>
  );
};

export default WishList;
