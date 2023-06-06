import { useState } from "react";
import {
  Typography,
  Avatar,
  Rating,
  Stack,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { base_url } from "../../utils/baseUrl";
import makeToast from "../../utils/toaster";
import axios from "axios";
import { arrivalData } from "../homepage/Carousel";
import ICard from "../../components/ui-elements/Card";

const Reviews = ({ product }) => {
  const [value, setValue] = useState({ star: 0, comment: "" });
  const addComment = (event) => {
    event.preventDefault();
    axios
      .put(`${base_url}product/rating/${product._id}`, value, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWZjYjY0N2E0NjAwZmY3ODdkMzVlYSIsImlhdCI6MTY4NjA0NDI0OSwiZXhwIjoxNjg2MTMwNjQ5fQ.RwpMI0F-0UnJ5Ml5tlPrK_rGf09yAZKILlTiAAc6VFU`,
        },
      })
      .then((response) => {
        makeToast("success", "Thank you for your review!");
        setValue({ star: 0, comment: "" });
      })
      .catch((error) => {
        makeToast("error", "Something went wrong, Please try again");
      });
  };

  return (
    <Stack spacing={6}>
      <Stack spacing={5} maxWidth="600px">
         {
          product.ratings.map((rating,index) => (
            <Stack spacing={1} >
          <Stack direction="row" spacing={2}>
            <Avatar
              src="https://bazaar.ui-lib.com/assets/images/faces/7.png"
              sx={{
                height: "50px",
                width: "50px",
              }}
            />
            <Stack>
              <Typography fontSize="16px" fontWeight="500">
                {`${rating?.postedby?.firstName} ${rating?.postedby?.lastName}`}
              </Typography>
              <Rating
                value={rating?.star}
                sx={{
                  fontSize: "20px",
                }}
              />
            </Stack>
          </Stack>
          <Typography fontSize="13px" color="#4B566B">
          {rating?.comment}

          </Typography>
        </Stack>

          ))
         }
        

      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="h5" mb="20px">
          Write a Review for this product
        </Typography>
        <form onSubmit={addComment}>
          <Typography>
            Your Rating <span style={{ color: "red" }}>*</span>
          </Typography>
          <Rating
            value={value.star || 0}
            name="star"
            onChange={(event, newValue) => {
              setValue({ ...value, star: newValue });
            }}
            sx={{
              fontSize: "23px",
            }}
          />
          <Stack spacing={1}>
            <Typography>
              Your Review <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              name="review"
              value={value.comment}
              onChange={(event) => {
                setValue({ ...value, comment: event.target.value });
              }}
              multiline
              rows={7}
              placeholder="Write a review here..."
              InputLabelProps={{
                style: { fontSize: "15px" },
              }}
            />
          </Stack>
          <Button
            type="submit"
            disabled={!value.star || !value.comment} 
            sx={{
              textTransform: "none",
              bgcolor: !value.star || !value.comment? "#0000001f" : "primary.main",
              color: "white",
              fontSize: "14px",
              paddingX: "20px",
              fontWeight: 500,
              paddingY: "8px",
              alignSelf: "start",
              marginTop: "30px !important",
              "&:hover": {
                backgroundColor: "#E3364E",
              },
            }}
          >
            Submit
          </Button>
        </form>
      </Stack>

      <Stack>
        <Typography variant="h6" fontSize="20px" mb={3}>
          Related Products
        </Typography>
        {/* <Grid
          container
          spacing={6}
          sx={{
            marginLeft: "-48px !important",
          }}
        >
          {product.map((item) => (
            <Grid item xs={3}>
              <ICard {...item} />
            </Grid>
          ))}
        </Grid> */}
      </Stack>
    </Stack>
  );
};
export default Reviews;
