import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Box, Drawer } from "@mui/material";
import Sidebar from "./SideBar";
import Toolbar from "./TopBar";
import Dashboard from "./Dashboard";
import Products from "./Products";
import ProductReviews from "./ProductReview";
import Categories from "./Categories";
import Brands from "./Brands";
import Orders from "./Orders";
import Customers from "./Customers";
import AddProduct from "./AddProduct";
import AddCategory from "./AddCategory";
import AddBrand from "./AddBrand";
import OrderDetails from "./OrderDetails";
import AddCollectionAddress from "./AddCollectionAddress";
import CollectionAddress from "./CollectionAddresses";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const AdminDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  return (
    <Box display={{xs:"block", lg:"flex"}} position="relative">
      <Box display={{ xs: "none", lg: "block" }}>
        <Sidebar />
      </Box>

      <Box flex={1} >
        <Toolbar handleDrawerOpen={handleDrawerOpen} />
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/product/:id" element={<AddProduct />} />
          <Route exact path="/product-reviews" element={<ProductReviews />} />
          <Route exact path="/categories" element={<Categories />} />
          <Route exact path="/category/:id" element={<AddCategory />} />
          <Route exact path="/brand/:id" element={<AddBrand />} />
          <Route exact path="/brands" element={<Brands />} />
          <Route exact path="/orders" element={<Orders />} />
          <Route exact path="/addresses" element={<CollectionAddress />} />
          <Route exact path="/address/:id" element={<AddCollectionAddress />} />
          <Route path="/order" element={<OrderDetails />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route exact path="/customers" element={<Customers />} />
        </Routes>
        {/* <Box>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box> */}

        
      </Box>

      <Drawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        anchor="left"
        sx={{
          zIndex: "1200",
          "& .MuiPaper-root": {
            backgroundColor: "#2B3445",
          },
        }}
      >
        <Sidebar handleDrawerClose={handleDrawerClose} />
      </Drawer>
    </Box>
  );
};

export default AdminDashboard;

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import { DataGrid } from '@mui/x-data-grid';

// const columns = [
//   { field: 'id', headerName: 'ID', width: 90 },
//   {
//     field: 'firstName',
//     headerName: 'First name',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'lastName',
//     headerName: 'Last name',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'age',
//     headerName: 'Age',
//     type: 'number',
//     width: 110,
//     editable: true,
//   },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//   },
// ];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

// export default function DataGridDemo() {
//   return (

//   );
// }
