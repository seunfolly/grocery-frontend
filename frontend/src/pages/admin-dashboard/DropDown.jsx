import { useEffect, useRef, useState } from "react";
import {
  Box,
  Paper,
  Stack,
  TextField,
  styled,
  MenuItem,
  Typography,
  Button,
  Checkbox,
  IconButton,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { getCategories } from "../../features/category/categorySlice";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "&.Mui-focused fieldset": {
      borderColor: "#4e97fd",
    },
  },
});
const Dropdown = ({
  setCategoryLevels,
  categoryLevels,
  selectedCategories,
  setSelectedCategories,
  setFieldValue,
  field
}) => {
  const [renderKey, setRenderKey] = useState(0);

  const handleCategoryChange = (index, categoryId, setFieldValue) => {
    setRenderKey((prevKey) => prevKey + 1);
    const updatedSelectedCategories = selectedCategories.slice(0, index);
    updatedSelectedCategories.push(categoryId);
    setSelectedCategories(updatedSelectedCategories);
    setCategoryLevels(categoryLevels.slice(0, index + 1));
    setFieldValue(field, categoryId); // Set the 'parent' field value using Formik setFieldValue
    fetchSubCategories(categoryId, index + 1);
  };

  const removeCategoryDropdown = (index, setFieldValue) => {
    const updatedSelectedCategories = selectedCategories.slice(0, index);
    const updatedCategoryLevels = categoryLevels.slice(0, index);
    setSelectedCategories(updatedSelectedCategories);
    setCategoryLevels(updatedCategoryLevels);
    setFieldValue(
      `category-level-${index - 1}`,
      updatedSelectedCategories[index - 1] || ""
    );
  };

  const fetchSubCategories = (categoryId, index) => {
    axios
      .get(`${base_url}category/${categoryId}`)
      .then((response) => {
        const updatedCategoryLevels = [...categoryLevels];
        updatedCategoryLevels[index] = response.data.children;
        setCategoryLevels(updatedCategoryLevels);
      })
      .catch((error) => console.log(error));
  };

  const renderCategoryDropdown = (level, index, setFieldValue) => {
    if (level.length === 0) {
      return null; // Don't render the dropdown if the level is empty
    }
    const fieldName =
      index === categoryLevels.length - 1
        ? field
        : `category-level-${index}`;
    return (
      <Box position="relative">
        <CustomTextField
          select
          label={`Select Category Level ${index + 1}`}
          fullWidth
          variant="outlined"
          onChange={(event) =>
            handleCategoryChange(index, event.target.value, setFieldValue)
          }
          value={selectedCategories[index] || ""}
          name={fieldName}
          key={fieldName}
          InputLabelProps={{
            style: { fontSize: "15px" },
          }}
          sx={{
            width: "250px",
          }}
        >
          {level.map((option) => (
            <MenuItem key={option._id} value={option._id}>
              {option.name}
            </MenuItem>
          ))}
        </CustomTextField>
        {index > 0 && (
          <IconButton
            onClick={() => removeCategoryDropdown(index, setFieldValue)}
            sx={{
              marginLeft: "10px",
              position: "absolute",
              top: "-10px",
              right: "-20px",
              padding: "3px",
            }}
          >
            <CloseIcon
              sx={{
                fontSize: ".9rem",
              }}
            />
          </IconButton>
        )}
      </Box>
    );
  };

  return (
    <>
      {categoryLevels.map((level, index) =>
        renderCategoryDropdown(level, index, setFieldValue)
      )}
    </>
  );
};

export default Dropdown;
