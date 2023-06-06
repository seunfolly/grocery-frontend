import { useState } from "react";
import { Stack, Typography, IconButton, Paper, Switch } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import Table from "./Table";
const renderNameCell = (params) => {
  const { value, row } = params;
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <img src={row.image} alt={value} width={40} height={40} />{" "}
      <Typography variant="subtitle2" color=" #7d879c">
        {value}
      </Typography>
    </Stack>
  );
};
const products = [
  {
    id: "#6d3eedo4",
    name: "ASUS ROG Strix G15",
    customer: "Bruce Runolfsson",
    image: "https://bazaar.ui-lib.com/assets/images/products/blu-tshirt.png",
    comment: "But I must explain to you how all this of denouncing ,",
    publish: false,
    action: null,
  },
  {
    id: "#6d3eedo5",
    name: "Cafe Torrefaction Fraiche",
    customer: "Lucas Herzog",
    image: "https://bazaar.ui-lib.com/assets/images/products/blu-tshirt.png",
    comment: "But I must explain to you how all this of denouncing pleasure",
    publish: true,
    action: null,
  },
];
const columns = [
  { field: "name", headerName: "Name", flex: 1, renderCell: renderNameCell },
  {
    field: "customer",
    headerName: "Customer",
    flex: 0.5,
  },
  {
    field: "comment",
    headerName: "Comment",
    flex: 1,
    cellClassName: "comment-column--cell",
  },
  {
    field: "publish",
    headerName: "Published",
    width: 120,

    renderCell: ({ value, row }) => {
      const [checked, setChecked] = useState(value);

      const handleSwitchChange = () => {
        const updatedRow = { ...row, publish: !checked };
        setChecked(!checked);
      };

      return (
        <Switch
          checked={checked}
          onChange={handleSwitchChange}
          sx={{
            "& .MuiSwitch-thumb": {
              color: "#2756b6",
            },
            "& .Mui-checked+.MuiSwitch-track": {
              backgroundColor: "#4e97fd !important",
            },
          }}
        />
      );
    },
  },

  {
    field: "action",
    headerName: "Action",
    width: 100,
    headerAlign: "center",
    align: "center",
    renderCell: ({ row }) => (
      <IconButton aria-label="Delete">
        <DeleteIcon />
      </IconButton>
    ),
  },
];
const ProductReviews = () => {
  return (
    <Stack spacing={3} bgcolor="background.paper" py={4}>
      <Typography variant="h6" fontSize="21px" px={3}>
        Product Reviews
      </Typography>
      <Paper elevation={0}>
        <Table>
          <DataGrid
            rows={products}
            columns={columns}
            style={{ height: "100%" }}
          />
        </Table>
      </Paper>
    </Stack>
  );
};

export default ProductReviews;
