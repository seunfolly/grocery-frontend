import { useEffect, useRef, useState } from "react";
import {
  Box,
  Paper,
  Stack,
  TextField,
  styled,
  MenuItem,
  Typography,
  Button,
  Checkbox,
  IconButton,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { base_url } from "../../utils/baseUrl";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  resetState,
} from "../../features/category/categorySlice";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import makeToast from "../../utils/toaster";
import Dropdown from "./DropDown";
const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "&.Mui-focused fieldset": {
      borderColor: "#4e97fd",
    },
  },
});

const AddCategory = () => {
  const { id } = useParams();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [categoryLevels, setCategoryLevels] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const dispatch = useDispatch();
  const categoryState = useSelector((state) => state.category);
  const {
    categories,
    isSuccess,
    isError,
    isLoading,
    createdCategory,
    updatedCategory,
    categoryData,
  } = categoryState;
  const resetFormRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategories(1));
  }, [dispatch]);

  useEffect(() => {
    if (id !== "create") {
      dispatch(getCategory(id));
    } else {
      dispatch(resetState());
    }
  }, [id]);
  useEffect(() => {
    if (isSuccess && createdCategory) {
      makeToast("success", "Category Added Sucessfully!");
      setCategoryLevels([]);
      setSelectedCategories([]);
      resetFormRef.current();
      dispatch(resetState());
      dispatch(getCategories(1));

      // window.location.reload();
    }
    if (isSuccess && updatedCategory) {
      makeToast("success", "Category Updated Successfullly!");
      navigate("/admin/categories");
      dispatch(resetState());
    }
    if (isError) {
      makeToast("error", "Something went wrong");
      dispatch(resetState());
      dispatch(getCategories(1));
    }
  }, [isSuccess, isLoading]);
  const initialValues = {
    name: "",
    parent: "",
  };
  useEffect(() => {
    if (categories.length > 0) {
      setCategoryLevels([categories]);
    }
  }, [categories]);

  return (
    <Box
      bgcolor="background.paper"
      p={4}
      sx={{
        height: "calc(100vh - 75px)",
        boxSizing: "border-box",
      }}
    >
      <Stack spacing={3}>
        <Typography variant="h6" fontSize="21px">
          {id === "create" ? "Create Category" : "Edit Category"}
        </Typography>
        <Paper
          elevation={0}
          sx={{
            borderRadius: "8px",
            bgcolor: "white",
            padding: 6,
            display: "flex",
            gap: "20px",
            flexDirection: "column",
          }}
        >
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              const categoryData = { name: values.name };
              if (values.parent) {
                categoryData.parent = values.parent;
              }
              dispatch(createCategory(categoryData));
              resetFormRef.current = resetForm;

              // if (id !== "create") {
              //   const data = {
              //     id: id,
              //     categoryData: {
              //       name: values.name,
              //       isFeatured: values.isFeatured,
              //     },
              //   };
              //   if (values.parent) {
              //     data.categoryData.parent = values.parent;
              //   }
              //   dispatch(updateCategory(data));
              // } else {
              //   const categoryData = {
              //     name: values.name,
              //     isFeatured: values.isFeatured,
              //   };
              // if (values.parent) {
              //   categoryData.parent = values.parent;
              // }
              // dispatch(createCategory(categoryData));
              // resetFormRef.current = resetForm;
              // }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
              isValid,
              dirty,
            }) => (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Box display="flex" gap="20px" flexWrap="wrap">
                 
                  <Dropdown
                    setCategoryLevels={setCategoryLevels}
                    setSelectedCategories={setSelectedCategories}
                    setFieldValue={setFieldValue}
                    categoryLevels={categoryLevels}
                    selectedCategories={selectedCategories}
                    field="parent"


                  />
                   <CustomTextField
                    variant="outlined"
                    type="text"
                    label="Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    InputLabelProps={{
                      style: { fontSize: "15px" },
                    }}
                    sx={{
                      width: "250px",
                    }}
                  />
                </Box>
                <Button
                  type="submit"
                  sx={{
                    textTransform: "none",
                    bgcolor: "#4e97fd",
                    color: "white",
                    fontSize: "14px",
                    paddingX: "15px",
                    fontWeight: 400,
                    paddingY: "5px",
                    alignSelf: "start",
                    borderRadius: "8px",
                    alignItems: "center",

                    "&:hover": {
                      backgroundColor: "#2756b6",
                    },
                  }}
                >
                  Save Category{" "}
                </Button>
              </form>
            )}
          </Formik>
        </Paper>
      </Stack>
    </Box>
  );
};
const validationSchema = yup.object({
  name: yup
    .string()
    .required("required")
    .min(3, "Name must be at least 3 characters"),
});
export default AddCategory;
