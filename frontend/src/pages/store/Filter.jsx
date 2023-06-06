import Category from "./Category";
import Range from "./Range";
import Brand from "./Brand";
import Rating from "./Rating";
import {
    Box,
    Divider,
  } from "@mui/material";
  
const Filter = () => {
  return (
    <Box
      bgcolor="white"
      p={3}
      borderRadius="5px"
      sx={{
        boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.09)",
      }}
    > 
    <Category/>
      <Divider sx={{
        margin: "16px 0px 24px",
        borderWidth: "0px 0px thin",
        borderStyle: "solid",
        borderColor: "rgb(243, 245, 249)"
      }}/>
      <Range/>
      <Divider sx={{
        margin: "16px 0px 24px",
        borderWidth: "0px 0px thin",
        borderStyle: "solid",
        borderColor: "rgb(243, 245, 249)"
      }}/>
      <Brand/>
      <Divider sx={{
        margin: "16px 0px 24px",
        borderWidth: "0px 0px thin",
        borderStyle: "solid",
        borderColor: "rgb(243, 245, 249)"
      }}/>
    <Rating/>
    </Box>
  );
};

export default Filter;





