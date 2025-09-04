import PropTypes from "prop-types";
import {
  Box,
  Stack,
  Grid,
  IconButton,
  Button,
  Typography,
  Paper,
  Rating,
} from "@mui/material";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
  Block as BlockIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const ProductCard = ({
  id,
  name,
  images,
  regularPrice,
  salePrice,
  description,
  stock,
  totalStar,
  count,
  onAddToCart,
  onRemoveFromCart,
  onToggleWishlist,
  wishlist,
}) => {
  return (
    <Paper
      elevation={1}
      sx={{
        borderRadius: 2,
        p: 2,
        position: "relative",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": { transform: "translateY(-4px)", boxShadow: 4 },
      }}
    >
      <IconButton
        onClick={onToggleWishlist}
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          color: wishlist ? "#E3364E" : "rgba(0,0,0,0.5)",
        }}
      >
        {wishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={5} md={4} lg={3}>
          <Link to={`/product/${id}`} style={{ textDecoration: "none" }}>
            <Box width="100%" height="195px" textAlign="center">
              <img
                src={images[0]?.url || ""}
                alt={name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>
          </Link>
        </Grid>

        <Grid item xs={12} sm={7} md={8} lg={9}>
          <Stack spacing={1}>
            <Link to={`/product/${id}`} style={{ textDecoration: "none" }}>
              <Typography variant="subtitle1" color="text.primary">
                {name}
              </Typography>
            </Link>

            {totalStar > 0 && (
              <Rating value={totalStar} readOnly size="small" />
            )}
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>

            <Stack direction="row" spacing={1} mt={1} alignItems="center">
              <Typography color="primary.main" fontWeight={600}>
                ₦ {salePrice ?? regularPrice}
              </Typography>
              {salePrice && (
                <Typography
                  color="text.secondary"
                  sx={{ textDecoration: "line-through" }}
                >
                  ₦ {regularPrice}
                </Typography>
              )}
            </Stack>

            <Stack direction="row" spacing={1} mt={1} alignItems="center">
              {stock <= 0 ? (
                <Button
                  disabled
                  startIcon={<BlockIcon />}
                  sx={{
                    textTransform: "none",
                    bgcolor: "#f0f0f0",
                    color: "rgba(0,0,0,0.5)",
                    borderRadius: 3,
                    px: 2,
                  }}
                >
                  Out of Stock
                </Button>
              ) : count > 0 ? (
                <Stack direction="row" spacing={1} alignItems="center">
                  <Button onClick={onRemoveFromCart} size="small">
                    <RemoveIcon fontSize="small" />
                  </Button>
                  <Typography>{count}</Typography>
                  <Button onClick={onAddToCart} size="small">
                    <AddIcon fontSize="small" />
                  </Button>
                </Stack>
              ) : (
                <Button
                  onClick={onAddToCart}
                  startIcon={<ShoppingCartOutlinedIcon />}
                  sx={{
                    textTransform: "none",
                    bgcolor: "primary.main",
                    color: "#fff",
                    borderRadius: 3,
                    px: 2,
                    "&:hover": { bgcolor: "#E3364E" },
                  }}
                >
                  Add to Cart
                </Button>
              )}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
    })
  ),
  regularPrice: PropTypes.number.isRequired,
  salePrice: PropTypes.number,
  description: PropTypes.string,
  stock: PropTypes.number,
  totalStar: PropTypes.number,
  count: PropTypes.number,
  onAddToCart: PropTypes.func,
  onRemoveFromCart: PropTypes.func,
  onToggleWishlist: PropTypes.func,
  wishlist: PropTypes.bool,
};

ProductCard.defaultProps = {
  images: [],
  salePrice: null,
  description: "",
  stock: 0,
  totalStar: 0,
  count: 0,
  onAddToCart: () => {},
  onRemoveFromCart: () => {},
  onToggleWishlist: () => {},
  wishlist: false,
};

export default ProductCard;
