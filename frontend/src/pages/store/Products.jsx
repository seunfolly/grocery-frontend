import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  searchProduct,
} from "../../features/product/productSlice";
import { Stack, Grid, CircularProgress, Box } from "@mui/material";
import { Pagination } from "@mui/material";
import { useState } from "react";
import ICard from "../../components/ui-elements/Card";
import ProductCard from "./ProductCard";

const Products = ({ activeIcon, category, search }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (category) {
      return
    } else if (search) {
      dispatch(searchProduct(search));
    } else {
      dispatch(getProducts());
    }
  }, [category, search]);
  const {products} = useSelector((state) => state.product);
  const productState = products.filter((product,index) => product.stock > 0 || (product.stock <= 0 && product.reStock === true))

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(productState.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = productState.slice(startIndex, endIndex);
  const { isLoading } = useSelector((state) => state.product);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "500px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Stack>
      {activeIcon === "apps" && (
        <Grid container spacing={3}>
          {paginatedData.map((item) => (
            <Grid item xs={4} key={item._id}>
              <ICard {...item} />
            </Grid>
          ))}
        </Grid>
      )}
      {activeIcon === "view" && (
        <Grid container spacing={3}>
          {paginatedData.map((item) => (
            <Grid item xs={12} key={item._id}>
              <ProductCard {...item} />
            </Grid>
          ))}
        </Grid>
      )}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        color="primary"
        sx={{
          display: "flex",
          justifyContent: "end",
          marginTop: 5,
        }}
      />
    </Stack>
  );
};

export default Products;
