import { useState } from "react";
import {
  Box,
  Stack,
  Avatar,
  Grid,
  Container,
  IconButton,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";
import ViewListIcon from "@mui/icons-material/ViewList";

const Sort = ({ activeIcon, setActiveIcon, sort, setSort }) => {
  return (
    <Box
      bgcolor="white"
      p={2}
      borderRadius="5px"
      sx={{
        boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.09)",
      }}
    >
      <Stack direction="row" justifyContent="space-between">
      <Stack direction="row" spacing={1} alignItems="center">
            <Typography>Sort By:</Typography>
            <FormControl size="small">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                }}
              >
                <MenuItem value={"relevance"}>Relevance</MenuItem>
                <MenuItem value={"new_arrivals"}>New Arrivals</MenuItem>
                <MenuItem value={"price_low_high"}>Price Low to High</MenuItem>
                <MenuItem value={"price_high_low"}>Price High to Low</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>View:</Typography>
            <IconButton
              onClick={() => setActiveIcon("apps")}
              sx={{
                color:
                  activeIcon === "apps" ? "#D23F57" : "rgba(0, 0, 0, 0.54)",
              }}
            >
              <AppsIcon />
            </IconButton>
            <IconButton
              onClick={() => setActiveIcon("view")}
              sx={{
                color:
                  activeIcon === "view" ? "#D23F57" : "rgba(0, 0, 0, 0.54)",
              }}
            >
              <ViewListIcon />
            </IconButton>
          </Stack>
        </Stack>
      
    </Box>
  );
};

export default Sort;
