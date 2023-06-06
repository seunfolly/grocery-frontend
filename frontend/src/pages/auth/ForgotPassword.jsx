import {
  Typography,
  Box,
  Stack,
  Button,
  IconButton,
  Paper,
  TextField,
  Rating,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
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

const ForgotPassword = () => {
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
        <form>
          <Typography
            variant="h5"
            fontSize="20px"
            mt={1}
            mb={2}
            textAlign="center"
          >
            Forgot Password?
          </Typography>
          <Typography
            
            mb={4}
            textAlign="center"
          >
            Enter your email to reset password.
          </Typography>

          <CustomTextField
            fullWidth
            variant="outlined"
            type="email"
            label="Email"
            placeholder="maria@romax.com"
            size="small"
          />

          <Button
            sx={{
              textTransform: "none",
              bgcolor: "primary.main",
              color: "white",
              fontSize: "14px",
              paddingY: "10px",
              fontWeight: 600,
              width: "100%",
              marginTop: "20px",
              "&:hover": {
                backgroundColor: "#E3364E",
              },
            }}
          >
            Submit
          </Button>
        </form>
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
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
