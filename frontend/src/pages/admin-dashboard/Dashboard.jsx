import {
  Box,
  Stack,
  Grid,
  Typography,
  Paper,
  Button,
  Chip,
} from "@mui/material";
import { mockData, mockData2 } from "./data";
import { DataGrid } from "@mui/x-data-grid";
import Table from "./Table";
import { useSelector } from "react-redux";
const columns = [
  { field: "id", headerName: "Order ID", flex: 1 },
  { field: "product", headerName: "Product", flex: 1 },
  {
    field: "payment",
    headerName: "Payment",
    flex: 1,
    renderCell: ({ value }) => {
      return (
        <Box>
          {value === "Success" && (
            <Chip
              label={value}
              sx={{ color: "#33d067", bgcolor: "#e7f9ed", height: "25px" }}
            />
          )}
          {value !== "Success" && (
            <Chip
              label={value}
              sx={{ color: "#e94560", bgcolor: "#ffeaea", height: "25px" }}
            />
          )}
        </Box>
      );
    }
  },
  {
    field: "amount",
    headerName: "Amount",
    flex: 1,
    // headerAlign: "left",
    // align: "left",
  },
];

const columnPurchase = [
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

export const mockDataPurchase = [
  {
    id: "#6d3webo3",
    product: "Amazon Headphone",
    payment: "Success",
    amount: "$674",
  },
  {
    id: "#6d3gfdo1",
    product: "Black Pant",
    payment: "Pending",
    amount: "$240",
  },
  {
    id: "#6d3eedo4",
    product: "Jean Skirt",
    payment: "Pending",
    amount: "$446",
  },
  {
    id: "#6d3wedo3",
    product: "Aavic Headphone",
    payment: "Success",
    amount: "$674",
  },
  {
    id: "#6d3wedo1",
    product: "Jeans Pant",
    payment: "Pending",
    amount: "$245",
  },
  {
    id: "#6d3wedo4",
    product: "Polo T-shirt",
    payment: "Success",
    amount: "$356",
  },
];

export const mockDataProduct = [
  {
    id: "#6d3webo3",
    product: "Amazon Headphone",
    stock: "000",
    amount: "$674",
  },
  {
    id: "#6d3gfdo1",
    product: "Black Pant",
    stock: "000",
    amount: "$240",
  },
  {
    id: "#6d3eedo4",
    product: "Jean Skirt",
    stock: "000",
    amount: "$446",
  },
  {
    id: "#6d33ebo3",
    product: "Amazon Headphone",
    stock: "000",
    amount: "$674",
  },
  {
    id: "#6d3g3do1",
    product: "Black Pant",
    stock: "000",
    amount: "$240",
  },
  {
    id: "#6d3ee0o4",
    product: "Jean Skirt",
    stock: "000",
    amount: "$446",
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
  const { user } = useSelector((state) => state.auth);

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
              <Typography variant="subtitle1" color="#4E97FD" fontSize="16px" textTransform="capitalize">
                {`Welcome ${user?.fullName}`}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Here’s what happening with your store today!
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Stack spacing={2.5}>
                <Stack>
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
                </Stack>
                <Stack>
                  <Typography
                    variant="subtitle1"
                    fontSize="20px"
                    fontWeight="700"
                  >
                    $10,360.66
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    Today’s total sales
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
                  src= "	https://bazaar.ui-lib.com/assets/images/illustrations/dashboard/welcome.svg"
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
              <DataGrid rows={mockDataPurchase} columns={columns} />
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
              <DataGrid rows={mockDataProduct} columns={columnPurchase} />
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
