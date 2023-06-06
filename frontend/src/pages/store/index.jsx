import { useState } from "react";
import { Box, Stack, Avatar, Grid, Container, IconButton } from "@mui/material";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import Filter from "./Filter";
import Products from "./Products";
import Sort from "./Sort";

const Store = () => {
  const [activeIcon, setActiveIcon] = useState("apps");
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
          <Sort activeIcon={activeIcon} setActiveIcon={setActiveIcon} />
          <Grid container spacing={3} marginTop={4}>
            <Grid item md={3}>
              <Filter />
            </Grid>
            <Grid item md={9}>
              <Products activeIcon={activeIcon} />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Store;
