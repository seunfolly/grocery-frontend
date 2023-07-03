import { Typography, Box, Stack, IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const reviews = [
  {
    img: "https://bazaar.ui-lib.com/assets/images/products/Automotive/2.Audi2017.png",
    pName: "Budi 2017",
    pAmount: "$226.00 x 4",
    pReview: "Write A Review",
    pProperties: "Product properties: Black, L",
  },
  {
    img: "https://bazaar.ui-lib.com/assets/images/products/Automotive/3.Tesla2015.png",
    pName: "Resla 2015",
    pAmount: "$116.00 x 4",
    pReview: "Write A Review",
    pProperties: "Product properties: Black, L",
  },
  {
    img: "https://bazaar.ui-lib.com/assets/images/products/Automotive/4.Porsche2018.png",
    pName: "Xorsche 2018",
    pAmount: "$526.00 x 4",
    pReview: "Write A Review",
    pProperties: "Product properties: Black, L",
  },
];

export const IReview = ({ image, product, price, count, icon }) => {
  return (
    <Stack direction="row" alignItems="center" width="100%">
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
          {icon ? (
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography color="text.secondary" variant="subtitle2">
                {price}
              </Typography>
              <TextField
                type="number"
                size="small"
                defaultValue={4}
                sx={{
                  width: "60px",
                }}
              />
            </Stack>
          ) : (
            <Typography color="text.secondary" variant="subtitle2">
              {`₦ ${price} X ${count}`}
            </Typography>
          )}
        </Stack>
      </Stack>

      <Typography flexGrow={1} variant="subtitle2" color="text.secondary">
        {product?.description}
      </Typography>
      <Typography flexGrow={1} variant="subtitle2" color="primary.main">
      Write A Review
      </Typography>

      {icon && (
        <IconButton aria-label="Delete">
          <DeleteIcon />
        </IconButton>
      )}
    </Stack>
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
