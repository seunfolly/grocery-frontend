import { useEffect, useState } from "react";
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
  Drawer,
} from "@mui/material";
import Header from "../../components/layouts/Header";
import Category from "./Category";
import Shop from "./Shop";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetState } from "../../features/cart/cartSlice";
import { resetState as resetOrderState } from "../../features/order/orderSlice";
import { getCategories } from "../../features/category/categorySlice";
import { getProducts } from "../../features/product/productSlice";

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
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const queryParams = new URLSearchParams(location.search);
  const reference = queryParams.get("reference");
  const { products } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);

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
    dispatch(getCategories(1));
    dispatch(getProducts());

 }, [dispatch]);

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
          zIndex: "1000",
          height: "64px",
          backgroundColor: "#fff",
          boxShadow: "0px 1px 4px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Link
          to="/"
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
        <IconButton
          component="span"
          onClick={handleDrawerOpen}
          style={{
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
        </IconButton>
        <IconButton
          component="span"
          onClick={() => navigate("/cart")}
          disabled={products.length < 1}
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
        </IconButton>
        {user && (
          <Link
            to="/user/profile"
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
            <Typography fontSize="13px" textTransform="capitalize">{`${
              user?.fullName.split(" ")[0]
            }`}</Typography>
          </Link>
        )}
      </Box>

      <Drawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        anchor="left"
        bgcolor="white"
        sx={{
          zIndex: "1200",
          "& .MuiPaper-root": {
            backgroundColor: "white",
          },
        }}
      >
        <Box
          bgcolor="white"
          py={3}
          px={2.2}
          borderRadius="5px"
          sx={{
            width: "250px",
            height: "100vh",

            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: "5px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#ebeff7",
              borderRadius: "100px",
            },
          }}
        >
          <Category />
        </Box>
      </Drawer>

      <Header />
      <Box
        paddingTop={{ xs: "12px", sm: "30px" }}
        paddingBottom={{ xs: "90px", md: "30px" }}
        sx={{
          bgcolor: "#F6F9FC",
        }}
      >
        <Container maxWidth="lg">
          <Stack direction="row" position="relative">
            <Grid container spacing={{ xs: 0, md: 4 }} position="relative">
              <Grid item md={3} display={{ xs: "none", md: "block" }}>
                <Box
                  bgcolor="white"
                  py={3}
                  px={2.2}
                  borderRadius="5px"
                  sx={{
                    // width: "278px",
                    // minWidth: "278px",
                    height: "calc(100vh - 140px)",
                    boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.09)",
                    position: "sticky",
                    top: "80px",
                    overflowY: "scroll",
                    "&::-webkit-scrollbar": {
                      width: "5px",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "transparent",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "#ebeff7",
                      borderRadius: "100px",
                    },
                  }}
                >
                  <Category />
                </Box>
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
