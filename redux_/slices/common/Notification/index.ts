import { RootState } from "@/redux_/store";
import { InitialStateToggleNotification } from "@/redux_/types/common";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialStateToggleNotification: InitialStateToggleNotification = {
  severity: "success",
  variant: "standard",
  message: "",
  show: false,
};

export const actionToggleNotif = createAsyncThunk(
  "toggleNotification/set",
  async (value: InitialStateToggleNotification) => {
    const job = new Promise<InitialStateToggleNotification>(
      (resolve, reject) => {
        resolve(value);
      }
    );
    return await job;
  }
);

const toggleNotificationSlice = createSlice({
  name: "toggleNotificationSlice",
  initialState: initialStateToggleNotification,
  reducers: {
    showSuccessNotif: (state, action) => {
      state.show = true;
      state.severity = "success";
      state.message = action.payload.message;
    },
    showErrorNotif: (state, action) => {
      state.show = true;
      state.severity = "error";
      state.message = action.payload.message;
    },
    showWarningNotif: (state, action) => {
      state.show = true;
      state.severity = "warning";
      state.message = action.payload.message;
    },
    showInfoNotif: (state, action) => {
      state.show = true;
      state.severity = "info";
      state.message = action.payload.message;
    },
    hideNotif: (state) => {
      state.show = false;
    },
  },
});
export const {
  showSuccessNotif,
  showWarningNotif,
  showInfoNotif,
  hideNotif,
  showErrorNotif,
} = toggleNotificationSlice.actions;
export const toggleNotificationSelector = (store: RootState) =>
  store.toggleNotificationSelector;
export default toggleNotificationSlice.reducer;
