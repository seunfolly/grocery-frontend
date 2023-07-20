import React, { useState, useEffect } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { base_url } from "../../utils/baseUrl";
import axios from "axios";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const getCategories = () => {
    axios
      .get(`${base_url}category?level=1&visible=true`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCategories();
  }, []);

  // const { categories } = useSelector((state) => state.category);

  const [expandedCategories, setExpandedCategories] = useState([]);

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prevExpandedCategories) => {
      if (prevExpandedCategories.includes(categoryId)) {
        return prevExpandedCategories.filter((id) => id !== categoryId);
      } else {
        return [...prevExpandedCategories, categoryId];
      }
    });
  };

  const isCategoryExpanded = (categoryId) => {
    return expandedCategories.includes(categoryId);
  };

  const renderCategory = (category, topLevel) => {
    const hasChildren = category.children && category.children.length > 0;
    const isExpanded = isCategoryExpanded(category._id);

    return (
      <Box key={category._id}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          paddingY={topLevel ? 1 : 0.7}
          sx={{ cursor: "pointer" }}
          onClick={() => toggleCategory(category._id)}
        >
          <Link
            to={`/store?category=${category._id}`}
            style={{ textDecoration: "none", width: "100%" }}
          >
            <Typography
              color="#4B566B"
              fontSize={topLevel ? "16px" : "14.5px"}
              sx={{
                "&:hover": {
                  color: "#D23F57",
                },
              }}
            >
              {category.name}
            </Typography>
          </Link>
          {hasChildren && (
            <ChevronRightIcon
              sx={{
                transition: "transform 250ms ease-in-out 0s",
                transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
              }}
            />
          )}
        </Stack>
        {hasChildren && isExpanded && (
          <Box marginLeft={2}>
            {category.children.map((subcategory) =>
              renderCategory(subcategory)
            )}
          </Box>
        )}
      </Box>
    );
  };

  return <>{categories.map((category) => renderCategory(category, true))}</>;
};

export default Category;
