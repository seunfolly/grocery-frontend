import { useState, useEffect } from "react";
import {
  Stack,
  Typography,
  IconButton,
  Chip,
  Switch,
  Grid,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "./Header";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Table from "./Table";
import makeToast from "../../utils/toaster";

import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  deleteProduct,
  resetState,
} from "../../features/product/productSlice";

const renderNameCell = (params) => {
  const { value, row } = params;

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <img src={row.image} alt={value} width={40} height={40} />{" "}
      <Stack>
        <Typography variant="subtitle2" color=" #7d879c">
          {value}
        </Typography>
        <Typography fontSize="12px">{row.id}</Typography>
      </Stack>
    </Stack>
  );
};

const Products = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      dispatch(getProducts());
    };
    fetchData();
  }, [searchQuery]);
  const productState = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, deletedProduct } = productState;

  useEffect(() => {
    if (deletedProduct) {
      makeToast("success", "Product deleted successfully!");
      dispatch(resetState());
      dispatch(getProducts());
    }
    if (isError) {
      makeToast("error", "Something went wrong");
    }
  }, [deletedProduct, isError]);

  const filteredProducts = productState.products.filter((product) =>
  product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  product.category.name.toLowerCase().includes(searchQuery.toLowerCase())||
  product.brand.name.toLowerCase().includes(searchQuery.toLowerCase())||
  product.productId.includes(searchQuery)
);

  const products = filteredProducts.map((product) => ({
    _id: product._id,
    id: product.productId,
    name: product.name,
    image: product?.images[0]?.url,
    category: product?.category?.name,
    brand: product?.brand?.name ? product.brand.name : "No Brand",
    publish: product.published,
    action: null,
    price: product.salePrice ? product.salePrice : product.regularPrice,
    stock: product?.stock,

  }));
  return (
    <Stack spacing={3} bgcolor="background.paper" py={3}>
      <Header
        title={"Product List"}
        placeholder="Search Product..."
        button="Add Product"
        route="product/create"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <Table>
        <DataGrid
          rows={products}
          columns={[
            {
              field: "name",
              headerName: "Name",
              flex: 1,
              renderCell: renderNameCell,
            },
            {
              field: "category",
              headerName: "Category",
              width: 150,
              renderCell: ({ value }) => (
                <Chip label={value} sx={{ height: "25px" }} />
              ),
            },
            {
              field: "brand",
              headerName: "Brand",
              width: 150,
              renderCell: ({ value }) => (
                <Chip label={value} sx={{ height: "25px" }} />
              ),
            },
            { field: "price", headerName: "Price", width: 150 },
            { field: "stock", headerName: "Stock", width: 100 },

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
              flex: 1,
              headerAlign: "center",
              align: "center",
              renderCell: ({ row }) => (
                <Stack direction="row">
                  <Link to={`/admin/product/${row._id}`}>
                    <IconButton aria-label="Edit">
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <Link to={`/product/${row._id}`}>
                    <IconButton aria-label="View">
                      <RemoveRedEyeIcon />
                    </IconButton>
                  </Link>
                  <IconButton
                    aria-label="Delete"
                    disabled={isLoading}
                    onClick={() => {
                      dispatch(deleteProduct(row._id));
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

export default Products;
