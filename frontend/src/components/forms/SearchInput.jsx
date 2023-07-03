import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Box,
  TextField,
  InputAdornment,
  Button,
  Autocomplete,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { base_url } from "../../utils/baseUrl";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);
  };
  const handleOptionSelect = (event, option) => {
    setValue(option);
  };

  const handleSearch = () => {
    navigate(`/store?search=${value}`);
    setValue("");
  };

  const filterOptions = (options, { inputValue }) => {
    if (inputValue.length >= 2) {
      return options.filter((option) =>
        option.toLowerCase().includes(inputValue.toLowerCase())
      );
    }
    return [];
  };

  const getProducts = () => {
    axios
      .get(`${base_url}product`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Box py={2}>
      <Autocomplete
        freeSolo
        options={products?.map((option) => option.name)}
        filterOptions={filterOptions}
        value={value}
        onChange={handleOptionSelect}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Searching for"
            variant="outlined"
            onChange={handleInputChange}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{
                      fontSize: "1.25rem",
                      color: "#7D879C",
                    }}
                  />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    onClick={handleSearch}
                    sx={{
                      textTransform: "none",
                      bgcolor: "#E3364E",
                      color: "white",
                      paddingX: "40px",
                      fontSize: "14px",
                      letterSpacing: "1px",
                      paddingY: "8px",
                      borderLeft: "1px solid #7D879C",
                      justifyContent: "space-between",
                      borderTopRightRadius: "1200px",
                      borderBottomRightRadius: "1200px",
                      height: "100%",
                      "&:hover": {
                        backgroundColor: "#D23F57",
                      },
                    }}
                  >
                    Search
                  </Button>
                </InputAdornment>
              ),
            }}
            sx={{
              width: "100%",
              paddingRight: 0,
              "& .MuiOutlinedInput-root": {
                borderRadius: "1200px",
                padding: "0px 0px 0px 20px !important",
                "& .MuiAutocomplete-input": {
                  padding: "1px !important",
                  fontSize: "14px",
                },
                "& .MuiInputAdornment-positionEnd": {
                  height: "100%",
                  maxHeight: "100%",
                },
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E3364E",
              },
            }}
          />
        )}
      />
    </Box>
  );
};

export default SearchInput;
