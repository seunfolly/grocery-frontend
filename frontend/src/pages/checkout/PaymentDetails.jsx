import {
  Stack,
  Grid,
  Button,
  Typography,
  TextField,
  Paper,
  Avatar,
  MenuItem,
  styled,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    fontSize: "14px",
    "& fieldset": {},
    "&:hover fieldset": {},
    "&.Mui-focused fieldset": {},
  },
  "& .MuiInputLabel-root": {
    fontSize: "14px",
  },
});
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const currentYear = new Date().getFullYear();
const range = 11;
const years = Array.from({ length: range }, (_, index) => currentYear + index);

const cards = [
    {
      name: "Solomon Micheal",
      number: "1234 **** **** ****",
     
    },
    {
      name: "Stanley Ahmed",
      number: "4332 **** **** ****",
      
    },
    {
      name: "Zainab Soteye",
      number: "1234 **** **** ****",
     
    },
  ];
const Card = ({ number, name }) => {
    return (
      <Stack
        bgcolor="#f6f9fc"
        borderRadius="8px"
        p={2}
     
      >
        <Stack spacing={1}>
           <img src="https://bazaar.ui-lib.com/assets/images/payment-methods/Mastercard.svg" width="30px" height="30px"/>
          <Typography variant="subtitle2" fontSize="15px" >{number}</Typography>
          <Typography variant="subtitle2" fontSize="15px">{name}</Typography>
        </Stack>
       
      </Stack>
    );
  };

const PaymentDetails = () => {
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
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar sx={{ bgcolor: "#d23f57" }}>3</Avatar>
        <Typography variant="body2">Payment Details</Typography>
      </Stack>
      <Typography variant="subtitle2">Enter Card Information</Typography>
      <Grid container spacing={2}>
        <Grid item sm={6}>
          <CustomTextField
            fullWidth
            variant="outlined"
            type="text"
            label="Enter Your Name"
            size="small"
          />
        </Grid>
        <Grid item sm={6}>
          <CustomTextField
            fullWidth
            variant="outlined"
            type="number"
            label="Enter Your Card Number"
            size="small"
          />
        </Grid>
        <Grid item sm={4}>
          <CustomTextField
            select
            label="Expire Card Month"
            fullWidth
            size="small"
            variant="outlined"
          >
            {months.map((date) => (
              <MenuItem key={date} value={date}>
                {date}
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>
        <Grid item sm={4}>
          <CustomTextField
            select
            label="Expire Card Year"
            fullWidth
            size="small"
            variant="outlined"
          >
            {years.map((date) => (
              <MenuItem key={date} value={date}>
                {date}
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>
        <Grid item sm={4}>
          <CustomTextField
            fullWidth
            variant="outlined"
            type="number"
            label="CVC"
            size="small"
          />
        </Grid>
      </Grid>
      <FormControlLabel
        control={<Checkbox />}
        label={
          <Typography component="span" sx={{ fontSize: "14px" }}>
            Save this Card
          </Typography>
        }
      />
      <Grid container spacing={2}>
        {cards.map((card) => (
          <Grid item sm={4}>
            <Card {...card} />
          </Grid>
        ))}
      </Grid>
      <Button
            sx={{
              textTransform: "none",
              bgcolor: "primary.main",
              color: "white",
              fontSize: "14px",
              paddingY: "10px",
              fontWeight: 600,
              width: "100%",
              borderRadius: "8px",
              marginTop: "40px",
              "&:hover": {
                backgroundColor: "#E3364E",
              },
            }}
          >
            Place Order
          </Button>
    </Paper>
  );
};

export default PaymentDetails;
