import { Box, Stack, Grid, Button, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  DotGroup,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import ICard from "../../components/ui-elements/Card";

const Offer = () => {
  return (
    <Box bgcolor="#FFF8E5" py={5} px={7}>
      <Grid container>
        <Grid item md={7}>
          <Stack spacing={2.5}>
            <Typography variant="h6" fontWeight="500">
              Till 10 Sept, 2021
            </Typography>
            <Typography variant="h5" lineHeight="1.4" fontSize="30px">
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
        <Grid item md={5}>
          <img
            src="https://bazaar.ui-lib.com/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fkisspng-organic-food-leaf-vegetable-fruit-rich-vegetables-5aa9f4d026ae09%201.png&w=384&q=75"
            style={{
              height: "200px",
              width: "320px",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export const Carousel = ({ title, productList }) => {
  return (
    <Stack spacing={3}>
      <Typography variant="h5">{title}</Typography>
      
      <CarouselProvider
        className="carousel-provider"
        naturalSlideWidth={1}
        naturalSlideHeight={1 * (9 / 17)}
        totalSlides={Math.ceil(productList?.length / 3)}
        visibleSlides={1}
        step={1}
      >
        <Slider>
          {Array.from({ length: Math.ceil(productList.length / 3) }).map(
            (_, index) => (
              <Slide key={index} index={index}>
                <Grid container spacing={2}>
                  {productList
                    .slice(index * 3, index * 3 + 3)
                    .map((item, subIndex) => (
                      <Grid item xs={4} key={subIndex}>
                       
                          <ICard {...item} />
                        
                      </Grid>
                    ))}
                </Grid>
              </Slide>
            )
          )}
        </Slider>
        <ButtonBack className="arrow-backward">
          <ArrowBackIcon />
        </ButtonBack>
        <ButtonNext className="arrow-forward">
          <ArrowForwardIcon />
        </ButtonNext>
        <DotGroup className="carousel-dots" />
      </CarouselProvider>
    </Stack>
  );
};

export const Carousel1 = () => {
  return (
    <CarouselProvider
      className="carousel-provider"
      naturalSlideWidth={1}
      naturalSlideHeight={1 * (6 / 17)}
      totalSlides={3}
      isPlaying={true}
      interval={2000}
    >
      <Slider>
        <Slide index={0}>
          <Offer />
        </Slide>
        <Slide index={1}>
          <Offer />
        </Slide>
        <Slide index={2}>
          <Offer />
        </Slide>
      </Slider>
      <ButtonBack className="arrow-backward">
        <ArrowBackIcon />
      </ButtonBack>
      <ButtonNext className="arrow-forward">
        <ArrowForwardIcon />
      </ButtonNext>
      <DotGroup className="carousel-dots" />
    </CarouselProvider>
  );
};

export const Carousel2 = () => {
  return (
    <Box
      sx={{
        overflow: "hidden",
        borderRadius: "10px",
      }}
    >
      <CarouselProvider
        className="carousel-provider carousel-provider-bg"
        naturalSlideWidth={1}
        naturalSlideHeight={1 * (6 / 17)}
        totalSlides={2}
      >
        <Slider>
          <Slide index={0}>
            <Offer />
          </Slide>
          <Slide index={1}>
            <Offer />
          </Slide>
        </Slider>
        <DotGroup className="carousel-dots dots" />
      </CarouselProvider>
    </Box>
  );
};

export const arrivalData = [
  {
    image:
      "https://bazaar.ui-lib.com/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fimagegoggles.png&w=1920&q=75",
    pName: "Sunglasses",
    discount: " $297.50",
  },
  {
    image:
      "https://bazaar.ui-lib.com/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Flipstick%20(2).png&w=1920&q=75",
    pName: "Markup",
    discount: " $258.50",
    price: "$278.00",
  },
  {
    image:
      "https://bazaar.ui-lib.com/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fbgwatch.png&w=1920&q=75",
    pName: "Smart Watch",
    discount: " $142.50",
    price: "$180.00",
  },
  {
    image:
      "https://bazaar.ui-lib.com/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fimagegoggles.png&w=1920&q=75",
    pName: "Sunglass",
    discount: " $297.50",
  },
  {
    image:
      "https://bazaar.ui-lib.com/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Flipstick%20(2).png&w=1920&q=75",
    pName: "Mark",
    discount: " $258.50",
    price: "$278.00",
  },
  {
    image:
      "https://bazaar.ui-lib.com/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fbgwatch.png&w=1920&q=75",
    pName: "Smart",
    discount: " $142.50",
    price: "$180.00",
  },
  {
    image:
      "https://bazaar.ui-lib.com/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fimagegoggles.png&w=1920&q=75",
    pName: "Sunglasses",
    discount: " $297.50",
  },
  {
    image:
      "https://bazaar.ui-lib.com/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Flipstick%20(2).png&w=1920&q=75",
    pName: "MarkOj",
    discount: " $258.50",
    price: "$278.00",
  },
  {
    image:
      "https://bazaar.ui-lib.com/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fbgwatch.png&w=1920&q=75",
    pName: "Watch",
    discount: " $142.50",
    price: "$180.00",
  },
  {
    image:
      "https://bazaar.ui-lib.com/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fbgwatch.png&w=1920&q=75",
    pName: "Watch",
    discount: " $142.50",
    price: "$180.00",
  },
  {
    image:
      "https://bazaar.ui-lib.com/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fbgwatch.png&w=1920&q=75",
    pName: "Watch",
    discount: " $142.50",
    price: "$180.00",
  },
];
