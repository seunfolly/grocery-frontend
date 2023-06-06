import {
  Stack,
  Grid,
  Typography,
  TextField,
  Paper,
  Avatar,
  MenuItem,
} from "@mui/material";

const DeliveryDate = () => {
  const currentDate = new Date();
  const dates = [];
  for (let i = 0; i < 15; i++) {
    const date = new Date();
    date.setDate(currentDate.getDate() + i);
    const formattedDate = `${date.getDate()} ${date.toLocaleString("default", {
      month: "short",
    })}`;
    dates.push(formattedDate);
  }
  const timeSlots = [
    "9am to 10am",
    "10am to 11am",
    "11am to 12pm",
    "12pm to 1pm",
    "1pm to 2pm",
  ];
  return (
    <Paper
      elevation={1}
      sx={{
        backgroundColor: "white",
        p: 3,
        pb: 6,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: "8px",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar sx={{ bgcolor: "#d23f57" }}>1</Avatar>
        <Typography variant="body2">Delivery Date and Time</Typography>
      </Stack>

      <Grid container spacing={2.5}>
        <Grid item sm={6}>
          <TextField
            select
            label="Delivery Date"
            fullWidth
            size="small"
            variant="outlined"
            sx={{}}
            InputLabelProps={{
              style: { fontSize: "14px" },
            }}
          >
            {dates.map((date) => (
              <MenuItem key={date} value={date}>
                {date}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item sm={6}>
          <TextField
            select
            label="Delivery Time"
            fullWidth
            size="small"
            variant="outlined"
            sx={{}}
            InputLabelProps={{
              style: { fontSize: "14px" },
            }}
          >
            {timeSlots.map((date) => (
              <MenuItem key={date} value={date}>
                {date}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DeliveryDate;
