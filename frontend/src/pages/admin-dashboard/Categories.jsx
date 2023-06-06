import { useState, useEffect } from "react";
import { Stack, Typography, IconButton, Chip, Switch } from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "./Header";
import { DataGrid } from "@mui/x-data-grid";
import Table from "./Table";
import { useDispatch, useSelector } from "react-redux";
import makeToast from "../../utils/toaster";
import {
  getCategories,
  deleteCategory,
  resetState,
} from "../../features/category/categorySlice";

const Categories = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getCategories());
    };
    fetchData();
  }, []);

  const categoryState = useSelector((state) => state.category);
  const { isSuccess, isError, isLoading, deletedCategory } = categoryState;

  useEffect(() => {
    if (deletedCategory) {
      makeToast("success", "Category deleted successfully!");
      dispatch(getCategories());
    }
    if (isError) {
      makeToast("error", "Something went wrong");
    }

    return () => {
      dispatch(resetState());
    };
  }, [deletedCategory]);
  const categories = categoryState.categories.map((category) => ({
    _id: category._id,
    id: category.categoryId,
    name: category.name,
    level: category.level,
    featured: category.isFeatured,
    action: null,
  }));
  
  return (
    <Stack spacing={3} bgcolor="background.paper" py={3}>
      <Header
        title={"Category List"}
        placeholder="Search Category..."
        button="Add Category"
        route="category/create"
      />

      <Table>
        <DataGrid
          rows={categories}
          columns={[
            { field: "id", headerName: "ID", width: 250 },
            {
              field: "name",
              headerName: "Name",
              width: 150,
              renderCell: ({ value }) => (
                <Chip label={value} sx={{ height: "25px" }} />
              ),
            },
            {
              field: "level",
              headerName: "Level",
              width: 150,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "featured",
              headerName: "Featured",
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
                  <Link to={`/admin/category/${row._id}`}>
                    <IconButton aria-label="Edit">
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <IconButton
                    aria-label="Delete"
                    disabled={isLoading}
                    onClick={() => {
                      dispatch(deleteCategory(row._id));
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

export default Categories;
