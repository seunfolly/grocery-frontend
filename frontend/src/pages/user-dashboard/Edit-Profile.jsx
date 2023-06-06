import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  Avatar,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

// import { Formik } from "formik";
// import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";

const EditProfile = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2} alignItems="center">
          <PersonIcon
            sx={{
              color: "#D23F57",
              fontSize: "30px",
            }}
          />

          <Typography variant="h5" fontSize="23px">
            Edit Profile
          </Typography>
        </Stack>

        <Link
          to={`/user/profile`}
          style={{
            textDecoration: "none",
          }}
        >
          <Button
            sx={{
              textTransform: "none",
              bgcolor: "#FCE9EC",
              color: "primary.main",
              fontSize: "subtitle2",
              paddingX: "40px",
              fontWeight: 600,
              paddingY: "6px",
              "&:hover": {
                backgroundColor: "rgba(210, 63, 87, 0.04)",
              },
            }}
          >
            Back To Profile
          </Button>
        </Link>
      </Stack>

      <Paper
        elevation={0}
        sx={{
          bgcolor: "white",
          paddingX: 5,
          paddingY: 4,
        }}
      >
        <Avatar
          alt="profile-picture"
          src="https://bazaar.ui-lib.com/assets/images/faces/ralph.png"
          sx={{ width: 64, height: 64, mb: 3 }}
        />
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
            label="First Name"
            size="small"
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
            label="Last Name"
            size="small"
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
            label="Email"
            size="small"
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
            label="Phone"
            size="small"
            sx={{
              gridColumn: "span 2",
              "& .MuiInputBase-root": {
                fontSize: "15px",
              },
            }}
            InputLabelProps={{
              style: { fontSize: "14px" },
            }}
          />{" "}
          <DatePicker
            fullWidth
            label="Birth Date"
            slotProps={{ textField: { size: 'small' } }}
            sx={{
              gridColumn: "span 2",
              "& .MuiInputBase-root": {
                fontSize: "15px",
              },
            }}
          />
        </Box>
        <Button
          sx={{
            mt: 4,
            textTransform: "none",
            bgcolor: "primary.main",
            color: "white",
            fontSize: "14px",
            paddingX: "20px",
            fontWeight: 500,
            paddingY: "8px",
            alignSelf: "start",
            "&:hover": {
              backgroundColor: "#E3364E",
            },
          }}
        >
          Save Changes
        </Button>
      </Paper>
    </Stack>
  );
};

export default EditProfile;
