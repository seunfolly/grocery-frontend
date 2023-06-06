import {
    Typography,
    Box,
    Stack,
    Button,
    IconButton,
    Paper,
    TextField,
    Rating,
    styled
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
  
  const Login = () => {
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
            boxShadow: "rgba(3, 0, 71, 0.09) 0px 8px 45px"
          }}
        >
          <form>
            <img
              src="https://bazaar.ui-lib.com/assets/images/bazaar-black-sm.svg"
              alt="bazaar logo"
              style={{
                  margin: "0 auto",
                  display: "block"
              }}
            />
            <Typography variant="body2" mt={1} mb={4} textAlign="center">Welcome To Bazaar</Typography>
            
            <Box mb={2}>
              <Typography variant="subtitle1" fontSize="12px" color="#4b566b" mb={1.5}>Email</Typography>
              <CustomTextField
              fullWidth
              variant="outlined"
              type="email"
              placeholder="maria@romax.com"
              size="small"
            />
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle1" fontSize="12px" color="#4b566b" mb={1.5}>Password</Typography>
              <CustomTextField
              fullWidth
              variant="outlined"
              type="password"
              placeholder="*********"
              size="small"
            />
            </Box>
            <Button
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
           <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
           <Typography variant="subtitle2">Don't have account?</Typography>
          <Link to={"/signup"} style={{textDecoration: "none"}}>
               <Typography variant="subtitle1" color="#2b3445" sx={{
                  borderBottom: "1.5px solid #2b3445"
               }}>
               Sign Up
               </Typography>
              </Link>
           </Stack>
         
           <Stack direction="row" spacing={1} justifyContent="center" mt={3} sx={{
            bgcolor:"#f3f5f9",
            paddingY: "20px",
            borderRadius: "5px"
           }}>
           <Typography variant="subtitle2">Forgot your password?</Typography>
          <Link to={"/forgot-password"} style={{textDecoration: "none"}}>
               <Typography variant="subtitle1" color="#2b3445" sx={{
                  borderBottom: "1.5px solid #2b3445"
               }}>
               Reset It
               </Typography>
              </Link>
           </Stack>
        </Paper>
      </Box>
    );
  };
  
  export default Login;
  