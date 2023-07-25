import {
  Typography,
  Box,
  Stack,
  Button,
  Paper,
  Avatar,
  IconButton,
  Grid,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./Header";

const Profile = ({ openDrawer }) => {
  const isNonMobile = useMediaQuery("(min-width:968px)");
  const Mobile = useMediaQuery("(min-width:600px)");

  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  return (
    <Stack spacing={3}>
      <Header
        Icon={PersonIcon}
        title={"My Profile"}
        openDrawer={openDrawer}
        button="Edit Profile"
        link={`/user/profile/${user?._id}`}
      />
      {/* <Stack direction="row" justifyContent="space-between" alignItems="start">
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          width={{ xs: "auto", md: "100%" }}
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            mb={{ xs: 1.5, md: 0 }}
          >
            <PersonIcon
              sx={{
                color: "#D23F57",
                fontSize: "30px",
              }}
            />

            <Typography variant="h5" fontSize="23px">
              My Profile
            </Typography>
          </Stack>
          <Link
            to={`/user/profile/${user?._id}`}
            style={{
              textDecoration: "none",
            }}
          >
            <Button
              sx={{
                textTransform: "none",
                bgcolor: "#FCE9EC",
                color: "primary.main",
                fontSize: "subtitle2",
                paddingX: "40px",
                fontWeight: 600,
                paddingY: "6px",
                "&:hover": {
                  backgroundColor: "rgba(210, 63, 87, 0.04)",
                },
              }}
            >
              Edit Profile
            </Button>
          </Link>
        </Stack>

        <IconButton
           onClick={openDrawer}
          sx={{
            display: isNonMobile ? "none" : "inline-flex",
          }}
        >
          <MenuIcon />
        </IconButton>
      </Stack> */}

      <Grid container justifyContent="space-between">
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={0}
            sx={{
              paddingY: 2,
              paddingX: Mobile ? 3 : 1.5,
              bgcolor: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                alt="profile-picture"
                src={user?.image || ""}
                sx={{ width: 64, height: 64 }}
              />
              <Typography
                color="rgb(125, 135, 156)"
                letterSpacing={4}
                textTransform="uppercase"
              >
                {user?.fullName}
              </Typography>
            </Stack>
            {/* <Typography color="rgb(125, 135, 156)" letterSpacing={4}>
              SILVER USER
            </Typography> */}
          </Paper>
        </Grid>

        <Grid
          item
          xs={12}
          sm={2}
          sx={{
            marginTop: Mobile ? 0 : 2,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              paddingY: 2,
              paddingX: 4,
              bgcolor: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography color="primary.main" variant="h6">
              {user?.orders}
            </Typography>
            <Typography
              variant="subtitle2"
              fontSize="12px"
              textAlign="center"
              color="rgb(125, 135, 156)"
            >
              All Orders
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper
        elevation={0}
        sx={{
          paddingY: 2,
          paddingX: Mobile ? 3 : 1.5,

          display: "flex",
          bgcolor: "white",
          flexDirection: isNonMobile ? "row" : "column",
        }}
      >
        <Box
          sx={{
            flex: "1 1 0",
            display: "flex",
            flexDirection: "column",
            padding: "8px",
          }}
        >
          <small
            style={{
              color: "rgb(125, 135, 156)",
            }}
          >
            First Name
          </small>
          <Typography variant="subtitle2" textTransform="capitalize">
            {user?.fullName.split(" ")[0]}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: "1 1 0",
            display: "flex",
            flexDirection: "column",
            padding: "8px",
          }}
        >
          <small
            style={{
              color: "rgb(125, 135, 156)",
            }}
          >
            Last Name
          </small>
          <Typography variant="subtitle2" textTransform="capitalize">
            {user?.fullName.split(" ")[1]}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: "1 1 0",
            display: "flex",
            flexDirection: "column",
            padding: "8px",
          }}
        >
          <small
            style={{
              color: "rgb(125, 135, 156)",
            }}
          >
            Email
          </small>
          <Typography variant="subtitle2">{user?.email}</Typography>
        </Box>
        <Box
          sx={{
            flex: "1 1 0",
            display: "flex",
            flexDirection: "column",
            padding: "8px",
          }}
        >
          <small
            style={{
              color: "rgb(125, 135, 156)",
            }}
          >
            Phone
          </small>
          <Typography variant="subtitle2">{user?.phone}</Typography>
        </Box>
        <Box
          sx={{
            flex: "1 1 0",
            display: "flex",
            flexDirection: "column",
            padding: "8px",
          }}
        >
          <small
            style={{
              color: "rgb(125, 135, 156)",
            }}
          >
            Birth Date
          </small>
          <Typography variant="subtitle2">
            {" "}
            {user?.dob &&
              new Date(user.dob).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
          </Typography>
        </Box>
      </Paper>
    </Stack>
  );
};

export default Profile;
