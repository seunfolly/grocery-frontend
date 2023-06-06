import { useEffect, useRef } from "react";
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
  FormControlLabel,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  resetState,
} from "../../features/category/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import makeToast from "../../utils/toaster";

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
    dispatch(getCategories());
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
      resetFormRef.current();
      dispatch(resetState());
      dispatch(getCategories());
    }
    if (isSuccess && updatedCategory) {
      makeToast("success", "Category Updated Successfullly!");
      navigate("/admin/categories");
      dispatch(resetState());
    }
    if (isError) {
      makeToast("error", "Something went wrong");
      dispatch(resetState());
      dispatch(getCategories());
    }
  }, [isSuccess, isError, isLoading]);
  const initialValues = {
    name: categoryData?.name || "",
    isFeatured: categoryData?.isFeatured || false,
    parent: categoryData?.parent || "",
  };
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
              if (id !== "create") {
                const data = {
                  id: id,
                  categoryData: {
                    name: values.name,
                    isFeatured: values.isFeatured,
                  },
                };
                if (values.parent) {
                  data.categoryData.parent = values.parent;
                }
                dispatch(updateCategory(data));
              } else {
                const categoryData = {
                  name: values.name,
                  isFeatured: values.isFeatured,
                };
                if (values.parent) {
                  categoryData.parent = values.parent;
                }
                dispatch(createCategory(categoryData));
                resetFormRef.current = resetForm;
              }
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
                <Box
                  display="grid"
                  gap="20px"
                  rowGap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <CustomTextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    sx={{
                      gridColumn: "span 2",
                    }}
                    InputLabelProps={{
                      style: { fontSize: "15px" },
                    }}
                  />
                  <CustomTextField
                    select
                    label="Select Parent Category"
                    fullWidth
                    variant="outlined"
                    onChange={(event) => {
                      const selectedCategoryId = event.target.value;
                      setFieldValue("parent", selectedCategoryId);
                    }}
                    value={values.parent}
                    name="parent"
                    sx={{
                      gridColumn: "span 2",
                    }}
                    InputLabelProps={{
                      style: { fontSize: "15px" },
                    }}
                  >
                    {categories.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.isFeatured}
                      onChange={(e) => {
                        setFieldValue("isFeatured", e.target.checked);
                      }}
                      name="isFeatured"
                      sx={{
                        fontSize: "16px",
                        "&.Mui-checked": {
                          color: "#4e97fd",
                        },
                        "&:hover": {
                          color: "#4e97fd",
                        },
                        "& .MuiSvgIcon-root": { fontSize: 25 },
                        "& .MuiTypography-body1": {
                          fontSize: "16px",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography component="span" sx={{ fontSize: "15px" }}>
                      Featured Category
                    </Typography>
                  }
                />
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
