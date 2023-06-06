import {
  Stack,
  Typography,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Divider,
} from "@mui/material";
const Brand = () => {
  const brands = ["Nike", "Addidas", "Samsung", "Tesla"];
  const featured = ["On Sales", "In Stock", "Featured"];
  return (
    <>
      <Stack spacing={2} pb={1}>
        <Typography variant="subtitle1" fontSize="15px">
          Brand
        </Typography>
        <FormGroup>
          {brands.map((brand, index) => (
            <FormControlLabel
              control={
                <Checkbox sx={{ "& .MuiSvgIcon-root": { fontSize: 25 } }} />
              }
              label={brand}
            />
          ))}
        </FormGroup>
      </Stack>
      <Divider
        sx={{
          margin: "16px 0px 24px",
          borderWidth: "0px 0px thin",
          borderStyle: "solid",
          borderColor: "rgb(243, 245, 249)",
        }}
      />
      <FormGroup>
        {featured.map((brand, index) => (
          <FormControlLabel
            control={
              <Checkbox sx={{ "& .MuiSvgIcon-root": { fontSize: 25 } }} />
            }
            label={brand}
          />
        ))}
      </FormGroup>
    </>
  );
};

export default Brand;
