import { Box, Stack, Grid, Container } from "@mui/material";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import Categories from "../../components/layouts/Categories";
import DeliveryDate from "./DeliveryDate";
import DeliveryAddress from "./DeliveryAddress";
import PaymentDetails from "./PaymentDetails";
import OrderDetails from "./OrderDetails";


const Checkout = () => {
  return (
    <>
      <Header />
      <Categories />
      <Box
        sx={{
          bgcolor: "#F6F9FC",
          paddingY: "40px",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item sm={8}>
              <Stack spacing={4}>
                <DeliveryDate />
                <DeliveryAddress />
                <PaymentDetails />
              </Stack>
            </Grid>
            <Grid item sm={4}>
              <OrderDetails />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Checkout;
