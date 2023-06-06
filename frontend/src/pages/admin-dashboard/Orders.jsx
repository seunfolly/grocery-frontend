import { Stack, Typography, IconButton, Chip, Box } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "./Header";
import { DataGrid } from "@mui/x-data-grid";
import Table from "./Table";

const products = [
  {
    id: "6d3eedo4",
    qty: 3,
    date: "10 Nov 2020",
    address: "Kelly Williams 777 Brockton Avenue",
    amount: "$340.00",
    status: "Pending",
    action: null,
  },
  {
    id: "#6d00edo4",
    qty: 5,
    date: "10 Nov 2020",
    address: "Kelly Williams 777 Brockton Avenue",
    amount: "$112.00",
    status: "Delivered",
    action: null,
  },
  {
    id: "#6d3e4do4",
    qty: 2,
    date: "10 Nov 2020",
    address: "Kelly Williams 777 Brockton Avenue",
    amount: "$450.40",
    status: "Processing",
    action: null,
  },
];
const columns = [
  { field: "id", headerName: "Order ID", width: 150 },
  {
    field: "qty",
    headerName: "Qty",
  },
  {
    field: "date",
    headerName: "Purchase Date",
    width: 150,
    headerAlign: "center",
    align: "center",
  },

  {
    field: "address",
    headerName: "Billing Address",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "amount",
    headerName: "Amount",
  },
  {
    field: "status",
    headerName: "Status",
    // flex: 1,
    renderCell: ({ value }) => {
      return (
        <Box>
          {value === "Delivered" && (
            <Chip
              label={value}
              sx={{ color: "#33d067", bgcolor: "#e7f9ed", height: "25px" }}
            />
          )}
          {value === "Pending" && (
            <Chip
              label={value}
              sx={{ color: "#4E97FD", bgcolor: "#DBF0FE", height: "25px" }}
            />
          )}
          {value === "Processing" && (
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
    field: "action",
    headerName: "Action",
    // flex: 1,
    headerAlign: "center",
    align: "center",
    renderCell: ({ row }) => (
      <Stack direction="row">
        <Link to={`/admin/order/${row.id}`}>
        <IconButton aria-label="View">
          <RemoveRedEyeIcon />
        </IconButton>
        </Link>
       
        <IconButton aria-label="Delete">
          <DeleteIcon />
        </IconButton>
      </Stack>
    ),
  },
];

const Orders = () => {
  return (
    <Stack spacing={3} bgcolor="background.paper" py={3}>
      <Header
        title={"Order List"}
        placeholder="Search Order..."
        button="Create Order"
      />

      <Table>
        <DataGrid rows={products} columns={columns} />
      </Table>
    </Stack>
  );
};

export default Orders;
