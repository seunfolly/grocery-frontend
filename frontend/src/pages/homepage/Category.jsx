import { useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Box,
  Stack,
  Typography,
  Container,
  Button,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";

const testArray = ["Vegetable", "Cotton", "Organic", "Eggs"];
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
        name: "Women",
      },
      {
        name: "Children",
      },
    ],
  },
  {
    name: "Electronics",
    children: [
      {
        name: "Phones",
      },
    ],
  },
  {
    name: "Organic",
  },
  {
    name: "Breakfast",
  },
  {
    name: "Canned Food",
  },
  {
    name: "Beauty",
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
        name: "Women",
      },
      {
        name: "Children",
      },
    ],
  },
];

const Category = () => {
  const [showChildren, setShowChildren] = useState(
    Array(cats.length).fill(false)
  );

  const toggleChildren = (index) => {
    setShowChildren((prevShowChildren) => {
      const updatedShowChildren = [...prevShowChildren];
      updatedShowChildren[index] = !updatedShowChildren[index];
      return updatedShowChildren;
    });
  };

  return (
    <Box
      bgcolor="white"
      p={3}
      borderRadius="5px"
      sx={{
        width: "250px",
        minWidth: "250px",
        height: "calc(100vh - 180px)",
        boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.09)",
        position: "sticky",
        top: "80px",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          width: "5px",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#ebeff7",
          borderRadius: "100px",
        },
      }}
    >
      <Box>
        <Stack spacing={1}>
          {cats.map((item, index) => (
            <Box
              key={index}
              onClick={() => toggleChildren(index)}
              sx={{
                cursor: "pointer",
                height:
                  showChildren[index] &&
                  item.children &&
                  item.children.length > 0
                    ? `auto`
                    : "33px",
                overflow: "hidden",
                transition: "height 250ms ease-in-out 0s",
              }}
            >
              <Stack direction="row" justifyContent="space-between">
                {item.children && item.children.length > 0 ? (
                  <Typography>{item.name}</Typography>
                ) : (
                  <Link style={{ textDecoration: "none", width: "100%" }}>
                    <Typography
                      color="#4B566B"
                      sx={{
                        "&:hover": {
                          color: "#D23F57",
                        },
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Link>
                )}

                {item.children && item.children.length > 0 && (
                  <ChevronRightIcon
                    sx={{
                      transition: "transform 250ms ease-in-out 0s",
                      transform: showChildren[index]
                        ? "rotate(90deg)"
                        : "rotate(0deg)",
                    }}
                  />
                )}
              </Stack>
              {item.children &&
                item.children.length > 0 &&
                showChildren[index] && (
                  <Box marginLeft={2}>
                    {item.children.map((child, childIndex) => (
                      <Stack spacing={1} key={childIndex}>
                        <Link style={{ textDecoration: "none" }}>
                          <Typography
                            variant="subtitle2"
                            color="#4B566B"
                            py={1}
                            sx={{
                              "&:hover": {
                                color: "#D23F57",
                              },
                            }}
                          >
                            {child.name}
                          </Typography>
                        </Link>
                        <Stack
                          sx={{
                            marginLeft: "10px !important",
                            marginTop: "0 !important",
                          }}
                        >
                          {child.children && child.children.length > 0 ? (
                            child.children.map((item) => (
                              <Link style={{ textDecoration: "none" }}>
                                <Typography
                                  variant="subtitle2"
                                  color="#4B566B"
                                  py={1}
                                  sx={{
                                    "&:hover": {
                                      color: "#D23F57",
                                    },
                                  }}
                                >
                                  {item.name}
                                </Typography>
                              </Link>
                            ))
                          ) : (
                            <></>
                          )}{" "}
                        </Stack>
                      </Stack>
                    ))}
                  </Box>
                )}
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default Category;
