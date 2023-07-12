import { useState } from "react";
import {
  Box,
  Stack,
  Menu,
  MenuItem,
  Container,
  IconButton,
  Badge,
  styled,
  Typography,
  ListItemIcon,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAdd from "@mui/icons-material/PersonAdd";
import SearchInput from "../forms/SearchInput";
import { Link, useNavigate } from "react-router-dom";
import Cart from "./Cart";
import { logout, resetState } from "../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import MobileHeader from "./MobileHeader";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.cart);

  const user = useSelector((state) => state.auth.user);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: "-7px",
      top: "-7px",
      backgroundColor: products.length > 0 ? "#D23F57" : "transparent",
      // border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 6px",
      color: "white",
    },
  }));
  const [cartOpen, setCartOpen] = useState(false);
  const handleCartOpen = () => {
    setCartOpen(true);
  };

  const handleCartClose = () => {
    setCartOpen(false);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        bgcolor: "white",
        zIndex: 4,
        position: "sticky",
        top: 0,
        py: 0.7,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          display={{ xs: "none", lg: "flex" }}
        >
          <Link to="/">
            <Box>
              <img src="https://bazaar.ui-lib.com/assets/images/logo2.svg" />
            </Box>
          </Link>

          <Box
            component="div"
            sx={{
              maxWidth: "670px",
              flex: 1,
            }}
          >
            <SearchInput />
          </Box>
          <Stack direction="row" spacing={2}>
            <div>
              <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton
                  sx={{
                    bgcolor: "#F3F5F9",
                    color: "rgba(0, 0, 0, 0.54)",
                    width: "45px",
                    height: "45px",
                  }}
                  // aria-controls={open ? "basic-menu" : undefined}
                  // aria-haspopup="true"
                  // aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <PersonOutlineOutlinedIcon />
                </IconButton>
                {user && (
                  <Typography textTransform="capitalize">{`Hi, ${
                    user?.fullName.split(" ")[0]
                  }`}</Typography>
                )}
              </Stack>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                sx={{
                  marginTop: "10px",
                  "& .MuiList-root": {
                    width: "200px",
                  },
                }}
              >
                <Link
                  to="/user/profile"
                  style={{
                    textDecoration: "none",
                    color: "#2b3445",
                  }}
                >
                  {user && (
                    <MenuItem onClick={handleClose}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <PersonAdd fontSize="small" />
                        <Typography>My Dashbord</Typography>
                      </Stack>
                    </MenuItem>
                  )}
                </Link>

                {user ? (
                  <MenuItem onClick={handleLogout}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <LogoutIcon fontSize="small" />
                      <Typography>Logout</Typography>
                    </Stack>{" "}
                  </MenuItem>
                ) : (
                  <MenuItem onClick={() => navigate("/login")}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <LoginIcon fontSize="small" />
                      <Typography>Login</Typography>
                    </Stack>{" "}
                  </MenuItem>
                )}
              </Menu>
            </div>

            <IconButton
              onClick={handleCartOpen}
              sx={{
                bgcolor: "#F3F5F9",
                color: "rgba(0, 0, 0, 0.54)",
                width: "45px",

                height: "45px",
              }}
            >
              <StyledBadge
                badgeContent={products.reduce(
                  (sum, product) => sum + product.count,
                  0
                )}
              >
                <ShoppingBagOutlinedIcon />
              </StyledBadge>
            </IconButton>
          </Stack>
        </Stack>
        <MobileHeader handleCartOpen={handleCartOpen} />
      </Container>
      <Cart open={cartOpen} onClose={handleCartClose} />
    </Box>
  );
};

export default Header;
