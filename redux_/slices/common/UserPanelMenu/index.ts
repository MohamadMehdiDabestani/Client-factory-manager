import { RootState } from "@/redux_/store";
import { UserPanelMenu } from "@/redux_/types/common";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const userPanelMenu: UserPanelMenu = {
    show : true
}

const userPanelMenuSlice = createSlice({
  name: "userPanelMenuSlice",
  initialState: userPanelMenu,
  reducers: {
    toggleUserMenu: (state, action) => {
      state.show = action.payload.show
    },
  },
});
export const {
    toggleUserMenu
} = userPanelMenuSlice.actions;
export const userPanelMenuSelector = (store: RootState) =>
  store.userPanelMenuSelector;
export default userPanelMenuSlice.reducer;
