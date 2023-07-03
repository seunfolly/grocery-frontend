import { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  getAddresses,
} from "../../features/address/addressSlice";
import {
  setSelectedAddress
} from "../../features/order/orderSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Address = (prop) => {
  const {
    fullName,
    address,
    phone,
    state,
    _id,
    activeId,
    type,
    updateStepCompletion,
  } = prop;
  const dispatch = useDispatch();
  const isSelected = activeId?._id === _id;
  const handleClick = () => {
    dispatch(
      setSelectedAddress({ fullName, address, phone, state, _id, type })
    );
    updateStepCompletion("Checkout");
  };

  return (
    <Stack
      bgcolor="#f6f9fc"
      borderRadius="8px"
      p={1}
      direction="row"
      justifyContent="space-between"
      onClick={handleClick}
      sx={{
        cursor: "pointer",
        border: isSelected ? "1px solid #d23f57" : "none",
        textTransform: "capitalize",
      }}
    >
      <Stack>
        <Typography variant="subtitle1">{fullName}</Typography>
        <Typography fontSize="13px">{address}</Typography>
        <Typography fontSize="13px">{state}</Typography>
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

export const DeliveryAddress = ({ updateStepCompletion }) => {
  const dispatch = useDispatch();
  const { addresses } = useSelector((state) => state.address);
  const { selectedAddress } = useSelector((state) => state.order);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getAddresses());
    };
    fetchData();
  }, []);
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
        borderRadius: "8px",
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
            <Address
              {...address}
              activeId={selectedAddress}
              updateStepCompletion={updateStepCompletion}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};
