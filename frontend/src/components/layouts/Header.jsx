import { useState } from "react";
import {
  Box,
  Stack,
  Avatar,
  Container,
  IconButton,
  Badge,
  styled,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SearchInput from "../forms/SearchInput";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import { useSelector } from "react-redux";

const Header = () => {
  const { products} = useSelector((state) => state.cart);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: "-7px",
      top: "-7px",
       backgroundColor: products.length>0?"#D23F57":"transparent",
      // border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 6px",
      color: "white"
    },
  }));
  const [cartOpen, setCartOpen] = useState(false);
  const handleCartOpen = () => {
    setCartOpen(true);
  };

  const handleCartClose = () => {
    setCartOpen(false);
  };
  return (
    <Box
      sx={{
        bgcolor: "white",
        zIndex: 4,
        position: "sticky",
        top: 0,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
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
            <IconButton
              sx={{
                bgcolor: "#F3F5F9",
                color: "rgba(0, 0, 0, 0.54)",
                width: "45px",
                height: "45px",
              }}
            >
              <PersonOutlineOutlinedIcon />
            </IconButton>

            <IconButton
              onClick={handleCartOpen}
              sx={{
                bgcolor: "#F3F5F9",
                color: "rgba(0, 0, 0, 0.54)",
                width: "45px",

                height: "45px",
              }}
            >
              <StyledBadge badgeContent={products.length} >
                <ShoppingBagOutlinedIcon />
              </StyledBadge>
            </IconButton>
          </Stack>
        </Stack>
      </Container>
      <Cart open={cartOpen} onClose={handleCartClose} />
    </Box>
  );
};

export default Header;
