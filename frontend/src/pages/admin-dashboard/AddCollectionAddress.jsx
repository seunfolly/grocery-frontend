import { useEffect, useRef, useState } from "react";
import {
  Box,
  Paper,
  Stack,
  TextField,
  styled,
  Typography,
  Button,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import {
  createAddress,
  resetState,
  getAddress,
  updateAddress,
} from "../../features/address/addressSlice";
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

const AddCollectionAddress = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const addressState = useSelector((state) => state.address);
  const {
    isSuccess,
    isError,
    isLoading,
    createdAddress,
    updatedAddress,
    addressData,
  } = addressState;
  const resetFormRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== "create") {
      dispatch(getAddress(id));
    } else {
      dispatch(resetState());
    }
  }, [id]);

  useEffect(() => {
    if (isSuccess && createdAddress) {
      makeToast("success", "Address Added Sucessfully!");
      resetFormRef.current();
      dispatch(resetState());
    }
    if (isSuccess && updatedAddress) {
      makeToast("success", "Address Updated Successfullly!");
      navigate("/admin/addresses");
      dispatch(resetState());
    }
    if (isError) {
      makeToast("error", "Something went wrong");
      dispatch(resetState());
    }
  }, [isSuccess, isError, isLoading]);

  const initialValues = {
    fullName: addressData?.fullName || "",
    phone: addressData?.phone || "",
    address: addressData?.address || "",
    state: addressData?.state || "",
    email: addressData?.email || "",
  };

  return (
    <Box bgcolor="background.paper" p={4}>
      <Stack spacing={3}>
        <Typography variant="h6" fontSize="21px">
          {id === "create"
            ? "Add Collection Address"
            : "Edit Collection Address"}
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
                const data = { id: id, addressData: values };
                dispatch(updateAddress(data));
                resetFormRef.current = resetForm;
              } else {
                dispatch(createAddress({ ...values, type: "collection" }));
                resetFormRef.current = resetForm;
              }
            }}
            initialValues={initialValues}
            validationSchema={addressSchema}
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
                    value={values.fullName}
                    name="fullName"
                    error={!!touched.fullName && !!errors.fullName}
                    helperText={touched.fullName && errors.fullName}
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
                    type="text"
                    label="Phone Number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone}
                    name="phone"
                    error={!!touched.phone && !!errors.phone}
                    helperText={touched.phone && errors.phone}
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
                    type="text"
                    label="Address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address}
                    name="address"
                    error={!!touched.address && !!errors.address}
                    helperText={touched.address && errors.address}
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
                    label="State"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.state}
                    name="state"
                    error={!!touched.state && !!errors.state}
                    helperText={touched.state && errors.state}
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
                    type="email"
                    label="Email Address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
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
                    bgcolor:
                      !isValid || (!dirty && id === "create") || isLoading
                        ? "#0000001f"
                        : "#4e97fd",
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
                  {isLoading ? "Loading" : "Save Address"}
                </Button>
              </form>
            )}
          </Formik>
        </Paper>
      </Stack>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const addressSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("required")
    .min(5, "Name must be at least 5 characters"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  state: yup
    .string()
    .required("required")
    .min(3, "Name must be at least 3 characters"),
  address: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
});

export default AddCollectionAddress;
