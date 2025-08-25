import { useEffect } from "react";
import { Box, Stack, Grid, Typography, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Comment from "./Comment";
import Footer from "./Footer";
import { Carousel, Carousel1, Carousel2 } from "./Carousel";
import ScaleLoader from "react-spinners/PulseLoader";

const Category = ({ name, image, _id }) => {
  return (
    <Link
      to={`/store?category=${_id}`}
      style={{
        textDecoration: "none",
      }}
    >
      <Box
        flexDirection={{ xs: "column", sm: "row" }}
        sx={{
          bgcolor: "white",
          paddingX: "15px",
          paddingY: "15px",

          borderRadius: "8px",
          display: "flex",
          gap: "12px",
          alignItems: "center",
          boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.09)",
        }}
      >
        <img
          src={image?.url}
          alt={name}
          style={{ width: "70px", height: "70px", borderRadius: "8px" }}
        />

        <Typography variant="subtitle1" color="#4B566B" sx={{}}>
          {name}
        </Typography>
      </Box>
    </Link>
  );
};

const Shop = () => {
  const { products, isLoading } = useSelector((state) => state.product);
  const { categories, isLoading: categoryLoading } = useSelector((state) => state.category);

  const filteredProduct = products.filter(
    (product, index) =>
      product.stock > 0 || (product.stock <= 0 && product.reStock === true)
  );

  return (
    <Box>
      <Stack spacing={6}>
        <Carousel2 />
        <Stack spacing={1}>
          <Typography variant="h5"> Shop By Category</Typography>

          {categoryLoading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100px"
            >
              <ScaleLoader color="#00000042" />
            </Box>
          ) : (
            <Grid
              container
              spacing={3}
              sx={{
                width: "calc(100% + 24px)",
                marginLeft: "-24px !important",
              }}
            >
              {categories.length > 0 ? categories.map((item, index) => (
                <Grid key={index} item xs={6} lg={4}>
                  <Category {...item} />
                </Grid>
                  )) : (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100px"
                  width="100%"
                >
                  <Typography variant="h6" textAlign="center">No categories found</Typography>
                </Box>
              )}
            </Grid>
          )}
        </Stack>

        <Carousel
          title={"Best Selling in Your Area"}
          productList={filteredProduct}
        />
        <Carousel1 />
        <Carousel
          title={"Snacks, Drinks, Dairy & More"}
          productList={filteredProduct}
          isLoading={isLoading}
        />
        <Comment products={filteredProduct} />
        <Footer />
      </Stack>
    </Box>
  );
};

export default Shop;
