import {
    Box,
    Stack,
    TextField,
    Typography

  } from "@mui/material";
const Range = () => {

    return (
        <Stack spacing={2} pb={1}>
        <Typography variant="subtitle1" fontSize="15px">
          Price Range
        </Typography>
      <Stack direction="row" spacing={1} alignItems="center">
         <TextField
         size="small"
          id="outlined-number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Typography>-</Typography>
        <TextField
                 size="small"

          id="outlined-number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Stack>
      </Stack>
    )
}

export default Range