import { useEffect } from "react";
import { Box, Stack, Grid, Typography, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../features/product/productSlice";
import { getCategories } from "../../features/category/categorySlice";
import Comment from "./Comment";
import Footer from "./Footer";
import { Carousel, Carousel1, Carousel2 } from "./Carousel";


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
          src= {image.url}
          alt={name}
          style={{ width: "60px", height: "60px", borderRadius: "8px" }}
        />

        <Typography variant="subtitle1" color="#4B566B" sx={{}}>
          {name}
        </Typography>
      </Box>
    </Link>
  );
};

const Shop = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories(1));
  }, []);

  const { products, isLoading } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);


  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",

        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box >
      <Stack spacing={6}>
        <Carousel2 />
        <Stack spacing={1}>
          <Typography variant="h5"> Shop By Category</Typography>
          <Grid
            container
            spacing={3}
            sx={{
              width: "calc(100% + 24px)",
              marginLeft: "-24px !important",
            }}
          >
            {categories.map((item, index) => (
              <Grid key={index} item xs={6} lg={4}>
                <Category {...item} />
              </Grid>
            ))}
          </Grid>
        </Stack>
       
        <Carousel title={"Best Selling in Your Area"} productList={products} />
        <Carousel1 />
        <Carousel
          title={"Snacks, Drinks, Dairy & More"}
          productList={products}
        />
        <Comment products={products}/>
        <Footer />
      </Stack>
    </Box>
  );
};

export default Shop;
