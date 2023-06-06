import {
  Divider,
  Stack,
  Typography,
  Paper,
  TextField,
  Grid,
  styled,
  MenuItem,
} from "@mui/material";
import { IReview, reviews } from "../user-dashboard/OrderedProducts";
const products = reviews.map((reviews) => ({
  ...reviews,
  pReview: null,
  icon: true,
  pAmount: "$116.00",
}));

const currencies = [
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Delivered",
    label: "Delivered",
  },
  {
    value: "Processing",
    label: "Processing",
  },
];
const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "& fieldset": {},
    "&:hover fieldset": {},
    "&.Mui-focused fieldset": {
      borderColor: "#4e97fd",
    },
  },
  "& .MuiInputLabel-root": {
    "&.Mui-focused": {
      color: "#4e97fd",
    },
  },
});
const OrderDetails = () => {
  return (
    <Stack spacing={3} bgcolor="background.paper" p={3}>
      <Typography variant="h6" fontSize="21px">
        Order Details
      </Typography>

      <Paper
        elevation={0}
        sx={{
          bgcolor: "white",
          borderRadius: "5px",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Stack spacing={2} direction="row">
          <Stack direction="row">
            <Typography color="text.secondary" variant="subtitle2">
              Order ID:{" "}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                color: "text.primary",
              }}
            >
              f0ba538b-c8f3-45ce-b6c1-209cf07ba5f8
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography color="text.secondary" variant="subtitle2">
              Placed on:{" "}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                color: "text.primary",
              }}
            >
              10 Nov, 2022
            </Typography>
          </Stack>
        </Stack>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <CustomTextField
              fullWidth
              variant="outlined"
              type="text"
              label="Add Product"
              placeholder="Type product name"
              InputLabelProps={{
                style: { fontSize: "15px" },
              }}
            />
          </Grid>
          <Grid item sm={6}>
            <CustomTextField
              select
              label="Order Status"
              fullWidth
              defaultValue="Pending"
              variant="outlined"
              sx={{
                gridColumn: "span 2",
              }}
              InputLabelProps={{
                style: { fontSize: "15px" },
              }}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>
        </Grid>
        <Stack spacing={3}>
          {products.map((review, index) => (
            <IReview key={index} {...review} />
          ))}
        </Stack>
      </Paper>

      <Grid
        container
        spacing={2}
        sx={{
          marginLeft: "-16px !important",
        }}
      >
        <Grid item sm={6}>
          <Paper
            elevation={0}
            sx={{
              bgcolor: "white",
              borderRadius: "10px",
              paddingX: 3,
              paddingY: 4,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <CustomTextField
              fullWidth
              variant="outlined"
              type="text"
              label="Shipping Address"
              defaultValue="Kelly Williams 777 Brockton Avenue, Abington MA 2351"
              multiline
              rows={5}
              placeholder="Type product name"
              InputLabelProps={{
                style: { fontSize: "15px" },
              }}
            />
            <CustomTextField
              fullWidth
              variant="outlined"
              type="text"
              label="Customer's Note"
              defaultValue="Please deliver ASAP."
              multiline
              rows={5}
              placeholder="Type product name"
              InputLabelProps={{
                style: { fontSize: "15px" },
              }}
            />
          </Paper>
        </Grid>

        <Grid item sm={6}>
          <Paper
            elevation={0}
            sx={{
              bgcolor: "white",
              borderRadius: "10px",
              paddingX: 3,
              paddingY: 4,
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Typography variant="subtitle1">Total Summary</Typography>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle2" color="text.secondary">
                SubTotal:
              </Typography>
              <Typography variant="subtitle1" color="text.primary">
                $350.00
              </Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle2" color="text.secondary">
                Shipping Fee:
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="subtitle1" fontSize="16px">
                  $
                </Typography>
                <TextField
                  type="number"
                  size="small"
                  defaultValue={10}
                  sx={{
                    width: "90px",
                  }}
                />
              </Stack>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle2" color="text.secondary">
                Discount(%):
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="subtitle1" fontSize="16px">
                  $
                </Typography>
                <TextField
                  type="number"
                  size="small"
                  sx={{
                    width: "90px",
                  }}
                />
              </Stack>
            </Stack>
            <Divider />
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" color="text.primary">
                Total:
              </Typography>
              <Typography variant="subtitle1" color="text.primary">
                $350.00
              </Typography>
            </Stack>

            <Typography variant="subtitle2" color="text.primary">
              Paid by Credit/Debit Card
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default OrderDetails;
