import { Link } from "react-router-dom";
import {
  Typography,
  Box,
  Stack,
  MenuItem,
  Paper,
  Grid,
  Link as MuiLink,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const CategoriesDrawer = ({ anchorEl, setAnchorEl, cats }) => {
  return (
    <Box
      sx={{
        left: "0px",
        zIndex: "98",
        right: "auto",
        borderRadius: "4px",
        padding: "0.5rem 0px",
        transformOrigin: " center top",
        boxShadow: "rgba(43, 52, 69, 0.1) 0px 4px 16px",
        position: "absolute",
        transition: "transform 250ms ease-in-out 0s",
        transform: anchorEl ? "scaleY(1)" : "scaleY(0)",
        backgroundColor: "rgb(255, 255, 255)",
        top: "calc(100% + 0.7rem)",
        width: "100%",
        maxHeight: anchorEl ? "500px" : "0",
      }}
    >
      <Stack>
        {cats.map((cat) => (
          <Box
            sx={{
              "&:hover": {
                "& > div": {
                  display: "block",
                },
              },
            }}
          >
            <MenuItem
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                height: "45px",
              }}
              onClick={() => setAnchorEl()}
            >
              {cat.children && cat.children.length > 0 ? (
                <Typography flex={1}>{cat.name}</Typography>
              ) : (
                <MuiLink
                  component={Link}
                  to={"/"}
                  underline="none"
                  color="#4B566B"
                  fontSize="15px"
                  onClick={() => setAnchorEl()}
                >
                  {cat.name}
                </MuiLink>
              )}
              {cat.children && cat.children.length > 0 && <ChevronRightIcon />}
            </MenuItem>

            <Box
              sx={{
                display: "none",
                position: "absolute",
                left: "100%",
                right: "auto",
                top: "0",
                zIndex: "99",
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  minWidth:
                    cat.children &&
                    cat.children.some(
                      (child) => child.children && child.children.length > 0
                    )
                      ? "760px"
                      : "300px",
                  bgcolor: "white",
                  borderRadius: 1,
                  marginLeft: 2,
                  color: "#2B3445",
                  display:
                    cat.children && cat.children.length > 0 ? "block" : "none",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "unset",
                    padding: "14px 20px",
                  }}
                >
                  <Grid container spacing={2}>
                    {cat.children && cat.children.length > 0 ? (
                      cat.children.map((child) => (
                        <Grid
                          item
                          sm={
                            cat.children &&
                            cat.children.some(
                              (child) =>
                                child.children && child.children.length > 0
                            )
                              ? 3
                              : 12
                          }
                          key={child.name}
                        >
                          <Stack spacing={1}>
                            <MuiLink
                              component={Link}
                              to={"/"}
                              underline="none"
                              color="#4B566B"
                              variant={
                                cat.children &&
                                cat.children.some(
                                  (child) =>
                                    child.children && child.children.length > 0
                                )
                                  ? "subtitle1"
                                  : "subtitle2"
                              }
                              fontSize="15px"
                              sx={{
                                "&:hover": {
                                  color: "#D23F57",
                                },
                              }}
                              onClick={() => setAnchorEl()}
                            >
                              {child.name}
                            </MuiLink>
                            {child.children && child.children.length > 0 ? (
                              child.children.map((grandchild) => (
                                <MuiLink
                                  component={Link}
                                  to={"/"}
                                  underline="none"
                                  color="#4B566B"
                                  variant="subtitle2"
                                  fontSize="15px"
                                  sx={{
                                    "&:hover": {
                                      color: "#D23F57",
                                    },
                                  }}
                                  key={grandchild.name}
                                  onClick={() => setAnchorEl()}
                                >
                                  {grandchild.name}
                                </MuiLink>
                              ))
                            ) : (
                              <></>
                            )}
                          </Stack>
                        </Grid>
                      ))
                    ) : (
                      <></>
                    )}
                  </Grid>
                </Box>
              </Paper>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default CategoriesDrawer;
