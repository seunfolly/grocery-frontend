import { Routes, Route } from "react-router-dom";
import { Box, Stack, Avatar, Grid, Container, IconButton } from "@mui/material";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import DashboardBox from "./DashboardBox";
import Profile from "./Profile";
import WishList from "./Wishlist";
import Orders from "./Orders";
import Order from "./Order";
import Addresses from "./Addresses";
import Address from "./Address";
import EditProfile from "./Edit-Profile";
import Payments from "./Payments";
import Payment from "./Payment";

const UserDashBoard = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          bgcolor: "#F6F9FC",
          paddingY: "40px",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item sm={3}>
              <DashboardBox />
            </Grid>

            <Grid item sm={9}>
              <Routes>
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/:id" element={<EditProfile />} />
                <Route path="/wishlist" element={<WishList />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/orders/:id" element={<Order />} />
                <Route path="/addresses" element={<Addresses />} />
                <Route path="/addresses/:id" element={<Address />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/payments/:id" element={<Payment />} />

              </Routes>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer/>
    </>
  );
};

export default UserDashBoard;
