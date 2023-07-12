import { useEffect } from "react";
import {
  Box,
  Stack,
  Avatar,
  Container,
  IconButton,
  Typography,
  styled,
  Badge,
  Grid,
} from "@mui/material";
import Header from "../../components/layouts/Header";
import Category from "./Category";
import Shop from "./Shop";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetState } from "../../features/cart/cartSlice";
import { resetState as resetOrderState } from "../../features/order/orderSlice";
import { getCategories } from "../../features/category/categorySlice";
import {
  CategoryOutlined,
  PersonOutlineOutlined,
  HomeOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Homepage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const reference = queryParams.get("reference");
  const { products } = useSelector((state) => state.cart);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      // right: "-4x",
      // top: "-4px",
      backgroundColor: products.length > 0 ? "#D23F57" : "transparent",
      // border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 6px",
      color: "white",
    },
  }));

  useEffect(() => {
    if (reference) {
      dispatch(resetState());
      dispatch(resetOrderState());
    }
  }, [reference]);

  return (
    <Box>
      <Box
        display={{ xs: "flex", md: "none" }}
        sx={{
          position: "fixed",
          width: "100vw",
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: "space-around",
          alignItems: "center",
          zIndex: "1201",
          height: "64px",
          backgroundColor: "#fff",
          boxShadow: "0px 1px 4px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Link
          style={{
            textDecoration: "none",
            flex: "1 1 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#2b3445",
            flexDirection: "column",
          }}
        >
          <HomeOutlined />
          <Typography fontSize="13px">Home</Typography>
        </Link>
        <Link
          style={{
            textDecoration: "none",
            flex: "1 1 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#2b3445",
            flexDirection: "column",
          }}
        >
          {" "}
          <CategoryOutlined />
          <Typography fontSize="13px">Category</Typography>
        </Link>
        <Link
          style={{
            textDecoration: "none",
            flex: "1 1 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#2b3445",
            flexDirection: "column",
          }}
        >
          <StyledBadge
            badgeContent={products.reduce(
              (sum, product) => sum + product?.count,
              0
            )}
          >
            <ShoppingBagOutlined />
          </StyledBadge>

          <Typography fontSize="13px">Cart</Typography>
        </Link>
        <Link
          style={{
            textDecoration: "none",
            flex: "1 1 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#2b3445",
            flexDirection: "column",
          }}
        >
          <PersonOutlineOutlined />
          <Typography fontSize="13px">Account</Typography>
        </Link>
      </Box>

      <Header />
      <Box
        paddingTop={{ xs: "12px", sm: "30px" }}
        sx={{
          bgcolor: "#F6F9FC",
        }}
      >
        <Container maxWidth="lg">
          <Stack direction="row" position="relative">
            <Grid container spacing={{ xs: 0, md: 4 }} position="relative">
              <Grid item md={3}>
                <Category />
              </Grid>
              <Grid item xs={12} md={9}>
                <Shop />
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Homepage;
