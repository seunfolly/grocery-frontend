import {
  Box,
  Stack,
  Grid,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "pure-react-carousel/dist/react-carousel.es.css";
import ICard from "../../components/ui-elements/Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        transform: "translate(0, -50%)",
        right: "-5px",
        background: "#0f3460",
        color: "white",
        "&:hover": {
          background: "#0f3460",
        },
      }}
    >
      <ArrowForwardIcon
        sx={{
          cursor: "pointer",
          fontSize: "25px",
        }}
      />
    </IconButton>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        transform: "translate(0, -50%)",
        left: "-5px",
        zIndex: 10,
        background: "#0f3460",
        color: "white",
        "&:hover": {
          background: "#0f3460",
        },
      }}
    >
      <ArrowBackIcon
        sx={{
          cursor: "pointer",
          fontSize: "25px",
        }}
      />
    </IconButton>
  );
}

const Offer = () => {
  return (
    <Box
      bgcolor="#FFF8E5"
      py={5}
      px={{ xs: 4, lg: 7 }}
      sx={{
        cursor: "pointer",
        borderRadius: "8px",
      }}
    >
      <Grid
        container
        spacing={{ xs: 4, sm: 0 }}
        sx={{
          alignItems: "center",
        }}
      >
        <Grid item xs={12} sm={7} order={{ xs: 1, sm: 0 }} alignItems="center">
          <Stack spacing={2.5}>
            <Typography variant="h6" fontWeight="500">
              Till 10 Sept, 2021
            </Typography>
            <Typography
              variant={"h5"}
              lineHeight="1.4"
              fontSize={{ sm: "25px", md: "30px" }}
            >
              25% Special Off Today Only for Vegetables
            </Typography>
            <Button
              sx={{
                textTransform: "none",
                bgcolor: "primary.main",
                color: "white",
                fontSize: "14px",
                paddingX: "20px",
                fontWeight: 500,
                paddingY: "8px",
                alignSelf: "start",
                "&:hover": {
                  backgroundColor: "#E3364E",
                },
              }}
            >
              Shop Now
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={5}>
          <img
            src="https://bazaar.ui-lib.com/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fkisspng-organic-food-leaf-vegetable-fruit-rich-vegetables-5aa9f4d026ae09%201.png&w=384&q=75"
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export const Carousel = ({ title, productList }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h5">{title}</Typography>
      <div>
        <Slider {...settings}>
          {productList.map((item, index) => (
            <div key={index} className="carousel-card">
              <ICard {...item} />
            </div>
          ))}
        </Slider>
      </div>
    </Stack>
  );
};

export const Carousel1 = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  return (
    <div>
      <Slider {...settings}>
        <Offer />
        <Offer />
        <Offer />
      </Slider>
    </div>
  );
};

export const Carousel2 = () => {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <Slider {...settings}>
        <Offer />
        <Offer />
      </Slider>
    </div>
  );
};
