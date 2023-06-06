import { Typography,Box,Stack,Avatar } from "@mui/material";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const Delivery = () => {
  return (
    <Box
      bgcolor="#fff"
      p={4}
      borderRadius={2}
      sx={{
        boxShadow: " 0px 1px 3px rgba(3, 0, 71, 0.09)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack direction="row" alignItems="center" my={4}>
        <Avatar
          sx={{
            bgcolor: "primary.main",
            width: "64px",
            height: "64px",
          }}
        >
          <Inventory2Icon
            sx={{
              color: "white",
            }}
          />
        </Avatar>

        <Box
          sx={{
            bgcolor: "primary.main",
            height: "4px",
            flex: "1 1 0",
            minWidth: "50px",
          }}
        />
        <Avatar
          sx={{
            bgcolor: "primary.main",
            width: "64px",
            height: "64px",
          }}
        >
          <LocalShippingIcon
            sx={{
              color: "white",
            }}
          />
        </Avatar>
        <Box
          sx={{
            bgcolor: "#DAE1E7",
            height: "4px",
            flex: "1 1 0",
            minWidth: "50px",
          }}
        />
        <Avatar
          sx={{
            bgcolor: "#DAE1E7",
            width: "64px",
            height: "64px",
          }}
        >
          <Inventory2Icon
            sx={{
              color: "primary.main",
            }}
          />
        </Avatar>
      </Stack>{" "}
      <Typography
        alignSelf="end"
        px={2}
        py={0.8}
        borderRadius="300px"
        bgcolor="#FCE9EC"
        color="primary.main"
        variant="subtitle2"
      >
        Estimated Delivery Date <b>4th October</b>{" "}
      </Typography>
    </Box>
  );
};

export default Delivery;
