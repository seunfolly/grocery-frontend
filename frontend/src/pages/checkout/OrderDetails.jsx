import { Stack, Typography, Divider } from "@mui/material";
const OrderDetails = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1">Your order</Typography>
      <Stack spacing={1.5}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle">
            <span
              style={{
                fontWeight: "700",
                marginRight: "8px",
              }}
            >
              1
            </span>
            x iPhone 12
          </Typography>

          <Typography variant="subtitle">$999.00</Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle">
            <span
              style={{
                fontWeight: "700",
                marginRight: "8px",
              }}
            >
              1
            </span>
            x iPhone 12
          </Typography>

          <Typography variant="subtitle">$999.00</Typography>
        </Stack>
      </Stack>
      <Divider />
      <Stack spacing={1}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle2" color="text.secondary">
            Subtotal:
          </Typography>
          <Typography variant="subtitle1" color="text.primary">
            $350.00
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle2" color="text.secondary">
            Shipping Fee:
          </Typography>
          <Typography variant="subtitle1" color="text.primary">
            $0.00
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle2" color="text.secondary">
            Discount:
          </Typography>
          <Typography variant="subtitle1" color="text.primary">
            $0.00
          </Typography>
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
    </Stack>
  );
};

export default OrderDetails;
