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
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ImageUpload from "./ImageUpload";
import { Formik } from "formik";
import * as yup from "yup";
import {
  createProducts,
  resetState,
  getProduct,
  updateProduct,
} from "../../features/product/productSlice";
import { getCategories } from "../../features/category/categorySlice";
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

const AddProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const newProduct = useSelector((state) => state.product);
  const categoriesState = useSelector((state) => state.category.categories);
  const {
    isSuccess,
    isError,
    isLoading,
    createdProduct,
    updatedProduct,
    productData,
  } = newProduct;
  const resetFormRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    if (id !== "create") {
      dispatch(getProduct(id));
    } else {
      dispatch(resetState());
    }
  }, [id]);

  useEffect(() => {
    if (isSuccess && createdProduct) {
      makeToast("success", "Product Added Sucessfully!");
      resetFormRef.current();
      dispatch(resetState());
    }
    if (isSuccess && updatedProduct) {
      makeToast("success", "Product Updated Successfullly!");
      navigate("/admin/products");
      dispatch(resetState());
    }
    if (isError) {
      makeToast("error", "Something went wrong");
      dispatch(resetState());
    }
  }, [isSuccess, isError, isLoading]);

  const initialValues = {
    name: productData?.name || "",
    description: productData?.description || "",
    stock: productData?.stock || 0,
    regularPrice: productData?.regularPrice || 0,
    salePrice: productData?.salePrice || 0,
     tags: productData?.tags || [],
    category: productData?.category?._id || "",
    images: [],
  };

  return (
    <Box bgcolor="background.paper" p={4}>
      <Stack spacing={3}>
        <Typography variant="h6" fontSize="21px">
          {id === "create" ? "Add New Product" : "Edit Product"}
        </Typography>
        <Paper
          elevation={0}
          sx={{
            borderRadius: "8px",
            bgcolor: "white",
            padding: 6,
          }}
        >
          <Formik
            enableReinitialize={true}
            onSubmit={(values, { resetForm }) => {
              if (id !== "create") {
                const data = { id: id, productData: values };

                dispatch(updateProduct(data));
                resetFormRef.current = resetForm;
              } else {
                dispatch(createProducts(values));
                resetFormRef.current = resetForm;
              }
            }}
            initialValues={initialValues}
            validationSchema={productSchema}
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
              <form onSubmit={handleSubmit}>
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
                    label="Select Category"
                    fullWidth
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={(event) => {
                      const selectedCategoryId = event.target.value;
                      setFieldValue("category", selectedCategoryId);
                    }}
                    value={values.category}
                    name="category"
                    error={!!touched.category && !!errors.category}
                    helperText={touched.category && errors.category}
                    sx={{
                      gridColumn: "span 2",
                    }}
                    InputLabelProps={{
                      style: { fontSize: "15px" },
                    }}
                  >
                    {categoriesState.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                  <CustomTextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Description"
                    multiline
                    rows={6}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    name="description"
                    error={!!touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                    sx={{
                      gridColumn: "span 4",
                    }}
                    InputLabelProps={{
                      style: { fontSize: "15px" },
                    }}
                  />
                  <Box
                    sx={{
                      gridColumn: "span 4",
                    }}
                  >
                    <ImageUpload
                      previousImageUrl={productData?.images}
                      setFieldValue={setFieldValue}
                      isSuccess={isSuccess}
                    />
                  </Box>
                  <CustomTextField
                    fullWidth
                    variant="outlined"
                    type="number"
                    label="Stock"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.stock}
                    name="stock"
                    error={!!touched.stock && !!errors.stock}
                    helperText={touched.stock && errors.stock}
                    sx={{
                      gridColumn: "span 2",
                    }}
                    InputLabelProps={{
                      style: { fontSize: "15px" },
                    }}
                  />{" "}
                  <CustomTextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Tags"
                    onBlur={handleBlur}
                    onChange={(event) => {
                      const value = event.target.value;
                      const tagsArray = value.split(",").map((tag) => tag.trim());
                      setFieldValue("tags", tagsArray);
                    }}
                    value={Array.isArray(values.tags) ? values.tags.join(",") : ""}
                  
                    name="tags"
                    error={!!touched.tags && !!errors.tags}
                    helperText={touched.tags && errors.tags}
                    sx={{
                      gridColumn: "span 2",
                    }}
                    InputLabelProps={{
                      style: { fontSize: "15px" },
                    }}
                  />
                  <CustomTextField
                    fullWidth
                    variant="outlined"
                    type="number"
                    label="Regular Price"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.regularPrice}
                    name="regularPrice"
                    error={!!touched.regularPrice && !!errors.regularPrice}
                    helperText={touched.regularPrice && errors.regularPrice}
                    sx={{
                      gridColumn: "span 2",
                    }}
                    InputLabelProps={{
                      style: { fontSize: "15px" },
                    }}
                  />{" "}
                  <CustomTextField
                    fullWidth
                    variant="outlined"
                    type="number"
                    label="Sales Price"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.salePrice}
                    name="salePrice"
                    error={!!touched.salePrice && !!errors.salePrice}
                    helperText={touched.salePrice && errors.salePrice}
                    sx={{
                      gridColumn: "span 2",
                    }}
                    InputLabelProps={{
                      style: { fontSize: "15px" },
                    }}
                  />
                </Box>
                <Button
                  type="submit"
                  disabled={!isValid || (!dirty && id === "create")}
                  // disabled={!isValid || (!dirty || !productData)}

                  sx={{
                    textTransform: "none",
                    bgcolor: !isValid ||(!dirty && id === "create") || isLoading ? "#0000001f" : "#4e97fd",
                    color: isLoading ? "#00000042" : "white",
                    fontSize: "14px",
                    paddingX: "15px",
                    fontWeight: 400,
                    paddingY: "5px",
                    alignSelf: "start",
                    borderRadius: "8px",
                    alignItems: "center",
                    mt: "40px",
                    "&:hover": {
                      backgroundColor: "#2756b6",
                    },
                  }}
                >
                  {isLoading ? "Loading" : "Save Product"}
                </Button>
              </form>
            )}
          </Formik>
        </Paper>
      </Stack>
    </Box>
  );
};

const productSchema = yup.object().shape({
  name: yup
    .string()
    .required("required")
    .min(5, "Name must be at least 5 characters"),
  description: yup
    .string()
    .required("required")
    .min(8, "Name must be at least 8 characters"),
  stock: yup.number().min(1,'Regular price must be greater than zero').required("required"),
  regularPrice: yup.number().min(1,'Regular price must be greater than zero').required("required"),
  salePrice: yup.number().min(1,'Regular price must be greater than zero'),
  // tags: yup.string().required("required"),
  category: yup.string().required("category must contain at least 1 item"),
 
});


export default AddProduct;
