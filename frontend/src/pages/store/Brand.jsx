import { useEffect, useState } from "react";
import {
  Stack,
  Typography,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../../features/brand/brandSlice";
const Brand = ({setSelectedBrands, selectedBrands}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      dispatch(getBrands());
    };
    fetchData();
  }, []);
  const { brands } = useSelector((state) => state.brand);

  const handleRatingChange = (event) => {
    const brandId = event.target.value;
    if (event.target.checked) {
      setSelectedBrands([...selectedBrands, brandId]);
    } else {
      setSelectedBrands(selectedBrands.filter((id) => id !== brandId));
    }
  };

  return (
    <>
      <Stack spacing={2} pb={1}>
        <Typography variant="subtitle1" fontSize="15px">
          Brand
        </Typography>
        <FormGroup>
          {brands.map((brand, index) => (
            <FormControlLabel
              key={brand._id}
              control={
                <Checkbox
                  value={brand._id}
                  onChange={handleRatingChange}
                  checked={selectedBrands.includes(brand._id)}
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 25 } }}
                />
              }
              label={brand.name}
            />
          ))}
        </FormGroup>
      </Stack>
   
     
    </>
  );
};

export default Brand;
