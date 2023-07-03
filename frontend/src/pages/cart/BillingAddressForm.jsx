import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

const BillingAddressForm = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const initialValues = {
        fullName:  "",
        phone:  "",
        address:  "",
        country: "",
        email: "",

      };
  return (
    <>
      <Formik
        onSubmit={(values) => {
            console.log(values)
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
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="20px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label=" Full Name"
                size="small"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fullName}
                name="fullName"
                error={!!touched.fullName && !!errors.fullName}
                helperText={touched.fullName && errors.fullName}
                sx={{
                  gridColumn: "span 2",
                  "& .MuiInputBase-root": {
                    fontSize: "15px",
                  },
                }}
                InputLabelProps={{
                  style: { fontSize: "14px" },
                }}
              />
               <TextField
                fullWidth
                variant="outlined"
                type="email"
                label="Email Address"
                size="small"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{
                  gridColumn: "span 2",
                  "& .MuiInputBase-root": {
                    fontSize: "15px",
                  },
                }}
                InputLabelProps={{
                  style: { fontSize: "14px" },
                }}
              />
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Phone Number"
                size="small"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{
                  gridColumn: "span 2",
                  "& .MuiInputBase-root": {
                    fontSize: "15px",
                  },
                }}
                InputLabelProps={{
                  style: { fontSize: "14px" },
                }}
              />
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Address"
                size="small"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{
                  gridColumn: "span 2",
                  "& .MuiInputBase-root": {
                    fontSize: "15px",
                  },
                }}
                InputLabelProps={{
                  style: { fontSize: "14px" },
                }}
              />

              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Country"
                size="small"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.country}
                name="country"
                error={!!touched.country && !!errors.country}
                helperText={touched.country && errors.country}
                sx={{
                  gridColumn: "span 2",
                  "& .MuiInputBase-root": {
                    fontSize: "15px",
                  },
                }}
                InputLabelProps={{
                  style: { fontSize: "14px" },
                }}
              />
            </Box>
            
          </form>
        )}
      </Formik>
    </>
  );
};

export default BillingAddressForm;

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const addressSchema = yup.object().shape({
  fullName: yup.string().required("required"),
  email: yup.string().email('Enter Valid Email Address'),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address: yup.string().required("required"),
  country: yup.string().required("required"),
});
