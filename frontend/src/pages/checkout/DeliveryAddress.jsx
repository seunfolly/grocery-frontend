import {
  Stack,
  Grid,
  Typography,
  TextField,
  Paper,
  Avatar,
  MenuItem,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const addresses = [
  {
    id: Math.floor(Math.random() * 100000),
    name: "Office",
    address: "34 Lekki Phase 1 Lagos State",
    phone: "+2345679044",
  },
  {
    id: Math.floor(Math.random() * 100000),
    name: "Office",
    address: "34 Lekki Phase 1 Lagos State",
    phone: "+2345679044",
  },
  {
    id: Math.floor(Math.random() * 100000),
    name: "Office",
    address: "34 Lekki Phase 1 Lagos State",
    phone: "+2345679044",
  },
];

const Address = ({ name, address, phone }) => {
  return (
    <Stack
      bgcolor="#f6f9fc"
      borderRadius="8px"
      p={2}
      direction="row"
      justifyContent="space-around"
    >
      <Stack>
        <Typography variant="subtitle1">{name}</Typography>
        <Typography fontSize="13px">{address}</Typography>
        <Typography fontSize="13px">{phone}</Typography>
      </Stack>
      <Stack alignSelf="self-start" direction="row">
        <IconButton
          sx={{
            padding: "3px",
          }}
          aria-label="Edit"
        >
          <EditIcon
            sx={{
              fontSize: "20px",
            }}
          />
        </IconButton>
        <IconButton
          sx={{
            padding: "3px",
          }}
          aria-label="Edit"
        >
          <DeleteIcon
            sx={{
              fontSize: "20px",
              color: "#d23f57",
            }}
          />
        </IconButton>
      </Stack>
    </Stack>
  );
};

const DeliveryAddress = () => {
  return (
    <Paper
      elevation={1}
      sx={{
        backgroundColor: "white",
        p: 3,
        pb: 6,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius:"8px"

      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ bgcolor: "#d23f57" }}>2</Avatar>
          <Typography variant="body2">Delivery Address</Typography>
        </Stack>
        <Button
          variant="outlined"
          sx={{
            textTransform: "none",
            bgcolor: "white",
            color: "primary.main",
            fontSize: "subtitle2",
            paddingX: "20px",
            fontWeight: 600,
            paddingY: "6px",
            "&:hover": {
              backgroundColor: "#FCE9EC",
            },
          }}
        >
          Add New Address
        </Button>
      </Stack>
      <Typography variant="subtitle2">Delivery Address</Typography>
      <Grid container spacing={2}>
        {addresses.map((address) => (
          <Grid item sm={4}>
            <Address {...address} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default DeliveryAddress;
