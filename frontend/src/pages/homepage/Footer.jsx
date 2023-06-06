import {
  Typography,
  Box,
  Link as MuiLink,
  Stack,
  Grid,
  Icon,
} from "@mui/material";
import { Link } from "react-router-dom";

const arrayLinks = [
  { title: "Help Center", url: "/" },
  { title: "Track Your Order", url: "/" },
  { title: "Corporate & Bulk Purcashing", url: "/" },
  { title: "Returns & Refunds", url: "/" },
];

const iconArray = [
  "fa-brands fa-facebook-f",
  "fa-brands fa-twitter",
  "fa-brands fa-google",
  "fa-brands fa-youtube",
  "fa-brands fa-instagram",
];
const IconSvg = ({ className }) => {
  return (
    <MuiLink
      href="/"
      sx={{
        bgcolor: "rgba(0,0,0,0.2)",
        width: "25px",
        height: "25px",
        padding: "3px",
        borderRadius: "50%",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        textDecoration: "none",
        alignItems: "center",

        "& :hover": {
          bgcolor: "rgba(0,0,0,0.4)",
        },
      }}
    >
      <Icon
        className={className}
        sx={{
          fontSize: "12px",
          color: "white",
        }}
      />
    </MuiLink>
  );
};

const Footer = () => {
  return (
    <Box bgcolor="#141850" p={6} borderRadius="8px">
      <Stack color="#AEB4BE">
        <Box marginBottom="5px">
          <img src="	https://bazaar.ui-lib.com/assets/images/logo.svg" />
        </Box>

        <Grid container spacing={7} marginLeft="-40px">
          <Grid item md={6}>
            <Typography variant="subtitle2" color="#AEB4BE" lineHeight={1.75}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor
              libero id et, in gravida. Sit diam duis mauris nulla cursus. Erat
              et lectus vel ut sollicitudin elit at amet.
            </Typography>
          </Grid>

          <Grid item md={6}>
            <Stack spacing={2}>
              <Stack justifyContent="space-between">
                {arrayLinks.map((link, index) => (
                  <MuiLink
                    component={Link}
                    to={link.url}
                    underline="none"
                    color="#AEB4BE"
                    variant="subtitle2"
                    fontSize="15px"
                    padding={0.5}
                    sx={{
                      "&:hover": {
                        color: "#ffffff",
                      },
                    }}
                  >
                    {link.title}
                  </MuiLink>
                ))}
              </Stack>

              <Stack direction="row" spacing={2}>
                {iconArray.map((icon, index) => (
                  <IconSvg key={index} className={icon} />
                ))}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};

export default Footer;
