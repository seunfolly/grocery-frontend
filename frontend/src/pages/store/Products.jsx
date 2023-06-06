import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../features/product/productSlice";
import {  Stack,Grid } from "@mui/material";
import { Pagination } from "@mui/material";
import { useState } from "react";
import ICard from "../../components/ui-elements/Card";
import ProductCard from "./ProductCard";

const Products = ({ activeIcon }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const productState = useSelector((state) => state.product.products);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(productState.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = productState.slice(startIndex, endIndex);

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
