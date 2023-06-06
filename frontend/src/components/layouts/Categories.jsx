import { useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Box, Stack, Button, Container } from "@mui/material";
import WidgetsIcon from "@mui/icons-material/Widgets";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CategoriesDrawer from "./CategoriesDrawer";

const cats = [
  {
    name: "Fashion",
    children: [
      {
        name: "Men",
        children: [
          {
            name: "Tshirt",
          },
          {
            name: "Plain Shirt",
          },
          {
            name: "Long Sleeve Shirt",
          },
        ],
      },
      {
        name: "Accessories",
        children: [
          {
            name: "Belt",
          },
          {
            name: "Watches",
          },
          {
            name: "Glasses",
          },
          {
            name: "Bracelets",
          },
        ],
      },
    ],
  },
  {
    name: "Electronics",
    children: [
      {
        name: "Television",
        children: [
          {
            name: "Toshiba",
          },
          {
            name: "LG",
          },
          {
            name: "Toshiba",
          },
        ],
      },
      {
        name: "Phones",
        children: [
          {
            name: "Apple",
          },
          {
            name: "Samsung",
          },
          {
            name: "Gionee",
          },
          {
            name: "Infinix",
          },
        ],
      },
    ],
  },
  {
    name: "Bikes",
    children: [
      {
        name: "Men",
      },
      {
        name: "Women",
      },
      {
        name: "Boys",
      },
      {
        name: "Girls",
      },
    ],
  },
  {
    name: "Medication",
  },
  {
    name: "Music",
  },{
    name: "Pet",
  },
  {
    name: "Gift",
  },
  {
    name: "Automotive",
  },{
    name: "Baby Toys",
  },
];
const Categories = () => {
  const [anchorEl, setAnchorEl] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(!anchorEl);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box bgcolor="#ff">
      <Container maxWidth="lg">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          py={1}
        >
          <Box
            sx={{
              position: "relative",
              cursor: "pointer",
            }}
          >
            <Button
              onClick={handleClick}
              sx={{
                textTransform: "none",
                bgcolor: "#F6F9FC",
                color: "text.secondary",
                paddingX: "22px",
                paddingY: "10px",
                justifyContent: "space-between",
                width: "278px",
                height: "40px",

                "&:hover": {
                  backgroundColor: "#F3F5F9",
                },
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <WidgetsIcon />
                <Typography variant="subtitle1">Categories</Typography>
              </Stack>

              <ChevronRightIcon   sx={{
                transition: "transform 250ms ease-in-out 0s",
                transform: anchorEl ? "rotate(90deg)" : "rotate(0deg)",
              }}/>
            </Button>

             <CategoriesDrawer anchorEl={anchorEl} setAnchorEl={setAnchorEl} cats={cats} />
          </Box>

          <Link
            to="/user/profile"
            style={{
              textDecoration: "none",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                color: "#2b3445",
                cursor: "pointer",

                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              My Dashboard
            </Typography>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
};

export default Categories;
