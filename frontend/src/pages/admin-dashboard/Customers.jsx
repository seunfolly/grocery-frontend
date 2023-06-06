import { useState, useEffect } from "react";
import {
  Stack,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "./Header";
import { DataGrid } from "@mui/x-data-grid";
import Table from "./Table";
import { useDispatch, useSelector } from "react-redux";
import makeToast from "../../utils/toaster";
import {
  getCustomers,
  resetState,
  deleteCustomer,
} from "../../features/customer/customerSlice";

const renderNameCell = (params) => {
  const { value, row } = params;
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Avatar alt="Remy Sharp" src={row.image} />

      <Typography variant="subtitle2" color=" #7d879c">
        {value}
      </Typography>
    </Stack>
  );
};

const Customers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      dispatch(getCustomers());
    };
    fetchData();
  }, []);
  const customerState = useSelector((state) => state.customer);
  const { isSuccess, isError, isLoading, deletedCustomer } = customerState;

  useEffect(() => {
    if (deletedCustomer) {
      makeToast("success", "Customer deleted successfully!");
      dispatch(getCustomers());
    }
    if (isError) {
      makeToast("error", "Something went wrong");
    }

    return () => {
      dispatch(resetState());
    };
  }, [deletedCustomer]);
  const customers = customerState.customers.map((customer) => ({
    id: customer?._id,
    name: `${customer?.firstName} ${customer?.lastName}`,
    email: customer?.email,
    phone: customer?.phone,
    image: "https://bazaar.ui-lib.com/assets/images/avatars/002-woman.svg",
    orders: customer?.orderCount,
    action: null,
  }));

  return (
    <Stack spacing={3} bgcolor="background.paper" py={3}>
      <Header
        title={"Customers"}
        placeholder="Search Customer..."
        button="Add Customer"
      />

      <Table>
        <DataGrid
          rows={customers}
          columns={[
            {
              field: "name",
              headerName: "Name",
              flex: 1,
              renderCell: renderNameCell,
            },
            {
              field: "phone",
              headerName: "Phone",
              width: 150,
            },
            {
              field: "email",
              headerName: "Email",
              flex: 1,
            },
            {
              field: "orders",
              headerName: "No Of Orders",
              headerAlign: "center",
              align: "center",
              width: 120,
            },

            {
              field: "action",
              headerName: "Action",
              width: 120,
              headerAlign: "center",
              align: "center",
              renderCell: ({ row }) => (
                <Stack direction="row">
                  <IconButton aria-label="Edit">
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    aria-label="Delete"
                    disabled={isLoading}
                    onClick={() => {
                      dispatch(deleteCustomer(row.id));
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              ),
            },
          ]}
        />
      </Table>
    </Stack>
  );
};

export default Customers;
