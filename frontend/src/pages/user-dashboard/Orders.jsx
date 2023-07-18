import { useEffect } from "react";
import { Typography, Box, Stack, IconButton, Paper, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import EastIcon from "@mui/icons-material/East";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../features/auth/authSlice";

const Order = ({ _id, orderId, orderStatus, orderDate, totalPrice }) => {
  return (
    <Link
      to={`/user/orders/${_id}`}
      style={{
        textDecoration: "none",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          paddingX: 2,
          paddingY: 1.5,
          display: "flex",
          bgcolor: "white",
          borderRadius: "10px",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle1" flex="1 1 0">
          {orderId.substring(0, 8)}
        </Typography>
        <Box flex="1 1 0">
          <Chip
            label={orderStatus}
            sx={{
              height: "25px",
            }}
          />
        </Box>

        <Typography
          variant="subtitle2"
          flex="1 1 0"
          marginLeft="40px"
          sx={{
            marginLeft: "40px",
          }}
        >
          {new Date(orderDate).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </Typography>
        <Typography variant="subtitle2" flex="1 1 0" marginLeft="40px">
          {`₦ ${totalPrice.toLocaleString()}`}
        </Typography>

        <Typography>
          <IconButton>
            <EastIcon />
          </IconButton>
        </Typography>
      </Paper>
    </Link>
  );
};

const Orders = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.auth);
  useEffect(() => {
    const getUserOrders = async () => {
      dispatch(getOrders());
    };
    getUserOrders();
  }, []);

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2} alignItems="center">
          <ShoppingBagIcon
            sx={{
              color: "#D23F57",
              fontSize: "30px",
            }}
          />

          <Typography variant="h5" fontSize="23px">
            My Orders
          </Typography>
        </Stack>
      </Stack>

      <Box display="flex" px={2} color="#7d879c">
        <Typography variant="body2" flex="1 1 0">
          Order#
        </Typography>
        <Typography variant="body2" flex="1 1 0">
          Status
        </Typography>
        <Typography variant="body2" flex="1 1 0">
          Date Purchased
        </Typography>
        <Typography variant="body2" flex="1 1 0">
          Total
        </Typography>
      </Box>

      <Stack spacing={2}>
        {orders.map((order, index) => (
          <Order {...order} key={index} />
        ))}
      </Stack>
    </Stack>
  );
};

export default Orders;
