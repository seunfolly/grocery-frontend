import {
  Typography,
  Box,
  Link,
  Stack,
  Avatar,
  Icon,
  Container,
  Grid,
} from "@mui/material";

const arrayLinks = [
  {
    head: "About",
    link1: "Careers",
    link2: "Our Stores",
    link3: "Our Cares",
    link4: "Terms & Condition",
    link5: "Privacy Policy",
  },
  {
    head: "Customer Care",
    link1: "Help Center",
    link2: "How To Buy",
    link3: "Track Your Order",
    link4: "Corporate & Bulk Purcashing",
    link5: "Returns & Refunds",
  },
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
    <Avatar
      sx={{
        bgcolor: "#161d2b",
        width: "25px",
        height: "25px",
        padding: "3px",
      }}
    >
      <Icon
        className={className}
        sx={{
          fontSize: "12px",
        }}
      />
    </Avatar>
  );
};

const CustomLinks = ({ head, link1, link2, link3, link4, link5 }) => {
  return (
    <Stack spacing={1.7}>
      <Typography variant="h6" color="white">
        {head}
      </Typography>
      <Link
        href="#"
        underline="none"
        color="#AEB4BE"
        variant="subtitle2"
        sx={{
          "&:hover": {
            color: "#fff",
          },
        }}
      >
        {link1}
      </Link>
      <Link
        href="#"
        underline="none"
        color="#AEB4BE"
        variant="subtitle2"
        sx={{
          "&:hover": {
            color: "#fff",
          },
        }}
      >
        {link2}
      </Link>
      <Link
        href="#"
        underline="none"
        color="#AEB4BE"
        variant="subtitle2"
        sx={{
          "&:hover": {
            color: "#fff",
          },
        }}
      >
        {link3}
      </Link>
      <Link
        href="#"
        underline="none"
        color="#AEB4BE"
        variant="subtitle2"
        sx={{
          "&:hover": {
            color: "#fff",
          },
        }}
      >
        {link4}
      </Link>
      <Link
        href="#"
        underline="none"
        color="#AEB4BE"
        variant="subtitle2"
        sx={{
          "&:hover": {
            color: "#fff",
          },
        }}
      >
        {link5}
      </Link>
    </Stack>
  );
};

const Footer = () => {
  return (
    <Box bgcolor="secondary.dark" py={{xs:8,md:12}} px={{ xs: 1.5, sm: 0 }}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6} md={4}>
            <Stack>
              <Box>
                <img src="	https://bazaar.ui-lib.com/assets/images/logo.svg" />
              </Box>
              <Typography
                variant="subtitle2"
                color="#AEB4BE"
                lineHeight={1.75}
                mt={2}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor
                libero id et, in gravida. Sit diam duis mauris nulla cursus.
                Erat et lectus vel ut sollicitudin elit at amet.
              </Typography>
            </Stack>
          </Grid>
          {arrayLinks.map((link, index) => (
            <Grid item xs={12} sm={6} md={2.25}>
              <CustomLinks key={index} {...link} />
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={3.5}>
            <Stack spacing={1.7}>
              <Typography variant="h6" color="white">
                Contact Us
              </Typography>
              <Typography color="#AEB4BE" variant="subtitle2">
                70 Washington Square South, New York, NY 10012, United States
              </Typography>
              <Typography color="#AEB4BE" variant="subtitle2">
                Email: uilib.help@gmail.com
              </Typography>
              <Typography color="#AEB4BE" variant="subtitle2">
                Phone: +1 1123 456 780{" "}
              </Typography>
              <Stack direction="row" spacing={2}>
                {iconArray.map((icon, index) => (
                  <IconSvg key={index} className={icon} />
                ))}
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        {/* <Stack flex={1} direction="row" justifyContent="space-between">
            {arrayLinks.map((link, index) => (
              <CustomLinks key={index} {...link} />
            ))}
          </Stack> */}
      </Container>
    </Box>
  );
};

export default Footer;
