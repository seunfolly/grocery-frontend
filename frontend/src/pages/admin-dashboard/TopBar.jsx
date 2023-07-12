import {
  Box,
  Stack,
  Button,
  SvgIcon,
  Container,
  Typography,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ReactComponent as Browse } from "../../assets/icons/browse.svg";
import { ReactComponent as Bell } from "../../assets/icons/bell.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";



const TopBar = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Box
      bgcolor="white"
      p={2}
      px={4}
      sx={{
        boxShadow: " 0px 4px 16px rgba(43, 52, 69, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button
          sx={{
            textTransform: "none",
            bgcolor: "background.paper",
            paddingY: "9px",
            paddingX: "20px",
            borderRadius: "8px",
            justifyContent: "space-between",

            "&:hover": {
              backgroundColor: "background.paper",
            },
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <SvgIcon
              sx={{
                fontSize: "25px",
                color: "text.primary",
              }}
            >
              <Browse />
            </SvgIcon>

            <Link to={"/"} style={{ textDecoration: "none" }}>
              <Typography variant="subtitle1" color="text.primary">
                Browse Website
              </Typography>
            </Link>
          </Stack>
        </Button>

        <Stack direction="row" spacing={2.5} alignItems="center">
          <OutlinedInput
            placeholder="Search anything"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            sx={{
              borderRadius: "12px",
              paddingRight: 0,
              bgcolor: "background.paper",

              "& .MuiInputBase-input": {
                padding: "10px",
                fontSize: "14px",
              },
            }}
          />

          <SvgIcon
            sx={{
              fontSize: "25px",
              color: "primary.contrastText",
            }}
          >
            <Bell />
          </SvgIcon>
          <Box
            sx={{
              width: "40px",
              height: "40px",
            }}
          >
            <img
              src={user?.image}
              style={{
                width: "100%",
                height: "100%",
                borderRadius:"50%"
              }}
            />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default TopBar;
