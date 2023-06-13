import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "./authServices";

const getUserfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const initialState = {
  user: getUserfromLocalStorage,
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  userUpdated: false,
  cart: [],
  message: "",
};

export const signup = createAsyncThunk(
  "auth/sign",
  async (userData, thunkAPI) => {
    try {
      return await authService.signup(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// export const logout = createAsyncThunk("auth/logout", async (_, { getState }) => {
//   localStorage.removeItem("user");
//   const initialState = getState().auth.initialState;
//   return initialState;
// });

export const updateProfile = createAsyncThunk(
  "auth/edit-profile",
  async (data, thunkAPI) => {
    console.log(data)

    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("dob", data.dob);
      formData.append("image", data.image);
      return await authService.editProfile(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userCart = createAsyncThunk(
  "cart/store-cart",
  async (cart, thunkAPI) => {
    try {
      return await authService.userCart(cart);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");
export const resetUpdatedFlag = createAction("Reset_Updated_Flag");
export const logout = createAction("auth/logout");
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(signup.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "success";
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
         if(action.payload) {
          const updatedState = { ...action.payload, token: state.user.token }
          let existingData = JSON.parse(localStorage.getItem('user'));
          existingData = updatedState;
         localStorage.setItem('user', JSON.stringify(existingData));
         state.user = updatedState;
         }
        (state.userUpdated = true), (state.message = "success");
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(userCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userCart.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload;
        state.message = "success";
      })
      .addCase(userCart.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.isLoading = false;
      })
      .addCase(resetState, () => initialState)
      .addCase(resetUpdatedFlag, (state,action) => {state.userUpdated = false})

      .addCase(logout, () => {
        // Reset the state to its initial values
        localStorage.removeItem("user");
        return {
          ...initialState,
        };
      });
  },
});

export default authSlice.reducer;
