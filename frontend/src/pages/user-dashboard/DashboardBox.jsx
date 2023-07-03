import { Typography, Box, Stack, Button, Link as MuiLink } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaymentIcon from "@mui/icons-material/Payment";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout,resetState } from "../../features/auth/authSlice";

const dashboards = [
  { text: "Orders", no: 5, Icon: <ShoppingBagOutlinedIcon />, url: "orders" },
  { text: "Wishlist", no: 19, Icon: <FavoriteBorderIcon />, url: "wishlist" },
  { text: "Support", no: 11, Icon: <HeadsetMicIcon />, url: "support" },
];

const account = [
  {
    text: "Profile Info",
    no: 4,
    Icon: <PersonOutlineOutlinedIcon />,
    url: "profile",
  },
  { text: "Addresses", no: 39, Icon: <LocationOnIcon />, url: "addresses" },
  { text: "Payment Method", no: 9, Icon: <PaymentIcon />, url: "payments" },
];

const ILink = ({ text, no, Icon, url }) => {
  const location = useLocation();
  const isActive =
    location.pathname === `/user/${url}` ||
    location.pathname.startsWith(`/user/${url}/`);
  return (
    <MuiLink
      component={Link}
      to={`/user/${url}`}
      underline="none"
      variant="subtitle2"
      color={isActive ? "primary.main" : "text.primary"}
      borderLeft="4px solid"
      borderColor={isActive ? "primary.main" : "transparent"}
      pr={2}
      pl={3.5}
      sx={{
        "&:hover": {
          color: "primary.main",
          borderColor: "primary.main",
        },
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={1}>
          {Icon}
          <Typography variant="subtitle2">{text}</Typography>
        </Stack>

        <Typography>{no}</Typography>
      </Stack>
    </MuiLink>
  );
};

const DashboardBox = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <Box
      bgcolor="#fff"
      py={5}
      borderRadius={2}
      sx={{
        boxShadow: " 0px 1px 3px rgba(3, 0, 71, 0.09)",
      }}
    >
      <Stack spacing={5}>
        <Stack spacing={1.5}>
          <Typography pl={3.5} variant="subtitle2">
            DASHBOARD
          </Typography>
          <Stack spacing={2}>
            {dashboards.map((dashboard, index) => (
              <ILink key={index} {...dashboard} />
            ))}
          </Stack>
        </Stack>
        <Stack spacing={1.5}>
          <Typography pl={3.5} variant="subtitle2">
            ACCOUNT SETTINGS
          </Typography>
          <Stack spacing={2}>
            {account.map((dashboard, index) => (
              <ILink key={index} {...dashboard} />
            ))}
          </Stack>

          <Button
            variant="text"
            onClick={()=> {
              dispatch(logout())
              navigate("/")
            }}
            sx={{
              textTransform: "none",
              // bgcolor: "#FCE9EC",
              color: "primary.main",
              paddingX: "40px",
              fontWeight: 600,
              paddingY: "6px",
              gap: "5px",
              // marginTop: "50px !important",
              "&:hover": {
                backgroundColor: "rgba(210, 63, 87, 0.04)",
              },
            }}
          >
            <LogoutIcon/>
            <Typography variant="subtitle2">LOGOUT</Typography>
            
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default DashboardBox;
