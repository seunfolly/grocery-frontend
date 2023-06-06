import { Typography, Box, Stack, Avatar } from "@mui/material";

const Comment = () => {
  return (
    <Box
      bgcolor="white"
      px="3rem"
      py="2rem"
      borderRadius="8px"
      sx={{
        boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.09)",
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        px="6rem"
        py="3rem"
        alignItems="center"
      >
        <Avatar
          alt="Remy Sharp"
          src="https://bazaar.ui-lib.com/assets/images/faces/7.png"
          sx={{ width: 60, height: 60 }}
        />
        <Stack spacing={1}>
          <Typography variant="subtitle2" lineHeight="1.7" color="#4B566B">
            Satisfied by their professionalism ! Got my tea bags in time. Didn't
            have to pay any delivery charge. I can't believe that. Keep it up !
          </Typography>
          <Typography variant="subtitle1" fontSize="17px">
            Ridwan Abdulsalam
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Comment;
