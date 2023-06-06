import { Typography,Box,Stack, IconButton, TextField } from "@mui/material";
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

export const IReview = ({ img, pName, pAmount, pReview, pProperties,icon }) => {
  return (
    <Stack direction="row" alignItems="center" width="100%">
      <Stack direction="row" spacing={2} flexGrow={1} alignItems="center">
        <img
          src={img}
          style={{
            width: "70px",
            height: "70px",
          }}
        />

        <Stack>
          <Typography variant="subtitle1" color="text.primary">
            {pName}
          </Typography>
          { icon ? 
          (<Stack direction="row" spacing={1} alignItems="center">
            <Typography color="text.secondary" variant="subtitle2">
            {pAmount}
          </Typography>
           <TextField type="number" size="small" defaultValue={4} sx={{
            width: "60px"
           }} />
             </Stack> ): (<Typography color="text.secondary" variant="subtitle2">
            {pAmount}
          </Typography> )}
        </Stack>
      </Stack>

      <Typography flexGrow={1} variant="subtitle2" color="text.secondary">
        {pProperties}
      </Typography>
     { pReview && <Typography flexGrow={1} variant="subtitle2" color="primary.main">
        {pReview}
      </Typography>}

     { icon && <IconButton aria-label="Delete">
          <DeleteIcon />
        </IconButton>}
    </Stack>
  );
};

const OrderedProducts = () => {
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
            05 Apr, 2023
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
        {reviews.map((review, index) => (
          <IReview key={index} {...review} />
        ))}
      </Stack>
    </Box>
  );
};

export default OrderedProducts;
