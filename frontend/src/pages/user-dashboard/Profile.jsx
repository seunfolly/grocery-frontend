import {
  Typography,
  Box,
  Stack,
  Button,
  Paper,
  Avatar,
  Grid,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Profile = () => {
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2} alignItems="center">
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

      <Grid container justifyContent="space-between">
        <Grid item sm={6}>
          <Paper
            elevation={0}
            sx={{
              paddingY: 2,
              paddingX: 3,
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

        <Grid item sm={1.5}>
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
          paddingX: 3,
          display: "flex",
          bgcolor: "white",
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
