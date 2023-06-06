import {
  Stack,
  OutlinedInput,
  InputAdornment,
  Button,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const SearchInput = () => {
  return (
    <Stack py={2}>
      <OutlinedInput
        placeholder="Searching for"
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end" sx={{
            height: "100%",
            maxHeight: "100%"
          }}>
            <Button
              sx={{
                textTransform: "none",
                bgcolor: "#E3364E",
                color: "white",
                paddingX: "40px",
                fontSize: "16px",
                paddingY: "8px",
                borderLeft: "1px solid #7D879C ",
                justifyContent: "space-between",
                borderTopRightRadius: "1200px",
                borderBottomRightRadius: "1200px",
                height: "100%",
                "&:hover": {
                  backgroundColor: "#D23F57",
                },
              }}
            >
              Search
            </Button>
          </InputAdornment>
        }
        py={1}
        sx={{
          borderRadius: "1200px",
          width: "100%",
          paddingRight: 0,
          height: "44px",

          "& .MuiInputBase-input": {
            padding: "10px",
            fontSize: "14px",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
               borderColor: "#E3364E"
          }
        }}

        
      />
    </Stack>
  );
};

export default SearchInput;
