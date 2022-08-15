import { RootState } from "@/redux_/store";
import { DialogBox } from "@/redux_/types/common";
import { createSlice } from "@reduxjs/toolkit";

const GridData: DialogBox = {
  show: false,
};

const dialogBoxSlice = createSlice({
  name: "dialogBoxSlice",
  initialState: GridData,
  reducers: {
    toggleDialogBox: (state, action) => {
      state.show = action.payload.show;
    },
  },
});
export const { toggleDialogBox } = dialogBoxSlice.actions;
export const dialogBoxSelector = (store: RootState) => store.dialogBoxSelector;
export default dialogBoxSlice.reducer;
