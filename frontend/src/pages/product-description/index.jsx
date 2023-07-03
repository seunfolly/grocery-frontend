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
import Tab from "./Tab";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  addToCart,
  decreaseQuantity,
} from "../../features/cart/cartSlice";
import makeToast from "../../utils/toaster";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ProductDescription = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [productDetails, setProductDetails] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.cart);
  const cartProduct = products.find(
    (product) => product.id === productDetails?._id
  );

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
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: productDetails._id,
        image: productDetails.images[0].url,
        price: productDetails.salePrice
          ? productDetails.salePrice
          : productDetails.regularPrice,
        name: productDetails.name,
      })
    );
    makeToast("success", "Added to Cart");
  };

  const handleRemoveCart = (id) => {
    dispatch(decreaseQuantity(id));
    makeToast("error", "Remove from Cart");
  };
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
                        border:
                          selectedImage === image.url
                            ? "1px solid #D23F57"
                            : "",
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
                  Brand:{" "}
                  <span style={{ fontWeight: 600 }}>
                    {productDetails?.brand.name}
                  </span>{" "}
                </Typography>
                <Stack spacing={1} alignItems="center" direction="row">
                  <Typography variant="subtitle2">Rating:</Typography>
                  <Rating
                    value={productDetails?.totalstar || 2}
                    readOnly
                    sx={{
                      fontSize: 20,
                      // alignItems: "center",
                    }}
                  />
                  <Typography variant="subtitle2">{`(${productDetails?.totalrating})`}</Typography>
                </Stack>
                <Typography variant="h5" color="primary.main">
                  {`₦ ${
                    productDetails &&
                    (productDetails.salePrice
                      ? productDetails.salePrice
                      : productDetails.regularPrice)
                  }`}
                </Typography>
                <Typography fontSize="14px">Stock Available</Typography>
                {cartProduct?.count > 0 ? null : (
                  <Button
                    onClick={() => handleAddToCart()}
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
                )}
                <Stack alignItems="center" direction="row" spacing={2}>
                  {cartProduct?.count > 0 && (
                    <Button
                      onClick={() => handleRemoveCart(productDetails._id)}
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
                  )}
                  {cartProduct?.count && cartProduct?.count > 0 ? (
                    <Typography>{cartProduct?.count}</Typography>
                  ) : null}

                  {cartProduct?.count > 0 && (
                    <Button
                      onClick={() => handleAddToCart()}
                      variant="outlined"
                      sx={{
                        padding: "1px",
                        minWidth: 0,
                      }}
                    >
                      <AddIcon />
                    </Button>
                  )}
                </Stack>
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
