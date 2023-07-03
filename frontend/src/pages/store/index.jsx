import { useState, useEffect } from "react";
import {
  Stack,
  Avatar,
  Grid,
  Container,
  IconButton,
  Box,
  Divider,
  styled,
  CircularProgress,
} from "@mui/material";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import Products from "./Products";
import Sort from "./Sort";
import Category from "./Category";
import Range from "./Range";
import Brand from "./Brand";
import Rating from "./Rating";
import Features from "./Features";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getProducts } from "../../features/product/productSlice";

const CustomDivider = styled(Divider)`
  margin: 16px 0px 24px;
  border-width: 0px 0px thin;
  border-style: solid;
  border-color: rgb(243, 245, 249);
`;

const Store = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const search = queryParams.get("search");
  const [activeIcon, setActiveIcon] = useState("apps");
  const [rating, setRating] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sort, setSort] = useState("relevance");
  const [pageLoaded, setPageLoaded] = useState(false);
  const [sales, setSales] = useState(null);
  const [featured, setFeatured] = useState(null);
  const [stock, setStock] = useState(null);

  useEffect(() => {
    if (!pageLoaded) {
      setPageLoaded(true);
      return;
    }

    if (
      rating !== null ||
      minPrice !== null ||
      maxPrice !== null ||
      (selectedBrands && selectedBrands.length > 0) ||
      sort !== null ||
      sales !== null ||
      featured !== null ||
      stock !== null
    ) {
      dispatch(
        getProducts({
          rating,
          minPrice,
          maxPrice,
          selectedBrands,
          sort,
          sales,
          featured,
          stock,
        })
      );
    }
  }, [
    rating,
    minPrice,
    maxPrice,
    selectedBrands,
    sort,
    sales,
    featured,
    stock,
    dispatch,
  ]);

  return (
    <>
      <Header />
      <Box
        sx={{
          bgcolor: "#F6F9FC",
          paddingY: "40px",
        }}
      >
        <Container maxWidth="lg">
          <Sort
            activeIcon={activeIcon}
            setActiveIcon={setActiveIcon}
            sort={sort}
            setSort={setSort}
          />
          <Grid container spacing={3} marginTop={4}>
            <Grid item md={3}>
              <Box
                bgcolor="white"
                p={3}
                borderRadius="5px"
                sx={{
                  boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.09)",
                }}
              >
                <Category />
                <CustomDivider />
                <Range
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  setMinPrice={setMinPrice}
                  setMaxPrice={setMaxPrice}
                />
                <CustomDivider />

                <Brand
                  selectedBrands={selectedBrands}
                  setSelectedBrands={setSelectedBrands}
                />
                <CustomDivider />

                <Features
                  sales={sales}
                  setSales={setSales}
                  featured={featured}
                  setFeatured={setFeatured}
                  stock={stock}
                  setStock={setStock}
                />
                <CustomDivider />

                <Rating rating={rating} setRating={setRating} />
              </Box>
            </Grid>
            <Grid item md={9}>
              <Products
                activeIcon={activeIcon}
                category={category}
                search={search}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Store;
