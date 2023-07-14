import {
  Typography,
  Box,
  Stack,
  IconButton,
  TextField,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const IReview = ({ image, product, price, count }) => {
  return (
    <Grid container spacing={2}>
      <Grid item md={2.8}>
        <Stack direction="row" spacing={2} flexGrow={1} alignItems="center">
          <img
            src={image}
            style={{
              width: "70px",
              height: "70px",
            }}
          />

          <Stack>
            <Typography variant="subtitle1" color="text.primary">
              {product?.name}
            </Typography>

            <Typography color="text.secondary" variant="subtitle2">
              {`₦ ${price} X ${count}`}
            </Typography>
          </Stack>
        </Stack>
      </Grid>

      <Grid item md={7.2}>
        <Typography variant="subtitle2" color="text.secondary">
          {product?.description}
        </Typography>
      </Grid>

      <Grid item md={2}>
        <Typography variant="subtitle2" color="primary.main">
          Write A Review
        </Typography>
      </Grid>

      {/* {icon && (
        <IconButton aria-label="Delete">
          <DeleteIcon />
        </IconButton>
      )} */}
    </Grid>
  );
};

const OrderedProducts = ({ order }) => {
  return (
    <Box
      mt={5}
      sx={{
        boxShadow: " 0px 1px 3px rgba(3, 0, 71, 0.09)",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        py={2}
        px={3}
        sx={{
          background: "#F3F5F9",
          borderTopRightRadius: "11px",
          borderTopLeftRadius: "11px",
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
              {order?.orderId}
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
              {new Date(order?.orderDate).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="row" width="32%">
          <Typography color="text.secondary" variant="subtitle2">
            Delivered on:{" "}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: "text.primary",
            }}
          >
            {new Date(order?.deliveryDate).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </Typography>
        </Stack>
      </Stack>

      <Stack
        spacing={3}
        py={3}
        px={3}
        sx={{
          background: "white",
          borderBottomRightRadius: "11px",
          borderBottomLeftRadius: "11px",
        }}
      >
        {order?.products.map((review, index) => (
          <IReview key={index} {...review} />
        ))}
      </Stack>
    </Box>
  );
};

export default OrderedProducts;
