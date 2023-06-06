import {
  Stack,
  Typography,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Rating,
} from "@mui/material";


const RatingProduct = () => {
  const ratings = [5, 4, 3, 2, 1];
  return (
    <Stack spacing={2} pb={1}>
      <Typography variant="subtitle1" fontSize="15px">
        Rating
      </Typography>
      <FormGroup>
        {ratings.map((rating, index) => (
          <FormControlLabel
            control={
              <Checkbox sx={{ "& .MuiSvgIcon-root": { fontSize: 25 } }} />
            }
            label={
              <Rating
                value={rating}
                readOnly
                sx={{
                  fontSize: 20,
                }}
              />
            }
          />
        ))}
      </FormGroup>
    </Stack>
  );
};

export default RatingProduct;
