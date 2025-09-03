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
  Divider,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAdd from "@mui/icons-material/PersonAdd";
import SearchInput from "../forms/SearchInput";
import { Link, useNavigate } from "react-router-dom";
import Cart from "./Cart";
import { logout } from "../../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import MobileHeader from "./MobileHeader";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: "-6px",
      top: "-6px",
      backgroundColor:
        products.length > 0 ? theme.palette.primary.main : "transparent",
      color: "white",
      fontWeight: 600,
      fontSize: "0.75rem",
      minWidth: "18px",
      height: "18px",
      borderRadius: "50%",
    },
  }));

  const [cartOpen, setCartOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCartOpen = () => setCartOpen(true);
  const handleCartClose = () => setCartOpen(false);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setAnchorEl(null);
  };

  return (
    <Box
      py={{ xs: 1, md: 0.7 }}
      sx={{
        bgcolor: "white",
        zIndex: 1000,
        position: "sticky",
        top: 0,
        boxShadow: "0px 2px 6px rgba(0,0,0,0.08)",
      }}
    >
      <Container maxWidth="lg">
        {/* Desktop Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          display={{ xs: "none", lg: "flex" }}
        >
          {/* Logo */}
          <Link to="/" style={{ display: "flex", alignItems: "center" }}>
            <Box
              component="img"
              src="https://bazaar.ui-lib.com/assets/images/logo2.svg"
              alt="Logo"
              sx={{
                height: 40,
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            />
          </Link>

          {/* Search */}
          <Box sx={{ maxWidth: "680px", flex: 1, mx: 3 }}>
            <SearchInput />
          </Box>

          {/* User + Cart */}
          <Stack direction="row" spacing={2} alignItems="center">
            {/* User Menu */}
            <div>
              <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton
                  onClick={handleClick}
                  sx={{
                    bgcolor: "#F3F5F9",
                    color: "rgba(0,0,0,0.6)",
                    width: 45,
                    height: 45,
                    borderRadius: "12px",
                    transition: "all 0.2s",
                    "&:hover": {
                      bgcolor: "primary.light",
                      color: "primary.main",
                    },
                  }}
                >
                  <PersonOutlineOutlinedIcon />
                </IconButton>
                {user && (
                  <Typography fontWeight={600} textTransform="capitalize">
                    Hi, {user?.fullName.split(" ")[0]}
                  </Typography>
                )}
              </Stack>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                sx={{
                  mt: 1,
                  "& .MuiList-root": { width: 220, p: 0.5 },
                }}
              >
                {user && (
                  <Link
                    to="/user/profile"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <MenuItem
                      onClick={handleClose}
                      sx={{ borderRadius: "8px", mb: 0.5 }}
                    >
                      <PersonAdd fontSize="small" />
                      <Typography ml={1}>My Dashboard</Typography>
                    </MenuItem>
                  </Link>
                )}

                <Divider sx={{ my: 0.5 }} />

                {user ? (
                  <MenuItem
                    onClick={handleLogout}
                    sx={{ borderRadius: "8px", color: "error.main" }}
                  >
                    <LogoutIcon fontSize="small" />
                    <Typography ml={1}>Logout</Typography>
                  </MenuItem>
                ) : (
                  <MenuItem
                    onClick={() => navigate("/login")}
                    sx={{ borderRadius: "8px", color: "primary.main" }}
                  >
                    <LoginIcon fontSize="small" />
                    <Typography ml={1}>Login</Typography>
                  </MenuItem>
                )}
              </Menu>
            </div>

            {/* Cart */}
            <IconButton
              onClick={handleCartOpen}
              sx={{
                bgcolor: "#F3F5F9",
                color: "rgba(0,0,0,0.6)",
                width: 45,
                height: 45,
                borderRadius: "12px",
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: "primary.light",
                  color: "primary.main",
                },
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

        <MobileHeader
          handleCartOpen={handleCartOpen}
          handleClick={handleClick}
          handleClose={handleClose}
          handleLogout={handleLogout}
          anchorEl={anchorEl}
        />
      </Container>

      {/* Cart Drawer */}
      <Cart open={cartOpen} onClose={handleCartClose} />
    </Box>
  );
};

export default Header;
