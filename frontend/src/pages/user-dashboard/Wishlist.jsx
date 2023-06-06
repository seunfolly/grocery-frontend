import {
  Typography,
  Box,
  Stack,
  Button,
  Paper,
  Avatar,
  Grid,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { arrivalData } from "../homepage/Carousel";
import ICard from "../../components/ui-elements/Card";

const WishList = () => {
  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2} alignItems="center">
          <FavoriteIcon
            sx={{
              color: "#D23F57",
              fontSize: "30px",
            }}
          />

          <Typography variant="h5" fontSize="23px">
            My WishList
          </Typography>
        </Stack>

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
          Add All To Cart
        </Button>
      </Stack>

      <Grid
        container
        spacing={3}
        sx={{
          marginLeft: "-24px !important",
        }}
      >
        {arrivalData.map((item) => (
          <Grid item xs={4}>
            <ICard {...item} />
          </Grid>
        ))}
        <Grid></Grid>
      </Grid>
    </Stack>
  );
};

export default WishList;
