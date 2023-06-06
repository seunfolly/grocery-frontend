import { Typography, Stack, Button, Paper, IconButton } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

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
const Address = ({ id, name, address, phone }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        paddingX: 2,
        paddingY: 1,
        display: "flex",
        bgcolor: "white",
        borderRadius: "10px",
        alignItems: "center",
        // justifyContent: "space-between"
      }}
    >
      <Typography variant="subtitle2" flex="1 1 0">
        {name}
      </Typography>

      <Typography variant="subtitle2" flex="1 1 200px">
        {address}
      </Typography>
      <Typography variant="subtitle2" flex="1 1 0">
        {phone}
      </Typography>

      <Stack direction="row" flex="1 1 0" justifyContent="end">
        <Link
          to={`/user/addresses/${id}`}
          style={{
            textDecoration: "none",
          }}
        >
          <IconButton>
            <EditIcon
              sx={{
                fontSize: "1.3rem",
              }}
            />
          </IconButton>
        </Link>

        <IconButton>
          <DeleteIcon
            sx={{
              fontSize: "1.3rem",
            }}
          />
        </IconButton>
      </Stack>
    </Paper>
  );
};

const Addresses = () => {
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
            My Addresses
          </Typography>
        </Stack>

        <Link
          to={`/user/addresses/new`}
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
            Add New Address
          </Button>
        </Link>
      </Stack>

      <Stack spacing={2}>
        {addresses.map((address, index) => (
          <Address {...address} key={index} />
        ))}
      </Stack>
    </Stack>
  );
};

export default Addresses;
