import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
// import { Formik } from "formik";
// import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
// import Header from "../../components/Header";
import { Link } from 'react-router-dom';
import PlaceIcon from "@mui/icons-material/Place";

const Address = () => {
  const { id } = useParams();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2} alignItems="center">
          <PlaceIcon
            sx={{
              color: "#D23F57",
              fontSize: "30px",
            }}
          />

          <Typography variant="h5" fontSize="23px">
            {id === "new" ? "Add Address" : "Edit Address"}
          </Typography>
        </Stack>
       
        <Link to={`/user/addresses`} style={{
            textDecoration: "none"
        }}>
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
         Back To Address
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
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            type="text"
            label="Name"
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
            label="Address"
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
                  {id === "new"? "Save Address": "Save Changes"}
                </Button>
      </Paper>
    </Stack>
  );
};

export default Address;
