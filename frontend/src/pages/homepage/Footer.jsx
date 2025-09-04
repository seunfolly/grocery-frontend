import {
  Typography,
  Box,
  Link as MuiLink,
  Stack,
  Grid,
  Icon,
  Divider,
} from "@mui/material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const quickLinks = [
  { title: "Help Center", url: "/" },
  { title: "Track Your Order", url: "/" },
  { title: "Corporate & Bulk Purchasing", url: "/" },
  { title: "Returns & Refunds", url: "/" },
];

const socialIcons = [
  { iconClass: "fa-brands fa-facebook-f", url: "https://facebook.com" },
  { iconClass: "fa-brands fa-twitter", url: "https://twitter.com" },
  { iconClass: "fa-brands fa-google", url: "https://google.com" },
  { iconClass: "fa-brands fa-youtube", url: "https://youtube.com" },
  { iconClass: "fa-brands fa-instagram", url: "https://instagram.com" },
];

const payments = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png",
    alt: "Visa",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png",
    alt: "Mastercard",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
    alt: "PayPal",
  },
];

const SocialIcon = ({ iconClass, url, ariaLabel }) => (
  <MuiLink
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel}
    sx={{
      bgcolor: "rgba(255,255,255,0.1)",
      width: 36,
      height: 36,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textDecoration: "none",
      transition: "all 0.3s ease",
      "&:hover": { bgcolor: "rgba(255,255,255,0.25)" },
    }}
  >
    <Icon className={iconClass} sx={{ fontSize: 14, color: "white" }} />
  </MuiLink>
);

SocialIcon.propTypes = {
  iconClass: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string,
};

SocialIcon.defaultProps = {
  ariaLabel: "social link",
};

const Footer = () => {
  return (
    <Box bgcolor="#141850" color="white" pt={6} pb={3} px={{ xs: 3, md: 8 }}>
      <Grid container spacing={6}>
        {/* Brand + Description */}
        <Grid item xs={12} md={4}>
          <Stack spacing={2}>
            <Box>
              <img
                src="https://bazaar.ui-lib.com/assets/images/logo.svg"
                alt="Brand Logo"
                style={{ height: 40 }}
              />
            </Box>
            <Typography
              variant="body2"
              color="rgba(255,255,255,0.7)"
              maxWidth="90%"
            >
              Your one-stop online store for everything you love. Fast delivery,
              best prices, and quality guaranteed.
            </Typography>
            <Stack direction="row" spacing={1.5}>
              {socialIcons.map(({ iconClass, url }, idx) => (
                <SocialIcon
                  key={idx}
                  iconClass={iconClass}
                  url={url}
                  ariaLabel={iconClass.split(" ").pop()?.replace("fa-", "")}
                />
              ))}
            </Stack>
          </Stack>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>
            Quick Links
          </Typography>
          <Stack spacing={1}>
            {quickLinks.map((link, idx) => (
              <MuiLink
                key={idx}
                component={Link}
                to={link.url}
                underline="none"
                color="rgba(255,255,255,0.7)"
                fontSize="14px"
                sx={{ "&:hover": { color: "#fff" } }}
              >
                {link.title}
              </MuiLink>
            ))}
          </Stack>
        </Grid>

        {/* Payment Methods */}
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>
            Secure Payments
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            flexWrap="wrap"
          >
            {payments.map(({ src, alt }, idx) => (
              <Box
                key={idx}
                component="img"
                src={src}
                alt={alt}
                sx={{
                  height: 24,
                  filter: "brightness(0) invert(1)",
                  opacity: 0.9,
                }}
              />
            ))}
          </Stack>
        </Grid>
      </Grid>

      {/* Divider */}
      <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", my: 4 }} />

      {/* Bottom bar */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Typography
          variant="body2"
          color="rgba(255,255,255,0.7)"
          textAlign="center"
        >
          © {new Date().getFullYear()} MyStore. All rights reserved.
        </Typography>
        <Stack direction="row" spacing={3}>
          <MuiLink
            component={Link}
            to="/privacy"
            underline="none"
            color="rgba(255,255,255,0.7)"
            fontSize="14px"
            sx={{ "&:hover": { color: "#fff" } }}
          >
            Privacy Policy
          </MuiLink>
          <MuiLink
            component={Link}
            to="/terms"
            underline="none"
            color="rgba(255,255,255,0.7)"
            fontSize="14px"
            sx={{ "&:hover": { color: "#fff" } }}
          >
            Terms & Conditions
          </MuiLink>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;
