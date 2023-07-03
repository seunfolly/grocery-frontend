import { useState, useEffect } from "react";
import { Box, Stack, TextField, Typography } from "@mui/material";
// import { useDispatch} from "react-redux";
// import { getProducts } from "../../features/product/productSlice";

const Range = ({setMaxPrice,setMinPrice,minPrice,maxPrice}) => {
  // const [minPrice, setMinPrice] = useState(null)
  // const [maxPrice, setMaxPrice] = useState(null)

// const dispatch = useDispatch();
// useEffect(() => {
//   if (minPrice !== null || maxPrice !== null) {
//     dispatch(getProducts({ minPrice, maxPrice }));
//   }
// }, [minPrice, maxPrice, dispatch]);
 
  return (
    <Stack spacing={2} pb={1}>
      <Typography variant="subtitle1" fontSize="15px">
        Price Range
      </Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <TextField
          size="small"
          id="outlined-number"
          type="number"
          name="minPrice"
          value={minPrice}
          onChange={(e) => {
            setMinPrice(e.target.value)
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Typography>-</Typography>
        <TextField
          size="small"
          id="outlined-number"
          type="number"
          name="maxPrice"
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(e.target.value)
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Stack>
    </Stack>
  );
};

export default Range;
