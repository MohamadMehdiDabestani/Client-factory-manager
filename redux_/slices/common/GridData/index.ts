import { RootState } from "@/redux_/store";
import { GridData } from "@/redux_/types/common";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const GridData: GridData = {
  clickDeleteRowsBtn: false,
  idItems: [0],
};

const gridDataSlice = createSlice({
  name: "gridDataSlice",
  initialState: GridData,
  reducers: {
    toggleDeleteRow: (state, action) => {
      state.clickDeleteRowsBtn = action.payload.status;
      state.idItems = action.payload.idItems;
    },
  },
});
export const { toggleDeleteRow } = gridDataSlice.actions;
export const gridDataSelector = (store: RootState) => store.gridDataSelector;
export default gridDataSlice.reducer;
