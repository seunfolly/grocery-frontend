import { useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Box,
  Stack,
  Typography,
  CircularProgress,
  Collapse,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Define fallback products (15-20 dummy items)
const fallbackProducts = Array.from({ length: 18 }).map((_, index) => ({
  _id: `fallback-${index}`,
  name: `Sample Product ${index + 1}`,
  price: (Math.random() * 100 + 10).toFixed(2),
  image: `https://picsum.photos/200/200?random=${index + 1}`,
}));

const Category = ({ visibleCategories, loading, productsByCategory = {} }) => {
  const [expandedCategories, setExpandedCategories] = useState([]);

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prevExpanded) =>
      prevExpanded.includes(categoryId)
        ? prevExpanded.filter((id) => id !== categoryId)
        : [...prevExpanded, categoryId]
    );
  };

  const isCategoryExpanded = (categoryId) =>
    expandedCategories.includes(categoryId);

  const renderProducts = (categoryId) => {
    // Use products from Redux or fallback
    const products = productsByCategory[categoryId] || fallbackProducts;

    return (
      <Grid container spacing={1} mt={1}>
        {products.slice(0, 6).map((product) => (
          <Grid item xs={6} key={product._id}>
            <Card
              sx={{
                boxShadow: "none",
                border: "1px solid #f0f0f0",
                borderRadius: "8px",
                "&:hover": { boxShadow: "0px 2px 6px rgba(0,0,0,0.12)" },
              }}
            >
              <Link
                to={`/product/${product._id}`}
                style={{ textDecoration: "none" }}
              >
                <CardMedia
                  component="img"
                  height="90"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ p: 1 }}>
                  <Typography
                    variant="caption"
                    color="text.primary"
                    noWrap
                    fontWeight={500}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="primary"
                    fontWeight={600}
                    display="block"
                  >
                    ${product.price}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderCategory = (category, topLevel = false) => {
    const hasChildren = category.children && category.children.length > 0;
    const isExpanded = isCategoryExpanded(category._id);

    return (
      <Box key={category._id}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          px={1}
          py={topLevel ? 1.2 : 0.8}
          sx={{
            cursor: "pointer",
            borderRadius: "6px",
            "&:hover": {
              bgcolor: "#f5f5f5",
            },
          }}
          onClick={() => toggleCategory(category._id)}
        >
          <Link
            to={`/store?category=${category._id}`}
            style={{ textDecoration: "none", flexGrow: 1 }}
          >
            <Typography
              variant="body2"
              fontSize={topLevel ? "15px" : "14px"}
              fontWeight={topLevel ? 600 : 400}
              color="#4B566B"
              sx={{
                "&:hover": { color: "#D23F57" },
                display: "block",
              }}
            >
              {category.name}
            </Typography>
          </Link>

          {(hasChildren || true) && ( // always expandable since fallback exists
            <ChevronRightIcon
              sx={{
                fontSize: 20,
                color: "#555",
                transition: "transform 0.25s ease-in-out",
                transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
              }}
            />
          )}
        </Stack>

        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <Box ml={2} mt={0.5}>
            {/* Subcategories */}
            {hasChildren &&
              category.children.map((subcategory) =>
                renderCategory(subcategory, false)
              )}

            {/* Products (real or fallback) */}
            {renderProducts(category._id)}
          </Box>
        </Collapse>
      </Box>
    );
  };

  return (
    <Box>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100px"
        >
          <CircularProgress size={24} thickness={4} />
        </Box>
      ) : visibleCategories && visibleCategories.length > 0 ? (
        visibleCategories.map((category) => renderCategory(category, true))
      ) : (
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ mt: 2, textAlign: "center" }}
        >
          No categories available
        </Typography>
      )}
    </Box>
  );
};

Category.propTypes = {
  visibleCategories: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  productsByCategory: PropTypes.object,
};

export default Category;
