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
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
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

const MobileHeader = ({ handleCartOpen }) => {
  const { products } = useSelector((state) => state.cart);
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      height: "15px",
      minWidth: "15px",
      backgroundColor: products.length > 0 ? "#D23F57" : "transparent",
      padding: "0 6px",
      color: "white",
    },
  }));
  

  return (
    <Stack
      direction="row"
      alignItems="center"
      pt={0.8}
      display={{ xs: "flex", lg: "none" }}
    >
      <Box
        sx={{
          flex: "1 1 0%",
        }}
      >
        <IconButton>
          <MenuIcon />
        </IconButton>
      </Box>

      <Link to="/">
        <Box height="40px" width="auto">
          <img
            src="https://bazaar.ui-lib.com/assets/images/bazaar-black-sm.svg"
            width="100%"
            height="100%"
          />
        </Box>
      </Link>

      <Stack
        direction="row"
        alignItems="center"
        sx={{
          flex: "1 1 0%",
          justifyContent: "end",
        }}
      >
        <IconButton
          sx={{
            color: "rgba(0, 0, 0, 0.54)",
          }}
        >
          <SearchIcon
            sx={{
              fontSize: "20px",
            }}
          />
        </IconButton>
        <IconButton
          sx={{
            color: "rgba(0, 0, 0, 0.54)",
          }}
        >
          <PersonOutlineOutlinedIcon
            sx={{
              fontSize: "20px",
            }}
          />
        </IconButton>

        <IconButton
          onClick={handleCartOpen}
          sx={{
            color: "rgba(0, 0, 0, 0.54)",
          }}
        >
          <StyledBadge
            badgeContent={products.reduce(
              (sum, product) => sum + product.count,
              0
            )}
          >
            <ShoppingBagOutlinedIcon
              sx={{
                fontSize: "20px",
              }}
            />
          </StyledBadge>
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default MobileHeader;
