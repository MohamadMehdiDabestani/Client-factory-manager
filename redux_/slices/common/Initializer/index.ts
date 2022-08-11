import { RootState } from "@/redux_/store";
import { Initializer } from "@/redux_/types/common";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const Initializer: Initializer = {
  refreshToken: "",
  token: "",
};

const initializerSlice = createSlice({
  name: "initializerSlice",
  initialState: Initializer,
  reducers: {
    setTokenAndRefreshToken: (state, action) => {
      state.refreshToken = action.payload.refreshToken ?? "";
      state.token = action.payload.token ?? "";
    },
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload.refreshToken;
    },
    cleanTokenAndRefreshToken: (state) => {
      state.refreshToken = "";
      state.token = "";
    },
  },
});
export const {
  cleanTokenAndRefreshToken,
  setRefreshToken,
  setToken,
  setTokenAndRefreshToken,
} = initializerSlice.actions;
export const initializerSelector = (store: RootState) =>
  store.initializerSelector;
export default initializerSlice.reducer;
