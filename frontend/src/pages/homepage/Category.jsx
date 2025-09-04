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

const fallbackCategories = [
  { _id: "electronics", name: "Electronics", children: [] },
  { _id: "fashion", name: "Fashion", children: [] },
  { _id: "home-kitchen", name: "Home & Kitchen", children: [] },
  { _id: "sports", name: "Sports & Outdoors", children: [] },
  { _id: "beauty", name: "Beauty & Personal Care", children: [] },
];

const Category = ({ visibleCategories, loading, productsByCategory = {} }) => {
  const [expandedCategories, setExpandedCategories] = useState([]);

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const isCategoryExpanded = (categoryId) =>
    expandedCategories.includes(categoryId);

  const renderProducts = (categoryId) => {
    const products = productsByCategory[categoryId] || [];

    if (products.length === 0) return null;

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
            "&:hover": { bgcolor: "#f5f5f5" },
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

          {(hasChildren || productsByCategory[category._id]) && (
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
            {hasChildren &&
              category.children.map((subcategory) =>
                renderCategory(subcategory, false)
              )}
            {renderProducts(category._id)}
          </Box>
        </Collapse>
      </Box>
    );
  };

  const categoriesToShow =
    visibleCategories && visibleCategories.length > 0
      ? visibleCategories
      : fallbackCategories;

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
      ) : (
        categoriesToShow.map((category) => renderCategory(category, true))
      )}
    </Box>
  );
};

Category.propTypes = {
  visibleCategories: PropTypes.array,
  loading: PropTypes.bool,
  productsByCategory: PropTypes.object,
};

Category.defaultProps = {
  visibleCategories: [],
  loading: false,
  productsByCategory: {},
};

export default Category;
