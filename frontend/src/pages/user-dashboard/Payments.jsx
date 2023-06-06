import { Typography, Stack, Button, Paper, IconButton } from "@mui/material";

import CreditCardIcon from "@mui/icons-material/CreditCard";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

const addresses = [
  {
    id: Math.floor(Math.random() * 100000),
    cardName: "Solomon Micheal",
    cardNo: "1234 **** **** ****",
    cvc: "+2345679044",
    date: "08 / 22",
  },
  {
    id: Math.floor(Math.random() * 100000),
    cardName: "Stanley Ahmed",
    cardNo: "4332 **** **** ****",
    cvc: "+2345679044",
    date: "08 / 22",
  },
  {
    id: Math.floor(Math.random() * 100000),
    cardName: "Zainab Soteye",
    cardNo: "1234 **** **** ****",
    cvc: "+2345679044",
    date: "08 / 22",
  },
];
const Address = ({ id, cardName, cardNo, date }) => {
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
      <Typography variant="subtitle1" flex="1 1 0">
        {cardName}
      </Typography>

      <Typography variant="subtitle2" flex="1 1 0">
        {cardNo}
      </Typography>
      <Typography variant="subtitle2" flex="1 1 0">
        {date}
      </Typography>

      <Stack direction="row"  justifyContent="end">
        <Link
          to={`/user/payments/${id}`}
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

const Payments = () => {
  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2} alignItems="center">
          <CreditCardIcon
            sx={{
              color: "#D23F57",
              fontSize: "30px",
            }}
          />

          <Typography variant="h5" fontSize="23px">
            Payment Methods
          </Typography>
        </Stack>

        <Link
          to={`/user/payments/new`}
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
            Add New Payment Method
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

export default Payments;
