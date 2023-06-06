import { Box, Stack, Avatar, Container, IconButton } from "@mui/material";
import Header from "../../components/layouts/Header";
import Category from "./Category";
import Shop from "./Shop";
import Categories from "../../components/layouts/Categories";

const Homepage = () => {
  return (
    <>
      <Header />
      <Categories/>
      <Box
        sx={{
          bgcolor: "#F6F9FC",
          paddingTop: "30px",
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4} direction="row" position="relative">
          <Category />
          <Shop/>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Homepage;
