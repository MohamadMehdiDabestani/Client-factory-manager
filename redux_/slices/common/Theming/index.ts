import { RootState } from "@/redux_/store";
import { Theming } from "@/redux_/types/common";
import { createSlice } from "@reduxjs/toolkit";

const initialStateTheming: Theming = {
  mode: "light",
};

const themingSlice = createSlice({
  name: "themingSlice",
  initialState: initialStateTheming,
  reducers: {
    toggleTheme: (state, action) => {
      state.mode = action.payload.theme;
    },
  },
});
export const { toggleTheme } = themingSlice.actions;
export const themingSelector = (store: RootState) => store.themingSelector;
export default themingSlice.reducer;
