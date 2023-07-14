import { useEffect } from "react";
import { Typography, Box, Stack, Avatar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../features/product/productSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ReviewBox = ({ customer, image, comment }) => {
  return (
    <Box
      bgcolor="white"
      px="3rem"
      py="2rem"
      borderRadius="8px"
      sx={{
        boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.09)",
      }}
      height="200px"
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
          src={image.url}
          sx={{ width: 60, height: 60 }}
        />
        <Stack spacing={1}>
          <Typography variant="subtitle2" lineHeight="1.7" color="#4B566B">
            {comment}
          </Typography>
          <Typography variant="subtitle1" fontSize="17px" textTransform="capitalize">
            {customer}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

const Comment = ({ products }) => {
  const reviews = products.reduce((result, product) => {
    const { ratings, _id } = product;
    const productRatings = ratings.map((rating) => ({
      _id: _id,
      image: rating.postedby.image,
      customer: rating.postedby.fullName,
      comment: rating.comment,
    }));
    return result.concat(productRatings);
  }, []);
  const settings = {
    dots: false,
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
        {reviews.map((item, index) => (
          <div key={index}>
            <ReviewBox {...item} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Comment;
