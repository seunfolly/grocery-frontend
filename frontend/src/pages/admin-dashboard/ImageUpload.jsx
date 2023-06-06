import { useState, useRef, useEffect } from "react";
import {
  Button,
  Grid,
  Paper,
  Stack,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector } from "react-redux";

let imagesField = [];

const ImageUpload = ({ setFieldValue }) => {
  const newProduct = useSelector((state) => state.product);
  const { isSuccess, productData } = newProduct;
  const [uploadedImages, setUploadedImages] = useState([]);
  // const fileInputRef = useRef(null);
  const handleFileUpload = (event) => {
    const files = event.target.files;
    imagesField = Array.from(event.target.files);
    setFieldValue("images", imagesField);
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        newImages.push(reader.result);
        if (newImages.length === files.length) {
          setUploadedImages(newImages);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    imagesField = Array.from(files);
    setFieldValue("images", imagesField);
    
    const newImages = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        newImages.push(reader.result);
        if (newImages.length === files.length) {
          setUploadedImages(newImages);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleImageDelete = (index) => {
    const updatedImages = [...uploadedImages];
    updatedImages.splice(index, 1);
    setUploadedImages(updatedImages);
    imagesField.splice(index, 1);
    setFieldValue("images", imagesField);
  };
  // const handleBoxClick = () => {
  //   fileInputRef.current.click();
  // };
  useEffect(() => {
    setUploadedImages(productData?.images.map((image) => image?.url));

    // console.log(productData)
  }, [productData]);
  useEffect(() => {
    if (isSuccess) {
      setUploadedImages([]);
    }
  }, [isSuccess]);
  return (
    <Grid container>
      <Grid item xs={12} mt={2}>
        <Paper
          elevation={0}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          // onClick={handleBoxClick}
          sx={{
            width: "100%",
            border: "1px dashed #DAE1E7",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
            minHeight: "200px",
            py: 4,
            borderRadius: "8px",
          }}
        >
          <input
            type="file"
            accept="image/*"
            id="image-input"
            style={{ display: "none" }}
            onChange={handleFileUpload}
            multiple
            // ref={fileInputRef}
          />
          <Typography variant="body2" color="#7D879C">
            Drag and drop images here
          </Typography>
          <Box width="300px">
            <Divider
              sx={{
                color: "#DAE1E7",
              }}
            >
              OR
            </Divider>
          </Box>

          <label htmlFor="image-input">
            <Button
              variant="outlined"
              sx={{
                color: "#4E97FD",
                borderColor: "#4e97fd80",
                textTransform: "none",
                fontSize: "15px",
                fontWeight: 500,
                paddingX: "30px",
                //    paddingY: "8px",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "rgba(78, 151, 253, 0.04)",
                  border: "1px solid #4E97FD",
                },
              }}
              component="span"
            >
              Select Files
            </Button>
          </label>
        </Paper>
      </Grid>
      {uploadedImages?.length > 0 && (
        <Grid item xs={12} mt={2}>
          <Stack direction="row" spacing={1}>
            {uploadedImages.map((image, index) => (
              <Box key={index} sx={{ position: "relative" }}>
                <Box py={1.5} bgcolor="#F6F9FC" borderRadius="8px">
                  <img src={image} alt={`Uploaded ${index + 1}`} width="70px" />
                  <ClearIcon
                    sx={{
                      position: "absolute",
                      fontSize: "14px",
                      top: 5,
                      right: 2,
                      cursor: "pointer",
                    }}
                    onClick={() => handleImageDelete(index)}
                  />
                </Box>
              </Box>
            ))}
          </Stack>
        </Grid>
      )}
    </Grid>
  );
};

export default ImageUpload;
