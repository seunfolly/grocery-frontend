import { useEffect } from "react";
import { Typography, Stack, Button, Paper, IconButton } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAddress,
  getAddresses,
} from "../../features/address/addressSlice";

const Address = ({ _id, fullName, address, phone, state }) => {
  const dispatch = useDispatch();
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
        textTransform: "capitalize",
        // justifyContent: "space-between"
      }}
    >
      <Typography variant="subtitle2" flex="1 1 0">
        {fullName}
      </Typography>

      <Typography variant="subtitle2" flex="1 1 0">
        {phone}
      </Typography>

      <Typography variant="subtitle2" flex="1 1 170px">
        {address}
      </Typography>
      <Typography variant="subtitle2" flex="1 1 0">
        { ` ${state} State`}
      </Typography>
      <Stack direction="row" justifyContent="end">
        <Link
          to={`/user/addresses/${_id}`}
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

        <IconButton
          onClick={() => {
            dispatch(deleteAddress(_id));
          }}
        >
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
  const dispatch = useDispatch();
  const { addresses, deletedAddress } = useSelector((state) => state.address);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getAddresses());
    };
    fetchData();
  }, [deletedAddress]);
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
