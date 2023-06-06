import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { base_url } from "../../utils/baseUrl";
import axios from "axios";
import {
  Box,
  Stack,
  Grid,
  Container,
  Avatar,
  Typography,
  Rating,
  Button,
} from "@mui/material";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import Categories from "../../components/layouts/Categories";
import Tab from "./Tab";

const ProductDescription = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [productDetails, setProductDetails] = useState(null);
  const { id } = useParams();

  const getProduct = () => {
    axios
      .get(`${base_url}product/${id}`)
      .then((response) => {
        setProductDetails(response.data);
        setSelectedImage(response.data.images[0].url);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  const handleImageClick = (image) => {
    setSelectedImage(image.url);
  };

  return (
    <>
      <Header />
      <Categories />

      <Box
        sx={{
          bgcolor: "#F6F9FC",
          paddingY: "40px",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item md={6}>
              <Box display="flex" justifyContent="center">
                <img
                  src={selectedImage}
                  alt="Selected Image"
                  style={{
                    width: "400px",
                    height: "400px",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
                {productDetails &&
                  productDetails.images.map((image, index) => (
                    <Avatar
                      key={index}
                      onClick={() => handleImageClick(image)}
                      src={image.url}
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: "8px",
                        border: selectedImage === image.url ? "1px solid #D23F57" : "",
                        cursor: "pointer",
                      }}
                    />
                  ))}
              </Stack>
            </Grid>

            <Grid item md={6} alignSelf="center">
              <Stack spacing={2}>
                <Typography variant="h5">{productDetails?.name}</Typography>
                <Typography variant="subtitle2">
                  Brand: <span style={{ fontWeight: 600 }}>{productDetails?.brand}</span>{" "}
                </Typography>
                <Stack spacing={1} alignItems="center" direction="row">
                  <Typography variant="subtitle2">Rating:</Typography>
                  <Rating
                    value={productDetails?.rating}
                    readOnly
                    sx={{
                      fontSize: 20,
                      alignItems: "center",
                    }}
                  />
                </Stack>
                <Typography variant="h5" color="primary.main">
                  {`₦ ${productDetails && (productDetails.salePrice ? productDetails.salePrice : productDetails.regularPrice)}`}
                </Typography>
                <Typography fontSize="14px">Stock Available</Typography>
                <Button
                  sx={{
                    textTransform: "none",
                    bgcolor: "primary.main",
                    color: "white",
                    fontSize: "14px",
                    paddingX: "20px",
                    fontWeight: 500,
                    paddingY: "8px",
                    alignSelf: "start",
                    "&:hover": {
                      backgroundColor: "#E3364E",
                    },
                  }}
                >
                  Add To Cart
                </Button>
                {/* <Stack alignItems="center" direction="row" spacing={2}>
               <Button
                variant="outlined"
                sx={{
                  padding: "1px",
                  minWidth: 0,
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <RemoveIcon />
              </Button>
               <Typography>3</Typography>

              <Button
                variant="outlined"
                sx={{
                  padding: "1px",
                  minWidth: 0,
                }}
              >
                <AddIcon />
              </Button>
            </Stack> */}
              </Stack>
            </Grid>
          </Grid>

          <Tab product={productDetails} />
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default ProductDescription;
