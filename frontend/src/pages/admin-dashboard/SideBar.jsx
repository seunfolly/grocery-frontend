import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton } from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import PlaceIcon from "@mui/icons-material/Place";
import BookIcon from "@mui/icons-material/Book";
import CategoryIcon from "@mui/icons-material/Category";
import AppsIcon from "@mui/icons-material/Apps";
import { useDispatch } from "react-redux";
import { logout, resetState } from "../../features/auth/authSlice";

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        height: "100vh",
        "& .ps-sidebar-root": {
          width: "280px",
          minWidth: "280px",
          height: "100%",
        },
      }}
    >
      <Sidebar
        collapsed={isCollapsed}
        rootStyles={{
          [`.ps-sidebar-container`]: {
            backgroundColor: "#2B3445",
            color: "white",
            padding: "20px 0",
            "&::-webkit-scrollbar": {
              // height: "3px",
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#344054",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#7d879c",
              borderRadius: "100px",
            },
          },
          [`.ps-menuitem-root `]: {},

          [`.ps-menu-button:hover`]: {
            backgroundColor: "transparent !important",
          },

          [`.ps-submenu-content`]: {
            backgroundColor: ` ${isCollapsed ? "#F6F9FC" : "transparent"}`,
            color: ` ${isCollapsed ? "#2b3445" : "white"}`,
          },
        }}
      >
        <Menu
          iconShape="square"
          menuItemStyles={{
            button: {
              [`&.active`]: {
                color: "#4E97FD",
              },
            },
          }}
        >
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={
              isCollapsed ? (
                <Box height="40px">
                  <img
                    src="https://bazaar.ui-lib.com/assets/images/bazaar-white-sm.svg"
                    style={{
                      height: "100%",
                    }}
                  />
                </Box>
              ) : undefined
            }
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box
                  sx={{
                    height: "40px",
                    width: "85px",
                  }}
                >
                  <img
                    src="https://bazaar.ui-lib.com/assets/images/logo.svg"
                    style={{
                      height: "100%",
                      width: "100%",
                    }}
                  />
                </Box>
                <IconButton
                  sx={{
                    "&:hover": {
                      background: "rgba(255, 255, 255, .05)",
                      color: "rgba(255, 255, 255, 1)",
                    },
                  }}
                  onClick={() => setIsCollapsed(!isCollapsed)}
                >
                  <ChevronLeftIcon
                    sx={{
                      color: "primary.contrastText",
                    }}
                  />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          <MenuItem
            icon={<DashboardIcon />}
            component={<NavLink to={"/admin/"} />}
          >
            {" "}
            Dashboard{" "}
          </MenuItem>
          <SubMenu label="Products" icon={<CardGiftcardIcon />}>
            <MenuItem component={<NavLink to="/admin/products" />}>
              {" "}
              Product List
            </MenuItem>
            <MenuItem component={<NavLink to="/admin/product/create" />}>
              {" "}
              Create Product{" "}
            </MenuItem>
            <MenuItem component={<NavLink to="/admin/product-reviews" />}>
              {" "}
              Review{" "}
            </MenuItem>
          </SubMenu>
          <SubMenu label="Categories" icon={<CategoryIcon />}>
            <MenuItem component={<NavLink to="/admin/categories" />}>
              {" "}
              Category List{" "}
            </MenuItem>
            <MenuItem component={<NavLink to="/admin/category/create" />}>
              {" "}
              Create Category{" "}
            </MenuItem>
          </SubMenu>
          <SubMenu label="Brands" icon={<AppsIcon />}>
            <MenuItem component={<NavLink to="/admin/brands" />}>
              {" "}
              Brand List{" "}
            </MenuItem>
            <MenuItem component={<NavLink to="/admin/brand/create" />}>
              {" "}
              Create Brand
            </MenuItem>
          </SubMenu>
          <SubMenu label="Orders" icon={<BookIcon />}>
            <MenuItem component={<NavLink to="/admin/orders" />}>
              {" "}
              Order List{" "}
            </MenuItem>
            <MenuItem component={<NavLink to="/admin/order" />}>
              {" "}
              Order Details
            </MenuItem>
          </SubMenu>
          <SubMenu label="Collection Addresses" icon={<PlaceIcon />}>
            <MenuItem component={<NavLink to="/admin/addresses" />}>
              {" "}
              Address List
            </MenuItem>
            <MenuItem component={<NavLink to="/admin/address/create" />}>
              {" "}
              Create Address
            </MenuItem>
          </SubMenu>
          <MenuItem
            icon={<PeopleAltIcon />}
            component={<NavLink to="/admin/customers" />}
          >
            {" "}
            Customer List{" "}
          </MenuItem>

          <MenuItem
            icon={<LogoutIcon />}
            onClick={() => {
              dispatch(logout());

              navigate("/");
            }}
          >
            {" "}
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SideBar;
