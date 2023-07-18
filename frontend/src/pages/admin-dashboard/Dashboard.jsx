import { useEffect } from "react";
import {
  Box,
  Stack,
  Grid,
  Typography,
  Paper,
  Button,
  Chip,
  IconButton,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link } from "react-router-dom";
import { mockData, mockData2 } from "./data";
import { DataGrid } from "@mui/x-data-grid";
import Table from "./Table";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../features/product/productSlice";
import { getOrders } from "../../features/order/orderSlice";

import { useNavigate } from "react-router-dom";

const orderColumns = [
  { field: "id", headerName: "Order ID", flex: 1 },
  {
    field: "qty",
    headerName: "Quantity",
    width: 70,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "status",
    headerName: "Payment",
    flex: 1,
    renderCell: ({ value }) => {
      return (
        <Box>
          {value === "Delivered" && (
            <Chip
              label={value}
              sx={{ color: "#33d067", bgcolor: "#e7f9ed", height: "25px" }}
            />
          )}
          {(value === "Pending" || value === "Cancelled") && (
            <Chip
              label={value}
              sx={{ color: "#e94560", bgcolor: "#ffeaea", height: "25px" }}
            />
          )}
          {(value === "Processing" || value === "Dispatched") && (
            <Chip
              label={value}
              sx={{ color: "#ffcd4e", bgcolor: "#FFF8E5", height: "25px" }}
            />
          )}
        </Box>
      );
    },
  },
  {
    field: "amount",
    headerName: "Amount",
    flex: 1,
    // headerAlign: "left",
    // align: "left",
  },
  {
    field: "action",
    headerName: "Action",
    // flex: 1,
    headerAlign: "center",
    align: "center",
    renderCell: ({ row }) => (
      <Stack direction="row">
        <Link to={`/admin/order/${row._id}`}>
          <IconButton aria-label="View">
            <RemoveRedEyeIcon />
          </IconButton>
        </Link>
      </Stack>
    ),
  },
];

const productColumns = [
  {
    field: "product",
    headerName: "Product",
    flex: 1,
  },
  {
    field: "stock",
    headerName: "Stock",
    flex: 0.5,
  },
  {
    field: "amount",
    headerName: "Amount",
    flex: 0.5,
  },
];

const Card1 = ({ name, amount, amount1, percentage, color }) => {
  return (
    <Stack
      bgcolor="white"
      borderRadius="10px"
      p={3.1}
      px={2}
      spacing={1}
      sx={{ boxShadow: " 0px 1px 3px rgba(3, 0, 71, 0.09)" }}
    >
      <Typography variant="subtitle1" color="text.secondary">
        {name}
      </Typography>
      <Typography variant="subtitle1" fontSize="20px" fontWeight="700">
        {amount}
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        color={color}
        alignItems="center"
      >
        <Typography color="text.secondary" fontSize="13.5px">
          {amount1}
        </Typography>

        <Typography fontSize="11px">{percentage}</Typography>
      </Stack>
    </Stack>
  );
};

