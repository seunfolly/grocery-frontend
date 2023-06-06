import { useState } from "react";

import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Category = () => {
  const [anchorEl, setAnchorEl] = useState(false);

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1" fontSize="15px">
        Categories
      </Typography>
      <Box>
        <Box
          onClick={() => setAnchorEl(!anchorEl)}
          sx={{
            cursor: "pointer",
            height: anchorEl ? "143px" : "33px",
            overflow: "hidden",
            transition: "height 250ms ease-in-out 0s",
          }}
        >
          <Stack direction="row" justifyContent="space-between">
            <Typography>Fruits & Vegetables</Typography>
            <ChevronRightIcon
              sx={{
                transition: "transform 250ms ease-in-out 0s",
                transform: anchorEl ? "rotate(90deg)" : "rotate(0deg)",
              }}
            />
          </Stack>
          {anchorEl && (
            <Box marginLeft={2}>
              <Link
                style={{
                  textDecoration: "none",
                }}
              >
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
                  {" "}
                  Vegetables
                </Typography>
              </Link>
            </Box>
          )}
        </Box>
      </Box>
    </Stack>
  );
};

export default Category;
