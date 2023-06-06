import {
  Stack,
  Typography,
  Button,
  TextField,
  InputAdornment,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "white",
    width: "350px",
    padding: "5px 12px",
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
      outline: "none",
    },
  },
});
const Header = ({ title, button, placeholder, route }) => {
  return (
    <Stack spacing={3} px={3}>
      <Typography variant="h6" fontSize="21px">
        {title}
      </Typography>
      <Stack justifyContent="space-between" direction="row">
        <CustomTextField
          id="input-with-icon-textfield"
          placeholder={placeholder}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          size="small"
        />
        <Link to={`/admin/${route}`}>
          <Button
            sx={{
              textTransform: "none",
              bgcolor: "#4e97fd",
              color: "white",
              fontSize: "14px",
              paddingX: "15px",
              fontWeight: 600,
              paddingY: "13px",
              alignSelf: "start",
              borderRadius: "10px",
              alignItems: "center",
              gap: 1,

              "&:hover": {
                backgroundColor: "#2756b6",
              },
            }}
          >
            <AddIcon />
            <Typography variant="subtitle1">{button}</Typography>
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
};

export default Header;
