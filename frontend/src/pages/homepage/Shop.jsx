import { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Grid,
  Typography,
  CircularProgress,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Comment from "./Comment";
import { Carousel, Carousel1, Carousel2 } from "./Carousel";
import PropTypes from "prop-types";

const Category = ({ name, image, _id }) => {
  return (
    <Grid item xs={6} sm={4} md={3} lg={2.4}>
      <Card
        sx={{
          borderRadius: "12px",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
          },
        }}
      >
        <CardActionArea
          component={Link}
          to={`/store?category=${_id}`}
          sx={{ height: "100%", textDecoration: "none" }}
        >
          <CardMedia
            component="img"
            height="160"
            image={image?.url}
            alt={name}
            sx={{
              objectFit: "cover",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              py: 2,
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight={600}
              color="text.primary"
              textAlign="center"
            >
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

Category.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.shape({
    url: PropTypes.string,
  }),
  _id: PropTypes.string.isRequired,
};

const Shop = () => {
  const { products, isLoading } = useSelector((state) => state.product);
  const { categories, isLoading: categoryLoading } = useSelector(
    (state) => state.category
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryLoading && !isLoading) {
      const timeout = setTimeout(() => setLoading(false), 800);
      return () => clearTimeout(timeout);
    }
  }, [categoryLoading, isLoading]);

  const filteredProduct = products.filter(
    (product) =>
      product.stock > 0 || (product.stock <= 0 && product.reStock === true)
  );

  return (
    <Box>
      <Stack spacing={8}>
        <Carousel2 />
        <Stack spacing={3}>
          <Typography
            variant="h4"
            fontWeight={700}
            color="text.primary"
            textAlign="center"
          >
            Shop by Category
          </Typography>

          {loading ? (
            <Box display="flex" justifyContent="center" py={6}>
              <CircularProgress size={48} thickness={4} color="error" />
            </Box>
          ) : categories.length > 0 ? (
            <Grid
              container
              spacing={3}
              justifyContent="center"
              alignItems="stretch"
            >
              {categories.map((item) => (
                <Category key={item._id} {...item} />
              ))}
            </Grid>
          ) : (
            <Box display="flex" justifyContent="center" py={6}>
              <Typography variant="h6" color="text.secondary">
                No categories found
              </Typography>
            </Box>
          )}
        </Stack>
        <Carousel
          title="🔥 Best Selling in Your Area"
          productList={filteredProduct}
        />
        <Carousel1 />
        <Carousel
          title="🥤 Snacks, Drinks, Dairy & More"
          productList={filteredProduct}
          isLoading={isLoading}
        />
        <Comment products={filteredProduct} />
        {/* <Footer /> */}
      </Stack>
    </Box>
  );
};

export default Shop;
