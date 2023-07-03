import { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Box, Stack, Button, Container } from "@mui/material";
import DashboardBox from "./DashboardBox";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import OrderedProducts from "./OrderedProducts";
import Delivery from "./Delivery";
import { base_url } from "../../utils/baseUrl";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Order = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  const getOrder = () => {
    axios
      .get(`${base_url}user/order/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getOrder();
  }, []);
  return (
    <Box>
      <Stack flex={1} spacing={3}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" spacing={1.5}>
            <ShoppingBagIcon
              sx={{
                color: "primary.main",
              }}
            />
            <Typography variant="h5" color="text.primary">
              Order Details
            </Typography>
          </Stack>

          <Button
            sx={{
              textTransform: "none",
              bgcolor: "#FCE9EC",
              color: "primary.main",
              fontSize: "subtitle1",
              paddingX: "35px",
              fontWeight: 600,
              paddingY: "6px",
              "&:hover": {
                backgroundColor: "rgba(210, 63, 87, 0.04)",
              },
            }}
          >
            Order Again
          </Button>
        </Stack>
        <Delivery />

        <OrderedProducts order={order} />

        <Stack spacing={3} direction="row">
          <Stack
            spacing={2}
            flex={1}
            py={3}
            px={5}
            borderRadius={3}
            sx={{
              background: "white",
              alignSelf: "start",
              boxShadow: " 0px 1px 3px rgba(3, 0, 71, 0.09)",
            }}
          >
            <Typography variant="h6" color="text.primary">
              Shipping Address
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.primary"
              textTransform="capitalize"
            >
              {`${order?.address.address} ${order?.address.state}`}
            </Typography>
          </Stack>

          <Stack
            spacing={3}
            flex={1}
            py={3}
            px={5}
            borderRadius={3}
            sx={{
              background: "white",

              boxShadow: " 0px 1px 3px rgba(3, 0, 71, 0.09)",
            }}
          >
            <Typography variant="h6" color="text.primary">
              Total Summary
            </Typography>
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle2" color="text.secondary">
                  Subtotal:
                </Typography>
                <Typography variant="subtitle1" color="text.primary">
                  {`₦ ${order?.totalPrice}`}
                </Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle2" color="text.secondary">
                  Shipping Fee:
                </Typography>
                <Typography variant="subtitle1" color="text.primary">
                ₦ 0.00
                </Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle2" color="text.secondary">
                  Discount:
                </Typography>
                <Typography variant="subtitle1" color="text.primary">
                ₦ 0.00
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" color="text.primary">
                Total:
              </Typography>
              <Typography variant="subtitle1" color="text.primary">
                {`₦ ${order?.totalPrice}`}
              </Typography>
            </Stack>

            <Typography
              variant="subtitle2"
              color="text.primary"
              textTransform="capitalize"
            >
                          {order?.isPaid ? `Paid by ${order?.paymentMethod}` : "Pending"}

            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Order;
