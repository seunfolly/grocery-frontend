import { useEffect } from "react";
import { Box, Stack, Avatar, Container, IconButton } from "@mui/material";
import Header from "../../components/layouts/Header";
import Category from "./Category";
import Shop from "./Shop";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetState } from "../../features/cart/cartSlice";
import { resetState as resetOrderState } from "../../features/order/orderSlice";

const Homepage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const reference = queryParams.get("reference");
 useEffect(() => {
   if(reference) {
    dispatch(resetState());
    dispatch(resetOrderState());
   }
 },[reference])

  return (
    <>
      <Header />
      <Box
        sx={{
          bgcolor: "#F6F9FC",
          paddingTop: "30px",
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4} direction="row" position="relative">
            <Category />
            <Shop />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Homepage;
