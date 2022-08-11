import { RootState } from "@/redux_/store";
import { ValidationAlert } from "@/redux_/types/common";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialStateValidationAlert: ValidationAlert = {
  list: null,
  description: "",
};

const validationAlertSlice = createSlice({
  name: "toggleNotificationSlice",
  initialState: initialStateValidationAlert,
  reducers: {
    showList: (state, action) => {
      state.list = action.payload.list;
      state.description = action.payload.description;
    },
    hideList: (state) => {
      state.list = null;
      state.description = "";
    },
  },
});
export const { hideList, showList } = validationAlertSlice.actions;
export const validationAlertSelector = (store: RootState) =>
  store.validationAlertSelector;
export default validationAlertSlice.reducer;
