import { useEffect, useState } from "react";
import {
  Stack,
  Typography,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Divider,
} from "@mui/material";

const Features = ({
  sales,
  setSales,
  stock,
  setStock,
  featured,
  setFeatured,
}) => {
  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              value={sales}
              onChange={(e) => {
                const sales = e.target.checked;
                setSales(sales);
              }}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 25 } }}
            />
          }
          label=" Sales"
        />
        <FormControlLabel
          control={
            <Checkbox
              value={stock}
              onChange={(e) => {
                const stock = e.target.checked;
                setStock(stock);
              }}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 25 } }}
            />
          }
          label=" In Stock"
        />{" "}
        <FormControlLabel
          control={
            <Checkbox
              value={featured}
              onChange={(e) => {
                const featured = e.target.checked;
                setFeatured(featured);
              }}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 25 } }}
            />
          }
          label=" Featured"
        />
      </FormGroup>
    </>
  );
};

export default Features;