const Card2 = ({ name, amount, percentage, Icon }) => {
  return (
    <Stack
      bgcolor="white"
      borderRadius="10px"
      height="100%"
      px={2}
      spacing={1}
      sx={{ boxShadow: " 0px 1px 3px rgba(3, 0, 71, 0.09)" }}
    >
      <Typography variant="subtitle1" color="text.secondary" pt={2}>
        {name}
      </Typography>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack spacing={0.5}>
          <Typography variant="subtitle1" fontSize="20px" fontWeight="700">
            {amount}
          </Typography>
          <Typography fontSize="12px" color="#4E97FD">
            {percentage}
          </Typography>
        </Stack>

        <Icon />
      </Stack>
    </Stack>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.product);
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getProducts());
      dispatch(getOrders());
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => product.stock <= 0);
  const productData = filteredProducts.map((product) => ({
    _id: product._id,
    id: product?.productId,
    product: product?.name,
    amount: product.salePrice
      ? `₦ ${product.salePrice.toLocaleString()}`
      : `₦ ${product.regularPrice.toLocaleString()}`,
    stock: product?.stock,
  }));
  const orderData = orders.map((order) => ({
    _id: order?._id,
    id: order?.orderId.substring(0, 8),
    qty: order?.products.reduce((sum, product) => sum + product.count, 0),
    amount: `₦ ${order?.totalPrice.toLocaleString()}`,
    status: order?.orderStatus,
    action: null,
  }));
  const filteredOrders = orders.filter((order) => order.isPaid === true);

  return (
    <Box bgcolor="background.paper" p={4}>
      <Grid container spacing={3}>
        <Grid item md={6}>
          <Stack
            flex={1}
            bgcolor="white"
            borderRadius="10px"
            p={4}
            pb={2.4}
            spacing={3}
            sx={{ boxShadow: " 0px 1px 3px rgba(3, 0, 71, 0.09)" }}
          >
            <Stack spacing={0.5}>
              <Typography
                variant="subtitle1"
                color="#4E97FD"
                fontSize="16px"
                textTransform="capitalize"
              >
                {`Welcome ${user?.fullName}`}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Here’s what happening with your store today!
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Stack spacing={2.5}>
                {/* <Stack>
                  <Typography
                    variant="subtitle1"
                    fontSize="20px"
                    fontWeight="700"
                  >
                    $15,350.25
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    Today’s Visit
                  </Typography>
                </Stack> */}
                <Stack>
                  <Typography
                    variant="subtitle1"
                    fontSize="20px"
                    fontWeight="700"
                  >
                    
                    {`₦ ${filteredOrders.reduce((sum, order) => sum + order.totalPrice, 0).toLocaleString()}`}

                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total sales
                  </Typography>
                </Stack>
              </Stack>

              <Box
                sx={{
                  width: "195px",
                  height: "auto",
                }}
              >
                <img
                  src="	https://bazaar.ui-lib.com/assets/images/illustrations/dashboard/welcome.svg"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Box>
            </Stack>
          </Stack>
        </Grid>

        <Grid item md={6}>
          <Grid container flex={1} spacing={3}>
            {mockData.map((item, index) => (
              <Grid key={index} item md={6}>
                <Card1 {...item} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Box>
        <Grid container flex={1} spacing={3} mt={1}>
          {mockData2.map((item, index) => (
            <Grid key={index} item md={3}>
              <Card2 {...item} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Grid container mt={3} spacing={3}>
        <Grid item md={7}>
          <Paper
            elevation={0}
            sx={{
              bgcolor: "white",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              p={3}
              alignItems="center"
            >
              <Typography variant="subtitle1" fontSize="16px">
                Recent Purchases
              </Typography>

              <Button
                onClick={() => navigate("/admin/orders")}
                variant="outlined"
                sx={{
                  textTransform: "none",
                  bgcolor: "transparent",
                  color: "#4E97FD",
                  fontSize: "13px",
                  borderColor: "#4E97FD",
                  paddingX: "15px",
                  fontWeight: 600,
                  paddingY: "3px",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "transparent",
                    borderColor: "#4E97FD",
                  },
                }}
              >
                All Orders
              </Button>
            </Stack>

            <Table>
              <DataGrid rows={orderData} columns={orderColumns} />
            </Table>
          </Paper>
        </Grid>

        <Grid item md={5}>
          <Paper
            elevation={0}
            sx={{
              bgcolor: "white",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              p={3}
              alignItems="center"
            >
              <Typography variant="subtitle1" fontSize="16px">
                Stock Out Products
              </Typography>

              <Button
                onClick={() => navigate("/admin/products")}
                variant="outlined"
                sx={{
                  textTransform: "none",
                  bgcolor: "transparent",
                  color: "#4E97FD",
                  fontSize: "13px",
                  borderColor: "#4E97FD",
                  paddingX: "15px",
                  fontWeight: 600,
                  paddingY: "3px",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "transparent",
                    borderColor: "#4E97FD",
                  },
                }}
              >
                All Products
              </Button>
            </Stack>

            <Table>
              <DataGrid rows={productData} columns={productColumns} />
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
