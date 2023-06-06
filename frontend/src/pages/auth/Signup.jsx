import React, { useState } from "react";

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
import { Visibility, VisibilityOff } from "@mui/icons-material";
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

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <Box
      sx={{
        display: "flex",
        // justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
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
          <img
            src="https://bazaar.ui-lib.com/assets/images/bazaar-black-sm.svg"
            alt="bazaar logo"
            style={{
              margin: "0 auto",
              display: "block",
            }}
          />
          <Typography variant="body2" mt={1} mb={4} textAlign="center">
            Create Your Account
          </Typography>
          <Box mb={2}>
            <Typography
              variant="subtitle1"
              fontSize="12px"
              color="#4b566b"
              mb={1.5}
            >
              Full Name
            </Typography>
            <CustomTextField
              fullWidth
              variant="outlined"
              type="text"
              placeholder="Alakija Vincent"
              size="small"
            />
          </Box>
          <Box mb={2}>
            <Typography
              variant="subtitle1"
              fontSize="12px"
              color="#4b566b"
              mb={1.5}
            >
              Email
            </Typography>
            <CustomTextField
              fullWidth
              variant="outlined"
              type="email"
              placeholder="maria@romax.com"
              size="small"
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
              type={showPassword ? "text" : "password"}
              placeholder="*********"
              size="small"
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={handleTogglePassword}
                    edge="end"
                    sx={{ padding: 0, marginRight: "10px" }}
                  >
                    {showPassword ? (
                      <Visibility
                        sx={{
                          fontSize: "20px",
                        }}
                      />
                    ) : (
                      <VisibilityOff
                        sx={{
                          fontSize: "20px",
                          color: "#DAE1E7",
                        }}
                      />
                    )}
                  </IconButton>
                ),
              }}
            />
          </Box>
          <Box mb={2}>
            <Typography
              variant="subtitle1"
              fontSize="12px"
              color="#4b566b"
              mb={1.5}
            >
              Confirm Password
            </Typography>
            <CustomTextField
              fullWidth
              variant="outlined"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="*********"
              size="small"
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={handleToggleConfirmPassword}
                    edge="end"
                    sx={{ padding: 0, marginRight: "10px" }}
                  >
                    {showConfirmPassword ? (
                      <Visibility
                        sx={{
                          fontSize: "20px",
                        }}
                      />
                    ) : (
                      <VisibilityOff
                        sx={{
                          fontSize: "20px",
                          color: "#DAE1E7",
                        }}
                      />
                    )}
                  </IconButton>
                ),
              }}
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
              marginTop: "50px",
              "&:hover": {
                backgroundColor: "#E3364E",
              },
            }}
          >
            Create Account
          </Button>
        </form>
        <Stack direction="row" spacing={1} justifyContent="center" mt={2}>
          <Typography variant="subtitle2">Already have an account?</Typography>
          <Link to={"/login"} style={{ textDecoration: "none" }}>
            <Typography
              variant="subtitle1"
              color="#2b3445"
              sx={{
                borderBottom: "1.5px solid #2b3445",
              }}
            >
              Login
            </Typography>
          </Link>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Signup;
