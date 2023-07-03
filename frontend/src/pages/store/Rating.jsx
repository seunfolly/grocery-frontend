import React, { useState, useEffect } from "react";
import {
  Stack,
  Typography,
  FormGroup,
  Radio,
  FormControlLabel,
  Rating,
} from "@mui/material";

const RatingProduct = ({ rating, setRating }) => {
  const ratings = [5, 4, 3, 2, 1];
  const handleRatingChange = (event) => {
    const checkedRating = parseInt(event.target.value);
    setRating(checkedRating);
  };

  return (
    <Stack spacing={2} pb={1}>
      <Typography variant="subtitle1" fontSize="15px">
        Rating
      </Typography>
      <FormGroup>
        {ratings.map((r, index) => (
          <FormControlLabel
            key={index}
            control={
              <Radio
                value={r}
                checked={rating === r}
                onChange={handleRatingChange}
              />
            }
            label={
              <Rating
                value={r}
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
