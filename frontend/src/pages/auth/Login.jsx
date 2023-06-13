import { useEffect, useRef } from "react";
import {
  Typography,
  Box,
  Stack,
  Button,
  Paper,
  TextField,
  styled,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { login, resetState } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import makeToast from "../../utils/toaster";

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    fontSize: "14px",
    height: "45px",
    "& fieldset": {},
    "&:hover fieldset": {},
    "&.Mui-focused fieldset": {},
  },
  "& .MuiInputLabel-root": {
    fontSize: "14px",
  },
});

const Login = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const { isSuccess, isError, isLoading, user } = auth;
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && user) {
      makeToast("success", "Login Sucessful!");
      if(user.role === "admin") {
        navigate("/admin");
      }else {
        navigate("/");

      }
     
    }
    if (isError) {
      makeToast("error", "Something went wrong");
      dispatch(resetState());
    }
  }, [isSuccess, isLoading, user]);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        bgcolor: "#F6F9FC",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          bgcolor: "white",
          radius: "8px",
          width: "500px",
          padding: "2rem 3rem",
          boxShadow: "rgba(3, 0, 71, 0.09) 0px 8px 45px",
        }}
      >
        <Formik
          onSubmit={(values, { resetForm }) => {
            
            dispatch(login(values));
          }}
          initialValues={initialValues}
          validationSchema={loginSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isValid,
            dirty,
          }) => (
            <form onSubmit={handleSubmit}>
              <img
                src="https://bazaar.ui-lib.com/assets/images/bazaar-black-sm.svg"
                alt="bazaar logo"
                style={{
                  margin: "0 auto",
                  display: "block",
                }}
              />
              <Typography variant="body2" mt={1} mb={4} textAlign="center">
                Welcome To Bazaar
              </Typography>

              <Box mb={2}>
                <Typography
                  variant="subtitle1"
                  fontSize="12px"
                  color="#4b566b"
                  mb={1.5}
                >
                  Email Or Phone number
                </Typography>
                <CustomTextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  placeholder="maria@romax.com"
                  size="small"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.emailOrPhone}
                  name="emailOrPhone"
                  error={!!touched.emailOrPhone && !!errors.emailOrPhone}
                  helperText={touched.emailOrPhone && errors.emailOrPhone}
                />
              </Box>
              <Box mb={2}>
                <Typography
                  variant="subtitle1"
                  fontSize="12px"
                  color="#4b566b"
                  mb={1.5}
                >
                  Password
                </Typography>
                <CustomTextField
                  fullWidth
                  variant="outlined"
                  type="password"
                  placeholder="*********"
                  size="small"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                />
              </Box>
              <Button
              type="submit"
              disabled={!isValid || !dirty}
                sx={{
                  textTransform: "none",
                  bgcolor: "primary.main",
                  color: "white",
                  fontSize: "14px",
                  paddingY: "10px",
                  fontWeight: 600,
                  width: "100%",
                  marginTop: "10px",
                  "&:hover": {
                    backgroundColor: "#E3364E",
                  },
                }}
              >
                Login
              </Button>
            </form>
          )}
        </Formik>

        <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
          <Typography variant="subtitle2">Don't have account?</Typography>
          <Link to={"/signup"} style={{ textDecoration: "none" }}>
            <Typography
              variant="subtitle1"
              color="#2b3445"
              sx={{
                borderBottom: "1.5px solid #2b3445",
              }}
            >
              Sign Up
            </Typography>
          </Link>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          mt={3}
          sx={{
            bgcolor: "#f3f5f9",
            paddingY: "20px",
            borderRadius: "5px",
          }}
        >
          <Typography variant="subtitle2">Forgot your password?</Typography>
          <Link to={"/forgot-password"} style={{ textDecoration: "none" }}>
            <Typography
              variant="subtitle1"
              color="#2b3445"
              sx={{
                borderBottom: "1.5px solid #2b3445",
              }}
            >
              Reset It
            </Typography>
          </Link>
        </Stack>
      </Paper>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const loginSchema = yup.object().shape({
  emailOrPhone: yup
    .string()
    .test("emailOrPhone", "Invalid email or phone number", function (value) {
      // Check if the value is a valid email or phone number
      const isValidEmail = yup.string().email().isValidSync(value);
      const isValidPhone = phoneRegExp.test(value);
      return isValidEmail || isValidPhone;
    })
    .required("Email or phone number is required"),
  password: yup.string().required("required"),
});
const initialValues = {
  emailOrPhone: "",
  password: "",
};
export default Login;
