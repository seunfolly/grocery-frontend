import { useEffect } from "react";
import { Box, Stack, Grid, Typography} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../features/product/productSlice";
import Comment from "./Comment";
import Footer from "./Footer";
import { Carousel, Carousel1, Carousel2 } from "./Carousel";
const cats = [
  "Fruit & Vegetable",
  "Fish & Meat",
  "Rice & Flour",
  "Fruit & Vegetable",
  "Personal Care",
  "Baby Food",
];

const Category = ({ icon, title }) => {
  return (
    <Link
      to="/store"
      style={{
        textDecoration: "none",
      }}
    >
      <Box
        sx={{
          bgcolor: "white",
          padding: "23px",
          borderRadius: "8px",
          display: "flex",
          gap: "12px",
          alignItems: "center",
          boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.09)",
        }}
      >
        <img
          src="https://bazaar.ui-lib.com/assets/images/icons/healthy-food.svg"
          alt={title}
          style={{ width: "46px", height: "46px" }}
        />

        <Typography variant="subtitle1" color="#4B566B" sx={{}}>
          {title}
        </Typography>
      </Box>
    </Link>
  );
};

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const productState = useSelector((state) => state.product.products);
  return (
    <Box>
      <Stack spacing={6}>
        <Carousel2 />
        <Stack spacing={1}>
          <Typography variant="h5"> Shop By Category</Typography>
          <Grid
            container
            spacing={3}
            sx={{
              width: "calc(100% + 32px)",
              marginLeft: "-32px !important",
            }}
          >
            {cats.map((item, index) => (
              <Grid key={index} item md={4}>
                <Category title={item} />
              </Grid>
            ))}
          </Grid>
        </Stack>
        <Carousel title={"Featured Item"} productList={productState} />
        <Carousel title={"Best Selling in Your Area"} productList={productState}/>
        <Carousel1 />
        <Carousel title={"Snacks, Drinks, Dairy & More"} productList={productState}/>
        <Comment />
        <Footer />
      </Stack>
    </Box>
  );
};

export default Shop;
